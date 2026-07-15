import Panel from "../components/Panel";
import { useTheme, type ThemeName } from "../context/ThemeContext";
import { profile } from "../data/content";

const THEMES: { id: ThemeName; label: string; swatch: string[] }[] = [
  { id: "tokyonight", label: "tokyonight", swatch: ["#9ece6a", "#7dcfff", "#ff9e64"] },
  { id: "gruvbox", label: "gruvbox", swatch: ["#b8bb26", "#83a598", "#fe8019"] },
  { id: "catppuccin", label: "catppuccin", swatch: ["#a6e3a1", "#89dceb", "#fab387"] },
];

export default function Settings() {
  const { theme, setTheme, gridDensity, setGridDensity, scanlines, setScanlines } = useTheme();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-16 space-y-6">
      <div>
        <p className="text-xs text-[var(--fg-dim)]">
          <span style={{ color: "var(--accent-4)" }}>:e</span> ~/.config/nvim/config.lua
        </p>
        <h2 className="text-lg font-bold text-[var(--fg-bright)] mt-1">Settings</h2>
      </div>

      <Panel filename="config.lua" accent="var(--accent-4)">
        <pre className="text-xs sm:text-sm leading-relaxed overflow-x-auto">
<span style={{ color: "var(--fg-dim)" }}>-- colorscheme{"\n"}</span>
<span style={{ color: "var(--accent-2)" }}>require</span>(<span style={{ color: "var(--accent)" }}>'colorscheme'</span>).setup({"{"}
{"\n  "}<span style={{ color: "var(--fg)" }}>scheme</span> = <span style={{ color: "var(--accent)" }}>"{theme}"</span>,
{"\n  "}<span style={{ color: "var(--fg)" }}>grid</span>   = <span style={{ color: "var(--accent-3)" }}>{gridDensity}</span>,
{"\n  "}<span style={{ color: "var(--fg)" }}>scanlines</span> = <span style={{ color: scanlines ? "var(--accent)" : "var(--danger)" }}>{String(scanlines)}</span>,
{"\n"}{"}"})
        </pre>

        <div className="mt-6 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wide text-[var(--fg-dim)] mb-2">colorscheme</div>
            <div className="flex flex-wrap gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 border px-3 py-1.5 text-xs transition-colors ${
                    theme === t.id
                      ? "border-[var(--fg-bright)] text-[var(--fg-bright)]"
                      : "border-[var(--border)] text-[var(--fg-dim)] hover:text-[var(--fg)]"
                  }`}
                >
                  <span className="flex gap-0.5">
                    {t.swatch.map((c) => (
                      <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-[var(--fg-dim)] mb-2">
              grid density — {gridDensity}px
            </div>
            <input
              type="range"
              min={14}
              max={64}
              step={2}
              value={gridDensity}
              onChange={(e) => setGridDensity(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-[var(--fg)] cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={scanlines}
              onChange={(e) => setScanlines(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            CRT scanline overlay
          </label>
        </div>
      </Panel>

      <Panel filename="contact.env" accent="var(--accent-3)">
        <div className="text-xs sm:text-sm space-y-1">
          <div><span className="text-[var(--fg-dim)]">EMAIL=</span>{profile.email}</div>
          <div><span className="text-[var(--fg-dim)]">GITHUB=</span>{profile.github}</div>
          <div><span className="text-[var(--fg-dim)]">LEETCODE=</span>{profile.leetcode}</div>
        </div>
      </Panel>
    </div>
  );
}
