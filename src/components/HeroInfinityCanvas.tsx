import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const HeroInfinityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes flowing along the mathematical lemniscate
    interface FlowParticle {
      t: number; // Parameter along infinity curve [0, 2PI]
      speed: number;
      size: number;
      opacity: number;
      layer: number;
    }

    const particleCount = 42;
    const particles: FlowParticle[] = Array.from({ length: particleCount }, (_, i) => ({
      t: (i / particleCount) * Math.PI * 2,
      speed: 0.0018 + (i % 3) * 0.0006,
      size: 1.2 + (i % 4) * 0.7,
      opacity: 0.25 + (i % 5) * 0.12,
      layer: i % 2,
    }));

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / width - 0.5) * 40;
      targetMouseY = ((e.clientY - rect.top) / height - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Lemniscate of Bernoulli equations:
    // x(t) = a * sqrt(2) * cos(t) / (sin(t)^2 + 1)
    // y(t) = a * sqrt(2) * cos(t) * sin(t) / (sin(t)^2 + 1)
    const getLemniscatePoint = (t: number, a: number, cx: number, cy: number) => {
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = cx + (a * Math.SQRT2 * Math.cos(t)) / denom;
      const y = cy + (a * Math.SQRT2 * Math.cos(t) * Math.sin(t)) / denom;
      return { x, y };
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const cx = width / 2 + mouseX * 0.4;
      const cy = height * 0.42 + mouseY * 0.4;
      
      // Responsive scale for infinity motif
      const a = Math.min(width * 0.28, Math.max(160, height * 0.28));

      const isDark = theme === 'dark';

      // 1. Draw glowing ambient light fields (dual focal centers for purple & orange loops)
      const leftLoopCenter = cx - a * 0.7;
      const rightLoopCenter = cx + a * 0.7;

      if (isDark) {
        // ORIGINAL DARK MODE ATMOSPHERE (100% UNCHANGED)
        const purpleGlow = ctx.createRadialGradient(leftLoopCenter, cy, 10, leftLoopCenter, cy, a * 1.2);
        purpleGlow.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
        purpleGlow.addColorStop(0.5, 'rgba(147, 51, 234, 0.04)');
        purpleGlow.addColorStop(1, 'rgba(8, 8, 12, 0)');
        ctx.fillStyle = purpleGlow;
        ctx.beginPath();
        ctx.arc(leftLoopCenter, cy, a * 1.2, 0, Math.PI * 2);
        ctx.fill();

        const orangeGlow = ctx.createRadialGradient(rightLoopCenter, cy, 10, rightLoopCenter, cy, a * 1.2);
        orangeGlow.addColorStop(0, 'rgba(249, 115, 22, 0.12)');
        orangeGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
        orangeGlow.addColorStop(1, 'rgba(8, 8, 12, 0)');
        ctx.fillStyle = orangeGlow;
        ctx.beginPath();
        ctx.arc(rightLoopCenter, cy, a * 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // PREMIUM LIGHT MODE ATMOSPHERE (Restrained lavender & pale amber, crisp & clean)
        const lavenderGlow = ctx.createRadialGradient(leftLoopCenter, cy, 10, leftLoopCenter, cy, a * 1.1);
        lavenderGlow.addColorStop(0, 'rgba(112, 40, 232, 0.06)');
        lavenderGlow.addColorStop(0.5, 'rgba(238, 231, 255, 0.03)');
        lavenderGlow.addColorStop(1, 'rgba(248, 249, 252, 0)');
        ctx.fillStyle = lavenderGlow;
        ctx.beginPath();
        ctx.arc(leftLoopCenter, cy, a * 1.1, 0, Math.PI * 2);
        ctx.fill();

        const amberGlow = ctx.createRadialGradient(rightLoopCenter, cy, 10, rightLoopCenter, cy, a * 1.1);
        amberGlow.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
        amberGlow.addColorStop(0.5, 'rgba(254, 243, 199, 0.03)');
        amberGlow.addColorStop(1, 'rgba(248, 249, 252, 0)');
        ctx.fillStyle = amberGlow;
        ctx.beginPath();
        ctx.arc(rightLoopCenter, cy, a * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw subtle continuous infinity path line
      ctx.lineWidth = isDark ? 1.2 : 1.1;
      const step = 0.04;
      for (let t = 0; t <= Math.PI * 2; t += step) {
        const p1 = getLemniscatePoint(t, a, cx, cy);
        const p2 = getLemniscatePoint(t + step, a, cx, cy);

        // Color transition: Left side is violet/purple, Right side is warm orange/amber
        const normX = (p1.x - (cx - a)) / (2 * a);
        let strokeColor: string;

        if (isDark) {
          // Exact original dark strokes
          if (normX < 0.45) {
            strokeColor = `rgba(168, 85, 247, ${0.12 + Math.sin(time + t) * 0.04})`;
          } else if (normX > 0.55) {
            strokeColor = `rgba(249, 115, 22, ${0.12 + Math.cos(time + t) * 0.04})`;
          } else {
            strokeColor = `rgba(255, 255, 255, 0.15)`;
          }
        } else {
          // Tailored light strokes (crisp purple #7028E8 and amber #F59E0B)
          if (normX < 0.45) {
            strokeColor = `rgba(112, 40, 232, ${0.20 + Math.sin(time + t) * 0.05})`;
          } else if (normX > 0.55) {
            strokeColor = `rgba(245, 158, 11, ${0.20 + Math.cos(time + t) * 0.05})`;
          } else {
            strokeColor = `rgba(85, 91, 110, 0.14)`;
          }
        }

        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // 3. Draw drifting luminous flow particles along the loop
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.t = (p.t + p.speed) % (Math.PI * 2);
        }
        const pt = getLemniscatePoint(p.t, a, cx, cy);

        // Color based on x-coordinate
        const isLeft = pt.x < cx;
        let color: string;

        if (isDark) {
          // Original particle colors
          color = isLeft
            ? `rgba(192, 132, 252, ${p.opacity})`
            : `rgba(251, 146, 60, ${p.opacity})`;
        } else {
          // Light mode particle colors
          color = isLeft
            ? `rgba(112, 40, 232, ${p.opacity * 0.65})`
            : `rgba(245, 158, 11, ${p.opacity * 0.65})`;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Delicate glow around leading particles
        if (p.layer === 1) {
          if (isDark) {
            ctx.fillStyle = isLeft
              ? `rgba(168, 85, 247, ${p.opacity * 0.25})`
              : `rgba(249, 115, 22, ${p.opacity * 0.25})`;
          } else {
            ctx.fillStyle = isLeft
              ? `rgba(112, 40, 232, ${p.opacity * 0.15})`
              : `rgba(245, 158, 11, ${p.opacity * 0.15})`;
          }
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      time += 0.012;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
