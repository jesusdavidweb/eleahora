#!/usr/bin/env node
/**
 * normalize-assets.mjs
 *
 * Renombra automáticamente los assets de `public/` a kebab-case ASCII para
 * evitar el bug conocido en Cloudflare Pages + Astro SSR: el SSR worker no
 * resuelve correctamente archivos con espacios o caracteres no-ASCII en el
 * nombre, devolviendo el HTML del index como fallback.
 *
 * Por cada archivo en `public/` (recursivo, excluyendo `.DS_Store` y dotfiles):
 *   1. Calcula un nombre "normalizado":
 *        - lowercase
 *        - NFD + remove diacritics (á → a, ñ → n, ü → u, etc.)
 *        - espacios y caracteres no [a-z0-9.-] → '-'
 *        - colapsa múltiples '-' y los recorta al inicio/final
 *        - preserva la extensión original
 *   2. Si el nombre normalizado difiere del original:
 *        - Renombra el archivo (mv)
 *        - Reescribe todas las referencias en `src/` y `package.json` para
 *          apuntar al nuevo nombre (incluye variantes URL-encoded con `%20`)
 *
 * Uso:
 *   node scripts/normalize-assets.mjs           # normaliza y persiste cambios (modo safe)
 *   node scripts/normalize-assets.mjs --dry-run # solo reporta, no toca nada
 *   node scripts/normalize-assets.mjs --verbose # log detallado de cada paso
 *   node scripts/normalize-assets.mjs --strict  # kebab-case completo (lowercase obligatorio)
 *
 * Modo safe (por defecto): preserva mayúsculas cuando el nombre ya es seguro
 * (solo letras ASCII, dígitos, `.`, `-`, `_`). Solo normaliza cuando hay
 * espacios, tildes, símbolos u otros caracteres que rompen el deploy.
 *
 * Modo strict (`--strict`): kebab-case ASCII completo, sin importar nada.
 * Útil para una limpieza one-shot del repo.
 *
 * Hook automático:
 *   Se ejecuta como `prebuild` en package.json. En Cloudflare Pages corre
 *   antes de `astro build`; en local con `bun run build`.
 */

