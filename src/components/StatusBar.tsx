import { buffers, type BufferId } from "../data/content";

export type Mode = "NORMAL" | "INSERT" | "VISUAL" | "COMMAND";

const MODE_COLOR: Record<Mode, string> = {
  NORMAL: "var(--accent-2)",
  INSERT: "var(--accent)",
  VISUAL: "var(--accent-4)",
  COMMAND: "var(--accent-3)",
};

interface Props {
  mode: Mode;
  active: BufferId;
  scrollPct: number;
}

export default function StatusBar({ mode, active, scrollPct }: Props) {
  const buf = buffers.find((b) => b.id === active);
  const line = Math.max(1, Math.round((scrollPct / 100) * 420));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch text-[11px] border-t border-[var(--border)] bg-[var(--bg-panel)]">
      <div
        className="flex items-center px-3 font-bold text-[var(--bg)] transition-colors duration-300"
        style={{ background: MODE_COLOR[mode] }}
      >
        {mode}
      </div>
      <div className="flex items-center px-3 border-r border-[var(--border)] text-[var(--fg)] hidden sm:flex">
        {buf?.label ?? "home.md"}
      </div>
      <div className="flex items-center gap-1 px-3 border-r border-[var(--border)] text-[var(--fg-dim)] hidden md:flex">
        <span>⎇</span>
        <span>main</span>
      </div>
      <div className="flex-1" />
      <div className="hidden lg:flex items-center px-3 border-l border-[var(--border)] text-[var(--fg-dim)]">
        press <kbd className="mx-1 text-[var(--fg)]">j</kbd>/<kbd className="mx-1 text-[var(--fg)]">k</kbd> to move ·{" "}
        <kbd className="mx-1 text-[var(--fg)]">1-4</kbd> to jump ·{" "}
        <kbd className="mx-1 text-[var(--fg)]">:</kbd> command
      </div>
      <div className="flex items-center px-3 border-l border-[var(--border)] text-[var(--fg-dim)]">
        UTF-8
      </div>
      <div className="flex items-center px-3 border-l border-[var(--border)] text-[var(--fg)] tabular-nums">
        {Math.round(scrollPct)}%
      </div>
      <div className="flex items-center px-3 border-l border-[var(--border)] text-[var(--fg)] tabular-nums w-24 justify-center">
        {line}:{Math.max(1, mode.length)}
      </div>
    </div>
  );
}
