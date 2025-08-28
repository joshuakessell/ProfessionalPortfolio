import { useState, useEffect } from "react";
import { themeStore } from "@/lib/theme-store";

export function useThemeStore() {
  const [theme, setTheme] = useState(themeStore.getTheme());

  useEffect(() => {
    const unsubscribe = themeStore.subscribe(setTheme);
    return unsubscribe;
  }, []);

  const toggleTheme = () => {
    console.log('useThemeStore toggleTheme called');
    themeStore.toggle();
  };

  console.log('useThemeStore hook returning:', { theme, toggleTheme });
  return { theme, toggleTheme };
}