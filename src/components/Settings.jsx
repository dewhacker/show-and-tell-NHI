import theme from "../theme";

export default function Settings({ flavors, currentId, onPick }) {
  const current = flavors.find((f) => f.id === currentId) || flavors[0];

  return (
    <div style={{
      position: "fixed", inset: 0, background: theme.bgDeep,
      zIndex: 100, padding: 80, overflow: "auto",
    }}>
      <div style={{
        fontFamily: "'Work Sans', sans-serif", fontSize: 11,
        letterSpacing: "0.3em", textTransform: "uppercase",
        color: theme.accent, marginBottom: 48,
      }}>
        ◉ Settings · esc to close
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {flavors.map((f) => (
          <button
            key={f.id}
            onClick={() => onPick(f.id)}
            style={{
              textAlign: "left", padding: 24, cursor: "pointer",
              background: f.id === currentId ? "rgba(232, 176, 75, 0.08)" : "transparent",
              border: `1px solid ${f.id === currentId ? theme.accent : theme.rule}`,
              color: theme.ink, fontFamily: "inherit",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, lineHeight: 1.2, marginBottom: 12 }}>
              {f.title}
            </div>
            <div style={{ fontSize: 13, color: theme.inkDim,
              fontFamily: "'Work Sans', sans-serif", lineHeight: 1.5 }}>
              {f.description}
            </div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em",
              color: theme.inkDim, marginTop: 12,
              fontFamily: "'Work Sans', sans-serif", textTransform: "uppercase" }}>
              {f.runtime} min · {f.slides.length} slides
              {f.id === currentId && <span style={{ color: theme.accent, marginLeft: 12 }}>● active</span>}
            </div>
          </button>
        ))}
      </div>
      <div style={{
        marginTop: 48, paddingTop: 16, borderTop: `1px solid ${theme.rule}`,
        fontFamily: "'Work Sans', sans-serif", fontSize: 11,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: theme.inkDim,
      }}>
        {current.title} · {current.runtime} min
      </div>
    </div>
  );
}
