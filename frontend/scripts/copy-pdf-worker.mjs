import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const publicDir = path.join(frontendRoot, "public", "pdfjs");

const copies = [
  {
    src: path.join(frontendRoot, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs"),
    dest: path.join(publicDir, "pdf.worker.min.mjs"),
  },
  {
    src: path.join(
      frontendRoot,
      "node_modules",
      "pdfjs-dist",
      "legacy",
      "build",
      "pdf.worker.min.mjs",
    ),
    dest: path.join(publicDir, "pdf.worker.legacy.min.mjs"),
  },
];

fs.mkdirSync(publicDir, { recursive: true });

for (const { src, dest } of copies) {
  if (!fs.existsSync(src)) {
    console.warn(`[copy-pdf-worker] skip missing: ${src}`);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log(`[copy-pdf-worker] ${path.basename(dest)}`);
}
