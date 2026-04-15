import theme from "../theme";

export default function Chrome({ index, total, flavorTitle }) {
  return (
    <div style={{
      position: "fixed", bottom: 16, right: 24,
      fontFamily: "'Work Sans', sans-serif", fontSize: 10,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: theme.inkDim, zIndex: 10, opacity: 0.5,
    }}>
      {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      {flavorTitle && <span style={{ marginLeft: 12, color: theme.accentDim }}>{flavorTitle}</span>}
    </div>
  );
}
