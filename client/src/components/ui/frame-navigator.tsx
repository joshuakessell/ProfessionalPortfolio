import { useEffect, useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FrameNavigatorProps {
  children: ReactNode;
  currentFrame: number;
  onFrameChange: (frame: number) => void;
  totalFrames: number;
}

export function FrameNavigator({ 
  children, 
  currentFrame, 
  onFrameChange, 
  totalFrames 
}: FrameNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentFrame < totalFrames - 1) {
          handleFrameChange(currentFrame + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentFrame > 0) {
          handleFrameChange(currentFrame - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleFrameChange(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        handleFrameChange(totalFrames - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrame, totalFrames, onFrameChange, isAnimating]);

  // Handle wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      
      if (direction > 0 && currentFrame < totalFrames - 1) {
        handleFrameChange(currentFrame + 1);
      } else if (direction < 0 && currentFrame > 0) {
        handleFrameChange(currentFrame - 1);
      }
    };

    // Add wheel listener to the window instead of container
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentFrame, totalFrames, onFrameChange, isAnimating]);

  // Handle touch/swipe navigation
  useEffect(() => {
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaY = startY - endY;
      const deltaTime = endTime - startTime;
      
      // Minimum swipe distance and maximum time
      if (Math.abs(deltaY) > 50 && deltaTime < 300) {
        if (deltaY > 0 && currentFrame < totalFrames - 1) {
          handleFrameChange(currentFrame + 1);
        } else if (deltaY < 0 && currentFrame > 0) {
          handleFrameChange(currentFrame - 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentFrame, totalFrames, onFrameChange, isAnimating]);

  const handleFrameChange = (newFrame: number) => {
    console.log('handleFrameChange called with:', newFrame, 'currentFrame:', currentFrame);
    if (newFrame !== currentFrame && !isAnimating) {
      setIsAnimating(true);
      onFrameChange(newFrame);
      
      // Reset animation state after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="frame-navigator"
      style={{ 
        transform: `translateY(-${currentFrame * 100}vh)`,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
      {/* Debug info */}
      <div className="fixed bottom-4 left-4 z-50 bg-red-500 text-white px-2 py-1 rounded text-xs">
        Transform: translateY(-{currentFrame * 100}vh) | Frame: {currentFrame}
      </div>
      
      {/* Visual frame indicator */}
      <div className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-3 py-2 rounded text-lg font-bold">
        FRAME {currentFrame + 1}
      </div>
    </div>
  );
}

interface FrameSectionProps {
  children: ReactNode;
  className?: string;
  id: string;
}

export function FrameSection({ children, className, id }: FrameSectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "w-full h-screen flex items-center justify-center relative",
        className
      )}
      style={{ 
        minHeight: '100vh',
        height: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      {children}
    </section>
  );
}

interface FrameIndicatorProps {
  currentFrame: number;
  totalFrames: number;
  onFrameChange: (frame: number) => void;
  className?: string;
}

export function FrameIndicator({ 
  currentFrame, 
  totalFrames, 
  onFrameChange, 
  className 
}: FrameIndicatorProps) {
  const handleFrameChange = (newFrame: number) => {
    if (newFrame !== currentFrame) {
      onFrameChange(newFrame);
    }
  };
  return (
    <div className={cn(
      "fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3",
      className
    )}>
      {Array.from({ length: totalFrames }, (_, index) => (
        <button
          key={index}
          onClick={() => handleFrameChange(index)}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            currentFrame === index 
              ? "bg-blue-600 scale-125 shadow-lg" 
              : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
          )}
          aria-label={`Go to frame ${index + 1}`}
        />
      ))}
    </div>
  );
}
