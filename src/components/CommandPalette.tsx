import { useEffect, useRef, useState } from "react";
import { buffers, type BufferId } from "../data/content";
import { useTheme, type ThemeName } from "../context/ThemeContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: BufferId) => void;
}

const THEME_NAMES: ThemeName[] = ["tokyonight", "gruvbox", "catppuccin"];

export default function CommandPalette({ open, onClose, onNavigate }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (open) {
      setValue("");
      setError(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase().replace(/^:/, "");

    const buf = buffers.find((b) => b.id === cmd || b.label.startsWith(cmd));
    if (buf) {
      onNavigate(buf.id);
      onClose();
      return;
    }

    if (cmd.startsWith("theme ") || cmd.startsWith("colorscheme ")) {
      const name = cmd.split(" ")[1] as ThemeName;
      if (THEME_NAMES.includes(name)) {
        setTheme(name);
        onClose();
        return;
      }
    }

    if (cmd === "q" || cmd === "quit") {
      onClose();
      return;
    }

    setError(`E492: not a command: ${raw}`);
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-[var(--border-bright)] bg-[var(--bg-panel)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
          className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]"
        >
          <span style={{ color: "var(--accent-3)" }}>:</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            spellCheck={false}
            autoComplete="off"
            placeholder="home | projects | experience | settings | theme gruvbox | q"
            className="flex-1 bg-transparent outline-none text-sm text-[var(--fg-bright)] placeholder:text-[var(--fg-dim)]"
          />
        </form>
        {error && (
          <div className="px-3 py-2 text-xs" style={{ color: "var(--danger)" }}>
            {error}
          </div>
        )}
        <div className="px-3 py-2 text-[10px] text-[var(--fg-dim)]">
          jump: home · projects · experience · settings — or set a colorscheme: theme catppuccin
        </div>
      </div>
    </div>
  );
}
