import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { canUseCookies } from "../cookie";

export type Theme = "light" | "dark";
export const useThemeHook = (init_theme: Theme | undefined) => {
  // const theme_cookie = jscookie.get("theme") as Theme | undefined
  const [theme, setTheme] = useState<"light" | "dark">(init_theme ?? "dark");
  // //no-console("theme in hook=== ",theme)
  useEffect(() => {
    const colorTheme = theme === "dark" ? "light" : "dark";
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    if (theme) {
      root.classList.add(theme);
      if (canUseCookies()) {
        document.cookie = "theme=" + theme;
      }
      // jscookie.set("theme",theme)
      // localStorage.setItem('theme', theme);
    }
  }, [theme]);
  const nextTheme = theme === "dark" ? "light" : "dark";
  const ModeIcon = theme === "dark" ? SunIcon : MoonIcon;
  const toggleTheme = () => {
    setTheme(nextTheme);
  };
  return { theme, toggleTheme, ModeIcon };
};
