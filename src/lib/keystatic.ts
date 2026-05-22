// Lazy async reader: only initialize when first accessed
// This prevents crashes if Keystatic Cloud is unavailable at startup
let _reader: any = null;
let _readerFailed = false;
let _initPromise: Promise<any> | null = null;

async function initReader() {
  if (_readerFailed) return null;
  if (_reader) return _reader;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    try {
      const configModule = await import('../../keystatic.config');
      const cfg = configModule.default ?? configModule;

      const githubPat = process.env.GITHUB_PAT;
      if (githubPat) {
        const { createGitHubReader } = await import('@keystatic/core/reader/github');
        _reader = createGitHubReader(cfg, {
          repo: 'jesusdavidweb/eleahora',
          token: githubPat,
        });
        return _reader;
      }

      const { createReader } = await import('@keystatic/core/reader');
      _reader = createReader(process.cwd(), cfg);
      return _reader;
    } catch (err) {
      console.error('[keystatic] Failed to create reader:', err);
      _readerFailed = true;
      return null;
    }
  })();

  return _initPromise;
}

async function getReader() {
  return initReader();
}

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
    const r = await getReader();
    if (!r) return null;
    return await r.singletons.siteConfig.read();
  } catch {
    return null;
  }
}

export async function getGlobalContent() {
  try {
    const r = await getReader();
    if (!r) return null;
    return await r.singletons.globalContent.read();
  } catch {
    return null;
  }
}

export async function getHomePage() {
  try {
    const r = await getReader();
    if (!r) return null;
    const data = await r.singletons.homePage.read();
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
    const r = await getReader();
    if (!r) return null;
    const data = await r.singletons.aboutPage.read();
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
    const r = await getReader();
    if (!r) return null;
    return await r.singletons.sessionesPage.read();
  } catch {
    return null;
  }
}

export async function getWorkshopPage() {
  try {
    const r = await getReader();
    if (!r) return null;
    return await r.singletons.workshopPage.read();
  } catch {
    return null;
  }
}

export async function getContactoPage() {
  try {
    const r = await getReader();
    if (!r) return null;
    return await r.singletons.contactoPage.read();
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────

export async function getAllSesiones() {
  try {
    const r = await getReader();
    if (!r) return [];
    const slugs = await r.collections.sesiones.list();
    const entries = await Promise.all(
      slugs.map(async (slug: string) => {
        const entry = await r.collections.sesiones.read(slug);
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
    const r = await getReader();
    if (!r) return null;
    const entry = await r.collections.sesiones.read(slug);
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
    const r = await getReader();
    if (!r) return [];
    const slugs = await r.collections.testimonios.list();
    const entries = await Promise.all(
      slugs.map(async (slug: string) => {
        const entry = await r.collections.testimonios.read(slug);
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
    const r = await getReader();
    if (!r) return [];
    const slugs = await r.collections.legalPages.list();
    const entries = await Promise.all(
      slugs.map(async (slug: string) => {
        const entry = await r.collections.legalPages.read(slug);
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
    const r = await getReader();
    if (!r) return null;
    const entry = await r.collections.legalPages.read(slug);
    if (!entry) return null;
    return {
      ...entry,
      contentHtml: await resolveDocument(entry.content),
    };
  } catch {
    return null;
  }
}
