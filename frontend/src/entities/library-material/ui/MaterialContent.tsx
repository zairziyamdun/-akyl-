import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

import {
  isSafeHttpUrl,
  nodeText,
  parseRichContent,
  type RichDoc,
  type RichMark,
  type RichNode,
  slugifyHeading,
} from "../model/content";

/**
 * Renders an article document with an allow-list of node types — nothing from
 * the stored JSON is ever injected as raw HTML.
 */

function applyMarks(
  text: ReactNode,
  marks: RichMark[] | undefined,
  key: string,
) {
  let out = text;
  for (const mark of marks ?? []) {
    switch (mark.type) {
      case "bold":
        out = <strong className="font-semibold text-slate-900">{out}</strong>;
        break;
      case "italic":
        out = <em>{out}</em>;
        break;
      case "underline":
        out = <u>{out}</u>;
        break;
      case "strike":
        out = <s>{out}</s>;
        break;
      case "code":
        out = (
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">
            {out}
          </code>
        );
        break;
      case "link": {
        const href = mark.attrs?.href;
        if (
          typeof href === "string" &&
          (isSafeHttpUrl(href) || href.startsWith("mailto:"))
        ) {
          out = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 hover:decoration-sky-700"
            >
              {out}
            </a>
          );
        }
        break;
      }
      default:
        break;
    }
  }
  return <span key={key}>{out}</span>;
}

function renderInline(nodes: RichNode[] | undefined, keyPrefix: string) {
  return (nodes ?? []).map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    if (node.type === "hardBreak") return <br key={key} />;
    if (node.type === "text")
      return applyMarks(node.text ?? "", node.marks, key);
    return null;
  });
}

function renderBlock(
  node: RichNode,
  key: string,
  headingIds: Map<RichNode, string>,
): ReactNode {
  switch (node.type) {
    case "paragraph":
      return node.content?.length ? (
        <p key={key}>{renderInline(node.content, key)}</p>
      ) : (
        <p key={key} aria-hidden className="h-4" />
      );
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      const id = headingIds.get(node);
      return level <= 2 ? (
        <h2
          key={key}
          id={id}
          className="scroll-mt-28 pt-6 text-2xl font-semibold leading-tight tracking-tight text-slate-900 md:text-[28px]"
        >
          {renderInline(node.content, key)}
        </h2>
      ) : (
        <h3
          key={key}
          id={id}
          className="scroll-mt-28 pt-4 text-xl font-semibold leading-snug text-slate-900"
        >
          {renderInline(node.content, key)}
        </h3>
      );
    }
    case "bulletList":
    case "orderedList": {
      const items = (node.content ?? []).map((item, index) => (
        <li key={`${key}-${index}`} className="pl-1">
          {(item.content ?? []).map((child, childIndex) =>
            child.type === "paragraph" ? (
              <span key={`${key}-${index}-${childIndex}`} className="block">
                {renderInline(child.content, `${key}-${index}-${childIndex}`)}
              </span>
            ) : (
              renderBlock(child, `${key}-${index}-${childIndex}`, headingIds)
            ),
          )}
        </li>
      ));
      return node.type === "bulletList" ? (
        <ul
          key={key}
          className="list-disc space-y-2 pl-6 marker:text-slate-400"
        >
          {items}
        </ul>
      ) : (
        <ol
          key={key}
          className="list-decimal space-y-2 pl-6 marker:text-slate-400"
        >
          {items}
        </ol>
      );
    }
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-sky-500 bg-sky-50/60 py-3 pl-5 pr-4 text-lg italic text-slate-700"
        >
          {(node.content ?? []).map((child, index) =>
            renderBlock(child, `${key}-${index}`, headingIds),
          )}
        </blockquote>
      );
    case "image": {
      const src = node.attrs?.src;
      if (!isSafeHttpUrl(src, true)) return null;
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      return (
        <figure key={key} className="my-8">
          <Image
            src={src as string}
            alt={alt}
            width={1200}
            height={800}
            unoptimized
            className="h-auto w-full rounded-2xl border border-slate-200 bg-slate-50"
          />
          {alt ? (
            <figcaption className="mt-3 text-center text-sm text-slate-500">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    case "horizontalRule":
      return <hr key={key} className="my-10 border-slate-200" />;
    case "codeBlock":
      return (
        <pre
          key={key}
          className="overflow-x-auto rounded-2xl bg-slate-900 p-5 text-sm leading-6 text-slate-100"
        >
          <code>{(node.content ?? []).map((c) => c.text ?? "").join("")}</code>
        </pre>
      );
    default:
      return null;
  }
}

/** Same ids as `extractHeadings`, so table-of-contents links match. */
function headingIdMap(doc: RichDoc): Map<RichNode, string> {
  const map = new Map<RichNode, string>();
  let index = 0;
  for (const node of doc.content) {
    if (node.type !== "heading") continue;
    const text = nodeText(node).trim();
    if (!text) continue;
    map.set(node, slugifyHeading(text, index));
    index += 1;
  }
  return map;
}

export function MaterialContent({
  content,
  doc,
  className,
}: {
  /** Stored content string (JSON document or legacy markup). */
  content?: string;
  /** Already parsed document (takes precedence over `content`). */
  doc?: RichDoc;
  className?: string;
}) {
  const document = doc ?? parseRichContent(content);
  const headingIds = headingIdMap(document);

  return (
    <div
      className={cn(
        "space-y-5 break-words text-[17px] leading-8 text-slate-700",
        className,
      )}
    >
      {document.content.map((node, index) =>
        renderBlock(node, `n${index}`, headingIds),
      )}
    </div>
  );
}
