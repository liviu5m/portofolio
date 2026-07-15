import { useState } from "react";
import Panel from "../components/Panel";
import { projects, type Project } from "../data/content";

const ACCENTS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--accent-4)", "var(--danger)"];

function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Panel filename={`${project.slug}.tsx`} accent={accent}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[var(--fg-bright)]">{project.name}</h3>
          <p className="text-xs text-[var(--fg-dim)] mt-0.5">{project.tagline}</p>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-xs border border-[var(--border)] px-2 py-1 hover:border-[var(--border-bright)] hover:text-[var(--fg-bright)] transition-colors"
          style={{ color: accent }}
        >
          open ↗
        </a>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.stack.map((s) => (
          <span key={s} className="text-[10px] border border-[var(--border)] px-1.5 py-0.5 text-[var(--fg-dim)]">
            {s}
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 text-xs text-[var(--fg-dim)] hover:text-[var(--fg)] flex items-center gap-1"
      >
        <span style={{ color: accent }}>{open ? "▾" : "▸"}</span>
        {open ? "fold diff" : "expand diff"}
      </button>

      {open && (
        <ul className="mt-2 space-y-1.5 text-xs text-[var(--fg)] border-l-2 pl-3" style={{ borderColor: accent }}>
          {project.bullets.map((b, i) => (
            <li key={i}>
              <span style={{ color: accent }}>+ </span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-16">
      <div className="mb-6">
        <p className="text-xs text-[var(--fg-dim)]">
          <span style={{ color: "var(--accent-2)" }}>:ls</span> — {projects.length} buffers open
        </p>
        <h2 className="text-lg font-bold text-[var(--fg-bright)] mt-1">Selected Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} accent={ACCENTS[i % ACCENTS.length]} />
        ))}
      </div>
    </div>
  );
}
