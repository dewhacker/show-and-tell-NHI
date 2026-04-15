import theme from "../theme";

export default function Title({ children, size = 72 }) {
  return (
    <h1 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 500, fontSize: size, lineHeight: 1.05,
      margin: 0, color: theme.ink, letterSpacing: "-0.01em",
    }}>
      {children}
    </h1>
  );
}
