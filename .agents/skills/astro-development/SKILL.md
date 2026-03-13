---
name: Astro Development
description: Guidelines for creating fast, zero-JS by default pages and components in Astro using TypeScript and Bun.
---

# Astro Development Skill

## Overview
This skill provides the required standards for Astro development in the Eleahora 2026 project. The project focuses on extreme performance, structural clarity, and static generation by default.

## Rules & Standards
1. **Zero-JS Philosophy**: Serve pure HTML/CSS. If interactivity is intrinsically needed, use Svelte islands. Do NOT use client-side JS within Astro components.
2. **Component Architecture**: 
   - `src/pages/` for static routes (`index.astro`, `about.astro`, `services.astro`, `contacto.astro`).
   - `src/components/astro/` for layout elements and UI without interactivity (Cards, Headers, Footers).
   - `src/layouts/` for global layouts handling SEO and meta tags.
3. **TypeScript**: Strict typing is mandatory. Interfaces must be defined in `src/types/` before implementation.
4. **Content Collections**: Use `src/content/` to manage any Markdown content with strict Zod schemas.
5. **Commands**: Always validate your changes using `bun run check` and `bun run build`.
