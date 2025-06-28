import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  // Generate geometric shapes with different types
  const shapes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    type: ['square', 'triangle', 'hexagon'][i % 3],
    size: Math.random() * 300 + 150,
    x: Math.random() * 110 - 5,
    y: Math.random() * 110 - 5,
    duration: Math.random() * 40 + 30,
    delay: Math.random() * 10,
    rotation: Math.random() * 360,
  }));

  const getShapeClasses = (type: string) => {
    const baseClasses = "absolute blur-2xl";
    if (type === 'square') {
      return `${baseClasses} bg-gradient-to-br from-blue-400/8 to-indigo-400/12 dark:from-blue-300/15 dark:to-indigo-300/20`;
    } else if (type === 'triangle') {
      return `${baseClasses} bg-gradient-to-br from-purple-400/8 to-pink-400/12 dark:from-purple-300/15 dark:to-pink-300/20`;
    } else {
      return `${baseClasses} bg-gradient-to-br from-indigo-400/8 to-blue-400/12 dark:from-indigo-300/15 dark:to-blue-300/20`;
    }
  };

  const getShapeStyle = (shape: any) => {
    if (shape.type === 'triangle') {
      return {
        width: 0,
        height: 0,
        borderLeft: `${shape.size / 2}px solid transparent`,
        borderRight: `${shape.size / 2}px solid transparent`,
        borderBottom: `${shape.size}px solid currentColor`,
        background: 'none',
        transform: `rotate(${shape.rotation}deg)`,
      };
    } else if (shape.type === 'hexagon') {
      return {
        width: shape.size,
        height: shape.size * 0.866,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        transform: `rotate(${shape.rotation}deg)`,
      };
    } else {
      return {
        width: shape.size,
        height: shape.size,
        transform: `rotate(${shape.rotation}deg)`,
      };
    }
  };

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Stronger contrast background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 via-blue-50/15 to-indigo-50/20 dark:from-gray-950/30 dark:via-blue-950/25 dark:to-indigo-950/30" />
      
      {/* Geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={getShapeClasses(shape.type)}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            ...getShapeStyle(shape),
          }}
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.4, 0.6, 1],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            opacity: [0.3, 0.6, 0.3, 0.3],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced geometric grid pattern */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(0,0,0,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.03)_2px,transparent_2px)] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.04)_2px,transparent_2px)] bg-[size:80px_80px]" />
      
      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}