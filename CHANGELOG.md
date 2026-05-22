# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **workshop-empresas.astro**: nueva sección de testimonios dinámicos desde Keystatic.
- **workshop-empresas.astro**: nueva sección de cita de cierre con parámetros desde CMS (`closingQuote`, `closingQuoteAuthor`).
- **keystatic.config.ts**: nuevos campos `closingQuote`, `closingQuoteAuthor`, `testimonialsTitle` en workshop.

### Changed
- **workshop-empresas.astro**: CTA final rediseñado con botón "Agendar llamada de descubrimiento" (enlace a calLink) y email "Escríbeme un correo" (mailto).
- **keystatic.config.ts / workshop.yaml**: nuevos campos editables `ctaEmailLabel` y `ctaEmailAddress`; actualizados defaults de `ctaTitle` y `ctaButtonText`.
- **contacto.yaml / contacto.astro**: eliminado heroSubtitle "Hablemos. / Estoy aquí para escucharte..." y processEyebrow "Qué pasa después".
- **keystatic.config.ts**: defaults de `processPanelAriaLabel` actualizados a "Proceso de contacto", `processEyebrow` a vacío.
- **workshop-empresas.astro**: rediseñado hero-facts de lista flex a CSS grid; actualizados textos CTA ("Estoy aquí para ti." / "Hablemos para llevar esta experiencia a tu organización.").
- **URLs de booking**: migradas todas las sesiones de Zoom Scheduler a `cal.com/eleahora/*`.
- **Descripciones de sesiones**: enriquecidas con párrafos adicionales en las 6 sesiones (acompañamiento, terapia angelical, perlas, meditación, energética).
- **index.astro**: añadido segundo párrafo (`mindfulnessBody2`) en sección de Mindfulness. Actualizados textos de benefits y lead.
- **sesiones-page.yaml**: actualizado `heroTitle` a "¿con cuál te gustaría empezar?" y limpiado `ctaBody`.
- **sesiones.astro**: CTA final migrado de `<p>` a `<h2>` y eliminada referencia a `ctaBody`.
- **about.md**: reordenado contenido del manifiesto y simplificado closing.
- **workshop-empresas.astro**: descripción del workshop convertida a multi-párrafo con `split('\n\n')`.

### Removed
- **workshop-empresas.astro**: eliminada sección completa de "Formatos" (HTML, CSS, datos y campos de Keystatic).
- **keystatic.config.ts**: eliminados campos `formats*` (formatsEyebrow, formatsTitle, formats array).

### Fixed
- **Testimonios**: añadido `white-space: pre-line` en `.testimonial-text` para soporte de testimonios multi-párrafo.
- **about.astro**: corregida posición vertical de imagen de fondo en hero desktop (`object-position` ajustado a 70%).
- **Lectura de contenido Keystatic en SSR**: Agregado `createGitHubReader` como reader primario (requiere `GITHUB_PAT`) con fallback a `createReader` local. Copiado `src/content/` al runtime del contenedor Docker para que el reader local encuentre los archivos YAML y el frontend refleje los cambios del CMS.
- **Dockerfile**: Añadida copia del directorio `src/` al stage runtime para disponibilidad de contenido YAML.
- **Testimonios**: corregidos nombres (slug → nombre propio) y eliminados puntos finales en citas.
- **about.astro**: corregida ortografía ("tí" → "ti") y ajuste responsive de imagen hero.
- **index.astro**: corregido enlace de Workshop a ruta `/workshop-empresas`.

### Added
- Documentación de variable de entorno `GITHUB_PAT` en `.env.example` para uso de GitHub Reader.
- **`src/content/singletons/global-content.yaml`**: nuevo archivo de contenido global centralizado para header, footer, navegación, legal, 404, gracias, modal de meditación y créditos.
- **keystatic.config.ts**: configurado singleton `globalContent` con campos editoriales completos, y nuevo campo `mindfulnessBody2`.
- **`getGlobalContent()`**: nueva función en `src/lib/keystatic.ts` para leer contenido global desde el CMS.
- **workshop.yaml**: nuevo campo `heroImage2` para galería dual en hero del workshop.
- Nuevo asset OG: `public/images/OG-images-eleahora-02.png`.
- **about.yaml / contacto.yaml / home.yaml / sesiones-page.yaml**: campos extendidos para SEO, alt text, subtítulos, listas de servicios, opciones de formulario y CTAs.
- **workshop.yaml**: nuevos campos `heroSecondaryCta*`, `guideEyebrow`, `workshopEyebrow`, `experienceEyebrow`, `benefitsEyebrow`, `ctaEyebrow`, `whatsappCtaText`, `facts`, SEO completo.

