# Keystatic Cloud — Implementación en Eleahora

Documentación completa de la integración de Keystatic Cloud como CMS headless en el
proyecto Eleahora (Astro + Svelte + TypeScript). Incluye arquitectura, esquema,
errores conocidos y guía de reimplementación paso a paso.

---

## 1. Resumen de la integración

| Aspecto | Detalle |
|---|---|
| Modo de storage | `kind: "cloud"` — Keystatic Cloud (no GitHub autoalojado) |
| Proyecto Cloud | `eleahora/eleahora` |
| Admin UI | `cloud.keystatic.com` |
| Framework | Astro 6 con `output: 'server'` (SSR) |
| Adapter SSR | `@astrojs/node` modo `standalone` |
| Lectura de contenido | `@keystatic/core/reader` en build-time |
| Endpoints API | `/api/keystatic/*` servidos vía `@keystatic/astro` |
| Variables de entorno | **Ninguna requerida** (auth gestionada por Keystatic Cloud) |

---

## 2. Arquitectura y flujo de datos

```
┌──────────────────────┐
│  cloud.keystatic.com │  ← Admin UI para editar contenido
│  (eleahora/eleahora) │
└────────┬─────────────┘
         │ API calls (auth vía Keystatic Cloud)
         ▼
┌──────────────────────┐
│  /api/keystatic/*    │  ← Endpoints servidos por @keystatic/astro (SSR)
│  (Astro Node server) │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Keystatic Cloud API │  ← Storage y auth gestionados en cloud
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  @keystatic/core/    │  ← createReader() lee datos en build-time
│  reader              │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  src/lib/keystatic.ts│  ← Helpers tipados: getSiteConfig(), getAllSesiones()...
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Páginas .astro      │  ← await getHomePage() ?? fallback
│  + Layout.astro      │
└──────────────────────┘
```

### Flujo en producción

1. El editor abre `cloud.keystatic.com` y edita contenido.
2. Keystatic Cloud se comunica con `/api/keystatic/*` en el servidor Eleahora.
3. El contenido editado se persiste en Keystatic Cloud.
4. En cada build/request SSR, `createReader(process.cwd(), config)` lee el contenido
   actualizado desde la API de Keystatic Cloud.

---

## 3. Archivos involucrados

### Configuración y dependencias

| Archivo | Rol |
|---|---|
| `keystatic.config.ts` | Schema: 6 singletons, 3 collections. Storage cloud, project `eleahora/eleahora`. |
| `astro.config.mjs` | Integración `@keystatic/astro`, modo `server`, adapter `@astrojs/node`. |
| `package.json` | Dependencias: `@keystatic/core`, `@keystatic/astro`, `@astrojs/react`, `@astrojs/node`. |
| `.env.example` | Documenta que **no se requieren variables de entorno**. |
| `.gitignore` | `.env`, `.env.production`, `.env.local` excluidos. |

### Capa de datos

| Archivo | Rol |
|---|---|
| `src/lib/keystatic.ts` | `createReader()`, helpers por singleton/collection, `resolveDocument()`. |
| `src/layouts/Layout.astro` | Consume `getSiteConfig()` para SEO, OG tags y colores CSS dinámicos. |
| `src/pages/index.astro` | `getHomePage()`, `getSiteConfig()`, `getAllTestimonios()`. |
| `src/pages/about.astro` | `getAboutPage()`. |
| `src/pages/sesiones.astro` | `getSessionesPage()`, `getAllSesiones()`, `getSiteConfig()`. |
| `src/pages/contacto.astro` | `getContactoPage()`, `getSiteConfig()`, `getAllSesiones()`. |
| `src/pages/workshop-empresas.astro` | `getWorkshopPage()`, `getSiteConfig()`. |
| `src/pages/legal/[slug].astro` | `getAllLegalPages()`, `getLegalPage()`. |
| `src/components/astro/Header.astro` | `getSiteConfig()`. |
| `src/components/astro/Footer.astro` | `getSiteConfig()`. |

### Contenido (YAML)

