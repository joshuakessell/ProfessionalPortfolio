// Simple theme store without React Context
type Theme = "light" | "dark";
type ThemeListener = (theme: Theme) => void;

class ThemeStore {
  private theme: Theme = "light";
  private listeners: Set<ThemeListener> = new Set();

  constructor() {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        this.theme = savedTheme;
      }
      this.updateDOM();
    }
  }

  getTheme(): Theme {
    return this.theme;
  }

  toggle(): void {
    console.log('Theme store toggle called, current:', this.theme);
    this.theme = this.theme === "light" ? "dark" : "light";
    console.log('Theme store new theme:', this.theme);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", this.theme);
      this.updateDOM();
    }
    
    this.notifyListeners();
  }

  subscribe(listener: ThemeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private updateDOM(): void {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(this.theme);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.theme));
  }
}

export const themeStore = new ThemeStore();