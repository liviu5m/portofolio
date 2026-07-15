import { useEffect, useRef, useState } from "react";
import { profile, skills, projects } from "../data/content";

type Line = { kind: "input" | "output"; text: string };

function buildOutput(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "" ) return [];
  if (cmd === "help") {
    return [
      "available commands:",
      "  whoami        basic identity",
      "  about         short bio",
      "  skills        tech stack, grouped",
      "  projects      list of shipped projects",
      "  contact       how to reach me",
      "  clear         clear the screen",
    ];
  }
  if (cmd === "whoami") return [`${profile.name.toLowerCase().replace(" ", "_")} — ${profile.role}`];
  if (cmd === "about") return [profile.summary];
  if (cmd === "skills") {
    return Object.entries(skills).flatMap(([group, items]) => [
      `${group}:`,
      `  ${items.join(", ")}`,
    ]);
  }
  if (cmd === "projects") {
    return projects.map((p) => `  ${p.name.padEnd(10)} — ${p.tagline}`);
  }
  if (cmd === "contact") {
    return [`email  ${profile.email}`, `github ${profile.github}`];
  }
  if (cmd === "sudo") return ["Nice try. Permission denied — this is a portfolio, not a root shell."];
  return [`command not found: ${cmd} — type 'help'`];
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: `${profile.handle}@portfolio:~$ type 'help' to get started` },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value;
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      setValue("");
      return;
    }
    const output = buildOutput(cmd);
    setLines((prev) => [
      ...prev,
      { kind: "input", text: cmd },
      ...output.map((text) => ({ kind: "output" as const, text })),
    ]);
    setValue("");
  }

  return (
    <div
      className="flex flex-col h-72 sm:h-80 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto text-xs sm:text-sm leading-relaxed pr-1">
        {lines.map((l, i) => (
          <div key={i} className={l.kind === "input" ? "text-[var(--fg-bright)]" : "text-[var(--fg-dim)] whitespace-pre-wrap"}>
            {l.kind === "input" ? (
              <span>
                <span style={{ color: "var(--accent)" }}>❯ </span>
                {l.text}
              </span>
            ) : (
              l.text
            )}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 pt-2 mt-2 border-t border-[var(--border)]">
        <span style={{ color: "var(--accent)" }}>❯</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="type 'help'"
          className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-[var(--fg-bright)] placeholder:text-[var(--fg-dim)]"
        />
        <span className="caret-blink text-[var(--accent)]">▍</span>
      </form>
    </div>
  );
}
