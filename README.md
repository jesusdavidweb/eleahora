# Eleahora - Rebranding 2026

![Website Preview](./docs/website-preview-mockup.png)

Bienvenido al repositorio oficial del proyecto web **Eleahora (Rebranding 2026)**. Este proyecto refleja la dualidad visual y emocional de la marca (**"Soy estructura y soy caos"**) mediante el uso de tecnologías modernas de desarrollo orientadas a un alto rendimiento, accesibilidad y una experiencia de usuario (UX) excepcional.

---

## 🛠 Stack Tecnológico

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-00599C?style=for-the-badge&logo=caddy&logoColor=white)

Este sitio está construido bajo el paradigma de **"Zero-JS by default"**, inyectando interactividad solo donde es estrictamente necesario a través de islas de hidratación.

- **[Astro](https://astro.build):** Motor de generación estática (SSG) de ultra alto rendimiento.
- **[Svelte](https://svelte.dev):** El framework de UI detrás de nuestras islas interactivas y componentes reactivos.
- **[GSAP](https://gsap.com/):** GreenSock para animaciones fluidas y experiencias de alto impacto visual.
- **[TypeScript](https://www.typescriptlang.org/):** Tipado estricto para un desarrollo escalable y robusto.
- **[Bun](https://bun.sh/):** El runtime, instalador y test runner más rápido de la actualidad.

---

## 🎨 Filosofía de Diseño

El diseño de Eleahora se basa en la integración de contrastes:
- **Estructura:** Representada por la tipografía `Pacaembu` y layouts organizados.
- **Caos:** Expresado a través de la tipografía `Sloop` (cursive), acentos orgánicos y animaciones dinámicas con GSAP.
- **Paleta de Colores:** Tonos tierra, salvia y purpúreos que evocan calma y autenticidad.

---

## 🗂 Estructura del Proyecto

```text
/
├── .agents/                 # Directrices y skills para Agentes IA
├── docs/                    # Documentación de marca y previsualizaciones
├── public/                  # Assets estáticos (Images, Fonts, Favicons)
├── src/
│   ├── animations/          # Configuración global de GSAP
│   ├── components/ 
│   │   ├── astro/           # Componentes Zero-JS (Layout, Cards)
│   │   └── svelte/          # Islas interactivas e hidratadas
│   ├── content/             # Contenido estructurado (Markdown) con Type-safety
│   ├── layouts/             # Plantillas base y SEO
│   ├── pages/               # Rutas del sitio (/servicios, /about)
│   ├── styles/              # Design System (Tokens, CSS Variables)
│   └── types/               # Interfaces y tipos TypeScript
├── Dockerfile               # Configuración multi-stage optimizada
├── Caddyfile                # Servidor ligero con compresión zstd/gzip
└── agents.md                # El manifiesto de reglas para desarrollo
```

---

## 🧞 Comandos Locales (Bun)

Asegúrate de tener [Bun](https://bun.sh/) instalado.

| Comando                | Acción                                                                 |
| :--------------------- | :--------------------------------------------------------------------- |
| `bun install`          | Instala o actualiza todas las dependencias del `package.json`          |
| `bun run dev`          | Ejecuta el entorno de desarrollo local                                 |
| `bun run build`        | Compila la versión de producción optimizada (`dist/`)                  |
| `bun run check`        | Ejecuta validaciones de tipos y salud del proyecto                     |
| `bun run preview`      | Previsualiza el build de producción localmente                         |

---

## 🐳 Despliegue y Dokploy

El proyecto está diseñado para ser desplegado instantáneamente en **Dokploy**:
1. **Build Stage:** Usa `oven/bun` para procesar dependencias y generar el build estático.
2. **Runtime Stage:** Servidor `caddy:alpine` ultra eficiente para servir archivos estáticos con pre-compresión y headers de seguridad configurados.

---

## 📜 Contribución y Changelog

Cualquier cambio debe adherirse a las directrices de `agents.md`. Los avances y correcciones deben documentarse en el archivo [`CHANGELOG.md`](CHANGELOG.md) siguiendo las normas de *Keep a Changelog*.