### Changed
- Limpieza de comentarios en `.gitignore`.
- **OG Image**: actualizada imagen OG por defecto a PNG en Layout, contacto y sesiones.
- **Todas las páginas**: migradas a consumo de `getGlobalContent()` para textos, enlaces, SEO, ARIA labels y CTAs desde el CMS.
- **Header.astro**: navegación, CTAs, logo y menú móvil ahora gestionados desde `globalContent`.
- **Footer.astro**: estructura completa migrada a contenido centralizado — enlaces de exploración, contacto, legal, créditos y copyright desde `globalContent`. Estilos CSS migrados a bloque `<style>` inline.
- **contacto.astro**: todos los textos, labels, placeholders, opciones de servicio, enlaces de contacto y SEO parametrizados desde Keystatic. Hero image dinámica vía CSS `define:vars`.
- **gracias.astro**: titular personalizado con nombre, CTAs, enlaces y SEO desde `globalContent`.
- **404.astro**: todos los textos, CTAs y enlaces gestionados desde `globalContent`.
- **legal/[slug].astro**: prefijo "Última actualización" y texto "Contenido no disponible" desde `globalContent`.
- **about.astro**: hero subtitle, alt texts, lista de servicios, manifesto y closing text desde CMS. SEO dinámico.
- **sesiones.astro**: hero image alt, ctaBody, ctaLink, ctaButtonText y SEO desde CMS.
- **workshop-empresas.astro**: eyebrows, secondary CTAs, facts, whatsappCtaText y SEO desde CMS.
- **index.astro**: service cards desde `home.yaml` con enlace dinámico a Insight Timer, testimonials sin fallback hardcodeado, alt texts desde CMS. SEO dinámico.
- **MeditationModal.svelte**: título, textos y URL embed desde `globalContent`.
- **workshop-empresas.astro**: rediseño completo con secciones hero (galería dual), guía, experiencia paso a paso, beneficios con tarjetas de color y CTA inteligente.
- **docs/keystatic-implementation.md**: documentación actualizada con `globalContent` y nuevos campos.
- **workshop-empresas**: `experienceItems` migrado de array de strings a objetos con `title` y `description`. Actualizado esquema Keystatic, contenido YAML y renderizado en página para mostrar descripciones de cada paso de la experiencia.
- **testimonios**: actualizados textos de Flora Bautian, Marta Leciñena y Andrea Trocel con nuevas citas. Corregido nombre "Marta Leciñena" (añadida ñ).
- **about.yaml**: limpiados `heroSubtitle` y `ctaBody` (vaciados).

## [0.3.0] - 2026-05-13

### Changed
- **Migración de Caddy a Traefik (Dokploy)**: Eliminado Caddy del contenedor. Traefik de Dokploy actúa como proxy inverso.
- **Dockerfile**: Simplificado a 2 stages (bun builder → node:22-alpine runtime). Eliminado stage de Caddy.
- **AGENTS.md**: Actualizada sección de despliegue para reflejar Traefik de Dokploy.
- **README.md**: Eliminado badge de Caddy y actualizada documentación de despliegue.

### Removed
- **Caddyfile**: Eliminado (proxy inverso gestionado por Traefik de Dokploy).
- **start.sh**: Eliminado (Node se ejecuta directamente via CMD).

### Fixed
- **Error 404**: Corregido causado por `node: not found` en imagen caddy:alpine.

## [0.2.1] - 2026-05-12

