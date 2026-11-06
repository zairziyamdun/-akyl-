import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

type Block =
  | { kind: "h2" | "h3" | "p" | "quote"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "image"; alt: string; src: string };

const IMAGE_LINE = /^!\[([^\]]*)\]\((\S+?)\)$/;

function isSafeImageUrl(src: string): boolean {
  return /^https:\/\//i.test(src);
}

/** Parses the light markup used by the admin editor into blocks. */
export function parseMaterialContent(content: string): Block[] {
  const blocks: Block[] = [];
  const paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: "p", text: paragraph.join("\n") });
      paragraph.length = 0;
    }
  };
  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ kind: "list", items: list });
      list = [];
    }
  };

  for (const rawLine of content.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();

    if (line.length === 0) {
      flushParagraph();
      flushList();
      continue;
    }

    const image = IMAGE_LINE.exec(line);
    const imageSrc = image?.[2];
    if (imageSrc && isSafeImageUrl(imageSrc)) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "image", alt: image?.[1] ?? "", src: imageSrc });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "h3", text: line.slice(4) });
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "h2", text: line.slice(3) });
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "quote", text: line.slice(2) });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      list.push(line.slice(2));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

/** Supports **bold** inside text; everything else is rendered as plain text. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    const key = `${index}-${part.length}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    return <span key={key}>{part}</span>;
  });
}

export function MaterialContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = parseMaterialContent(content);

  return (
    <div
      className={cn(
        "space-y-5 text-base leading-8 text-slate-700 md:text-[17px]",
        className,
      )}
    >
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        switch (block.kind) {
          case "h2":
            return (
              <h2
                key={key}
                className="pt-4 text-2xl font-semibold tracking-tight text-slate-900"
              >
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="pt-2 text-xl font-semibold text-slate-900"
              >
                {renderInline(block.text)}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="border-l-4 border-slate-300 pl-4 italic text-slate-600"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          case "list":
            return (
              <ul key={key} className="list-disc space-y-1 pl-6">
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}-${item.length}`}>
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={key} className="my-6">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={1200}
                  height={800}
                  unoptimized
                  className="h-auto w-full rounded-2xl border border-slate-200"
                />
                {block.alt ? (
                  <figcaption className="mt-2 text-center text-sm text-slate-500">
                    {block.alt}
                  </figcaption>
                ) : null}
              </figure>
            );
          default:
            return (
              <p key={key} className="whitespace-pre-line">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
