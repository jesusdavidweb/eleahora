# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Fixed
- Resolución de errores de enrutamiento 503 y 404 en el entorno de producción.
- Corrección de problemas en el pipeline de despliegue relacionados con la configuración de Docker Composer.
- Reparación de regresiones visuales en la página de Contacto (tipografía, órbitas y degradados).

### Removed
- Eliminada carpeta errónea / plantilla innecesaria `civil-corot` que no aplicaba a la raíz del repositorio.
- Limitación temporal a cero dependencias sobrantes.
- Se ha eliminado la sección de testimonios ("Sección pendiente de testimonios") de la página de inicio (`index.astro`) y sus estilos asociados.