### Fixed
- **start.sh**: Reescrito con loop `while` nativo (compatible BusyBox/ash), logging con prefijo `[start.sh]`, `trap` para cleanup de procesos, y verificación del entry point antes de ejecutar Node.
- **keystatic.ts**: Reader inicializado de forma lazy con `import()` dinámico. Si Keystatic Cloud no está disponible, el reader retorna `null` y las páginas usan fallbacks sin crashear el servidor.
- Corregido error `require is not defined` en contexto ESM durante prerender de páginas legales.
- Añadido type annotation explícito en `contacto.astro` para resolver error TS7006.

## [0.2.0] - 2026-05-12

### Added
- **Integración completa de Keystatic Cloud** como CMS headless para gestión de contenido.
  - Archivo de configuración `keystatic.config.ts` con 6 singletons y 3 collections.
  - Capa de lectura `src/lib/keystatic.ts` con `createReader()` y 11 funciones helper.
  - Soporte para rich text (`fields.document`) con conversión ProseMirror → HTML.
- **Contenido YAML estructurado** en `src/content/`:
  - 6 singletons: site-config, home, about, sesiones-page, workshop, contacto.
  - 5 sesiones: acompañamiento terapéutico, terapia angelical, perlas de eleahora, clase de meditación, sesión energética.
  - 3 testimonios: Flora Bautian, Marta Leciñena, Andrea Trocel.
  - 3 páginas legales: aviso legal, política de privacidad, política de cookies.
- **Página dinámica** `/legal/[slug].astro` para renderizado de páginas legales desde Keystatic.
- **Script `start.sh`** para inicio de servidor SSR Node + Caddy reverse proxy en Docker.
- Dependencias: `@keystatic/core`, `@keystatic/astro`, `@astrojs/react`, `@astrojs/node`, `react`, `react-dom`.

### Changed
- **Migración de SSG a SSR**: `output: 'server'` con adapter `@astrojs/node` modo `standalone`.
- **Layout.astro**: consume `getSiteConfig()` para SEO, OG tags y colores CSS dinámicos vía `define:vars`.
- **Header.astro**: URL de booking centralizada desde Keystatic.
- **Footer.astro**: URLs de redes sociales y WhatsApp centralizadas desde Keystatic.
- **index.astro**: consume `getHomePage()`, `getSiteConfig()`, `getAllTestimonios()` con fallbacks.
- **about.astro**: consume `getAboutPage()` con fallbacks para bio, recorrido y CTAs.
- **sesiones.astro**: consume `getSessionesPage()`, `getAllSesiones()` con fallback para 5 servicios.
- **contacto.astro**: consume `getContactoPage()`, `getSiteConfig()`, opciones de servicio desde Keystatic.
- **workshop-empresas.astro**: consume `getWorkshopPage()` con fallbacks para experiencia, beneficios y testimonios.
- **Dockerfile**: migrado a 3 stages (bun builder → node SSR → caddy reverse proxy).
- **Caddyfile**: cambiado de `file_server` estático a `reverse_proxy localhost:4321`.
- **astro.config.mjs**: añadidas integraciones `react()` y `keystatic()`.
- **tsconfig.json**: incluye `keystatic.config.ts` en el type-checking.
- Actualizado `astro` a v6.3.1 para compatibilidad con `@astrojs/node`.

### Fixed
- Compatibilidad entre `@astrojs/node@10.1.0` y `astro@6.0.4` (actualizado a v6.3.1).
- Warning de `getStaticPaths()` en páginas legales con `export const prerender = true`.

### Added
- Documentación completa de la integración de Keystatic Cloud como referencia para reimplementación futura (`docs/keystatic-implementation.md`).
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
- Corrección de problemas en el pipeline de despliegue relacionados con la configuración de Docker Composer.
- Reparación de regresiones visuales en la página de Contacto (tipografía, órbitas y degradados).
 - Corregido guard de SSR en `MeditationModal.svelte` para evitar acceso a `document` durante el prerender y prevenir errores en la generación estática.

### Removed
- Eliminada carpeta errónea / plantilla innecesaria `civil-corot` que no aplicaba a la raíz del repositorio.
- Limitación temporal a cero dependencias sobrantes.
- Se ha eliminado la sección de testimonios ("Sección pendiente de testimonios") de la página de inicio (`index.astro`) y sus estilos asociados.
