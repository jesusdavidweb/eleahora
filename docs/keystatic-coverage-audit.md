# Auditoría de cobertura Keystatic

Fecha: 2026-05-23

Objetivo: confirmar que el contenido editorial público de Eleahora puede editarse desde Keystatic sin alterar la estructura visual del sitio.

## Matriz de cobertura

| Área | Editable desde Keystatic | Hardcodeado justificado | Pendiente |
|---|---|---|---|
| Home `/` | SEO, hero, imágenes/alt, manifiesto, servicios, mindfulness y testimonios destacados. | Imágenes de lettering de marca en labels visuales; forman parte del diseño. | Ninguno editorial público detectado. |
| About `/about` | SEO, hero, labels de recorrido/Eleahora, imágenes/alt, bio, lista de servicios y CTA. | Estructura de secciones y aria labels descriptivos de columnas visuales. | `ctaBody` existe pero no se renderiza porque no hay espacio visible actual sin modificar layout. |
| Sesiones `/sesiones` | SEO, hero, imagen/alt, CTA final, colección de sesiones, detalles, meta chips y booking. | Grid, numeración visual y CTA externo por sesión. | `ctaBody` existe pero no se renderiza porque la página actual solo muestra título y botón en el CTA. |
| Contacto `/contacto` | SEO, hero, proceso, enlaces rápidos, formulario, placeholders y opciones de servicio. | IDs de formulario, método GET y destino `/gracias`. | Ninguno editorial público detectado. |
| Workshop `/workshop-empresas` | SEO, hero, alt text, datos destacados, guía, workshop, experiencia, beneficios, testimonios, cita y CTA visible. | Campos de CTA email/WhatsApp no renderizados porque el CTA visual actual solo muestra un botón. | Ninguno editorial público visible. |
| Landing `/landing/pienso-luego-medito` | SEO, hero, CTAs, nota, labels Web/Rol, imágenes/alt, perfil, historia, experiencia, pasos, beneficios, testimonios, cita y cierre. | Asset de lettering del slogan y estructura de collage. | Ninguno editorial público detectado. |
| Header | Logo, alt, navegación, CTA y menú móvil. | Script de navegación y estado activo. | Ninguno editorial público detectado. |
| Footer | Logo, slogan, CTA meditación, grupos de enlaces, textos de redes, créditos, copyright y modal. | Iconos SVG y orden visual de redes para conservar diseño. | Ninguno editorial público detectado. |
| Gracias `/gracias` | SEO, titular personalizado, lead y CTAs. | Lectura del query param `nombre`. | Ninguno editorial público detectado. |
| 404 | SEO, número visible, textos y CTAs. | Estructura visual de pantalla completa. | Ninguno editorial público detectado. |
| Legal `/legal/*` | Título, meta description, fecha y contenido rich text por colección. | Slugs/rutas dinámicas y estilos de lectura. | Ninguno editorial público detectado. |

## Fuera de alcance por diseño

- `/design-system`: página de documentación visual interna/pública, no contenido editorial del sitio principal.
- CSS, clases, wrappers, breakpoints, animaciones GSAP/Svelte, iconos, scripts, IDs, rutas Astro, `SITE_URL`, favicon y metadata generada por Astro.
- Campos Keystatic sin espacio visual actual no se fuerzan en pantalla para evitar cambios visuales.
