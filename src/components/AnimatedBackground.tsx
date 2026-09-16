import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for celestial constellation effect
    const particlesCount = Math.min(38, Math.floor(width / 35));
    const particles = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      targetAlpha: Math.random() * 0.4 + 0.1,
    }));

    let rotationAngle = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Luxury Background Gradient
      const bgGradient = ctx.createRadialGradient(
        mouseX,
        mouseY * 0.8,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.9
      );
      bgGradient.addColorStop(0, '#0f131a');
      bgGradient.addColorStop(0.4, '#0a0c10');
      bgGradient.addColorStop(1, '#050608');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Horological Concentric Gear/Escapement Geometry (Rolex & Patek inspired)
      ctx.save();
      const centerX = width * 0.85;
      const centerY = height * 0.25;
      rotationAngle += 0.0012; // Slow perpetual rotation

      ctx.translate(centerX, centerY);
      ctx.rotate(rotationAngle);

      // Outer Tourbillon ring
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.stroke();

      // Second gear ring with teeth marks
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.09)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.stroke();

      // Precision tick lines along the perimeter (Horological Hour markers)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        const rad = (i * Math.PI) / 30;
        const innerR = i % 5 === 0 ? 215 : 225;
        const outerR = 238;
        const x1 = Math.cos(rad) * innerR;
        const y1 = Math.sin(rad) * innerR;
        const x2 = Math.cos(rad) * outerR;
        const y2 = Math.sin(rad) * outerR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Balance wheel spokes
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.08)';
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        const spokeRad = (j * 2 * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(spokeRad) * 230, Math.sin(spokeRad) * 230);
        ctx.stroke();
      }

      ctx.restore();

      // 3. Second Subtle Gear at bottom-left
      ctx.save();
      const blX = width * 0.1;
      const blY = height * 0.85;
      ctx.translate(blX, blY);
      ctx.rotate(-rotationAngle * 1.5);

      ctx.strokeStyle = 'rgba(197, 160, 89, 0.08)';
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(197, 160, 89, 0.06)';
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Subtle Celestial Constellation Dust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect close particles with delicate horological web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(197, 160, 89, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-100 transition-opacity duration-1000"
    />
  );
};
