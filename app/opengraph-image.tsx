import { ImageResponse } from "next/og";

export const alt = "Yeti Homes Estate – Premium Real Estate in Nepal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "linear-gradient(135deg, #1C3664 0%, #15294D 50%, #0F1C33 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "20px",
            zIndex: 1,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 1080 1080" fill="none">
            <circle cx="540" cy="540" r="499.5" fill="#1C3664" stroke="#7F1416" strokeWidth="40" />
            <path
              d="M761.41 673.01V391.59l-89.57-81.07-14.04-12.71-112-101.37c-3.29-2.98-8.31-2.98-11.6 0L318.58 391.59v281.42"
              fill="#7F1416"
            />
            <path
              d="M761.41 673.01V391.59l-89.57-81.07-14.04-12.71-112-101.37c-3.29-2.98-8.31-2.98-11.6 0L318.58 391.59v281.42H58.41c0.06 0.23 0.13 0.47 0.19 0.7 17.2 62.07 46.09 119.3 84.17 169.14h794.46c38.08-49.84 66.97-107.07 84.17-169.14 0.06-0.23 0.13-0.47 0.19-0.7H761.41zM534.25 228.47c3.28-2.93 8.22-2.93 11.5 0l189.73 169.11L544.53 280.13c-2.78-1.71-6.28-1.71-9.06 0L344.52 397.58l189.73-169.11z"
              fill="white"
            />
            <path d="M545.75 228.47l189.73 169.11L544.53 280.13c-2.78-1.71-6.28-1.71-9.06 0L344.52 397.58l189.73-169.11c3.28-2.93 8.22-2.93 11.5 0z" fill="#FED700" />
          </svg>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
              margin: 0,
              fontFamily: "sans-serif",
            }}
          >
            Yeti Homes Estate
          </h1>
        </div>
        <p
          style={{
            fontSize: "26px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            margin: 0,
            fontWeight: 500,
            fontFamily: "sans-serif",
          }}
        >
          Premium Real Estate in Nepal
        </p>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "36px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <span>Houses</span>
          <span style={{ color: "#FED700" }}>✦</span>
          <span>Apartments</span>
          <span style={{ color: "#FED700" }}>✦</span>
          <span>Lands</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "6px",
            background: "#7F1416",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
