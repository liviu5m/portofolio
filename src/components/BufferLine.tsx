import { buffers, type BufferId } from "../data/content";

interface Props {
  active: BufferId;
  onSelect: (id: BufferId) => void;
}

export default function BufferLine({ active, onSelect }: Props) {
  return (
    <div className="sticky top-0 z-50 flex items-center border-b border-[var(--border)] bg-[var(--bg-panel)]/95 backdrop-blur text-xs">
      <div className="hidden sm:flex items-center gap-2 px-3 py-2 border-r border-[var(--border)] text-[var(--accent)] font-bold">
        <span>❯_</span>
      </div>
      <div className="flex overflow-x-auto">
        {buffers.map((buf) => {
          const isActive = buf.id === active;
          return (
            <button
              key={buf.id}
              onClick={() => onSelect(buf.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-r border-[var(--border)] px-4 py-2 transition-colors ${
                isActive
                  ? "bg-[var(--bg)] text-[var(--fg-bright)]"
                  : "text-[var(--fg-dim)] hover:text-[var(--fg)] hover:bg-white/[0.02]"
              }`}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: isActive ? "var(--accent)" : "var(--border-bright)" }}
              />
              {buf.label}
              <span className="text-[10px] text-[var(--fg-dim)]">[{buf.num}]</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
