"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Discovery",
    description:
      "Tell us about your current processes and the tools you use. We identify automation opportunities across your operations.",
  },
  {
    number: "2",
    title: "Build",
    description:
      "We design and implement custom workflow solutions that connect your existing tools into reliable, AI-powered automations.",
  },
  {
    number: "3",
    title: "Launch",
    description:
      "You receive a documented system with hands-on training. Your team can maintain and expand automations independently.",
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      ref={ref}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="section-label">Process</p>
        <h2
          className="mb-16 text-3xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          How it works
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card flex flex-col p-8"
            >
              <div
                className="mb-6 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-copper)",
                  color: "white",
                  fontFamily: "var(--font-display)",
                }}
              >
                {step.number}
              </div>
              <h3
                className="mb-3 text-xl font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
