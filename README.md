# Eleahora - Rebranding 2026

Bienvenido al repositorio oficial del proyecto web **Eleahora (Rebranding 2026)**. Este proyecto refleja la dualidad visual y emocional de la marca ("Soy estructura y soy caos") mediante el uso de tecnologías modernas de desarrollo orientadas a un alto rendimiento, accesibilidad y una experiencia de usuario (UX) excepcional.

## 🚀 Tecnologías Core

Este sitio está construido usando un concepto de "Zero-JS by default" pero manteniendo interactividad pura donde se requiera:
- **[Astro](https://astro.build):** Framework base estático y rápido.
- **[Svelte](https://svelte.dev):** Usado para islas interactivas (UI y componentes reactivos).
- **[GSAP](https://gsap.com/):** Para animaciones complejas y experienciales (implementadas siempre dentro de Svelte).
- **[TypeScript](https://www.typescriptlang.org/):** Tipado estricto en cada componente.
- **[Bun](https://bun.sh/):** Runtime y Node Package Manager (súper veloz).

## 🗂 Estructura del Proyecto

El código fuente sigue las directrices oficiales del documento de arquitectura (`agents.md`):

```text
/
├── .agents/                 # Guidelines para Agentes IA (Skills)
├── docs/                    # Documentación del proyeto y marca
├── src/
│   ├── animations/          # Utilidades para GSAP y animaciones globlales
│   ├── components/ 
│   │   ├── astro/           # Componentes estáticos y de layout puros
│   │   └── svelte/          # Islas interactivas e hidratadas (`client:*`)
│   ├── content/             # Colecciones Markdown estáticas usando type-safety
│   ├── layouts/             # Contenedores de vistas globales y directrices SEO
│   ├── pages/               # Vistas estáticas (/about, /servicios, etc)
│   ├── styles/              # Variables CSS crudas y bases tipográficas
│   └── types/               # Definiciones Typescript (Interfaces, Types)
├── public/                  # Fuentes, iconos, metadatos, favicon
├── Dockerfile               # Contenedor dual con Alpine-Caddy (Oven Bun)
├── Caddyfile                # Archivo proxy para despliegue
└── agents.md                # El manifiesto principal y reglas para los LLMs/Agentes
```

## 🧞 Comandos Locales (Bun)

Asegúrate de tener [Bun](https://bun.sh/) instalado.

| Comando                | Acción                                                                 |
| :--------------------- | :--------------------------------------------------------------------- |
| `bun install`          | Instala o actualiza todas las dependencias del `package.json`          |
| `bun run dev`          | Ejecuta Astro en entorno de desarrollo local                           |
| `bun run build`        | Compila la página estática final para producción (`dist/`)             |
| `bun run check`        | Chequea directrices de tipos estrictos con TypeScript y Astro config   |
| `bun run preview`      | Previsualiza el contenido productivo antes de subirlo usando servidor  |

## 🐳 Contenedores y Dokploy

El proyecto está preparado para el despliegue con un entorno `Dokploy` usando el `Dockerfile` y `Caddyfile` incorporados en el repositorio:
1. Utiliza `oven/bun` para resolver caché y node_modules y copilar `/dist`.
2. Emplea un proxy inverso y webserver ultra ligero usando `caddy:alpine` sirviendo de forma estática la carpeta generada con soporte TLS automatizado.

## 📜 Reglas, Directrices y Changelog

Cualquier colaborador (Humano o Agente) deberá leer y adherirse a los estatutos definidos en `agents.md`. También deberán registrar los cambios lógicos del proyecto mediante el documento actualizado [`CHANGELOG.md`](CHANGELOG.md).
