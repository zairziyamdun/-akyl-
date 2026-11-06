type JsonLdProps = {
  data: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;
};

/** Escapes "<" so text like "</script>" inside the data cannot close the tag. */
function serializeJsonLd(data: JsonLdProps["data"]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inlined; "<" is escaped
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
