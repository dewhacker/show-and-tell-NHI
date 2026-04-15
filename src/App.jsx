import { useState, useEffect, useCallback, useRef } from "react";
import theme from "./theme";
import Slide from "./components/Slide";
import Chrome from "./components/Chrome";
import Index from "./components/Index";
import Settings from "./components/Settings";
import Presenter from "./components/Presenter";
import flavors from "./flavors";

const STORAGE_KEY = "observatory-flavor";
const STORAGE_KEY_INDEX = "observatory-index";
const isPresenter = new URLSearchParams(window.location.search).has("presenter");

export default function App() {
  const [flavorId, setFlavorId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "canonical";
  });
  const [i, setI] = useState(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY_INDEX), 10);
    return isNaN(stored) ? 0 : stored;
  });
  const [showIndex, setShowIndex] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const channelRef = useRef(null);

  const flavor = flavors.find((f) => f.id === flavorId) || flavors[0];
  const slides = flavor.slides;

  // Clamp index when slides change (e.g. switching to a shorter flavor)
  useEffect(() => {
    setI((prev) => Math.min(prev, slides.length - 1));
  }, [slides.length]);

  // BroadcastChannel for presenter sync
  useEffect(() => {
    const ch = new BroadcastChannel("observatory");
    channelRef.current = ch;
    ch.onmessage = (e) => {
      if (e.data.type === "sync") {
        setI(e.data.index);
        setFlavorId(e.data.flavorId);
        localStorage.setItem(STORAGE_KEY, e.data.flavorId);
        localStorage.setItem(STORAGE_KEY_INDEX, String(e.data.index));
      }
    };
    return () => ch.close();
  }, []);

  // Broadcast + persist state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INDEX, String(i));
    channelRef.current?.postMessage({ type: "sync", index: i, flavorId });
  }, [i, flavorId]);

  const go = useCallback((delta) => {
    setI((prev) => Math.max(0, Math.min(slides.length - 1, prev + delta)));
  }, [slides.length]);

  const switchFlavor = useCallback((id) => {
    setFlavorId(id);
    localStorage.setItem(STORAGE_KEY, id);
    setI(0);
    setShowSettings(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      // Presenter mode: navigation only
      if (isPresenter) {
        if (e.key === "ArrowRight" || e.key === " ") { go(1); e.preventDefault(); }
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "Home") setI(0);
        if (e.key === "End") setI(slides.length - 1);
        return;
      }

      if (showSettings) {
        if (e.key === "Escape" || e.key === "s" || e.key === "S") {
          setShowSettings(false);
          e.preventDefault();
        }
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") { go(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setShowIndex((s) => !s);
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(slides.length - 1);
      if ((e.key === "s" || e.key === "S") && !showIndex) {
        setShowSettings(true);
        e.preventDefault();
      }
      if ((e.key === "p" || e.key === "P") && !showIndex) {
        window.open(window.location.origin + "?presenter", "observatory-presenter");
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, slides.length, showIndex, showSettings]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Work+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.background = isPresenter ? theme.bgDeep : theme.bg;
  }, []);

  if (isPresenter) {
    return <Presenter slides={slides} currentIndex={i} flavor={flavor} />;
  }

  const slide = slides[i];

  return (
    <div style={{ background: theme.bg, color: theme.ink, minHeight: "100vh" }}>
      <Slide slide={slide} />
      <Chrome index={i} total={slides.length} flavorTitle={flavor.title} />
      {showIndex && (
        <Index
          slides={slides}
          current={i}
          onPick={(n) => { setI(n); setShowIndex(false); }}
        />
      )}
      {showSettings && (
        <Settings
          flavors={flavors}
          currentId={flavorId}
          onPick={switchFlavor}
        />
      )}
    </div>
  );
}
