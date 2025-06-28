import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleSpeed?: number;
  connectionDistance?: number;
  showConnections?: boolean;
}

export function ParticleBackground({
  className = '',
  particleCount = 50,
  particleSpeed = 0.5,
  connectionDistance = 120,
  showConnections = true
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const baseOpacity = Math.random() * 0.4 + 0.1;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * particleSpeed,
          vy: (Math.random() - 0.5) * particleSpeed,
          size: Math.random() * 1.5 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
          hue: Math.random() * 60 + 200, // Blue to purple range
          life: 0,
          maxLife: Math.random() * 300 + 200
        });
      }
    };

    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas completely for crisp geometric shapes
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Bounce off edges with slight randomness
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -0.8;
          particle.vx += (Math.random() - 0.5) * 0.1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -0.8;
          particle.vy += (Math.random() - 0.5) * 0.1;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Enhanced mouse interaction with magnetic effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const magneticForce = force * force; // Quadratic for stronger near-field effect
          
          particle.vx += dx * magneticForce * 0.001;
          particle.vy += dy * magneticForce * 0.001;
          particle.opacity = Math.min(particle.baseOpacity * (1 + force * 2), 1);
          particle.size = Math.min(particle.size * (1 + force * 0.5), 4);
          
          // Add rotation speed based on proximity
          particle.life += force * 2;
        } else {
          particle.opacity = particle.baseOpacity;
          particle.size = Math.max(particle.size * 0.98, 0.5);
        }

        // Apply velocity damping
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        // Add subtle floating motion
        particle.vx += Math.sin(particle.life * 0.01) * 0.002;
        particle.vy += Math.cos(particle.life * 0.008) * 0.002;

        // Regenerate particle if it's too old
        if (particle.life > particle.maxLife) {
          const baseOpacity = Math.random() * 0.4 + 0.1;
          Object.assign(particle, {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * particleSpeed,
            vy: (Math.random() - 0.5) * particleSpeed,
            opacity: baseOpacity,
            baseOpacity,
            hue: Math.random() * 60 + 200,
            life: 0,
            maxLife: Math.random() * 300 + 200
          });
        }

        // Draw geometric shapes instead of circles
        const shapeType = Math.floor(particle.life / 100) % 3; // Cycle through shapes
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.life * 0.02);
        
        if (isDark) {
          ctx.fillStyle = `hsla(${particle.hue}, 80%, 85%, ${particle.opacity})`;
          ctx.strokeStyle = `hsla(${particle.hue}, 90%, 90%, ${particle.opacity * 0.8})`;
        } else {
          ctx.fillStyle = `hsla(${particle.hue}, 60%, 25%, ${particle.opacity})`;
          ctx.strokeStyle = `hsla(${particle.hue}, 70%, 20%, ${particle.opacity * 0.8})`;
        }
        
        ctx.lineWidth = 0.5;
        
        // Draw different geometric shapes
        if (shapeType === 0) {
          // Square
          const size = particle.size * 2;
          ctx.fillRect(-size/2, -size/2, size, size);
          ctx.strokeRect(-size/2, -size/2, size, size);
        } else if (shapeType === 1) {
          // Triangle
          const size = particle.size * 2.5;
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(-size * 0.866, size * 0.5);
          ctx.lineTo(size * 0.866, size * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          // Hexagon
          const size = particle.size * 1.8;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        
        ctx.restore();

        // Draw geometric connections
        if (showConnections) {
          particlesRef.current.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.3;
              const avgHue = (particle.hue + otherParticle.hue) / 2;
              
              // Draw segmented lines for more geometric feel
              const segments = 8;
              const segmentLength = distance / segments;
              
              for (let i = 0; i < segments; i += 2) {
                const startRatio = i / segments;
                const endRatio = Math.min((i + 1) / segments, 1);
                
                const startX = particle.x + dx * startRatio;
                const startY = particle.y + dy * startRatio;
                const endX = particle.x + dx * endRatio;
                const endY = particle.y + dy * endRatio;
                
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                
                if (isDark) {
                  ctx.strokeStyle = `hsla(${avgHue}, 70%, 80%, ${opacity})`;
                } else {
                  ctx.strokeStyle = `hsla(${avgHue}, 60%, 30%, ${opacity})`;
                }
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleSpeed, connectionDistance, showConnections]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}