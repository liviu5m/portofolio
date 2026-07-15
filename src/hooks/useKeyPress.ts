import { useEffect, useRef } from "react";

type KeyMap = Record<string, (e: KeyboardEvent) => void>;

/**
 * Registers global keydown handlers, nvim-style.
 * Ignores keystrokes while the user is typing in an input/textarea/
 * contenteditable element, or while the command palette is capturing input
 * (pass `disabled: true` in that case).
 */
export function useKeyPress(map: KeyMap, disabled = false) {
  const mapRef = useRef(map);
  mapRef.current = map;

  useEffect(() => {
    if (disabled) return;

    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTyping) return;

      const key = e.key;
      const fn = mapRef.current[key];
      if (fn) {
        fn(e);
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [disabled]);
}
