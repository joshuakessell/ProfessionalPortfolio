import { useTheme } from "@/providers/theme-provider";

export function StaticBackground() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
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
      
      {/* Static grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: theme === 'dark'
            ? `
              linear-gradient(rgba(255,255,255,0.04) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 2px, transparent 2px)
            `
            : `
              linear-gradient(rgba(0,0,0,0.08) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0,0,0,0.08) 2px, transparent 2px)
            `,
          backgroundSize: '80px 80px',
          opacity: 0.6
        }}
      />
      
      {/* Static diagonal pattern overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: theme === 'dark'
            ? `
              linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `
            : `
              linear-gradient(45deg, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
          opacity: 0.35
        }}
      />
    </div>
  );
}