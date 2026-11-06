/**
 * Article body format.
 *
 * New articles are stored as a TipTap/ProseMirror JSON document (string in the
 * `content` column). Articles written before the visual editor use a light
 * text markup (`## heading`, `- item`, `**bold**`, `![alt](url)`); they are
 * converted to the same document shape on read, so one renderer handles both.
 */

export type RichMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

export type RichNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: RichNode[];
  text?: string;
  marks?: RichMark[];
};

export type RichDoc = { type: "doc"; content: RichNode[] };

export const EMPTY_DOC: RichDoc = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function isSafeHttpUrl(value: unknown, httpsOnly = false): boolean {
  if (typeof value !== "string") return false;
  return httpsOnly ? /^https:\/\//i.test(value) : /^https?:\/\//i.test(value);
}

function inlineFromText(text: string): RichNode[] {
  const nodes: RichNode[] = [];
  for (const part of text.split(/(\*\*[^*]+\*\*)/g)) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      nodes.push({
        type: "text",
        text: part.slice(2, -2),
        marks: [{ type: "bold" }],
      });
    } else {
      nodes.push({ type: "text", text: part });
    }
  }
  return nodes;
}

function paragraph(text: string): RichNode {
  const lines = text.split("\n");
  const content: RichNode[] = [];
  lines.forEach((line, index) => {
    if (index > 0) content.push({ type: "hardBreak" });
    content.push(...inlineFromText(line));
  });
  return content.length > 0
    ? { type: "paragraph", content }
    : { type: "paragraph" };
}

const IMAGE_LINE = /^!\[([^\]]*)\]\((\S+?)\)$/;

/** Converts the pre-editor text markup into a document. */
export function legacyMarkupToDoc(markup: string): RichDoc {
  const content: RichNode[] = [];
  const para: string[] = [];
  let list: RichNode[] = [];

  const flushPara = () => {
    if (para.length > 0) {
      content.push(paragraph(para.join("\n")));
      para.length = 0;
    }
  };
  const flushList = () => {
    if (list.length > 0) {
      content.push({ type: "bulletList", content: list });
      list = [];
    }
  };

  for (const rawLine of markup.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }

    const image = IMAGE_LINE.exec(line);
    const src = image?.[2];
    if (src && isSafeHttpUrl(src, true)) {
      flushPara();
      flushList();
      content.push({ type: "image", attrs: { src, alt: image?.[1] ?? "" } });
      continue;
    }

    const heading = /^(#{2,3})\s+(.+)$/.exec(line);
    if (heading?.[1] && heading[2]) {
      flushPara();
      flushList();
      content.push({
        type: "heading",
        attrs: { level: heading[1].length },
        content: inlineFromText(heading[2]),
      });
      continue;
    }

    if (line.startsWith("> ")) {
      flushPara();
      flushList();
      content.push({ type: "blockquote", content: [paragraph(line.slice(2))] });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushPara();
      list.push({ type: "listItem", content: [paragraph(line.slice(2))] });
      continue;
    }

    flushList();
    para.push(line);
  }

  flushPara();
  flushList();
  return content.length > 0 ? { type: "doc", content } : EMPTY_DOC;
}

/** Parses stored content (JSON document or legacy markup) into a document. */
export function parseRichContent(content: string | null | undefined): RichDoc {
  const value = (content ?? "").trim();
  if (!value) return EMPTY_DOC;
  if (value.startsWith("{")) {
    try {
      const parsed = JSON.parse(value) as RichDoc;
      if (parsed?.type === "doc" && Array.isArray(parsed.content)) {
        return parsed;
      }
    } catch {
      // fall through to legacy markup
    }
  }
  return legacyMarkupToDoc(value);
}

export function serializeRichContent(doc: RichDoc): string {
  return JSON.stringify(doc);
}

export function nodeText(node: RichNode): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hardBreak") return "\n";
  const inner = (node.content ?? []).map(nodeText).join("");
  return node.type === "paragraph" ||
    node.type === "heading" ||
    node.type === "listItem"
    ? `${inner}\n`
    : inner;
}

export function docPlainText(doc: RichDoc): string {
  return doc.content.map(nodeText).join("").trim();
}

export function countWords(doc: RichDoc): number {
  const text = docPlainText(doc);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

export function countImages(doc: RichDoc): number {
  let total = 0;
  const walk = (node: RichNode) => {
    if (node.type === "image") total += 1;
    node.content?.forEach(walk);
  };
  doc.content.forEach(walk);
  return total;
}

/** ~180 words per minute, rounded up, at least one minute. */
export function estimateReadTime(doc: RichDoc): string {
  const minutes = Math.max(1, Math.ceil(countWords(doc) / 180));
  return `${minutes} мин`;
}

export function slugifyHeading(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "section"}-${index + 1}`;
}

export type DocHeading = { id: string; text: string; level: number };

/** Top-level h2/h3 headings with stable ids for the table of contents. */
export function extractHeadings(doc: RichDoc): DocHeading[] {
  const headings: DocHeading[] = [];
  doc.content.forEach((node) => {
    if (node.type !== "heading") return;
    const text = nodeText(node).trim();
    if (!text) return;
    const level = Number(node.attrs?.level ?? 2);
    headings.push({
      id: slugifyHeading(text, headings.length),
      text,
      level: level <= 2 ? 2 : 3,
    });
  });
  return headings;
}
