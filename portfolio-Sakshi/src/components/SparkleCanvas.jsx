import React, { useEffect, useRef } from "react";

export default function SparkleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let lastSpawnTime = 0;

    // Handle responsive resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color palette of fine lavender glitter
    const glitterColors = [
      "216, 180, 254", // lavender-300
      "192, 132, 252", // purple-400
      "233, 213, 255", // lavender-200
      "168, 85, 247",  // purple-500
      "245, 238, 255", // pale shimmer lavender
      "180, 130, 250", // soft violet
    ];

    class GlitterParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        
        // Very gentle slow-mo drift velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.35 + 0.08; // slow-mo pace
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.12; // slow upward float

        this.color = glitterColors[Math.floor(Math.random() * glitterColors.length)];
        
        // Small glitter grain size (subtle & delicate)
        this.baseSize = Math.random() * 1.5 + 0.8; // radius between 0.8px and 2.3px
        this.size = this.baseSize;
        
        this.alpha = 0.9;
        // Slow-motion decay lasting ~2.5 - 3.5 seconds (at 60fps, 0.003 - 0.005)
        this.decay = Math.random() * 0.004 + 0.003;

        // Twinkle glint phase
        this.twinkleSpeed = Math.random() * 0.06 + 0.03;
        this.twinklePhase = Math.random() * Math.PI * 2;

        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02; // slow rotation

        // 60% 4-point micro-glitter star, 40% soft round shimmer speck
        this.isStar = Math.random() > 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle air resistance for floating feel
        this.vx *= 0.99;
        this.vy *= 0.99;

        this.rotation += this.rotationSpeed;
        this.twinklePhase += this.twinkleSpeed;
        this.alpha -= this.decay;

        // Subtle shimmer scale
        const shimmer = 0.8 + 0.25 * Math.sin(this.twinklePhase);
        this.size = this.baseSize * shimmer * Math.max(0, this.alpha);
      }

      draw(context) {
        if (this.alpha <= 0 || this.size <= 0.2) return;
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        const currentAlpha = Math.min(1, Math.max(0, this.alpha));

        if (this.isStar) {
          // Delicate micro 4-pointed glitter star
          const outerR = this.size * 2.4;
          const innerR = outerR * 0.2;

          context.fillStyle = `rgba(${this.color}, ${currentAlpha * 0.9})`;
          context.shadowBlur = 4;
          context.shadowColor = `rgba(${this.color}, ${currentAlpha * 0.7})`;

          context.beginPath();
          for (let i = 0; i < 4; i++) {
            const a = (i * Math.PI) / 2;
            context.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
            const midA = a + Math.PI / 4;
            context.lineTo(Math.cos(midA) * innerR, Math.sin(midA) * innerR);
          }
          context.closePath();
          context.fill();

          // Tiny bright glitter core
          context.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
          context.beginPath();
          context.arc(0, 0, innerR * 0.7, 0, Math.PI * 2);
          context.fill();
        } else {
          // Soft micro glowing glitter speck
          context.shadowBlur = 3;
          context.shadowColor = `rgba(${this.color}, ${currentAlpha * 0.6})`;

          context.fillStyle = `rgba(${this.color}, ${currentAlpha * 0.85})`;
          context.beginPath();
          context.arc(0, 0, this.size, 0, Math.PI * 2);
          context.fill();

          // Crisp tiny center
          context.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
          context.beginPath();
          context.arc(0, 0, this.size * 0.45, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      }
    }

    const spawnGlitter = (x, y, count = 2) => {
      const now = performance.now();
      if (now - lastSpawnTime < 30) return; // Smooth throttling
      lastSpawnTime = now;

      for (let i = 0; i < count; i++) {
        const spreadX = x + (Math.random() - 0.5) * 16;
        const spreadY = y + (Math.random() - 0.5) * 16;
        particles.push(new GlitterParticle(spreadX, spreadY));
      }
    };

    const handlePointerMove = (e) => {
      spawnGlitter(e.clientX, e.clientY, 2);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        spawnGlitter(e.touches[0].clientX, e.touches[0].clientY, 2);
      }
    };

    const handlePointerDown = (e) => {
      // Gentle subtle burst on tap/click
      for (let i = 0; i < 5; i++) {
        particles.push(new GlitterParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Strictly in the background (z-0), never on top of text
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
