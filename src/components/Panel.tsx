import type { ReactNode } from "react";

interface PanelProps {
  title?: string;
  filename?: string;
  modified?: boolean;
  children: ReactNode;
  className?: string;
  accent?: string; // css color for the title bar accent dot
}

export default function Panel({
  title,
  filename,
  modified,
  children,
  className = "",
  accent = "var(--accent)",
}: PanelProps) {
  return (
    <div
      className={`border border-[var(--border)] bg-[var(--bg-panel)]/80 backdrop-blur-sm ${className}`}
    >
      {(title || filename) && (
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-1.5 text-xs">
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ background: accent }}
          />
          {filename && (
            <span className="text-[var(--fg-dim)]">
              {filename}
              {modified && <span style={{ color: accent }}> [+]</span>}
            </span>
          )}
          {title && !filename && (
            <span className="uppercase tracking-widest text-[var(--fg-dim)]">
              {title}
            </span>
          )}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
