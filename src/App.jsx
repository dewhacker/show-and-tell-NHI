import { useState, useEffect, useCallback } from "react";

/* ============================================================
   OBSERVATORY THEME
   Deep navy, warm off-white, amber accent. Serif display,
   clean sans body. Real NASA imagery via direct URLs.
   ============================================================ */

const theme = {
  bg: "#0B1426",
  bgDeep: "#060C1A",
  ink: "#F5F1E8",
  inkDim: "#A8A393",
  accent: "#E8B04B",
  accentDim: "#8A6A2E",
  rule: "rgba(245, 241, 232, 0.12)",
};

/* ============================================================
   SLIDE DATA
   Each slide: { id, kind, eyebrow, title, body, footnote, image }
   kind controls layout. Edit freely.
   ============================================================ */

const slides = [
  {
    id: 1,
    kind: "cover-quiet",
    eyebrow: "",
    title: "A pale blue dot.",
    body: "Everyone you have ever known lived out their lives here.",
    footnote: "Voyager 1 · 6 billion km · 1990",
    image: "https://images-assets.nasa.gov/image/PIA00452/PIA00452~orig.jpg",
  },
  {
    id: 2,
    kind: "title",
    eyebrow: "A talk in three acts",
    title: "Why ours is the generation.",
    body: "Cosmic scale. A hidden history. And a question we can no longer avoid.",
    footnote: "Press → to begin",
  },
  {
    id: 3,
    kind: "content",
    eyebrow: "Act I · The cosmic address",
    title: "Our neighborhood is crowded.",
    body: "Within 10 light-years of Earth there are roughly a dozen stars. Within 50, there are more than 1,400. We are not floating alone in the dark — we are in a dense, well-lit room.",
    footnote: "Source: RECONS / NASA",
  },
  {
    id: 4,
    kind: "content",
    eyebrow: "How we find them",
    title: "Transits and wobbles.",
    body: "We watch stars dim as planets pass in front of them. We watch stars wobble as planets tug on them. That is almost the entire trick — and it works.",
    footnote: "Transit photometry · radial velocity",
  },
  {
    id: 5,
    kind: "stat",
    eyebrow: "The curve that changed everything",
    title: "5 → 5,800+",
    body: "Confirmed exoplanets known in 1995 versus today. Thirty years ago, zero were confirmed around sun-like stars. Now we find them faster than we can name them.",
    footnote: "NASA Exoplanet Archive",
  },
  {
    id: 6,
    kind: "content",
    eyebrow: "And we've barely looked",
    title: "We found all of that through a straw.",
    body: "Kepler stared at one patch of sky the size of your fist held at arm's length. TESS is surveying more — but a fraction of one percent of the galaxy has been meaningfully searched for planets.",
    footnote: "Kepler field · ~0.25% of the sky",
  },
  {
    id: 7,
    kind: "stat",
    eyebrow: "Scaling up",
    title: "~300,000,000",
    body: "NASA's best estimate of potentially habitable, Earth-sized planets around sun-like stars in the Milky Way alone. Three hundred million Goldilocks candidates. In one galaxy. Out of two trillion.",
    footnote: "Bryson et al., 2021 · The Astronomical Journal",
  },
  {
    id: 8,
    kind: "clip",
    eyebrow: "Interlude",
    title: "Clip 1 — Kepler field flyover",
    body: "Drop your video file here or embed a YouTube URL. ~60 seconds. Visual, not talking-head.",
    footnote: "src=\"/clips/kepler-flyover.mp4\"",
  },
  {
    id: 9,
    kind: "pivot",
    eyebrow: "Act II · A hidden history",
    title: "So — have any of them visited?",
    body: "Here is where most serious talks end. We are going to keep going. But only with things that are on the public record, under oath, or from named witnesses.",
  },
  {
    id: 10,
    kind: "content",
    eyebrow: "The long record",
    title: "Bronze Age to Kenneth Arnold.",
    body: "Humans have told stories about anomalous things in the sky for as long as we have told stories. In 1947, a pilot named Kenneth Arnold saw nine objects over Mount Rainier. The modern era begins there.",
    footnote: "Arnold sighting · June 24, 1947",
  },
  {
    id: 11,
    kind: "content",
    eyebrow: "The pattern nobody wanted",
    title: "UFOs have a thing for nukes.",
    body: "Researcher Robert Hastings has collected testimony from more than 150 former U.S. military personnel describing UAP incidents at nuclear weapons sites. In 2010, seven of them testified together at the National Press Club. Malmstrom AFB, 1967: ten ICBMs went offline during a sighting.",
    footnote: "Hastings · UFOs and Nukes · 2010 Press Club",
  },
  {
    id: 12,
    kind: "content",
    eyebrow: "The convert",
    title: "J. Allen Hynek changed his mind.",
    body: "Hired by the Air Force to debunk sightings for Project Blue Book, Hynek spent twenty years as the program's chief skeptic. Then he quietly stopped being one. By the 1970s he was arguing the phenomenon was real and the investigation had been a joke.",
    footnote: "Project Blue Book · 1952–1969",
  },
  {
    id: 13,
    kind: "content",
    eyebrow: "The modern disclosure era",
    title: "2017 → 2023.",
    body: "The New York Times breaks AATIP. Luis Elizondo resigns and goes public. Chris Mellon follows. In July 2023, former intelligence officer David Grusch testifies under oath to Congress that multiple witnesses told him the U.S. possesses non-human craft. The UAP Disclosure Act passes — with its teeth removed.",
    footnote: "NYT Dec 2017 · Grusch testimony Jul 2023 · UAPDA 2023",
  },
  {
    id: 14,
    kind: "clip",
    eyebrow: "Interlude",
    title: "Clip 2 — Grusch testimony or Navy FLIR",
    body: "~60 seconds of the most credible on-camera moment you can find. Let it breathe. Don't talk over it.",
    footnote: "src=\"/clips/grusch-excerpt.mp4\"",
  },
  {
    id: 15,
    kind: "content",
    eyebrow: "What is actually being described",
    title: "The Five Observables.",
    body: "Anti-gravity lift. Sudden and instantaneous acceleration. Hypersonic velocity without signatures. Low observability. Trans-medium travel. Hal Puthoff and Eric Davis have spent decades arguing these are not misidentifications — they are a physics problem.",
    footnote: "Puthoff / Davis · see also the alleged Wilson-Davis memo",
  },
  {
    id: 16,
    kind: "content",
    eyebrow: "Act III · Why now",
    title: "The anti-Turing moment.",
    body: "We are weeks, not years, from a world where no photograph, no video, no audio recording can be trusted on its face. The window in which physical evidence could still convince a skeptical public is closing. If disclosure doesn't happen before it shuts, it may never happen at all.",
  },
  {
    id: 17,
    kind: "content-heavy",
    eyebrow: "The knife's edge",
    title: "We have godlike tools and stone-age wisdom.",
    body: "Nuclear arsenals on hair-trigger. Institutions the public no longer trusts. A paper published in a peer-reviewed astrobiology journal (Schmidt & Frank, 2018) seriously asks whether we would even be able to tell if a prior industrial civilization had existed on Earth. The answer is: probably not. We are not guaranteed to be the first. We are not guaranteed to be the last.",
    footnote: "Schmidt & Frank · Silurian Hypothesis · Int. J. Astrobiology",
  },
  {
    id: 18,
    kind: "cover-quiet",
    eyebrow: "Finale",
    title: "Hope is a discipline.",
    body: "If any of this is real, it is the largest story in human history — and it may also be the catalyst we need to grow up. To build sustainable systems. To remember we share one small rock. The conversation itself is the beginning. Thank you.",
    footnote: "— end —",
  },
];

