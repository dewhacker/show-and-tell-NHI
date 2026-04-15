import theme from "../theme";

export default function Body({ children, max = 720 }) {
  return (
    <p style={{
      fontFamily: "'Work Sans', sans-serif", fontSize: 20,
      lineHeight: 1.6, color: theme.ink, maxWidth: max,
      marginTop: 32, marginBottom: 0, fontWeight: 300,
    }}>
      {children}
    </p>
  );
}
