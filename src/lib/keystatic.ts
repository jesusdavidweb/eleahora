/**
 * src/lib/keystatic.ts
 * Helpers para leer datos de Keystatic en build-time (Astro SSG/SSR).
 * Todos los helpers son async y devuelven null/[] si el archivo no existe todavía.
 */

import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

// Reader singleton reutilizable
const reader = createReader(process.cwd(), config);

// ─────────────────────────────────────────────
// SINGLETONS
// ─────────────────────────────────────────────

export async function getSiteConfig() {
  try {
    return await reader.singletons.siteConfig.read();
  } catch {
    return null;
  }
}

export async function getHomePage() {
  try {
    return await reader.singletons.homePage.read();
  } catch {
    return null;
  }
}

export async function getAboutPage() {
  try {
    return await reader.singletons.aboutPage.read();
  } catch {
    return null;
  }
}

export async function getSessionesPage() {
  try {
    return await reader.singletons.sessionesPage.read();
  } catch {
    return null;
  }
}

export async function getWorkshopPage() {
  try {
    return await reader.singletons.workshopPage.read();
  } catch {
    return null;
  }
}

export async function getContactoPage() {
  try {
    return await reader.singletons.contactoPage.read();
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// COLLECTIONS
// ─────────────────────────────────────────────

/** Devuelve todas las sesiones ordenadas por campo `order` */
export async function getAllSesiones() {
  try {
    const slugs = await reader.collections.sesiones.list();
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.sesiones.read(slug);
        return entry ? { slug, entry } : null;
      })
    );
    return entries
      .filter((e): e is { slug: string; entry: NonNullable<typeof entries[0]>['entry'] } => e !== null)
      .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  } catch {
    return [];
  }
}

/** Devuelve una sesión por slug */
export async function getSesion(slug: string) {
  try {
    return await reader.collections.sesiones.read(slug);
  } catch {
    return null;
  }
}

/** Devuelve todos los testimonios ordenados por `order`, filtrados por `featured` si se indica */
export async function getAllTestimonios(onlyFeatured = false) {
  try {
    const slugs = await reader.collections.testimonios.list();
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.testimonios.read(slug);
        return entry ? { slug, entry } : null;
      })
    );
    return entries
      .filter((e): e is { slug: string; entry: NonNullable<typeof entries[0]>['entry'] } => {
        if (!e) return false;
        if (onlyFeatured) return e.entry.featured === true;
        return true;
      })
      .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  } catch {
    return [];
  }
}

/** Devuelve todas las páginas legales publicadas */
export async function getAllLegalPages() {
  try {
    const slugs = await reader.collections.legalPages.list();
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.legalPages.read(slug);
        return entry ? { slug, entry } : null;
      })
    );
    return entries.filter((e): e is { slug: string; entry: NonNullable<typeof entries[0]>['entry'] } => e !== null);
  } catch {
    return [];
  }
}

/** Devuelve una página legal por slug */
export async function getLegalPage(slug: string) {
  try {
    return await reader.collections.legalPages.read(slug);
  } catch {
    return null;
  }
}
