"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const spacing = 40;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      // Accent glow center — slowly drifts
      const glowX = w * 0.3 + Math.sin(time * 0.4) * 80;
      const glowY = h * 0.4 + Math.cos(time * 0.3) * 60;
      const glowRadius = 300;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Distance from glow center
          const dx = x - glowX;
          const dy = y - glowY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / glowRadius);

          // Subtle wave displacement
          const wave = Math.sin(time * 0.8 + i * 0.3 + j * 0.2) * 1.5;

          // Base opacity + glow boost
          const baseAlpha = 0.06;
          const glowAlpha = influence * 0.25;
          const alpha = baseAlpha + glowAlpha;

          // Size: slightly larger near glow
          const baseSize = 1;
          const size = baseSize + influence * 1.5;

          // Color: shift toward accent near glow
          if (influence > 0.1) {
            // Accent-tinted dots
            const r = Math.round(232 * influence + 255 * (1 - influence));
            const g = Math.round(255 * influence + 255 * (1 - influence));
            const b = Math.round(71 * influence + 255 * (1 - influence));
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(x + wave, y + wave, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
