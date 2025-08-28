import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  console.log('ThemeProvider rendering...');
  
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme === "dark" || savedTheme === "light") ? savedTheme : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  function toggleTheme() {
    console.log('toggleTheme called directly');
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log('Theme switching from', prevTheme, 'to', newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return newTheme;
    });
  }

  const value = {
    theme,
    toggleTheme
  };
  
  console.log('Context value created:', value);
  console.log('toggleTheme in context:', value.toggleTheme);
  console.log('typeof toggleTheme in context:', typeof value.toggleTheme);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  console.log('useTheme called, context:', context);
  return context;
};