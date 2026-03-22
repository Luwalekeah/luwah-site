"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const TIERS = [
  {
    title: "Quick Win",
    description: "Email setup, basic reporting, single-platform automation.",
    price: "$150–$300",
    unit: "per project",
    cta: "Get Started",
    ctaHref: "/consultation",
    features: [
      "Single-platform automation",
      "Email setup & routing",
      "Basic reporting dashboards",
      "Documentation included",
    ],
    highlight: false,
  },
  {
    title: "Core Project",
    description: "Reminder systems, dashboards, win-back campaigns.",
    price: "$300–$750",
    unit: "per project",
    cta: "Get Started",
    ctaHref: "/consultation",
    features: [
      "Multi-step workflows",
      "Dashboard & analytics setup",
      "Automated follow-up campaigns",
      "Training & handoff included",
    ],
    highlight: true,
  },
  {
    title: "Premium Integration",
    description: "Multi-system solutions, full analytics suites.",
    price: "$750–$1,500+",
    unit: "per project",
    cta: "Request a Quote",
    ctaHref: "/consultation",
    features: [
      "Cross-platform integrations",
      "AI-powered workflows",
      "Full analytics & reporting suites",
      "Unlimited revisions during dev",
      "Post-launch support",
    ],
    highlight: false,
  },
  {
    title: "Ongoing Support",
    description: "Hosting, monitoring, and maintenance for live systems.",
    price: "$50–$200",
    unit: "per month",
    cta: "Learn More",
    ctaHref: "/consultation",
    features: [
      "Hosting & uptime monitoring",
      "Bug fixes & maintenance",
      "Workflow adjustments",
      "Priority support",
    ],
    highlight: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <div className="mb-14 text-center">
          <h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pricing
          </h2>
          <p
            className="mx-auto max-w-md text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Transparent per-project pricing. No surprises. Every project starts with a free consultation.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card flex flex-col p-7"
              style={
                tier.highlight
                  ? { borderColor: "var(--color-copper-border)" }
                  : {}
              }
            >
              <h3
                className="mb-1 text-lg font-semibold"
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
                className="mb-1 text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.price}
              </div>
              <p
                className="mb-6 text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tier.unit}
              </p>

              <Link
                href={tier.ctaHref}
                className={tier.highlight ? "btn-primary mb-7" : "btn-secondary mb-7"}
              >
                {tier.cta}
              </Link>

              <ul className="flex flex-col gap-3 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0"
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

        <p
          className="mx-auto mt-8 max-w-lg text-center text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Need multiple automations? We offer custom bundles that cover several
          projects at a discounted rate.{" "}
          <Link
            href="/consultation"
            className="no-underline"
            style={{ color: "var(--color-copper)" }}
          >
            Get a personalized quote
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
