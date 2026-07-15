import Panel from "../components/Panel";
import Terminal from "../components/Terminal";
import { profile, skills } from "../data/content";

const ASCII_NAME = `██╗     ██╗██╗   ██╗██╗██╗   ██╗
██║     ██║██║   ██║██║██║   ██║
██║     ██║██║   ██║██║██║   ██║
██║     ██║╚██╗ ██╔╝██║██║   ██║
███████╗██║ ╚████╔╝ ██║╚██████╔╝
╚══════╝╚═╝  ╚═══╝  ╚═╝ ╚═════╝ `;

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-16 space-y-6">
      <section className="animate-fade-up">
        <pre
          className="overflow-x-auto text-[6px] xs:text-[8px] sm:text-xs md:text-sm leading-none"
          style={{ color: "var(--accent)" }}
          aria-hidden="true"
        >
          {ASCII_NAME}
        </pre>
        <h1 className="sr-only">{profile.name}</h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--fg-bright)]">
          <span style={{ color: "var(--accent-2)" }}>#</span> {profile.role}
        </p>
        <p className="text-xs sm:text-sm text-[var(--fg-dim)]">
          {profile.location} · <span style={{ color: "var(--accent-3)" }}>{profile.handle}</span>
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Panel filename="about.md" accent="var(--accent-2)" className="lg:col-span-3">
          <p className="text-sm leading-relaxed text-[var(--fg)]">{profile.summary}</p>
          <p className="mt-3 text-sm text-[var(--fg-dim)]">
            He's a fast, self-motivated learner — school comes effortlessly, which frees up time for
            deeper study of languages, systems, and the math behind them.
          </p>
        </Panel>

        <Panel filename="skills.json" accent="var(--accent-3)" className="lg:col-span-2">
          <div className="space-y-3 text-xs">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <div className="text-[var(--fg-dim)] uppercase tracking-wide mb-1">{group}</div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="border border-[var(--border)] px-1.5 py-0.5 text-[var(--fg)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section>
        <Panel filename="~/portfolio — zsh" accent="var(--accent)">
          <Terminal />
        </Panel>
      </section>
    </div>
  );
}
