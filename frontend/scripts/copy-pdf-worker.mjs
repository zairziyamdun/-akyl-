import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const publicDir = path.join(frontendRoot, "public", "pdfjs");
const require = createRequire(import.meta.url);

function hasWorker(root) {
  return fs.existsSync(path.join(root, "build", "pdf.worker.min.mjs"));
}

/** Must match the pdfjs-dist version bundled with react-pdf (API + worker). */
function resolvePdfJsDistRoot() {
  const resolveAttempts = [
    () => path.dirname(require.resolve("pdfjs-dist/package.json")),
    () =>
      path.dirname(
        require.resolve("pdfjs-dist/package.json", {
          paths: [path.join(frontendRoot, "node_modules", "react-pdf")],
        }),
      ),
  ];

  for (const attempt of resolveAttempts) {
    try {
      const root = attempt();
      if (hasWorker(root)) return root;
    } catch {
      // try next strategy
    }
  }

  const candidates = [
    path.join(frontendRoot, "node_modules", "pdfjs-dist"),
    path.join(
      frontendRoot,
      "node_modules",
      "react-pdf",
      "node_modules",
      "pdfjs-dist",
    ),
  ];

  const pnpmDir = path.join(frontendRoot, "node_modules", ".pnpm");
  if (fs.existsSync(pnpmDir)) {
    for (const entry of fs.readdirSync(pnpmDir)) {
      if (!entry.startsWith("pdfjs-dist@")) continue;
      candidates.push(
        path.join(pnpmDir, entry, "node_modules", "pdfjs-dist"),
      );
    }
  }

  for (const root of candidates) {
    if (hasWorker(root)) return root;
  }

  throw new Error(
    "[copy-pdf-worker] pdfjs-dist worker not found. Run pnpm install in frontend/.",
  );
}

const pdfJsRoot = resolvePdfJsDistRoot();
const pkg = JSON.parse(
  fs.readFileSync(path.join(pdfJsRoot, "package.json"), "utf8"),
);

const src = path.join(pdfJsRoot, "build", "pdf.worker.min.mjs");
const dest = path.join(publicDir, "pdf.worker.min.mjs");
const legacyDest = path.join(publicDir, "pdf.worker.legacy.min.mjs");

fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(src, dest);

if (fs.existsSync(legacyDest)) {
  fs.unlinkSync(legacyDest);
}

console.log(`[copy-pdf-worker] pdf.worker.min.mjs (pdfjs-dist@${pkg.version})`);
