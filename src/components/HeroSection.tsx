"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.12 }}
      >
        <source src="/videos/2792370-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,146,79,0.06) 0%, transparent 60%), linear-gradient(to top, var(--color-bg-primary), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Eyebrow pill */}
          <div
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--color-text-secondary)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-copper)" }}
            />
            Workflow automation for small businesses
          </div>

          <h1
            className="mx-auto mb-6 text-4xl font-bold md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Automation Consulting
          </h1>

          <p
            className="mx-auto mb-10 max-w-xl text-lg"
            style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}
          >
            We build automations across platforms — from cloud workflows to
            native scripts — so you can eliminate repetitive tasks, cut costs,
            and focus on work that matters.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/consultation" className="btn-primary">
              Book a Free Consultation
            </Link>
            <Link href="/work" className="btn-secondary">
              See Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