import { readdir, rename, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

const ARGS = new Set(process.argv.slice(2));
const DRY_RUN = ARGS.has("--dry-run") || ARGS.has("-n");
const VERBOSE = ARGS.has("--verbose") || ARGS.has("-v");
const STRICT = ARGS.has("--strict");

// Extensiones que nos importan (assets subidos por el cliente)
const ASSET_EXT = new Set([
  ".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".avif",
  ".otf", ".ttf", ".woff", ".woff2", ".eot",
  ".mp4", ".webm", ".mp3", ".wav", ".ogg",
  ".pdf",
]);

// Ficheros a ignorar siempre
const IGNORE = new Set([".DS_Store"]);

// Extensiones de archivo donde buscar/reescribir referencias
const REF_EXT = new Set([
  ".astro", ".ts", ".tsx", ".js", ".mjs", ".cjs", ".jsx",
  ".yaml", ".yml", ".md", ".mdx", ".json", ".html", ".css",
]);

// ────────────────────────────────────────────────────────────────────
// Normalización del nombre
// ────────────────────────────────────────────────────────────────────

/**
 * Normaliza un nombre de archivo para que funcione correctamente en
 * Cloudflare Pages + Astro SSR.
 *
 * El bug conocido: el SSR worker no resuelve assets con espacios o
 * caracteres no-ASCII en el nombre (devuelve el HTML del index como
 * fallback). Por tanto, la prioridad #1 es **eliminar esos caracteres**.
 *
 * Política conservadora (por defecto):
 *   - Si el stem NO contiene caracteres problemáticos (espacios, símbolos,
 *     acentos, etc.) y solo tiene [A-Za-z0-9._-], se preserva tal cual
 *     (incluyendo mayúsculas). Las mayúsculas funcionan en Cloudflare Pages
 *     siempre que el path en el código coincida exactamente con el case del
 *     archivo en disco.
 *   - Si el stem SÍ contiene caracteres problemáticos, se normaliza a
 *     kebab-case ASCII (lowercase + guiones). Esto evita el bug.
 *   - La extensión siempre se pasa a lowercase (`.JPG` → `.jpg`).
 *
 * Política estricta (con `--strict`):
 *   - Todo se normaliza a kebab-case ASCII, sin importar si hay caracteres
 *     problemáticos. Útil para una limpieza one-shot del repo.
 *
 * Ejemplos:
 *   "Workshop Pienso Luego Medito-15-tiny.webp" → "workshop-pienso-luego-medito-15-tiny.webp"
 *   "María  Corallo (1).webp"                   → "maria-corallo-1.webp"
 *   "Logo__FINAL.png"                           → "logo-final.png"
 *   "OG-images-eleahora-02.png"   (sin --strict) → "OG-images-eleahora-02.png"  (preservado)
 *   "OG-images-eleahora-02.png"   (con --strict) → "og-images-eleahora-02.png"
 *   "Mi Imagen.PNG"               (sin --strict) → "mi-imagen.png"              (normalizado)
 *   "Mi Imagen.PNG"               (con --strict) → "mi-imagen.png"              (igual)
 */
function normalizeName(name, strict = false) {
  const ext = extname(name);
  const stem = name.slice(0, name.length - ext.length);
  const safeExt = ext.toLowerCase().replace(/^\./, "");

  // Detectar caracteres problemáticos (cualquier cosa fuera de [A-Za-z0-9._-])
  const hasProblematic = /[^A-Za-z0-9._-]/.test(stem);

  if (!hasProblematic && !strict) {
    // El stem ya es seguro. Solo ajustamos la extensión a lowercase.
    return stem + "." + safeExt;
  }

  // Hay caracteres problemáticos (o strict mode): normalizar a kebab-case ASCII
  const ascii = stem
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const kebab = ascii
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  const safeStem = kebab || "asset";
  return safeStem + "." + safeExt;
}

// ────────────────────────────────────────────────────────────────────
// Recolección de archivos
// ────────────────────────────────────────────────────────────────────

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue; // dotfiles
    if (IGNORE.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile()) {
      yield full;
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Reescritura de referencias
// ────────────────────────────────────────────────────────────────────

/**
 * Devuelve todas las variantes por las que un nombre puede aparecer en el código.
 * Acepta el path con `/` inicial (como aparece en `src="/images/foo.jpg"`).
 *   - Versión literal con el nombre original
 *   - Versión URL-encoded (%20 para espacios, %28/%29 para paréntesis, etc.)
 */
function buildAliases(publicPathWithLeadingSlash) {
  const aliases = new Set();
  const publicPath = publicPathWithLeadingSlash.replace(/\\/g, "/");
  aliases.add(publicPath);
  const encoded = publicPath
    .split("/")
    .map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)))
    .join("/");
  if (encoded !== publicPath) aliases.add(encoded);
  return aliases;
}

