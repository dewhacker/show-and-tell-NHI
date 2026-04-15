import theme from "../theme";

export default function Chrome({ index, total, title, flavorTitle }) {
  return (
    <>
      <div style={{
        position: "fixed", top: 32, left: 48, right: 48,
        display: "flex", justifyContent: "space-between",
        fontFamily: "'Work Sans', sans-serif", fontSize: 11,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: theme.inkDim, zIndex: 10,
      }}>
        <span>◉ Observatory</span>
        <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
      <div style={{
        position: "fixed", bottom: 32, left: 48, right: 48,
        display: "flex", justifyContent: "space-between",
        fontFamily: "'Work Sans', sans-serif", fontSize: 11,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: theme.inkDim, zIndex: 10,
      }}>
        <span>{title}</span>
        <span style={{ display: "flex", gap: 24 }}>
          <span style={{ color: theme.accentDim }}>{flavorTitle}</span>
          <span>← →  esc  s</span>
        </span>
      </div>
    </>
  );
}
