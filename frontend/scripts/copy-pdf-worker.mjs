import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const publicDir = path.join(frontendRoot, "public", "pdfjs");

/** Must match the pdfjs-dist version bundled with react-pdf (API + worker). */
function resolvePdfJsDistRoot() {
  const candidates = [
    path.join(frontendRoot, "node_modules", "react-pdf", "node_modules", "pdfjs-dist"),
    path.join(frontendRoot, "node_modules", "pdfjs-dist"),
  ];

  for (const root of candidates) {
    const worker = path.join(root, "build", "pdf.worker.min.mjs");
    if (fs.existsSync(worker)) {
      return root;
    }
  }

  throw new Error(
    "[copy-pdf-worker] pdfjs-dist worker not found. Run npm install in frontend/.",
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
