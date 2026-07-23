import { ImageResponse } from "next/og";

export const alt = "Управление МЖД как профессиональная система | AKYL";
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
            "linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          AKYL · МЕТОДОЛОГИЯ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 650,
              lineHeight: 1.12,
              maxWidth: 980,
            }}
          >
            Управление МЖД как профессиональная система
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
            Архитектура, роли, процессы, финансы, KPI и индекс эффективности в
            единой модели
          </div>
        </div>
      </div>
    ),
    size,
  );
}
