/**
 * URL helper utilities for multi-base deployments.
 *
 * Centralizes path prefixing so that BASE_URL (set by Astro's `base` config)
 * is always applied consistently, regardless of whether it ends in a slash.
 */

const BASE = import.meta.env.BASE_URL;
/** Always ends with a slash — use this for concatenation. */
const NORMALIZED_BASE = BASE.endsWith('/') ? BASE : `${BASE}/`;

const EXTERNAL_RE = /^(https?:|mailto:|tel:|ftp:|\/\/)/;

/**
 * Prefixes an internal path with BASE_URL.
 *
 * Guarantees:
 * - External URLs (http://, https://, mailto:, tel:, //) are returned unchanged.
 * - Pure anchors (#section) and query strings (?x=y) are returned unchanged.
 * - There is exactly ONE '/' between the base and the path.
 * - Anchors and query strings attached to a path are preserved.
 *
 * @example
 *   withBase('/about')           → '/eleahora/about'
 *   withBase('/images/logo.png')  → '/eleahora/images/logo.png'
 *   withBase('/about#manifiesto') → '/eleahora/about#manifiesto'
 *   withBase('#section')         → '#section'
 *   withBase('https://x.com')    → 'https://x.com'
 *   withBase('/')                → '/eleahora/'
 *   withBase('')                 → '/eleahora/'
 */
export function withBase(path: string): string {
  if (!path) return NORMALIZED_BASE;
  if (EXTERNAL_RE.test(path)) return path;
  if (path.startsWith('#') || path.startsWith('?')) return path;

  // Strip any leading slashes from the input so we control the separator
  const [pathname, ...rest] = path.split(/(?=[#?])/);
  const cleanPath = pathname.replace(/^\/+/, '');
  return `${NORMALIZED_BASE}${cleanPath}${rest.join('')}`;
}