| Directorio | Descripción |
|---|---|
| `src/content/singletons/site-config.yaml` | Configuración global (SEO, colores, redes, OG image). |
| `src/content/singletons/home.yaml` | Home: hero, manifiesto, mindfulness. |
| `src/content/singletons/about.yaml` | Sobre Mí: bio, galería, CTAs. |
| `src/content/singletons/sesiones-page.yaml` | Cabecera de la página de sesiones. |
| `src/content/singletons/workshop.yaml` | Workshop para empresas. |
| `src/content/singletons/contacto.yaml` | Contacto: título y pasos del proceso. |
| `src/content/sesiones/*.yaml` (5 archivos) | Colección de sesiones/servicios. |
| `src/content/testimonios/*.yaml` (3 archivos) | Colección de testimonios. |
| `src/content/legal/*.yaml` (3 archivos) | Páginas legales (aviso legal, privacidad, cookies). |

### Despliegue

| Archivo | Rol |
|---|---|
| `Dockerfile` | 3 stages: `oven/bun` build → `node:22-alpine` SSR → `caddy:alpine` reverse proxy. Copia `keystatic.config.ts` en los 3 stages. |
| `Caddyfile` | Reverse proxy a `localhost:4321` con headers de seguridad y compresión. |
| `start.sh` | Inicia Node SSR (puerto 4321), espera readiness, luego arranca Caddy (puerto 80). |
| `docker-compose.yml` | Servicio `web` conectado a red externa `dokploy-network`. |

---

## 4. Schema detallado

### 4.1 Singletons (6)

#### `siteConfig` — Configuración Global

| Campo | Tipo | Default |
|---|---|---|
| `siteTitle` | `fields.text` | `"Eleahora \| Terapia Transpersonal y Meditación en Madrid"` |
| `siteDescription` | `fields.text` (multiline) | Meta description global |
| `phoneWhatsapp` | `fields.text` | `"+34605373782"` |
| `calLink` | `fields.url` | `"https://cal.eu/eleahora/sesiones"` |
| `instagramUrl` | `fields.url` | Instagram |
| `facebookUrl` | `fields.url` | Facebook |
| `insightTimerUrl` | `fields.url` | Insight Timer |
| `colorBackground` | `fields.text` | `"#fdfbec"` |
| `colorPrimaryDark` | `fields.text` | `"#3b2639"` |
| `colorAccentRed` | `fields.text` | `"#8c0703"` |
| `colorAccentPurple` | `fields.text` | `"#6d4492"` |
| `colorEarth` | `fields.text` | `"#bb896b"` |
| `colorSage` | `fields.text` | `"#566443"` |
| `ogImage` | `fields.image` | Imagen OG por defecto |

#### `homePage` — Página de Inicio

| Campo | Tipo | Notas |
|---|---|---|
| `heroTitle` | `fields.text` | H1 |
| `heroSubtitle` | `fields.text` (multiline) | Subtítulo |
| `heroCtaText` | `fields.text` | Botón CTA |
| `heroImage` | `fields.image` | Imagen de fondo |
| `manifestoLabel` | `fields.text` | Etiqueta |
| `manifestoTitle` | `fields.text` | H2 |
| `manifestoBody` | **`fields.document`** | Rich text — se resuelve a HTML vía `resolveDocument()` |
| `manifestoQuote` | `fields.text` (multiline) | Cita destacada |
| `manifestoImage` | `fields.image` | Imagen |
| `mindfulnessLabel` | `fields.text` | Etiqueta |
| `mindfulnessTitle` | `fields.text` | H2 |
| `mindfulnessLead` | `fields.text` (multiline) | Intro |
| `mindfulnessBody` | `fields.text` (multiline) | Descriptivo |
| `mindfulnessBenefitsTitle` | `fields.text` | Título beneficios |
| `mindfulnessBenefits` | `fields.array(fields.text)` | Lista de beneficios |
| `mindfulnessConclusion` | `fields.text` (multiline) | Cierre |
| `mindfulnessImage` | `fields.image` | Imagen |

#### `aboutPage` — Sobre Mí

