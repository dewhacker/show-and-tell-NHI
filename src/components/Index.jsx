import theme from "../theme";

export default function Index({ slides, current, onPick }) {
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
        ◉ Index · esc to close
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onPick(i)}
            style={{
              textAlign: "left", padding: 24, cursor: "pointer",
              background: i === current ? "rgba(232, 176, 75, 0.08)" : "transparent",
              border: `1px solid ${i === current ? theme.accent : theme.rule}`,
              color: theme.ink, fontFamily: "inherit",
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.2em",
              color: theme.inkDim, marginBottom: 12,
              fontFamily: "'Work Sans', sans-serif", textTransform: "uppercase" }}>
              {String(i + 1).padStart(2, "0")} · {s.kind}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, lineHeight: 1.2 }}>
              {s.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
