# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Integración de Keystatic Admin UI en `/keystatic` como CMS headless con storage GitHub.
- Middleware de autenticación Basic Auth para proteger el panel de administración (`src/middleware.ts`).
- Script `start.sh` para ejecutar Astro SSR y Caddy como reverse proxy en producción.
- Archivo `.env.example` con documentación de variables de entorno requeridas (`KEYSTATIC_USER`, `KEYSTATIC_PASSWORD`, `GITHUB_TOKEN`, `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`).

### Changed
- Migrado `astro.config.mjs` a `output: static` con adapter Node y modo standalone para habilitar SSR en rutas de Keystatic.
- Dockerfile actualizado a multi-etapa con `node:22-alpine` + Caddy para servir Astro SSR con reverse proxy.
- Caddyfile convertido de servidor de archivos estáticos a proxy inverso hacia Astro (puerto 4321).
- Renombrado `keystatic.config.tsx` a `keystatic.config.ts` para compatibilidad con `@keystatic/astro`.
- Dependencias actualizadas: añadidos `@keystatic/astro`, `@astrojs/react`, `@astrojs/node`.

### Fixed
- Corregida URL de callback OAuth de Keystatic que se generaba como `localhost` en producción. Se añadieron headers `X-Forwarded-*` en el `reverse_proxy` de Caddy y se reescribió `context.request` (el objeto `Request` completo) en el middleware de Astro para forzar `https://eleahora.com` como dominio público en todas las rutas de API.
- Dockerfile: copiadas `node_modules`, `package.json` y `keystatic.config.ts` al stage de runtime para resolver `ERR_MODULE_NOT_FOUND` en el servidor Astro SSR.
- start.sh: añadida verificación de salud del proceso Astro (`kill -0`) y `set -e` para evitar que Caddy quede huérfano cuando Node falla.

### Fixed
- Plantilla inicial base generada.
- Archivo de directrices arquitectónicas para el rebranding `agents.md`.
- Habilitación de framework `Astro`, con `Svelte` para islas y animaciones de `GSAP`.
- Archivos de configuración para tipos e imports (TypeScript vía `tsconfig.json`).
- Documentos de contenedores y despliegue usando `Dockerfile` (Oven Bun) y proxy inverso estático en `Caddyfile`.
- Configuración de exclusiones estandarizada en `.gitignore`.
- Archivo descriptivo central del repositorio `README.md`.
- Este archivo `CHANGELOG.md` para control de cambios a lo largo del proceso.
- Nueva 'skill' (`changelog-management`) para el control y actualización programada de este CHANGELOG.
- Nueva página `/gracias` como confirmación post-envío para medición de conversiones del formulario de contacto.
- Nuevas utilidades de animación en `src/animations/` (`gsap-config.ts` y `scroll-trigger-utils.ts`).
- Nuevas islas Svelte para experiencias GSAP de alto impacto en contacto y gracias (`ContactExperience.svelte` y `ThanksExperience.svelte`).
- Nueva página de servicios para empresas: `/workshop-empresas`.
- Activos oficiales de marca: favicon, logo principal y logo de pie de página.
- Créditos de soporte y desarrollo en el pie de página.
- Enlaces de reserva directa (`https://cal.eu/eleahora/sesiones`) en todos los CTAs de sesiones.
 - Añadido modal interactivo `MeditationModal.svelte` (isla Svelte, `client:idle`) para reproducir meditaciones de Insight Timer con animación GSAP y carga diferida del iframe.
 - Añadida carga diferida del iframe de Insight Timer para optimizar la carga inicial (se inserta solo al abrir el modal).

### Added
- Añadidas nuevas imágenes de alta resolución en `public/images/` (`about-desktop-1.webp`, `about-desktop-2.webp`, `sesion_maria_corallo_neima_pidal_161-tiny.webp`).

### Changed
- Rediseñada y completada la página `/contacto` con formulario funcional, panel de proceso, CTAs de agenda/WhatsApp y estructura de conversión.
- Extendida la plantilla `Layout.astro` para soportar `noindex` en rutas transaccionales como `/gracias`.
- Tipado base actualizado en `src/types/index.ts` para opciones de servicios del formulario de contacto.
- Rediseño del Header del sitio para una estética más moderna y fluida.
- Actualización de la página "Sobre Mí" con imágenes locales de alta calidad y diseño responsivo móvil-primero.
- Mejora de la navegación principal mediante la eliminación del enlace redundante "Manifiesto".
- Optimizaciones en las animaciones de la sección "Servicios" para un rendimiento más fluido.
- Reestructuración de las secciones "Ciencia & Espíritu" y "Manifiesto" en la página de inicio con activos locales.
- Refinado el CTA del menú móvil para mejorar el compromiso del usuario.
- Estandarización tipográfica en la página de workshops (fuente Pacaembu).
 - El CTA "Escuchar meditación gratuita" en el pie de página ahora abre un modal embebido en lugar de redirigir a Insight Timer; se cambió a botón semántico y se mejoró la accesibilidad del flujo.

### Changed
- Actualizado `public/llms.txt` con entradas y metadatos recientes.
- Modificaciones en `src/components/astro/Footer.astro` (ajustes en créditos, enlaces y orden de elementos).
- Ajustes en `src/components/astro/Header.astro` para mejorar navegación móvil y el CTA principal.
- Actualizada la página `src/pages/404.astro` para mejorar la experiencia de error y accesibilidad.
- Actualizaciones de contenido y assets en `src/pages/about.astro`.
- Mejoras en validación y accesibilidad del formulario en `src/pages/contacto.astro`.
- Ajustes de copia y tracking en `src/pages/gracias.astro` para métricas de conversión.
- Cambios estructurales en `src/pages/index.astro` (hero, manifiesto y carga de assets locales).
- Actualizaciones en `src/pages/sesiones.astro` (detalles de servicios y CTA de reserva).
- Correcciones y refinamientos en `src/pages/workshop-empresas.astro` (copy y layout de beneficios).
- Actualizaciones en `src/styles/global.css` (variables CSS, responsive y mejoras de rendimiento).

### Fixed
- Resolución de errores de enrutamiento 503 y 404 en el entorno de producción.
- Corregida estructura de frontmatter en `workshop-empresas.astro` (falta delimitador `---`).
- Corregido acceso a campos slug en Keystatic (API cambiada en 0.5.x: `.name` eliminado).
- Corregido API de `itemLabel` en `keystatic.config.tsx` para arrays y objetos.
- Corregidos tipos TypeScript implícitos en callbacks de map (parámetros `b`, `f`, `s`, `t`, `i`, `p`).
- Reinstalación de dependencias (`bun.lock` actualizado).
- Corrección de problemas en el pipeline de despliegue relacionados con la configuración de Docker Composer.
- Reparación de regresiones visuales en la página de Contacto (tipografía, órbitas y degradados).
 - Corregido guard de SSR en `MeditationModal.svelte` para evitar acceso a `document` durante el prerender y prevenir errores en la generación estática.

### Removed
- Eliminada carpeta errónea / plantilla innecesaria `civil-corot` que no aplicaba a la raíz del repositorio.
- Limitación temporal a cero dependencias sobrantes.
- Se ha eliminado la sección de testimonios ("Sección pendiente de testimonios") de la página de inicio (`index.astro`) y sus estilos asociados.
