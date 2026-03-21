"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Mail, BarChart3, Bot, Workflow, Link2 } from "lucide-react";

const SERVICES = [
  {
    icon: Mail,
    title: "Lead Generation & Outreach",
    description:
      "Automate lead sourcing, email follow-ups, and engagement to grow your business effortlessly.",
    color: "var(--color-copper)",
  },
  {
    icon: BarChart3,
    title: "Data Processing & Insight",
    description:
      "Sync data across platforms and generate reports automatically\u2014no more spreadsheet wrangling.",
    color: "var(--color-lake)",
  },
  {
    icon: Bot,
    title: "AI-Powered Chatbots",
    description:
      "Provide 24/7 customer support with intelligent chatbots trained on your business.",
    color: "var(--color-copper)",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Transform repetitive manual tasks into automated workflows that run reliably in the background.",
    color: "var(--color-lake)",
  },
  {
    icon: Link2,
    title: "System Integrations",
    description:
      "Connect your CRM, e-commerce, accounting, and communication tools into unified workflows.",
    color: "var(--color-copper)",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="section-label">Services</p>
        <h2
          className="mb-6 text-3xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What We Offer
        </h2>
        <p
          className="mb-16 max-w-2xl text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Custom automation solutions built around your tools and processes. Each
          service is scoped to your business after a free consultation.
        </p>

        {/* Top row: 3 cards */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {SERVICES.slice(0, 3).map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group flex flex-col p-8"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${service.color} 15%, transparent)`,
                }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>
              <h3
                className="mb-3 text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom row: 2 cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {SERVICES.slice(3).map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
              className="glass-card group flex flex-col p-8"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${service.color} 15%, transparent)`,
                }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>
              <h3
                className="mb-3 text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="btn-secondary">
            View All 20+ Services
          </Link>
        </div>
      </div>
    </section>
  );
}
