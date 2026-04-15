import theme from "../theme";

export default function Eyebrow({ children }) {
  if (!children) return null;
  return (
    <div style={{
      fontFamily: "'Work Sans', sans-serif", fontSize: 12,
      letterSpacing: "0.3em", textTransform: "uppercase",
      color: theme.accent, marginBottom: 32,
    }}>
      {children}
    </div>
  );
}
