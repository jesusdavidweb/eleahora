# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Assets**: normalizadas rutas de imágenes eliminando caracteres especiales (tildes/acentos) en nombres de archivo para evitar errores de encoding en producción.
- **about.astro / landing/pienso-luego-medito.astro**: actualizados fallbacks de imagen a paths normalizados (`profileImage.webp`, `eleahoraImage.webp`, `recorridoImage.webp`, `profileImageDesktop.webp`).
- **about.yaml / pienso-luego-medito-landing.yaml**: rutas de imagen actualizadas a los nuevos assets normalizados.
- **design-system.astro**: actualizada referencia a imagen `Sobre mi`.

### Added
- **API de contacto POST**: nuevo endpoint `src/pages/api/contacto.ts` para envío de emails mediante Resend con validación de campos y escape de HTML.
- **Dependencia `resend`**: añadida para envío de emails desde el formulario de contacto.
- **Documentación de `RESEND_API_KEY`** en `.env.example` para configuración del envío de emails.
- **CookieConsent.svelte**: nueva isla Svelte con banner de cookies RGPD/LSSI, botones "Aceptar todas" / "Solo necesarias", consentimiento almacenado en cookie `cookieconsent` (1 año).
- **Footer.astro**: nueva columna "Legal" con enlaces a aviso legal, política de privacidad y política de cookies.
- **Layout.astro**: integrado `<CookieConsent client:load />` para carga del banner en todas las páginas.
- **keystatic.ts**: nuevas funciones `resolveTextContent` y `readLegalContentYaml` como fallback de lectura directa del YAML cuando el reader de Keystatic no devuelve string.
- **legal/[slug].astro**: mapeo `pageTitles` para títulos con guiones (aviso-legal → Aviso Legal, etc.) y defensa de tipo para `contentHtml`.
- **docs/keystatic-coverage-audit.md**: matriz de cobertura editorial Keystatic para páginas públicas, header/footer, legales y exclusiones visuales/técnicas.
- **keystatic.config.ts / singletons YAML**: nuevos campos editoriales para labels, alt text y aria labels visibles en workshop y landing "Pienso, luego medito" sin alterar estructura visual.
- **design-system.astro**: nueva página pública de documentación visual del design system con tokens de color, tipografía, espaciado, componentes, layouts, assets y principios de movimiento.
- **DesignSystemExperience.svelte**: isla Svelte con animaciones GSAP (reveal, parallax, magnetic hover, token spotlight interactivo) para la página de design system.
- **PiensoLuegoMeditoLandingExperience.svelte**: isla Svelte con animaciones GSAP para la landing page del workshop.
- **src/pages/landing/**: nueva estructura de landing page para "Pienso, luego medito".
- **src/content/singletons/pienso-luego-medito-landing.yaml**: contenido Keystatic para la landing page del workshop.
- **keystatic.config.ts / src/lib/keystatic.ts**: nuevos campos y configuraciones para soportar design system, landing page y contenido ampliado de workshop.
- **public/images/textos/**: nuevos assets de tipografía de marca para labels visuales (Bienvenido, Manifiesto, Ciencia y Espíritu, Mi recorrido, Así nació Eleahora, Siguiente paso, Soy la voz que te recuerda que estás aquí).
- **workshop-empresas.astro**: nueva sección de testimonios rediseñada con grid asimétrico, comillas decorativas en Sloop, colores por persona (vinotinto/verde/morado) y hover con elevación.
- **keystatic.config.ts**: nuevo campo `role` en colección testimonios, nuevo campo `testimonialsEyebrow` en workshopPage.
- **workshop-empresas.astro**: sección de testimonios migrada a campo `testimonials` propio del workshopPage en Keystatic (con `name`, `role`, `quote`), colores asignados secuencialmente, fallback con 3 testimonios específicos de empresa.
- **workshop-empresas.astro**: sección de cita de cierre (`closingQuote`, `closingQuoteAuthor`) desde CMS.
- **API de contacto**: nuevo handler GET con redirect a `/contacto` para evitar errores de ruta.
- **API de contacto**: logging estructurado con prefijo `[contacto-api]` para depuración en producción.

### Changed
- **URL de agendamiento**: migrado enlace de `cal.com/eleahora/*` a `scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora` en `site-config.yaml`, `sesiones.astro`, `pienso-luego-medito.astro` y `llms.txt`.
- **Páginas legales (3)**: contenido ampliado a versiones finales profesionales — aviso-legal (9 secciones con disclaimer profesional), política-de-privacidad (15 secciones con tabla de encargados, derechos detallados, menores, secreto profesional), política-de-cookies (9 secciones con tabla de cookies, instrucciones por navegador, base legal LSSI/RGPD).
- **keystatic.config.ts**: campo `content` de páginas legales migrado de `fields.document()` a `fields.text({ multiline: true })` para almacenar HTML plano como string fiable.
- **about.astro / workshop-empresas.astro / landing/pienso-luego-medito.astro / Footer.astro**: conectados labels, alt text y microcopy visibles a Keystatic manteniendo fallbacks iguales al render actual.
- **index.astro / about.astro**: limitada altura de imágenes de tipografía a 38px en `.section-label-img` y `.hero-label-img`.
- **index.astro**: centrado horizontalmente el label "Ciencia y Espíritu" en la sección de mindfulness.
- **index.astro / about.astro / workshop-empresas.astro**: labels de texto reemplazados por imágenes de tipografía de marca en hero, manifiesto, mindfulness y secciones de about.
- **workshop-empresas.astro**: hero rediseñado — título partido en dos líneas con colores de marca (rojo vinotinto + morado oscuro), imágenes en posición absoluta (sin grid), facts como tarjetas individuales con border-radius y sombra.
- **workshop.yaml**: actualizados heroLabel ("Experiencia para empresas"), heroSubtitle ("Transformando el estrés en presencia") y estructura de facts (Formato/Duración/Modalidad).
- **workshop-empresas.astro**: CTA final rediseñado con botón "Agendar llamada de descubrimiento" (enlace a calLink) y email "Escríbeme un correo" (mailto).
- **keystatic.config.ts / workshop.yaml**: nuevos campos editables `ctaEmailLabel` y `ctaEmailAddress`; actualizados defaults de `ctaTitle` y `ctaButtonText`.
- **contacto.yaml / contacto.astro**: eliminado heroSubtitle "Hablemos. / Estoy aquí para escucharte..." y processEyebrow "Qué pasa después".
- **keystatic.config.ts**: defaults de `processPanelAriaLabel` actualizados a "Proceso de contacto", `processEyebrow` a vacío.
- **workshop-empresas.astro**: hero-facts migrado de flex-wrap a CSS grid de 3 columnas con estilo unificado; actualizados datos de fallback (Personas/Duración/Formato).
- **workshop-empresas.astro**: descripción del workshop dividida en 5 párrafos para mejorar legibilidad.
- **workshop-empresas.astro**: eliminado botón WhatsApp del CTA y variable `ctaBody` huérfana.
- **about.astro**: ampliado texto de `bioIntro` con mención a estudios en París y experiencia corporativa.
- **URLs de booking**: migradas todas las sesiones de Zoom Scheduler a `cal.com/eleahora/*`.
- **Descripciones de sesiones**: enriquecidas con párrafos adicionales en las 6 sesiones (acompañamiento, terapia angelical, perlas, meditación, energética).
- **index.astro**: añadido segundo párrafo (`mindfulnessBody2`) en sección de Mindfulness. Actualizados textos de benefits y lead.
- **sesiones-page.yaml**: actualizado `heroTitle` a "¿con cuál te gustaría empezar?" y limpiado `ctaBody`.
- **sesiones.astro**: CTA final migrado de `<p>` a `<h2>` y eliminada referencia a `ctaBody`.
- **about.md**: reordenado contenido del manifiesto y simplificado closing.
- **Footer.astro**: simplificado — eliminadas dependencias de `getSiteConfig()` y `resolveHref()`; navegación y enlaces gestionados directamente desde `globalContent`.
- **workshop-empresas.astro**: rediseño completo de hero, guía, descripción, beneficios y experiencia items con datos ampliados del CMS.
- **src/content/singletons/**: actualizados YAML de home, about, contacto, sesiones-page y workshop con nuevos campos y contenido editorial.
- **Formulario de contacto**: migrado de GET (`/gracias`) a POST (`/api/contacto`) con envío server-side mediante Resend y validación de formato de email.
- **about.astro**: labels de sección reemplazados por imágenes tipográficas de marca (`Mi-recorrido.png`, `Así-nació-eleahora.png`).
- **workshop-empresas.astro**: label `Siguiente paso` reemplazado por imagen tipográfica; CTA principal redirige a Zoom Scheduler (llamada de descubrimiento) y secundario a `/contacto`.
- **workshop.yaml**: `ctaButtonLink` actualizado de WhatsApp a `/contacto`.
- **Sesiones YAML (5)**: URLs de booking migradas de `cal.com/eleahora/*` a `scheduler.zoom.us/...`.

### Removed
- **workshop-empresas.astro**: eliminada sección completa de "Formatos" (HTML, CSS, datos y campos de Keystatic).
- **workshop-empresas.astro**: eliminado botón WhatsApp del CTA y variable `ctaBody` huérfana.
- **keystatic.config.ts**: eliminados campos `formats*` (formatsEyebrow, formatsTitle, formats array).
- **keystatic.config.ts / workshop.yaml**: eliminado campo `ctaEyebrow`.

### Fixed
- **API de contacto**: corregida variable de entorno `RESEND_API_KEY` para resolución en runtime (`import.meta.env` → `process.env`), evitando que se compilara como `undefined` durante el build.
- **about.astro**: corregida posición vertical de imagen de fondo en hero desktop (`object-position` ajustado a 70%).
- **Lectura de contenido Keystatic en SSR**: Agregado `createGitHubReader` como reader primario (requiere `GITHUB_PAT`) con fallback a `createReader` local. Copiado `src/content/` al runtime del contenedor Docker para que el reader local encuentre los archivos YAML y el frontend refleje los cambios del CMS.
- **Dockerfile**: Añadida copia del directorio `src/` al stage runtime para disponibilidad de contenido YAML.
- **Testimonios**: corregidos nombres (slug → nombre propio) y eliminados puntos finales en citas.
- **about.astro**: corregida ortografía ("tí" → "ti") y ajuste responsive de imagen hero.
- **index.astro**: corregido enlace de Workshop a ruta `/workshop-empresas`.
- **contacto.yaml**: corregida puntuación del texto del proceso ("Qué pasa después" → "¿Qué pasa después?").
- **workshop-empresas.astro**: añadido margen inferior de 20px al título del CTA final.
- **API de contacto**: añadida validación en runtime de `RESEND_API_KEY`, extracción de constantes de email y manejo de errores de Resend.
- **contacto.astro**: corregida URL del action del formulario con trailing slash (`/api/contacto/`).
- **contacto.astro**: añadido `data-astro-reload` al formulario para forzar recarga completa en POST y evitar interferencia de navegación cliente.
- **Astro CSRF**: deshabilitado `checkOrigin` en `astro.config.mjs` para permitir POST del formulario de contacto sin bloquearse por validación de origen.
- **docker-compose.yml**: añadidas variables de entorno para Keystatic (KEYSTATIC_USER, KEYSTATIC_PASSWORD, KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, GITHUB_TOKEN, KEYSTATIC_SECRET) y RESEND_API_KEY.

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
