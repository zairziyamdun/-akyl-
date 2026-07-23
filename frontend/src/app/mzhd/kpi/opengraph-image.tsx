import { ImageResponse } from "next/og";

export const alt = "KPI и эффективность управления МЖД | AKYL";
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
            "linear-gradient(145deg, #1e1b4b 0%, #312e81 48%, #4338ca 100%)",
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
          AKYL · KPI
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
            KPI и эффективность управления МЖД
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
            Технические, финансовые и сервисные метрики · индекс IEU
          </div>
        </div>
      </div>
    ),
    size,
  );
}
