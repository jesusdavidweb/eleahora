---
name: "Gestión de Changelog (Keep a Changelog)"
description: "Cuándo y cómo actualizar el archivo CHANGELOG.md dentro del flujo de trabajo."
context: "Se usa para mantener un registro histórico centralizado sobre adiciones, cambios y resoluciones de problemas en el repositorio."
---

# Gestión del Changelog - Directrices para Agentes

El proyecto Eleahora 2026 requiere un historial ordenado para auditar la evolución de la aplicación web de Astro, Svelte y su despliegue en contenedores. **Todo cambio relevante o reestructuración en el proyecto debe quedar documentado.**

## 1. ¿Cuándo actualizar el CHANGELOG?

Como agente/desarrollador, estás obligado a consultar y agregar entradas al `CHANGELOG.md` **SIEMPRE que la tarea incluya:**
- **Finalización de una funcionalidad nueva** (Ej. "Crear componente Hero", "Integrar formularios de contacto en Svelte").
- **Actualización de dependencias clave** (Ej. "GSAP v3.14 actualizado").
- **Cambios en directivas y estilos** (Ej. "Refactorización en las variables de color del `agents.md` o `/styles/global.css`").
- **Correcciones (`fixed`) vitales** (Ej. "Solución de advertencias de hidratación de Astro o limpieza en hooks del ciclo de vida de Svelte").
- **Optimización o reestructuración** de directrices/skills o metadatos SEO.

> **Nunca dejes una tarea funcional terminada sin al menos haberle preguntado al usuario si desea que actualices el `CHANGELOG.md`, o actualizándolo proactivamente (lo cual es recomendado).**

## 2. ¿Cómo actualizar el CHANGELOG?

El proyecto utiliza el estándar de **[Keep a Changelog](https://keepachangelog.com/)**.
Todos los cambios deben documentarse bajo la sección `## [Unreleased]` (hasta que el usuario decida versionar de forma oficial una subida a Git o Docker).

### 2.1 Archivo a editar
`CHANGELOG.md` (En la raíz del proyecto).

### 2.2 Categorías de Cambios
Las entradas deben enlistarse dentro de las siguientes subsecciones usando Markdown (`###`):

- `### Added` (Para características nuevas, rutas de paginas nuevas).
- `### Changed` (Para cambios en funcionalidades o directivas existentes, como estilos o arquitectura).
- `### Deprecated` (Para características que pronto se eliminarán).
- `### Removed` (Para características, dependencias o archivos innecesarios eliminados o purgados).
- `### Fixed` (Para solucón de errores de código o problemas de hidratación/renderizado).
- `### Security` (Para actualizaciones de seguridad importantes si aplicasen).

### 2.3 Formato de Entrada
Las líneas deben ser puntuales, descriptivas y escritas idealmente de la siguiente forma (En español, usando infinitivos o participios):
```markdown
## [Unreleased]

### Added
- Componente interactivo `Header.svelte` usando eventos en el `window`.
- Configuración Dokploy para entornos locales.

### Changed
- Color corporativo principal de marrones/berries actualizados a marsala en las variables CSS.
```

## 3. Reglas Adicionales para Agentes
- **No reescribas todo el documento:** Al abrir `CHANGELOG.md`, busca la sección `## [Unreleased]`. Si la categoría de tu cambio (`### Added`, `### Fixed`, etc.) ya existe, añade un nuevo viñeta (`- `) al final de la lista de esa sección. Si no existe, créala.
- **Mantén limpios los commits frente al Changelog:** El changelog debe ser legible para humanos y los dueños de negocio del proyecto Eleahora, por lo que debes obviar reportar refactorizaciones súper minúsculas o errores introducidos y corregidos en la misma y efímera sesión de chat (si un error surgió durante esta charla y tú mismo lo solucionaste a los segundos, no requiere ir al changelog principal).
