import { ImageResponse } from "next/og";

import {
  fetchPublishedMaterialOnServer,
  LIBRARY_TYPE_LABELS,
} from "@/entities/library-material";

/**
 * Social preview for articles without a cover photo: a branded card with the
 * title, in the same style as the site's other Open Graph images.
 */

const SIZE = { width: 1200, height: 630 };

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const material = await fetchPublishedMaterialOnServer(id);

  if (!material) {
    return new Response("Not found", { status: 404 });
  }

  const title = material.title;
  const titleSize = title.length > 90 ? 44 : title.length > 55 ? 52 : 60;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background:
          "linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        AKYL · БАЗА ЗНАНИЙ
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            color: "#c9a962",
          }}
        >
          {`${LIBRARY_TYPE_LABELS[material.type]} · ${material.topic}`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 650,
            lineHeight: 1.12,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        akyl.kz/library
      </div>
    </div>,
    SIZE,
  );
}