| Campo | Tipo | Notas |
|---|---|---|
| `heroLabel` | `fields.text` | Etiqueta superior |
| `heroTitle` | `fields.text` | H1 |
| `heroSubtitle` | `fields.text` (multiline) | Tagline |
| `profileImage` | `fields.image` | Foto principal |
| `bioIntro` | `fields.text` (multiline) | Introducción |
| `bioBody` | **`fields.document`** | Rich text — se resuelve a HTML |
| `manifestoTitle` | `fields.text` | Título del manifiesto |
| `manifestoText` | `fields.text` (multiline) | Texto del manifiesto |
| `galleryImage1` | `fields.image` | Galería |
| `galleryImage2` | `fields.image` | Galería |
| `ctaTitle` | `fields.text` | CTA |
| `ctaBody` | `fields.text` (multiline) | CTA |
| `ctaButtonText` | `fields.text` | CTA |

#### `sessionesPage` — Cabecera de Sesiones

| Campo | Tipo |
|---|---|
| `heroLabel` | `fields.text` |
| `heroTitle` | `fields.text` |
| `heroSubtitle` | `fields.text` (multiline) |
| `heroImage` | `fields.image` |
| `ctaTitle` | `fields.text` |
| `ctaBody` | `fields.text` (multiline) |

#### `workshopPage` — Workshop para Empresas

| Campo | Tipo | Notas |
|---|---|---|
| `heroLabel` | `fields.text` | |
| `heroTitle` | `fields.text` | |
| `heroSubtitle` | `fields.text` (multiline) | |
| `heroImage` | `fields.image` | |
| `introTitle` | `fields.text` | |
| `introBody` | **`fields.document`** | Rich text |
| `benefitsTitle` | `fields.text` | |
| `benefits` | `fields.array(fields.object)` | Objetos con `title` + `description` |
| `formatsTitle` | `fields.text` | |
| `formats` | `fields.array(fields.object)` | Objetos con `name` + `duration` + `description` |
| `ctaTitle` | `fields.text` | |
| `ctaBody` | `fields.text` (multiline) | |
| `ctaButtonText` | `fields.text` | |

#### `contactoPage` — Contacto

| Campo | Tipo | Notas |
|---|---|---|
| `heroTitle` | `fields.text` | |
| `heroSubtitle` | `fields.text` (multiline) | |
| `processTitle` | `fields.text` | |
| `processSteps` | `fields.array(fields.object)` | Objetos con `step` + `title` + `description` |

---

### 4.2 Collections (3)

#### `sesiones` — Sesiones & Servicios

| Campo | Tipo | Default / Opciones |
|---|---|---|
| `title` | `fields.slug` | Slug generado del nombre |
| `order` | `fields.integer` | `1` |
| `featured` | `fields.checkbox` | `false` |
| `tagline` | `fields.text` | |
| `description` | **`fields.document`** | Rich text |
| `duration` | `fields.text` | `"60 min"` |
| `modality` | `fields.select` | `"online"` / `"presencial"` / `"ambas"` |
| `price` | `fields.text` | |
| `image` | `fields.image` | Directorio: `public/images/sesiones` |
| `bookingUrl` | `fields.url` | |
| `seoTitle` | `fields.text` | Opcional |
| `seoDescription` | `fields.text` (multiline) | Opcional |

**Path:** `src/content/sesiones/*` · **SlugField:** `title`

#### `testimonios` — Testimonios

| Campo | Tipo | Default |
|---|---|---|
| `name` | `fields.slug` | Slug del nombre |
| `quote` | `fields.text` (multiline) | |
| `service` | `fields.text` | |
| `photo` | `fields.image` | Directorio: `public/images/testimonios` |
| `featured` | `fields.checkbox` | `true` |
| `order` | `fields.integer` | `1` |

**Path:** `src/content/testimonios/*` · **SlugField:** `name`

#### `legalPages` — Páginas Legales

| Campo | Tipo | Default |
|---|---|---|
| `title` | `fields.slug` | Slug del título |
| `metaDescription` | `fields.text` (multiline) | |
| `lastUpdated` | `fields.date` | `{ kind: "today" }` |
| `content` | **`fields.document`** (con `links: true`) | Rich text con enlaces |

**Path:** `src/content/legal/*` · **SlugField:** `title`

---

## 5. Dependencias

```json
{
  "@keystatic/astro": "^5.0.6",
  "@keystatic/core": "^0.5.43",
  "@astrojs/node": "^10.0.6",
  "@astrojs/react": "^5.0.4"
}
```

