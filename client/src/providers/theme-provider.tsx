import { createContext, useContext, useEffect, useState } from "react";

// Define theme type
type Theme = "light" | "dark";

// Props for ThemeProvider component
type ThemeProviderProps = {
  children: React.ReactNode;
};

// Create context for theme and motion
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  reduceMotion: false,
  toggleReduceMotion: () => {}
});

// Theme provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Get initial theme from localStorage or default to "light"
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme === "dark" || savedTheme === "light") ? savedTheme : "light";
  });

  // Get initial motion preference from localStorage or system preference
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const savedMotion = localStorage.getItem("reduceMotion");
    if (savedMotion !== null) {
      return savedMotion === "true";
    }
    // Check system preference for reduced motion
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return newTheme;
    });
  };

  // Toggle motion preference
  const toggleReduceMotion = () => {
    setReduceMotion(prevMotion => {
      const newMotion = !prevMotion;
      if (typeof window !== "undefined") {
        localStorage.setItem("reduceMotion", newMotion.toString());
      }
      return newMotion;
    });
  };

  // Update document class when theme or motion changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Add/remove motion class
    if (reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [theme, reduceMotion]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, reduceMotion, toggleReduceMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
