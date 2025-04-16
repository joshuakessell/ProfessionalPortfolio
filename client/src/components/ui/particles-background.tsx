import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface ParticlesBackgroundProps {
  quantity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  colors?: string[];
  connectParticles?: boolean;
  className?: string;
}

export function ParticlesBackground({
  quantity = 50,
  minSize = 1,
  maxSize = 3,
  speed = 0.5,
  colors = ['#3b82f6', '#8b5cf6', '#6366f1'],
  connectParticles = true,
  className = '',
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number | null, y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Reinitialize particles when canvas is resized
      initParticles();
    };

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize canvas size
    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < quantity; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: randomColor,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    initParticles();

    // Draw particles
    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > height) {
          particle.speedY = -particle.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Connect particles if enabled
        if (connectParticles) {
          const mouseDistance = 120; // Distance to connect with mouse
          
          // Connect with mouse
          if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseDistance) {
              const opacity = 1 - (distance / mouseDistance);
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.strokeStyle = particle.color + Math.floor(opacity * 70).toString(16).padStart(2, '0');
              ctx.lineWidth = particle.size / 5;
              ctx.stroke();
            }
          }
          
          // Connect with other particles
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const particle2 = particlesRef.current[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const maxDistance = 100; // Maximum distance to connect particles
            
            if (distance < maxDistance) {
              const opacity = 1 - (distance / maxDistance);
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.strokeStyle = particle.color + Math.floor(opacity * 50).toString(16).padStart(2, '0');
              ctx.lineWidth = (particle.size + particle2.size) / 25;
              ctx.stroke();
            }
          }
        }
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [quantity, minSize, maxSize, speed, colors, connectParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}