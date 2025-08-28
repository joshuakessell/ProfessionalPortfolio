import { createContext, useContext, useEffect, useState, useCallback } from "react";

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
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// Theme provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Get initial theme from localStorage or default to "light"
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme === "dark" || savedTheme === "light") ? savedTheme : "light";
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    console.log('Real toggleTheme called, current theme:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log('Toggling from', prevTheme, 'to', newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        console.log('Saved to localStorage:', newTheme);
      }
      return newTheme;
    });
  };

  // Update document class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Debug logging to help troubleshoot
    console.log('Theme changed to:', theme);
    console.log('Document classes:', root.className);
  }, [theme]);

  const contextValue = { 
    theme, 
    toggleTheme
  };
  
  console.log('Provider contextValue:', contextValue);
  console.log('toggleTheme function in provider:', toggleTheme);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
