import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  // Generate fewer, larger floating orbs for better performance
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 400 + 200,
    x: Math.random() * 120 - 10, // Allow slight overflow
    y: Math.random() * 120 - 10,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 8,
  }));

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-purple-50/5 to-indigo-50/10 dark:from-blue-950/10 dark:via-purple-950/5 dark:to-indigo-950/10" />
      
      {/* Large floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/5 via-purple-400/8 to-indigo-400/5 dark:from-blue-500/8 dark:via-purple-500/12 dark:to-indigo-500/8 blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.3, 0.7, 1],
            opacity: [0.2, 0.4, 0.2, 0.2],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}