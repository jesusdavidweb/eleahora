/**
 * src/lib/keystatic.ts
 * Helpers para leer datos de Keystatic en build-time (Astro SSG).
 * Los campos fields.document se devuelven como función async — se resuelven aquí.
 */

import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

// ─────────────────────────────────────────────
// Helper: convierte nodos de document a HTML simple
// ─────────────────────────────────────────────
type DocNode = { type: string; children?: DocNode[]; text?: string; bold?: boolean; italic?: boolean };

function nodesToHtml(nodes: DocNode[]): string {
  return nodes.map((node) => {
    if (node.type === 'paragraph') {
      const inner = (node.children ?? []).map((c) => c.text ?? '').join('');
      return inner.trim() ? `<p>${inner}</p>` : '';
    }
    if (node.type === 'heading') {
      const inner = (node.children ?? []).map((c) => c.text ?? '').join('');
      return `<h3>${inner}</h3>`;
    }
    if (node.type === 'unordered-list' || node.type === 'ordered-list') {
      const tag = node.type === 'ordered-list' ? 'ol' : 'ul';
      const items = (node.children ?? []).map((li) => {
        const text = (li.children ?? []).map((c) => c.text ?? '').join('');
        return `<li>${text}</li>`;
      }).join('');
      return `<${tag}>${items}</${tag}>`;
    }
    return '';
  }).join('');
}

async function resolveDocument(fn: (() => Promise<DocNode[]>) | undefined): Promise<string> {
  if (!fn) return '';
  try {
    const nodes = await fn();
    return nodesToHtml(Array.isArray(nodes) ? nodes : []);
  } catch {
    return '';
  }
}

// ─────────────────────────────────────────────
// SINGLETONS
// ─────────────────────────────────────────────

export async function getSiteConfig() {
  try { return await reader.singletons.siteConfig.read(); } catch { return null; }
}

export async function getHomePage() {
  try {
    const data = await reader.singletons.homePage.read();
    if (!data) return null;
    return {
      ...data,
      manifestoBodyHtml: await resolveDocument(data.manifestoBody as any),
    };
  } catch { return null; }
}

export async function getAboutPage() {
  try {
    const data = await reader.singletons.aboutPage.read();
    if (!data) return null;
    return {
      ...data,
      bioBodyHtml: await resolveDocument(data.bioBody as any),
    };
  } catch { return null; }
}

export async function getSessionesPage() {
  try { return await reader.singletons.sessionesPage.read(); } catch { return null; }
}

export async function getWorkshopPage() {
  try {
    const data = await reader.singletons.workshopPage.read();
    if (!data) return null;
    return {
      ...data,
      intrBodyHtml: await resolveDocument(data.introBody as any),
    };
  } catch { return null; }
}

export async function getContactoPage() {
  try { return await reader.singletons.contactoPage.read(); } catch { return null; }
}

// ─────────────────────────────────────────────
// COLLECTIONS
// ─────────────────────────────────────────────

export async function getAllSesiones() {
  try {
    const slugs = await reader.collections.sesiones.list();
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.sesiones.read(slug);
        if (!entry) return null;
        return {
          slug,
          entry: {
            ...entry,
            descriptionHtml: await resolveDocument(entry.description as any),
          },
        };
      })
    );
    return entries
      .filter((e): e is NonNullable<typeof entries[0]> => e !== null)
      .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  } catch { return []; }
}

export async function getSesion(slug: string) {
  try {
    const entry = await reader.collections.sesiones.read(slug);
    if (!entry) return null;
    return {
      ...entry,
      descriptionHtml: await resolveDocument(entry.description as any),
    };
  } catch { return null; }
}

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
      .filter((e): e is NonNullable<typeof entries[0]> => {
        if (!e) return false;
        if (onlyFeatured) return e.entry.featured === true;
        return true;
      })
      .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  } catch { return []; }
}

export async function getAllLegalPages() {
  try {
    const slugs = await reader.collections.legalPages.list();
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.legalPages.read(slug);
        if (!entry) return null;
        return {
          slug,
          entry: {
            ...entry,
            contentHtml: await resolveDocument(entry.content as any),
          },
        };
      })
    );
    return entries.filter((e): e is NonNullable<typeof entries[0]> => e !== null);
  } catch { return []; }
}

export async function getLegalPage(slug: string) {
  try {
    const entry = await reader.collections.legalPages.read(slug);
    if (!entry) return null;
    return {
      ...entry,
      contentHtml: await resolveDocument(entry.content as any),
    };
  } catch { return null; }
}
