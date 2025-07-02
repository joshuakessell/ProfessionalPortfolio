import { Zap, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

export function MotionToggle() {
  const { reduceMotion, toggleReduceMotion } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleReduceMotion}
      className="w-10 h-10 rounded-full"
      title={reduceMotion ? "Enable animations" : "Reduce motion"}
    >
      {reduceMotion ? (
        <ZapOff className="h-4 w-4" />
      ) : (
        <Zap className="h-4 w-4" />
      )}
    </Button>
  );
}