/* ============================================================
   LAYOUT COMPONENTS
   ============================================================ */

function Chrome({ index, total, title }) {
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
        <span>← →  esc for index</span>
      </div>
    </>
  );
}

function Eyebrow({ children }) {
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

function Title({ children, size = 72 }) {
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

function Body({ children, max = 720 }) {
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

function Footnote({ children }) {
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

/* ============================================================
   SLIDE RENDERERS
   ============================================================ */

function Slide({ slide }) {
  const base = {
    width: "100vw", height: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "120px 96px", boxSizing: "border-box",
    background: theme.bg, position: "relative", overflow: "hidden",
  };

  if (slide.kind === "cover-quiet") {
    return (
      <div style={base}>
        {slide.image && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.35,
          }} />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, ${theme.bg} 75%)`,
        }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 900 }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={80}>{slide.title}</Title>
          <Body max={680}>{slide.body}</Body>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <Footnote>{slide.footnote}</Footnote>
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "title") {
    return (
      <div style={base}>
        <div style={{ textAlign: "center", maxWidth: 900 }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={96}>{slide.title}</Title>
          <Body max={680}>{slide.body}</Body>
          <div style={{ marginTop: 64, color: theme.accent,
            fontFamily: "'Work Sans', sans-serif", fontSize: 11,
            letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {slide.footnote}
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "stat") {
    return (
      <div style={base}>
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 180, lineHeight: 1, color: theme.accent,
            fontWeight: 500, letterSpacing: "-0.02em",
            marginBottom: 32,
          }}>
            {slide.title}
          </div>
          <Body max={760}>{slide.body}</Body>
          <Footnote>{slide.footnote}</Footnote>
        </div>
      </div>
    );
  }

  if (slide.kind === "pivot") {
    return (
      <div style={{ ...base, background: theme.bgDeep }}>
        <div style={{ maxWidth: 900 }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={88}>{slide.title}</Title>
          <Body>{slide.body}</Body>
        </div>
      </div>
    );
  }

  if (slide.kind === "clip") {
    return (
      <div style={{ ...base, background: theme.bgDeep }}>
        <div style={{ maxWidth: 1000, width: "100%" }}>
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Title size={64}>{slide.title}</Title>
          <div style={{
            marginTop: 48, aspectRatio: "16/9", width: "100%",
            border: `1px solid ${theme.rule}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}>
            <div style={{ textAlign: "center", color: theme.inkDim,
              fontFamily: "'Work Sans', sans-serif", fontSize: 13,
              letterSpacing: "0.2em", textTransform: "uppercase" }}>
              ▶  video placeholder<br /><br />
              <span style={{ fontSize: 11 }}>{slide.footnote}</span>
            </div>
          </div>
          <Body max={900}>{slide.body}</Body>
        </div>
      </div>
    );
  }

  // content + content-heavy
  const titleSize = slide.kind === "content-heavy" ? 56 : 64;
  return (
    <div style={base}>
      <div style={{ maxWidth: 1000 }}>
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <Title size={titleSize}>{slide.title}</Title>
        <Body>{slide.body}</Body>
        <Footnote>{slide.footnote}</Footnote>
      </div>
    </div>
  );
}

/* ============================================================
   INDEX / OVERVIEW
   ============================================================ */

function Index({ current, onPick, onClose }) {
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

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [i, setI] = useState(0);
  const [showIndex, setShowIndex] = useState(false);

  const go = useCallback((delta) => {
    setI((prev) => Math.max(0, Math.min(slides.length - 1, prev + delta)));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { go(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setShowIndex((s) => !s);
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Google Fonts injection
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Work+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.background = theme.bg;
  }, []);

  const slide = slides[i];

  return (
    <div style={{ background: theme.bg, color: theme.ink, minHeight: "100vh" }}>
      <Slide slide={slide} />
      <Chrome index={i} total={slides.length} title={slide.eyebrow || "Untitled"} />
      {showIndex && (
        <Index
          current={i}
          onPick={(n) => { setI(n); setShowIndex(false); }}
          onClose={() => setShowIndex(false)}
        />
      )}
    </div>
  );
}
