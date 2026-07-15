import Panel from "../components/Panel";
import { timeline, certifications, languages } from "../data/content";

const TAG_COLOR: Record<string, string> = {
  origin: "var(--accent)",
  growth: "var(--accent-2)",
  competition: "var(--accent-3)",
  education: "var(--accent-4)",
  practice: "var(--danger)",
};

export default function Experience() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-16 space-y-6">
      <div>
        <p className="text-xs text-[var(--fg-dim)]">
          <span style={{ color: "var(--accent-3)" }}>:log</span> — commit history
        </p>
        <h2 className="text-lg font-bold text-[var(--fg-bright)] mt-1">Experience &amp; Achievements</h2>
      </div>

      <Panel filename="experience.log">
        <ol className="relative border-l border-[var(--border)] ml-2 space-y-6">
          {timeline.map((entry, i) => {
            const color = TAG_COLOR[entry.tag] ?? "var(--accent)";
            return (
              <li key={i} className="ml-5 relative">
                <span
                  className="absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full border-2"
                  style={{ borderColor: color, background: "var(--bg-panel)" }}
                />
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-bold" style={{ color }}>
                    {entry.when}
                  </span>
                  <span className="text-sm font-bold text-[var(--fg-bright)]">{entry.title}</span>
                  <span className="text-[10px] uppercase tracking-wide text-[var(--fg-dim)] border border-[var(--border)] px-1">
                    {entry.tag}
                  </span>
                </div>
                <p className="text-xs text-[var(--fg-dim)] mt-1">{entry.detail}</p>
              </li>
            );
          })}
        </ol>
      </Panel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Panel filename="certifications.txt" accent="var(--accent-2)">
          <ul className="space-y-1.5 text-sm">
            {certifications.map((c) => (
              <li key={c} className="text-[var(--fg)]">
                <span style={{ color: "var(--accent-2)" }}>✓ </span>
                {c}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel filename="languages.txt" accent="var(--accent-4)">
          <ul className="space-y-1.5 text-sm">
            {languages.map((l) => (
              <li key={l.name} className="flex justify-between text-[var(--fg)]">
                <span>{l.name}</span>
                <span className="text-[var(--fg-dim)]">{l.level}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