- `@keystatic/core`: Motor de Keystatic (config, reader, campos, storage).
- `@keystatic/astro`: Integración Astro — expone endpoints `/api/keystatic/*` vía SSR.
- `@astrojs/react`: **Requerido** por el admin UI de Keystatic (usa React internamente).
- `@astrojs/node`: Adaptador SSR necesario porque Keystatic Cloud necesita endpoints de API en el servidor.

---

## 6. Integración en Astro (`astro.config.mjs`)

```js
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',             // ← Obligatorio para /api/keystatic/*
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),                     // ← Requerido por Keystatic
    keystatic(),                 // ← Expone /api/keystatic/*
  ],
});
```

Puntos clave:
- `output: 'server'` es obligatorio. Keystatic Cloud necesita endpoints SSR para que el admin UI en `cloud.keystatic.com` pueda comunicarse con tu servidor.
- `react()` debe estar en las integraciones porque Keystatic renderiza su admin UI con React.
- Las rutas `/keystatic` se excluyen del sitemap para evitar indexación.

---

## 7. Capa de lectura: `src/lib/keystatic.ts`

### 7.1 Inicialización del reader

```ts
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);
```

`createReader` recibe el directorio raíz del proyecto y la config. En Cloud mode,
las lecturas van contra la API de Keystatic Cloud, autenticadas con el project key
incluido en `keystatic.config.ts`.

### 7.2 Helpers para singletons

Cada singleton tiene una función dedicada con patrón try/catch + fallback a `null`:

```ts
export async function getSiteConfig() {
  try { return await reader.singletons.siteConfig.read(); }
  catch { return null; }
}
```

Las funciones que contienen `fields.document` resuelven el rich text a HTML:

```ts
export async function getHomePage() {
  try {
    const data = await reader.singletons.homePage.read();
    if (!data) return null;
    return {
      ...data,
      manifestoBodyHtml: await resolveDocument(data.manifestoBody),
    };
  } catch { return null; }
}
```

### 7.3 Helpers para collections

Siguen el patrón: `list()` → `read(slug)` por cada slug → filtrar nulos → ordenar:

```ts
export async function getAllSesiones() {
  const slugs = await reader.collections.sesiones.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.sesiones.read(slug);
      if (!entry) return null;
      return { slug, entry: { ...entry, descriptionHtml: await resolveDocument(entry.description) } };
    })
  );
  return entries
    .filter(e => e !== null)
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
}
```

### 7.4 Resolución de rich text (`resolveDocument`)

Keystatic `fields.document` devuelve un array de nodos tipados (árbol de ProseMirror).
El helper `nodesToHtml()` los convierte a HTML simple:

```ts
function nodesToHtml(nodes: DocNode[]): string {
  return nodes.map((node) => {
    if (node.type === 'paragraph') {
      const inner = (node.children ?? []).map(c => c.text ?? '').join('');
      return inner.trim() ? `<p>${inner}</p>` : '';
    }
    if (node.type === 'heading') {
      const inner = (node.children ?? []).map(c => c.text ?? '').join('');
      return `<h3>${inner}</h3>`;
    }
    if (node.type === 'unordered-list' || node.type === 'ordered-list') {
      const tag = node.type === 'ordered-list' ? 'ol' : 'ul';
      const items = (node.children ?? []).map(li => {
        const text = (li.children ?? []).map(c => c.text ?? '').join('');
        return `<li>${text}</li>`;
      }).join('');
      return `<${tag}>${items}</${tag}>`;
    }
    return '';
  }).join('');
}
```

**Tipos de nodo soportados:** `paragraph`, `heading`, `unordered-list`, `ordered-list`.
**No soportados:** `bold`, `italic`, `link`, `blockquote`, `code`, `image` — estos se ignoran o
devuelven texto plano sin formato. Si necesitas texto enriquecido completo, deberías
extender `nodesToHtml()` o usar una librería de serialización de ProseMirror.

### 7.5 Todos los helpers exportados

