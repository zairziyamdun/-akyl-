import { ImageResponse } from "next/og";

export const alt = "Финансовое управление МЖД | AKYL";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(145deg, #052e16 0%, #14532d 48%, #166534 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          AKYL · ФИНАНСЫ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 50,
              fontWeight: 650,
              lineHeight: 1.12,
              maxWidth: 980,
            }}
          >
            Финансовое управление МЖД
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 900,
            }}
          >
            Бюджет, план-факт, задолженность и прозрачная отчётность
          </div>
        </div>
      </div>
    ),
    size,
  );
}
