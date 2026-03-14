# Directrices del Proyecto - Eleahora 2026

Este archivo `agents.md` contiene las reglas, arquitectura y directrices tecnológicas para el desarrollo del proyecto web **Eleahora** (Rebranding 2026). Todos los agentes de IA y desarrolladores deben seguir estrictamente estas normativas.

## 1. Stack Tecnológico

El proyecto está construido usando las siguientes tecnologías modernas y eficientes:

- **Framework Principal:** Astro (para generación de sitios estáticos increíblemente rápidos y manejo de contenido).
- **Framework de UI:** Svelte (utilizado para islas interactivas y componentes reactivos dentro de Astro).
- **Animaciones:** GSAP (GreenSock Animation Platform) para experiencias de alto impacto y micro-interacciones.
- **Lenguaje:** TypeScript (estricto) para tipado seguro en toda la aplicación (Astro y Svelte).
- **Gestor de Paquetes y Runtime:** Bun (reemplazando a npm/yarn/node para mayor velocidad de instalación y ejecución).
- **Contenedores y Despliegue:** Docker, Caddyfile (servidor web proxy inverso), preparado para despliegue en Dokploy.

## 2. Identidad y Diseño de Marca

El desarrollo del frontend debe adherirse al concepto visual dual de la marca ("Soy estructura y soy caos") y comunicar empatía, amor y autenticidad:

### 2.1 Colores y Variables CSS
Deben configurarse en la raíz del proyecto globalmente:
```css
:root {
  --color-background: #fdfbec; /* Beige/Crema Claro */
  --color-primary-dark: #3b2639; /* Morado Oscuro/Berenjena */
  --color-accent-red: #8c0703; /* Rojo Arcilla/Vino */
  --color-accent-purple: #6d4492; /* Púrpura Místico */
  --color-earth: #bb896b; /* Tierra/Cobre */
  --color-sage: #566443; /* Verde Oliva/Salvia */
}
```

### 2.2 Tipografía
- **Primaria (Títulos/Cimientos):** `Pacaembu` (sans-serif).
- **Secundaria (Acentos/Firmas):** `Sloop` (cursive).
- **Base (Párrafos/Menús):** `Inter Tight` (sans-serif).
Asegurar que las fuentes estén optimizadas y cargadas localmente si es posible para mejorar el rendimiento.

## 3. Arquitectura del Proyecto (Astro + Svelte + GSAP)

La estructura esperada del proyecto es:
- `src/pages/`: Páginas generadas estáticamente (SSG). Principalmente `index.astro`, `about.astro`, `services.astro`, `contacto.astro`.
- `src/components/astro/`: Componentes estáticos y de layout que no requieren JS en el cliente (Cards, Headers estructurales, Footers).
- `src/components/svelte/`: Islas interactivas creadas con Svelte. Se usarán directivas de hidratación (`client:load`, `client:visible`, `client:idle`) solo donde sea estrictamente necesario.
- `src/layouts/`: Plantillas principales (Layout.astro), manejando el SEO, meta tags y la importación de tipografías/estilos globales.
- `src/content/`: Uso de *Astro Content Collections* para tipado estricto de cualquier contenido manejado en Markdown.
- `src/animations/`: Contendrá los archivos de configuración y utilidades de GSAP (`gsap-config.ts`, `scroll-trigger-utils.ts`).

**Regla de Hidratación:** Por defecto enviar HTML puro (zero JS). Usar `client:*` solo para interactividad indispensable (ej. formularios de contacto interactivos, modales) o animaciones de GSAP de alto impacto.

### 3.1 Directrices GSAP
- **Performance:** Priorizar el uso de `will-change` en CSS y animar propiedades optimizadas (transform, opacity).
- **Implementación:** Usar exclusivamente dentro de islas Svelte (`client:load`, `client:idle`). Nunca en componentes estáticos.
- **Ciclo de Vida:** Obligatorio implementar limpieza de animaciones en el `onDestroy` de Svelte para evitar fugas de memoria.
- **Scroll:** Utilizar `ScrollTrigger` para animaciones basadas en scroll, asegurando el uso de `lazy loading` para los disparadores.

## 4. Requisitos de Contenido (Arquitectura Web)

Las siguientes vistas son clave para la web:
1. **Inicio (`/`):** Hero section, Manifiesto, Resumen de Servicios, Beneficios del Mindfulness y llamada a la acción.
2. **Sobre Mí (`/about` o `/quien-soy`):** Historia personal y recorrido profesional hacia el Mindfulness.
3. **Servicios (`/sesiones`):** Integración de los 5 servicios principales de terapia y workshops corporativos.
4. **Contacto (`/contacto`):** Formulario de contacto y enlaces a WhatsApp (y futuro sistema de Booking online).

## 5. SEO y Rendimiento

El posicionamiento orgánico es crucial:
- Generar Meta Descriptions dinámicos o estáticos para cada ruta, priorizando keywords de Terapia Transpersonal y Meditación.
- Uso de etiquetas Open Graph (`og:image`, `og:title`) para redes sociales.
- Estructura semántica de encabezados H1-H6 estricta.
- Accesibilidad optimizada (ARIA tags donde aplique).

## 6. Configuración de Entorno y Despliegue (Docker + Dokploy + Caddy)

### 6.1 Dockerfile
El `Dockerfile` deberá usar `oven/bun` oficial como imagen base en un flujo multi-stage:
- Install: `bun install`.
- Build: `bun run build`.
- Servidor: Imagen `caddy:alpine` sirviendo la carpeta `dist/`.

### 6.2 Caddyfile Base
```caddyfile
:80 {
    root * /usr/src/app/dist
    encode gzip zstd
    file_server {
        precompressed gzip zstd
    }
    try_files {path} {path}/ /index.html
    header {
        Strict-Transport-Security max-age=31536000;
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
    }
    @assets path /assets/*
    header @assets Cache-Control "public, max-age=31536000, immutable"
}
```

## 7. Directrices de Desarrollo para Agentes

1. **Prioridad TypeScript:** Antes de codificar lógica compleja, definir correctamente las interfaces en `src/types/`.
2. **Componentes Funcionales:** Crear componentes que dependan de propiedades (Props) pasadas por el padre. No mutar estado local innecesariamente.
3. **Validación Pre-Commits:** Comprobar siempre que `bun run check` y `bun run build` pasen sin errores tipográficos o de dependencias.
4. **Estilo del Código:** Código limpio, mantenible, y fiel a los principios estéticos de Eleahora: menos distracción, más presencia.