| Función | Retorna | Notas |
|---|---|---|
| `getSiteConfig()` | `SiteConfig \| null` | |
| `getHomePage()` | `HomePage \| null` | + `manifestoBodyHtml` |
| `getAboutPage()` | `AboutPage \| null` | + `bioBodyHtml` |
| `getSessionesPage()` | `SessionesPage \| null` | |
| `getWorkshopPage()` | `WorkshopPage \| null` | + `introBodyHtml` |
| `getContactoPage()` | `ContactoPage \| null` | |
| `getAllSesiones()` | `Array<{ slug, entry }>` | Ordenado por `order` |
| `getSesion(slug)` | `Entry \| null` | + `descriptionHtml` |
| `getAllTestimonios(onlyFeatured?)` | `Array<{ slug, entry }>` | Ordenado por `order` |
| `getAllLegalPages()` | `Array<{ slug, entry }>` | + `contentHtml` |
| `getLegalPage(slug)` | `Entry \| null` | + `contentHtml` |

---

## 8. Patrón de consumo en páginas

Todas las páginas siguen el mismo patrón de defensa en profundidad:

```astro
---
import { getHomePage } from '../lib/keystatic';

const home = await getHomePage();

// Fallback: datos desde Keystatic, o valor hardcodeado si no existen
const heroTitle = home?.heroTitle ?? 'Título por defecto';
---

<Layout>
  <h1>{heroTitle}</h1>

  <!-- Rich text se renderiza como HTML crudo -->
  {home?.manifestoBodyHtml && (
    <div set:html={home.manifestoBodyHtml} />
  )}
</Layout>
```

Ventajas de este patrón:
- La página siempre renderiza (incluso si Keystatic no tiene datos o falla la API).
- Los defaults hardcodeados en la página actúan como backup y documentación visual.
- Los defaults en `keystatic.config.ts` (línea `defaultValue`) solo aplican en el admin UI; los de la página son el verdadero fallback en runtime.

**Nota sobre `set:html`:** Dado que el HTML se genera en el servidor desde contenido
controlado por el equipo editorial en Keystatic Cloud, `set:html` es seguro en este
contexto. No uses `set:html` con contenido de usuario no verificado.

---

## 9. Colores dinámicos desde Keystatic

`Layout.astro` lee los colores desde `getSiteConfig()` y los inyecta como variables CSS
usando `define:vars` de Astro:

```astro
---
const siteConfig = await getSiteConfig();
const colors = {
  background:   siteConfig?.colorBackground   ?? '#fdfbec',
  primaryDark:  siteConfig?.colorPrimaryDark  ?? '#3b2639',
  accentRed:    siteConfig?.colorAccentRed    ?? '#8c0703',
  accentPurple: siteConfig?.colorAccentPurple ?? '#6d4492',
  earth:        siteConfig?.colorEarth        ?? '#bb896b',
  sage:         siteConfig?.colorSage         ?? '#566443',
};
---

<style define:vars={{...colors}}>
  :root {
    --color-background:    var(--color-background);
    --color-primary-dark:  var(--color-primary-dark);
    --color-accent-red:    var(--color-accent-red);
    --color-accent-purple: var(--color-accent-purple);
    --color-earth:         var(--color-earth);
    --color-sage:          var(--color-sage);
  }
</style>
```

Esto permite cambiar los colores globales de la marca desde Keystatic sin tocar código.

---

## 10. Despliegue Docker

### 10.1 Dockerfile (3 stages)

```
Stage 1: oven/bun → bun install + bun run build
Stage 2: node:22-alpine → copia dist + node_modules + keystatic.config.ts → node server
Stage 3: caddy:alpine → copia todo + Caddyfile → start.sh
```

`keystatic.config.ts` se copia en **los 3 stages** porque:
1. **Builder:** Necesario para que `astro build` compile las rutas `/api/keystatic/*`.
2. **Node SSR:** Necesario en runtime para que `createReader(process.cwd(), config)` funcione.
3. **Caddy:** Se hereda del stage node-server vía `COPY --from=node-server`.

### 10.2 start.sh

```sh
#!/bin/sh
set -e
# 1. Inicia Astro SSR en puerto 4321
node /usr/src/app/dist/server/entry.mjs &
NODE_PID=$!
# 2. Espera readiness con healthcheck
# 3. Inicia Caddy en puerto 80 como reverse proxy
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
```

### 10.3 docker-compose.yml

Sin variables de entorno de Keystatic. Solo red externa `dokploy-network`.

---

