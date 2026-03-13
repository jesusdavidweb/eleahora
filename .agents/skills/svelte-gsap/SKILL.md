---
name: Svelte & GSAP Interactive Islands
description: Guidelines for implementing interactive components using Svelte and high-performance GSAP animations.
---

# Svelte & GSAP Interactive Islands Skill

## Overview
Astro handles the static UI, but Svelte combined with GSAP manages the interactive chaos, honoring the brand's dual concept: "Soy estructura y soy caos".

## Svelte Island Rules
1. **Location**: Place all Svelte components in `src/components/svelte/`. 
2. **Hydration**: Use Astro's `client:*` directives strictly when necessary. 
   - `client:idle` for low-priority components.
   - `client:visible` for elements below the fold.
   - `client:load` for immediate interaction elements.
3. **Props & State**: Use reactive props and avoid complex internal state mutations unless required for local UI logic.

## GSAP Animation Rules
1. **Performance**: Prioritize animating `transform` and `opacity`. Use `will-change` in CSS.
2. **Lifecycle Cleanup**: It is **mandatory** to kill GSAP tweens and ScrollTriggers within Svelte's `onDestroy` to prevent memory leaks.
3. **ScrollTrigger**: Lazy-load triggers for scroll-based animations. Store interactions in `src/animations/` (`gsap-config.ts`, `scroll-trigger-utils.ts`).
