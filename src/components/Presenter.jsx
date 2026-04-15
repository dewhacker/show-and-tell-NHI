import { useState, useEffect, useRef } from "react";
import theme from "../theme";
import Slide from "./Slide";

// Eagerly load all notes markdown files as raw text
const noteFiles = import.meta.glob("/src/flavors/notes/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function resolveNotes(presenterNotesPath) {
  if (!presenterNotesPath) return null;
  // './notes/deepdive-1.md' → '/src/flavors/notes/deepdive-1.md'
  const key = `/src/flavors/${presenterNotesPath.replace(/^\.\//, "")}`;
  return noteFiles[key] || null;
}

function SlidePreview({ slide, label }) {
  const ref = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = containerWidth > 0 ? containerWidth / vw : 0;
  const previewHeight = vh * scale;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontFamily: "'Work Sans', sans-serif", fontSize: 10,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: theme.inkDim, marginBottom: 8,
      }}>
        {label}
      </div>
      <div ref={ref} style={{
        width: "100%",
        height: previewHeight || 200,
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${theme.rule}`,
        borderRadius: 4,
        background: theme.bg,
      }}>
        {slide && scale > 0 ? (
          <div style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            position: "absolute",
            top: 0, left: 0,
          }}>
            <Slide slide={slide} />
          </div>
        ) : !slide ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: "100%", color: theme.inkDim,
            fontFamily: "'Work Sans', sans-serif", fontSize: 12,
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            End of deck
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Presenter({ slides, currentIndex, flavor }) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const slide = slides[currentIndex];
  const nextSlide = slides[currentIndex + 1] || null;
  const notes = resolveNotes(slide?.presenter_notes);

  return (
    <div style={{
      background: theme.bgDeep, color: theme.ink,
      height: "100vh", boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1.2fr 1fr",
      gridTemplateRows: "1fr", gap: 32, padding: 32,
      fontFamily: "'Work Sans', sans-serif", overflow: "hidden",
    }}>
      {/* Left: slide previews */}
      <div style={{ overflow: "auto", minHeight: 0 }}>
        <SlidePreview
          slide={slide}
          label={`Current — ${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`}
        />
        <SlidePreview slide={nextSlide} label="Up next" />
      </div>

      {/* Right: notes + timer */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{
          fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
          color: theme.inkDim, marginBottom: 8,
        }}>
          Notes
        </div>
        <div style={{
          flex: 1, padding: 24, borderRadius: 4,
          border: `1px solid ${theme.rule}`,
          background: "rgba(0,0,0,0.2)",
          fontSize: 18, lineHeight: 1.7, color: theme.ink, fontWeight: 300,
          whiteSpace: "pre-wrap",
          overflow: "auto", minHeight: 0,
        }}>
          {notes || (
            <span style={{ color: theme.inkDim, fontStyle: "italic" }}>
              No notes for this slide.
            </span>
          )}
        </div>
        <div style={{
          marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.rule}`,
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 56, fontWeight: 500, color: theme.accent,
            letterSpacing: "-0.02em", lineHeight: 1,
          }}>
            {mm}:{ss}
          </div>
          <div style={{
            fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            color: theme.inkDim, textAlign: "right", lineHeight: 1.6,
          }}>
            {flavor.title}<br />
            {flavor.runtime} min target
          </div>
        </div>
      </div>
    </div>
  );
}
