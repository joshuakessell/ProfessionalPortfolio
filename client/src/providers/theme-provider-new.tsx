import { createContext, useContext, useEffect, useState } from "react";

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

export function ThemeProvider({ children }: ThemeProviderProps) {
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

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme: () => {
      console.log('toggleTheme function called in provider');
      setTheme(prevTheme => {
        const newTheme = prevTheme === "light" ? "dark" : "light";
        console.log('Switching from', prevTheme, 'to', newTheme);
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", newTheme);
        }
        return newTheme;
      });
    }
  };

  console.log('Provider rendering with theme:', theme, 'toggleTheme:', contextValue.toggleTheme);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}