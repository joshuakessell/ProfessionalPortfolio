import { useState, useEffect } from "react";
import { themeStore } from "@/lib/theme-store";

export function useThemeStore() {
  const [theme, setTheme] = useState(themeStore.getTheme());

  useEffect(() => {
    const unsubscribe = themeStore.subscribe(setTheme);
    return unsubscribe;
  }, []);

  const toggleTheme = () => {
    themeStore.toggle();
  };
  return { theme, toggleTheme };
}