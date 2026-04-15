import theme from "../theme";

export default function Footnote({ children }) {
  if (!children) return null;
  return (
    <div style={{
      fontFamily: "'Work Sans', sans-serif", fontSize: 11,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: theme.inkDim, marginTop: 48,
      paddingTop: 16, borderTop: `1px solid ${theme.rule}`,
      maxWidth: 400,
    }}>
      {children}
    </div>
  );
}