## 11. Keystatic Cloud: qué gestiona y qué no

### Gestionado por Keystatic Cloud
- **Autenticación:** Login, contraseñas, tokens. No se requieren `KEYSTATIC_*` env vars.
- **Storage:** El contenido se almacena en los servidores de Keystatic Cloud.
- **Admin UI:** `cloud.keystatic.com` sirve la interfaz de administración.

### Sigue siendo responsabilidad del servidor
- **Endpoints API:** `/api/keystatic/*` debe estar disponible en producción (por eso `output: 'server'`).
- **Lectura de contenido:** `createReader()` se comunica con la API de Keystatic Cloud desde el servidor.
- **Configuración:** `keystatic.config.ts` define el schema y el project ID. Debe estar presente en el servidor.

### No se necesita
- **Directorio `.keystatic/`:** No existe localmente (Cloud no usa storage local).
- **Middleware de autenticación:** Eliminado (`src/middleware.ts` no existe).
- **Variables de entorno OAuth:** `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `GITHUB_TOKEN` — eliminadas.
- **GitHub token:** No necesario en Cloud mode.

---

## 12. Errores conocidos y watch-outs

### 12.1 `itemLabel` en arrays — API cambió en 0.5.x

```ts
// Correcto (0.5.x):
itemLabel: (props) => props.value || "Beneficio"

// Incorrecto (API anterior):
itemLabel: (props) => props.fields.title
```

En arrays simples (`fields.array(fields.text)`) usa `props.value`. En arrays de objetos
(`fields.array(fields.object({...}))`) usa `() => "Label fijo"` o accede a los campos
del objeto.

### 12.2 `fields.slug` — `.name` eliminado en 0.5.x

```ts
// Correcto (0.5.x):
title: fields.slug({ name: { label: "Nombre de la sesión" } })

// Incorrecto (API anterior):
title: fields.slug({ name: { label: "Nombre" }, slug: { ... } })
```

### 12.3 `fields.document` requiere resolución manual

Keystatic **no** devuelve HTML directamente de `fields.document`. Devuelve un array de
nodos de ProseMirror que debes convertir a HTML manualmente. Este proyecto usa
`resolveDocument()` en `src/lib/keystatic.ts`. Si necesitas formato rico (bold, italic,
links, imágenes), debes extender `nodesToHtml()`.

### 12.4 `tsconfig.json` no incluye `keystatic.config.ts`

El archivo `tsconfig.json` tiene `"include": ["src/**/*"]` por lo que `keystatic.config.ts`
(que está en la raíz) **no recibe type-checking de TypeScript**. Esto no causa errores
en runtime pero puede ocultar problemas de tipos en el schema.

### 12.5 `@astrojs/react` es obligatorio

Aunque el proyecto use Svelte para las islas interactivas, Keystatic requiere React
para su admin UI. No elimines `@astrojs/react` de las dependencias ni de las integraciones.

### 12.6 `output: 'server'` es obligatorio para Cloud

No puedes usar `output: 'static'` (SSG) con Keystatic Cloud porque los endpoints
`/api/keystatic/*` deben ejecutarse en el servidor. La única alternativa sería usar
Keystatic en modo GitHub (con OAuth) y SSG.

### 12.7 Discrepancias CHANGELOG vs código real

El `CHANGELOG.md` en la sección `[Unreleased]` contiene entradas que no reflejan el
estado actual del código:

| CHANGELOG dice | Código real |
|---|---|
| `output: static`, sin `@astrojs/node` | `output: 'server'` con `@astrojs/node` |
| `@keystatic/astro` eliminado | `@keystatic/astro` presente en astro.config.mjs |
| Caddyfile `file_server` estático | Caddyfile `reverse_proxy` a Node |
| `start.sh` eliminado | `start.sh` existe e inicia Node + Caddy |
| Dockerfile 2 stages (bun → caddy) | Dockerfile 3 stages (bun → node → caddy) |

Estas entradas parecen describir una migración a estático que no se llegó a completar
(o se revirtió). La configuración actual con SSR es funcional y correcta para
Keystatic Cloud. Si en el futuro se quiere migrar a SSG, habría que cambiar el storage
a `kind: "github"` y eliminar `@keystatic/astro`.

---

## 13. Paso a paso para reimplementar en otro proyecto

### Paso 1: Instalar dependencias

```bash
bun add @keystatic/core @keystatic/astro @astrojs/react @astrojs/node
```

### Paso 2: Crear proyecto en Keystatic Cloud

1. Ve a [keystatic.com](https://keystatic.com).
2. Crea un proyecto (ej: `miorganizacion/mi-proyecto`).
3. Crea un **project key** (se configura en `keystatic.config.ts`, no en .env).

### Paso 3: Crear `keystatic.config.ts` en la raíz

```ts
import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "miorganizacion/mi-proyecto", // ← Tu project ID
  },
  ui: {
    brand: {
      name: "Mi Proyecto CMS",
    },
  },
  singletons: {
    // Define tus singletons aquí
  },
  collections: {
    // Define tus colecciones aquí
  },
});
```

### Paso 4: Configurar `astro.config.mjs`

```js
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    // ... tus otras integraciones (svelte, sitemap, etc.)
    keystatic(),
  ],
});
```

### Paso 5: Crear `src/lib/keystatic.ts`

Copia la estructura de helpers de este proyecto:

```ts
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

// Helper resolveDocument (copia el de este proyecto)
async function resolveDocument(fn) { /* ... */ }

