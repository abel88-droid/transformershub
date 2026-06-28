import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.18), transparent 60%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            color: "#D4AF37",
            fontFamily: "sans-serif",
            marginBottom: 24,
          }}
        >
          BATCH 01 / EST. INDIA
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#F5F1E8",
            fontFamily: "sans-serif",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          Fuel Your
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#D4AF37",
            fontFamily: "sans-serif",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          Transformation
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6B6B6E",
            fontFamily: "sans-serif",
            marginTop: 28,
            letterSpacing: 4,
          }}
        >
          TRANSFORMERS PROTEIN HUB
        </div>
      </div>
    ),
    { ...size }
  );
}