async function updateReferences(oldPublicPath, newPublicPath) {
  // Busca en src/ y en la raíz (package.json, robots.txt, etc.)
  const searchRoots = [join(ROOT, "src"), ROOT];
  const aliases = buildAliases(oldPublicPath);

  let totalReplacements = 0;
  const filesTouched = [];

  for (const root of searchRoots) {
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true, recursive: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (!e.isFile()) continue;
      const ext = extname(e.name).toLowerCase();
      if (!REF_EXT.has(ext)) continue;
      const full = join(e.parentPath ?? e.path ?? root, e.name);
      // No reescribir dentro de public/ (eso es lo que estamos renombrando)
      if (full.startsWith(PUBLIC_DIR)) continue;
      // No reescribir dentro de node_modules ni dist
      if (full.includes(`${"node_modules"}/`) || full.includes(`${"dist"}/`)) continue;

      let content;
      try {
        content = await readFile(full, "utf8");
      } catch {
        continue;
      }

      let updated = content;
      for (const alias of aliases) {
        // Escape regex special chars
        const re = new RegExp(escapeRegex(alias), "g");
        updated = updated.replace(re, newPublicPath);
      }

      if (updated !== content) {
        // Contar ocurrencias de CUALQUIER alias en el contenido original.
        // (Si un archivo menciona la ruta 3 veces, cuenta 3.)
        let count = 0;
        for (const alias of aliases) {
          const re = new RegExp(escapeRegex(alias), "g");
          const matches = content.match(re);
          if (matches) count += matches.length;
        }
        if (!DRY_RUN) {
          await writeFile(full, updated, "utf8");
        }
        totalReplacements += count;
        filesTouched.push(relative(ROOT, full));
      }
    }
  }
  return { totalReplacements, filesTouched };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔧 normalize-assets" + (DRY_RUN ? " (dry-run)" : "") + (STRICT ? " (strict)" : " (safe)") + "\n");

  const renames = [];
  let scanned = 0;
  let alreadyOk = 0;

  for await (const file of walk(PUBLIC_DIR)) {
    scanned++;
    const ext = extname(file).toLowerCase();
    if (!ASSET_EXT.has(ext)) {
      alreadyOk++;
      continue;
    }
    const originalName = basename(file);
    const normalizedName = normalizeName(originalName, STRICT);
    if (originalName === normalizedName) {
      alreadyOk++;
      if (VERBOSE) {
        console.log(`  ✓ ${relative(PUBLIC_DIR, file)}`);
      }
      continue;
    }

    const oldRel = relative(PUBLIC_DIR, file);
    const newAbs = join(dirname(file), normalizedName);
    const newRel = relative(PUBLIC_DIR, newAbs);
    const newPublicPath = "/" + newRel.replace(/\\/g, "/");

    renames.push({ oldAbs: file, newAbs, oldRel, newRel, newPublicPath });
    if (VERBOSE) {
      console.log(`  ⤳ ${oldRel}`);
      console.log(`    → ${newRel}`);
    }
  }

  if (renames.length === 0) {
    console.log(`✅ ${scanned} archivos escaneados — todos en kebab-case ASCII. Nada que normalizar.`);
    return;
  }

  console.log(`📋 ${renames.length} archivo(s) a renombrar:\n`);
  for (const r of renames) {
    console.log(`   ${r.oldRel}`);
    console.log(`     → ${r.newRel}`);
  }
  console.log("");

  if (DRY_RUN) {
    console.log("⏸  Dry-run: no se ha modificado nada.");
    console.log("   Quita --dry-run para aplicar los cambios.");
    return;
  }

  console.log("⏳ Aplicando cambios…\n");
  let renamedCount = 0;
  let refsCount = 0;
  const refFilesTouched = new Set();

  for (const r of renames) {
    // 1) Renombrar el archivo
    try {
      await stat(r.newAbs);
      // Ya existe un archivo con el nombre destino — saltar para no pisar
      console.warn(`   ⚠️  Ya existe destino, saltando: ${r.newRel}`);
      continue;
    } catch {
      // No existe destino, OK para renombrar
    }
    await rename(r.oldAbs, r.newAbs);
    renamedCount++;

    // 2) Reescribir referencias
    const oldPublicPath = "/" + r.oldRel.replace(/\\/g, "/");
    const { totalReplacements, filesTouched } = await updateReferences(oldPublicPath, r.newPublicPath);
    refsCount += totalReplacements;
    for (const f of filesTouched) refFilesTouched.add(f);

    if (VERBOSE) {
      console.log(`   ✓ ${r.oldRel} → ${r.newRel}  (refs: ${totalReplacements})`);
    }
  }

  console.log(`\n✅ Hecho:`);
  console.log(`   • ${renamedCount} archivo(s) renombrado(s)`);
  console.log(`   • ${refsCount} referencia(s) actualizada(s) en ${refFilesTouched.size} archivo(s) del código`);
  if (refFilesTouched.size > 0) {
    for (const f of [...refFilesTouched].sort()) {
      console.log(`     - ${f}`);
    }
  }
  console.log(`\n💡 Revisa los cambios con \`git status\` antes de commit.`);
}

main().catch((err) => {
  console.error("❌ normalize-assets falló:");
  console.error(err);
  process.exit(1);
});
