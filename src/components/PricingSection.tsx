"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const TIERS = [
  {
    title: "Free Consultation",
    description: "Not sure what to automate? That\u2019s what we\u2019re here for.",
    price: "$0",
    unit: "PER HOUR",
    cta: "Book a Free Consultation",
    ctaHref: "/consultation",
    features: [
      "30-minute discovery call",
      "Identify automation opportunities",
      "No obligation",
    ],
    highlight: false,
  },
  {
    title: "Hourly Consulting",
    description:
      "Need quick help with strategy, troubleshooting, or a second opinion?",
    price: "$30",
    unit: "PER HOUR",
    cta: "Get Started",
    ctaHref: "/consultation",
    features: [
      "Strategy sessions",
      "Troubleshooting support",
      "Screen-share walkthroughs",
      "No long-term commitment",
    ],
    highlight: true,
  },
  {
    title: "Custom Projects",
    description:
      "End-to-end automation built around your specific processes and tools.",
    price: "Custom",
    unit: "PER PROJECT",
    cta: "Request a Quote",
    ctaHref: "/consultation",
    features: [
      "Tailored to your operations",
      "Documentation and training included",
      "Testing period before handoff",
      "Unlimited revisions during development",
      "Post-launch support",
    ],
    highlight: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      ref={ref}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="section-label">Pricing</p>
        <h2
          className="mb-16 text-3xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Pricing
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card flex flex-col p-8"
              style={
                tier.highlight
                  ? {
                      borderColor: "var(--color-copper)",
                      boxShadow: "0 0 40px rgba(184,115,51,0.08)",
                    }
                  : {}
              }
            >
              <h3
                className="mb-2 text-xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.title}
              </h3>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {tier.description}
              </p>

              <div
                className="mb-1 border-t pt-6 text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  borderColor: "var(--color-border-default)",
                  color: "var(--color-text-primary)",
                }}
              >
                {tier.price}
              </div>
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tier.unit}
              </p>

              <Link
                href={tier.ctaHref}
                className={tier.highlight ? "btn-primary mb-8 justify-center" : "btn-secondary mb-8 justify-center"}
              >
                {tier.cta}
              </Link>

              <ul className="flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-copper)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
