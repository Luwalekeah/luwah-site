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
      "At its core, Luwah Technologies is an automation-first company. While providing various services, the passion lies in helping clients reclaim time through intelligent automation. Specialization includes workflow generators like n8n and Apple Shortcuts, with advanced capabilities in Python and Microsoft Azure.",
  },
  {
    icon: Eye,
    title: "Honesty",
    description:
      "Luwah Technologies provides honesty and clarity in everything. Clients can trust transparent pricing aligned with market rates and the highest ethical standards. Direct communication occurs throughout every engagement, with clear expectations established upfront.",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "Luwah Technologies brings simplicity through innovation, with quality essential to that mission. The team remains committed and responsive throughout every project, delivering working products and thorough services with a testing period included.",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Luwah Technologies believes in empowering clients through education. Every product includes hands-on troubleshooting guides enabling clients to solve common issues independently, with educational content provided through multiple channels.",
  },
  {
    icon: TrendingUp,
    title: "Drive",
    description:
      "The Luwah Technologies team is passionate and enthusiastic about the work. Full commitment accompanies every project, with clients supported from initial consultation through testing and final sign-off.",
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
      "Build workflow automation for portability. Your data, workflows, and automations should be platform-agnostic, with an exit path by design.",
  },
];

export function AboutContent() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const antiRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const antiInView = useInView(antiRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-24">
      {/* Our Story */}
      <section className="py-24 md:py-32" ref={storyRef}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label">Our Background</p>
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
                  skill&mdash;it&apos;s a necessity. That drive to figure out how
                  things work, and more importantly, how to make them work
                  better, brought me to Colorado State University.
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
                  businesses that actually run our local communities&mdash;the
                  staffing firms, the salons, the care providers&mdash;were
                  drowning in the exact same manual tasks I was automating away
                  for the giants. Enterprise software was too expensive, and
                  basic tools weren&apos;t powerful enough.
                </p>
                <p>
                  I founded Luwah Technologies to bridge that gap. By leveraging
                  open-source tools like n8n and self-hosted infrastructure, I
                  build enterprise-grade automation that actually makes sense for
                  a small business budget. My goal isn&apos;t just to write
                  code&mdash;it&apos;s to minimize manual intervention so you can get
                  back to the work that actually matters.
                </p>
              </div>
            </motion.div>

            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div
                className="relative h-[400px] w-[320px] overflow-hidden rounded-2xl md:h-[480px] md:w-[380px]"
                style={{
                  border: "1px solid var(--color-border-default)",
                }}
              >
                <Image
                  src="/images/daniel-about-img.jpg"
                  alt="Daniel Cooke — Founder of Luwah Technologies"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 380px"
                />
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
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="section-label">Our Values</p>
          <h2
            className="mb-16 text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What We Believe
          </h2>

          {/* Top row: 3 */}
          <div className="mb-6 grid gap-6 md:grid-cols-3">
            {VALUES.slice(0, 3).map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(184,115,51,0.15)" }}
                >
                  <v.icon size={22} style={{ color: "var(--color-copper)" }} />
                </div>
                <h3
                  className="mb-3 text-lg font-bold"
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

          {/* Bottom row: 2 */}
          <div className="grid gap-6 md:grid-cols-2">
            {VALUES.slice(3).map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                className="glass-card p-8"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(184,115,51,0.15)" }}
                >
                  <v.icon size={22} style={{ color: "var(--color-copper)" }} />
                </div>
                <h3
                  className="mb-3 text-lg font-bold"
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

      {/* Team */}
      <section className="py-24 md:py-32" ref={teamRef}>
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="section-label">Our Team</p>
          <h2
            className="mb-16 text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet Our Experts
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card inline-flex flex-col overflow-hidden"
            style={{ maxWidth: 320 }}
          >
            <div
              className="relative h-[280px]"
            >
              <Image
                src="/images/daniel-about-img.jpg"
                alt="Daniel Cooke"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                <h3
                  className="text-base font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Daniel Cooke
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Founder &amp; Automation Specialist
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/danielcooke900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md"
                style={{
                  backgroundColor: "rgba(74,144,164,0.15)",
                  color: "var(--color-lake)",
                }}
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anti-Beliefs */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        ref={antiRef}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="section-label">Anti-Beliefs</p>
          <h2
            className="mb-16 text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What We Don&apos;t Believe In
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {ANTI_BELIEFS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={antiInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(184,115,51,0.1)" }}
                >
                  <X size={18} style={{ color: "var(--color-copper)" }} />
                </div>
                <h3
                  className="mb-2 text-sm font-bold"
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
