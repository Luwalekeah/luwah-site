"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { RefreshCw, Eye, Star, BookOpen, TrendingUp, X } from "lucide-react";

const VALUES = [
  {
    icon: RefreshCw,
    title: "Automation",
    description:
      "At its core, Luwah Technologies is an automation-first company. We specialize in workflow generators like n8n and Apple Shortcuts, with advanced capabilities in Python and Microsoft Azure.",
  },
  {
    icon: Eye,
    title: "Honesty",
    description:
      "Transparent pricing aligned with market rates and the highest ethical standards. Direct communication throughout every engagement, with clear expectations upfront.",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "We deliver working products and thorough services with a testing period included. Committed and responsive throughout every project.",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Every product includes hands-on troubleshooting guides so clients can solve common issues independently.",
  },
  {
    icon: TrendingUp,
    title: "Drive",
    description:
      "Full commitment accompanies every project — from initial consultation through testing and final sign-off.",
  },
];

const ANTI_BELIEFS = [
  {
    title: "Busy \u2260 productive",
    description:
      "Workflow automation should delete steps, not add dashboards.",
  },
  {
    title: "More data \u2260 better insights",
    description:
      'Better data beats more data. Define "truth," then automate measurement.',
  },
  {
    title: "Automation \u2260 risk",
    description:
      "Business process automation can increase control through audit trails, approvals, and consistent execution.",
  },
  {
    title: "Vendor lock-in \u2260 stability",
    description:
      "Your data, workflows, and automations should be platform-agnostic, with an exit path by design.",
  },
];

export function AboutContent() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  const antiRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  const antiInView = useInView(antiRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-24">
      {/* Our Story */}
      <section className="py-24 md:py-32" ref={storyRef}>
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={storyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="mb-8 text-4xl font-bold md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Story
              </h1>
              <div
                className="flex flex-col gap-5 text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <p>
                  My path into data and automation didn&apos;t start in a standard
                  corporate tech hub. It started in Liberia, where I learned
                  early on that resourceful problem-solving isn&apos;t just a
                  skill&mdash;it&apos;s a necessity.
                </p>
                <p>
                  For nearly a decade, I worked as a Senior Data Engineer,
                  building massive data pipelines for Fortune 500 companies and
                  healthcare organizations like UnitedHealthcare. I saw firsthand
                  how enterprise automation saved millions of dollars and
                  thousands of hours.
                </p>
                <p>
                  But I also noticed a massive gap. The small and medium-sized
                  businesses that actually run our local communities were
                  drowning in the exact same manual tasks I was automating away
                  for the giants.
                </p>
                <p>
                  I founded Luwah Technologies to bridge that gap. By leveraging
                  open-source tools like n8n and self-hosted infrastructure, I
                  build enterprise-grade automation that actually makes sense for
                  a small business budget.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={storyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative h-[400px] w-[320px] overflow-hidden rounded-xl md:h-[480px] md:w-[380px]"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <Image
                    src="/images/daniel-about-img.jpg"
                    alt="Daniel Cooke — Founder of Luwah Technologies"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 380px"
                  />
                </div>
                <div className="text-center">
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Daniel Cooke
                  </h3>
                  <p
                    className="mb-2 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Founder &amp; Automation Specialist
                  </p>
                  <a
                    href="https://daniel-cooke-cv.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold no-underline"
                    style={{ color: "var(--color-copper)" }}
                  >
                    View Resume →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        ref={valuesRef}
      >
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <h2
            className="mb-14 text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What we believe
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0 }}
                animate={valuesInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-7"
              >
                <v.icon
                  size={20}
                  className="mb-5"
                  style={{ color: "var(--color-copper)" }}
                />
                <h3
                  className="mb-2 text-base font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Image */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/images/rawpixel-desk-3139127_1920.jpg"
          alt="Workspace desk"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, var(--color-bg-secondary), transparent 30%, transparent 70%, var(--color-bg-secondary))" }}
        />
      </section>

      {/* Anti-Beliefs */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        ref={antiRef}
      >
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <h2
            className="mb-14 text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What we don&apos;t believe in
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ANTI_BELIEFS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                animate={antiInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-6"
              >
                <X
                  size={16}
                  className="mb-4"
                  style={{ color: "var(--color-copper)" }}
                />
                <h3
                  className="mb-2 text-sm font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
