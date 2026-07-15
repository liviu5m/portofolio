import { useEffect, useRef, useState } from "react";
import BufferLine from "./components/BufferLine";
import StatusBar, { type Mode } from "./components/StatusBar";
import CommandPalette from "./components/CommandPalette";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Settings from "./sections/Settings";
import { buffers, type BufferId } from "./data/content";
import { useKeyPress } from "./hooks/useKeyPress";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function Shell() {
  const [active, setActive] = useState<BufferId>("home");
  const [mode, setMode] = useState<Mode>("NORMAL");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const { scanlines } = useTheme();
  const sectionRefs = useRef<Record<BufferId, HTMLDivElement | null>>({
    home: null,
    projects: null,
    experience: null,
    settings: null,
  });

  function goTo(id: BufferId) {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const pct = doc.scrollHeight > doc.clientHeight
        ? (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100
        : 0;
      setScrollPct(pct);

      const entries = buffers
        .map((b) => ({ id: b.id, el: sectionRefs.current[b.id] }))
        .filter((e) => e.el);
      let current: BufferId = "home";
      for (const { id, el } of entries) {
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useKeyPress(
    {
      j: () => window.scrollBy({ top: 120, behavior: "smooth" }),
      k: () => window.scrollBy({ top: -120, behavior: "smooth" }),
      ":": () => {
        setMode("COMMAND");
        setPaletteOpen(true);
      },
      i: () => setMode((m) => (m === "INSERT" ? "NORMAL" : "INSERT")),
      v: () => setMode((m) => (m === "VISUAL" ? "NORMAL" : "VISUAL")),
      Escape: () => {
        setMode("NORMAL");
        setPaletteOpen(false);
      },
      "1": () => goTo("home"),
      "2": () => goTo("projects"),
      "3": () => goTo("experience"),
      "4": () => goTo("settings"),
      g: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      G: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }),
    },
    paletteOpen
  );

  return (
    <div className={`min-h-screen bg-grid ${scanlines ? "scanlines" : ""}`}>
      <BufferLine active={active} onSelect={goTo} />

      <main className="pb-16">
        <div ref={(el) => { sectionRefs.current.home = el; }}>
          <Home />
        </div>
        <div ref={(el) => { sectionRefs.current.projects = el; }} className="border-t border-[var(--border)]">
          <Projects />
        </div>
        <div ref={(el) => { sectionRefs.current.experience = el; }} className="border-t border-[var(--border)]">
          <Experience />
        </div>
        <div ref={(el) => { sectionRefs.current.settings = el; }} className="border-t border-[var(--border)]">
          <Settings />
        </div>
      </main>

      <StatusBar mode={mode} active={active} scrollPct={scrollPct} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => {
          setPaletteOpen(false);
          setMode("NORMAL");
        }}
        onNavigate={goTo}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
