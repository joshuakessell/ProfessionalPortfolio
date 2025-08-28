import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

export function ModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  const handleToggle = () => {
    console.log('Toggle clicked, current theme:', theme);
    toggleTheme();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="w-10 h-10 rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all text-yellow-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all text-blue-400 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
