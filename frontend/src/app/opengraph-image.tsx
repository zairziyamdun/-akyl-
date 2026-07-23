import { ImageResponse } from "next/og";

export const alt = "AKYL — профессиональное управление МЖД";
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
            "linear-gradient(145deg, #0b1220 0%, #152238 48%, #1c334f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}
        >
          AKYL
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 650,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Профессиональное управление МЖД
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 920,
            }}
          >
            Методология и платформа для системного управления многоквартирными
            жилыми домами
          </div>
        </div>
      </div>
    ),
    size,
  );
}
