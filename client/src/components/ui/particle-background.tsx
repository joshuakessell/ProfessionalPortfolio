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
      // Clear canvas with slight trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get theme colors
      const isDark = document.documentElement.classList.contains('dark');

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

        // Mouse interaction with attractive force
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * force * 0.0008;
          particle.vy += dy * force * 0.0008;
          particle.opacity = Math.min(particle.baseOpacity * 2, 0.8);
          particle.size = Math.min(particle.size * 1.2, 3);
        } else {
          particle.opacity = particle.baseOpacity;
          particle.size = Math.max(particle.size * 0.99, 0.5);
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

        // Draw particle with subtle color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 80%, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `hsla(${particle.hue}, 50%, 40%, ${particle.opacity})`;
        }
        ctx.fill();

        // Add subtle glow effect
        if (particle.opacity > 0.3) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size + 1, 0, Math.PI * 2);
          if (isDark) {
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 80%, ${particle.opacity * 0.2})`;
          } else {
            ctx.fillStyle = `hsla(${particle.hue}, 50%, 40%, ${particle.opacity * 0.2})`;
          }
          ctx.fill();
        }

        // Draw connections
        if (showConnections) {
          particlesRef.current.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.15;
              const avgHue = (particle.hue + otherParticle.hue) / 2;
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              
              if (isDark) {
                ctx.strokeStyle = `hsla(${avgHue}, 60%, 70%, ${opacity})`;
              } else {
                ctx.strokeStyle = `hsla(${avgHue}, 40%, 50%, ${opacity})`;
              }
              ctx.lineWidth = 0.8;
              ctx.stroke();
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