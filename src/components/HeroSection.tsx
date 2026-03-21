"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = [];
      const count = Math.min(80, Math.floor(canvas.width / 15));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(184, 115, 51, 0.35)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74, 144, 164, ${0.08 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(184,115,51,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(74,144,164,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-32 md:py-40">
        {/* Floating testimonial */}
        <div
          className="mb-10 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="text-sm italic"
            style={{ color: "var(--color-text-secondary)" }}
          >
            &ldquo;Deployed in 7 days. No meetings. No blockers.&rdquo;
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Automation
          <br />
          <span className="text-gradient-copper">Consulting</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mb-10 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Eliminate repetitive tasks and streamline your operations with custom
          business process automation services. We help small businesses across
          the USA automate workflows using n8n, Python, and AI-powered
          solutions&mdash;without enterprise pricing.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link href="/consultation" className="btn-primary">
            Book a Free Consultation
          </Link>
          <Link href="#services" className="btn-secondary">
            Our Services
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg-primary), transparent)",
        }}
      />
    </section>
  );
}
