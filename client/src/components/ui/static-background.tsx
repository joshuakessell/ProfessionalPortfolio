import { useTheme } from "@/providers/theme-provider";

export function StaticBackground() {
  const { theme } = useTheme();
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: theme === 'dark' 
          ? `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)
          `
          : `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)
          `
      }}
    />
  );
}