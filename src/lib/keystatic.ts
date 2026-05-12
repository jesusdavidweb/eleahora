import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

// ─────────────────────────────────────────────────────
// Rich Text: ProseMirror nodes → HTML
// ─────────────────────────────────────────────────────

type DocNode = {
  type?: string;
  children?: DocNode[];
  text?: string;
  [key: string]: unknown;
};

function nodesToHtml(nodes: DocNode[]): string {
  return nodes
    .map((node) => {
      const nodeType = node.type ?? '';
      if (nodeType === 'paragraph') {
        const inner = (node.children ?? []).map((c) => c.text ?? '').join('');
        return inner.trim() ? `<p>${inner}</p>` : '';
      }
      if (nodeType === 'heading') {
        const inner = (node.children ?? []).map((c) => c.text ?? '').join('');
        return `<h3>${inner}</h3>`;
      }
      if (nodeType === 'unordered-list' || nodeType === 'ordered-list') {
        const tag = nodeType === 'ordered-list' ? 'ol' : 'ul';
        const items = (node.children ?? [])
          .map((li) => {
            const text = (li.children ?? []).map((c) => c.text ?? '').join('');
            return `<li>${text}</li>`;
          })
          .join('');
        return `<${tag}>${items}</${tag}>`;
      }
      return '';
    })
    .join('');
}

async function resolveDocument(
  docFn: (() => Promise<unknown[]>) | null | undefined,
): Promise<string> {
  if (!docFn) return '';
  try {
    const nodes = await docFn();
    if (!Array.isArray(nodes)) return '';
    return nodesToHtml(nodes as DocNode[]);
  } catch {
    return '';
  }
}

// ─────────────────────────────────────────────────────
// Singletons
// ─────────────────────────────────────────────────────

export async function getSiteConfig() {
  try {
    return await reader.singletons.siteConfig.read();
  } catch {
    return null;
  }
}

export async function getHomePage() {
  try {
    const data = await reader.singletons.homePage.read();
    if (!data) return null;
    return {
      ...data,
      manifestoBodyHtml: await resolveDocument(data.manifestoBody),
    };
  } catch {
    return null;
  }
}

export async function getAboutPage() {
  try {
    const data = await reader.singletons.aboutPage.read();
    if (!data) return null;
    return {
      ...data,
      bioBodyHtml: await resolveDocument(data.bioBody),
    };
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

// ─────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────

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
            descriptionHtml: await resolveDocument(entry.description),
          },
        };
      }),
    );
    return entries
      .filter((e): e is NonNullable<typeof e> => e !== null)
      .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  } catch {
    return [];
  }
}

export async function getSesion(slug: string) {
  try {
    const entry = await reader.collections.sesiones.read(slug);
    if (!entry) return null;
    return {
      ...entry,
      descriptionHtml: await resolveDocument(entry.description),
    };
  } catch {
    return null;
  }
}

export async function getAllTestimonios(onlyFeatured = false) {
  try {
    const slugs = await reader.collections.testimonios.list();
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.testimonios.read(slug);
        if (!entry) return null;
        return { slug, entry };
      }),
    );
    return entries
      .filter((e): e is NonNullable<typeof e> => e !== null)
      .filter((e) => (onlyFeatured ? e.entry.featured : true))
      .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  } catch {
    return [];
  }
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
            contentHtml: await resolveDocument(entry.content),
          },
        };
      }),
    );
    return entries.filter((e): e is NonNullable<typeof e> => e !== null);
  } catch {
    return [];
  }
}

export async function getLegalPage(slug: string) {
  try {
    const entry = await reader.collections.legalPages.read(slug);
    if (!entry) return null;
    return {
      ...entry,
      contentHtml: await resolveDocument(entry.content),
    };
  } catch {
    return null;
  }
}