// Helpers por singleton
export async function getSiteConfig() {
  try { return await reader.singletons.siteConfig.read(); }
  catch { return null; }
}

// Helpers por collection
export async function getAllPosts() {
  try {
    const slugs = await reader.collections.posts.list();
    // ...
  } catch { return []; }
}
```

### Paso 6: Crear archivos de contenido iniciales

Crea los directorios y archivos YAML de contenido (singletons y collections) según
los paths definidos en `keystatic.config.ts`. Pueden estar vacíos o con datos iniciales.

### Paso 7: Consumir datos en las páginas

```astro
---
import { getSiteConfig } from '../lib/keystatic';

const site = await getSiteConfig();
const title = site?.siteTitle ?? 'Título por defecto';
---

<html>
  <head><title>{title}</title></head>
  <body><!-- ... --></body>
</html>
```

### Paso 8: Configurar Layout.astro (opcional — colores dinámicos)

Si quieres colores editables desde CMS, sigue el patrón de `define:vars` descrito en
la sección 9 de este documento.

### Paso 9: Configurar Dockerfile

Asegúrate de que `keystatic.config.ts` se copia en todos los stages del Dockerfile:

```dockerfile
FROM oven/bun:latest AS builder
COPY package.json bun.lock tsconfig.json astro.config.mjs keystatic.config.ts ./
# ...

FROM node:22-alpine AS node-server
COPY --from=builder /app/keystatic.config.ts .
# ...
```

### Paso 10: Probar en local

```bash
bun run dev
# Accede a /keystatic para verificar que el admin UI carga
```

El admin UI redirigirá a `cloud.keystatic.com` para la autenticación y edición.

### Paso 11: Desplegar

1. Asegúrate de que el servidor tiene el puerto 4321 (o el configurado) accesible.
2. Configura Caddy/Nginx como reverse proxy a `localhost:4321`.
3. Asegúrate de que `/api/keystatic/*` es accesible desde internet (lo necesita Keystatic Cloud).

### Paso 12 (opcional): Migrar desde GitHub autoalojado a Cloud

Si vienes de un setup con `kind: "github"`:

1. Cambia `storage.kind` a `"cloud"` y añade `cloud.project`.
2. Elimina las variables de entorno `KEYSTATIC_GITHUB_*`, `KEYSTATIC_SECRET`, `GITHUB_TOKEN`.
3. Elimina `src/middleware.ts` (Basic Auth ya no es necesario).
4. Mantén `@keystatic/astro` y `output: 'server'` — Cloud los necesita.
5. Si usabas `output: 'static'` con GitHub storage, deberás cambiar a `output: 'server'`.

---

## 14. Referencias

- [Keystatic Docs — Cloud mode](https://keystatic.com/docs/cloud)
- [Keystatic Docs — Astro integration](https://keystatic.com/docs/astro)
- [@keystatic/core reader API](https://keystatic.com/docs/reader-api)
- [Keystatic Config Reference](https://keystatic.com/docs/config)
