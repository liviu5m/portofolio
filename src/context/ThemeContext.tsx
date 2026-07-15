import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName = "tokyonight" | "gruvbox" | "catppuccin";

interface ThemeCtx {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  gridDensity: number; // px between grid lines, higher = sparser
  setGridDensity: (n: number) => void;
  scanlines: boolean;
  setScanlines: (b: boolean) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("tokyonight");
  const [gridDensity, setGridDensity] = useState(28);
  const [scanlines, setScanlines] = useState(true);

  useEffect(() => {
    const el = document.documentElement;
    if (theme === "tokyonight") el.removeAttribute("data-theme");
    else el.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--grid-size", `${gridDensity}px`);
  }, [gridDensity]);

  return (
    <Ctx.Provider value={{ theme, setTheme, gridDensity, setGridDensity, scanlines, setScanlines }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
