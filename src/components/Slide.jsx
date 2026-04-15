import theme from "../theme";
import Eyebrow from "./Eyebrow";
import Title from "./Title";
import Body from "./Body";
import Footnote from "./Footnote";

// Eagerly import all images under src/ so local paths resolve through Vite
const imageFiles = import.meta.glob("/src/**/*.{jpg,jpeg,png,gif,webp,svg,avif}", {
  import: "default",
  eager: true,
});

function resolveImage(imagePath) {
  if (!imagePath || /^https?:\/\//.test(imagePath)) return imagePath;
  if (imagePath.startsWith("/")) return imagePath; // absolute = public/ path

  // Resolve relative path from src/flavors/ context
  const parts = ["src", "flavors", ...imagePath.split("/")];
  const resolved = [];
  for (const part of parts) {
    if (part === "..") resolved.pop();
    else if (part !== ".") resolved.push(part);
  }
  const key = "/" + resolved.join("/");
  return imageFiles[key] || imagePath;
}

export default function Slide({ slide }) {
  const base = {
    width: "100vw", height: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "120px 96px", boxSizing: "border-box",
    background: theme.bg, position: "relative", overflow: "hidden",
  };

  if (slide.kind === "cover-quiet") {
    return (
      <div style={base}>
        {slide.image && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${resolveImage(slide.image)})`,
            backgroundSize: "contain", backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.35,
          }} />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, ${theme.bg} 75%)`,
        }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 900 }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={80}>{slide.title}</Title>
          <Body max={680}>{slide.body}</Body>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <Footnote>{slide.footnote}</Footnote>
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "title") {
    return (
      <div style={base}>
        <div style={{ textAlign: "center", maxWidth: 900 }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={96}>{slide.title}</Title>
          <Body max={680}>{slide.body}</Body>
          <div style={{ marginTop: 64, color: theme.accent,
            fontFamily: "'Work Sans', sans-serif", fontSize: 11,
            letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {slide.footnote}
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "stat") {
    return (
      <div style={base}>
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 180, lineHeight: 1, color: theme.accent,
            fontWeight: 500, letterSpacing: "-0.02em",
            marginBottom: 32,
          }}>
            {slide.title}
          </div>
          <Body max={760}>{slide.body}</Body>
          <Footnote>{slide.footnote}</Footnote>
        </div>
      </div>
    );
  }

  if (slide.kind === "pivot") {
    return (
      <div style={{ ...base, background: theme.bgDeep }}>
        <div style={{ maxWidth: 900 }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={88}>{slide.title}</Title>
          <Body>{slide.body}</Body>
        </div>
      </div>
    );
  }

  if (slide.kind === "clip") {
    return (
      <div style={{ ...base, background: theme.bgDeep }}>
        <div style={{ maxWidth: 1000, width: "100%" }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={64}>{slide.title}</Title>
          <div style={{
            marginTop: 48, aspectRatio: "16/9", width: "100%",
            border: `1px solid ${theme.rule}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}>
            <div style={{ textAlign: "center", color: theme.inkDim,
              fontFamily: "'Work Sans', sans-serif", fontSize: 13,
              letterSpacing: "0.2em", textTransform: "uppercase" }}>
              ▶  video placeholder<br /><br />
              <span style={{ fontSize: 11 }}>{slide.footnote}</span>
            </div>
          </div>
          <Body max={900}>{slide.body}</Body>
        </div>
      </div>
    );
  }

  // content + content-heavy
  const titleSize = slide.kind === "content-heavy" ? 56 : 64;
  return (
    <div style={base}>
      <div style={{ maxWidth: 1000 }}>
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <Title size={titleSize}>{slide.title}</Title>
        <Body>{slide.body}</Body>
        <Footnote>{slide.footnote}</Footnote>
      </div>
    </div>
  );
}
