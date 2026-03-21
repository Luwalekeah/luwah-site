"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const PROJECTS = [
  {
    slug: "zero-cost-business-infrastructure",
    category: "Operations",
    title: "I Got Quoted $600 for a Website. I Built One in 3 Days for $0.",
    description:
      "Deployed a fully branded landing page with legal docs, contact forms, and a resource hub\u2014all self-hosted, zero monthly fees.",
    metrics: [
      { value: "$0/mo", label: "Recurring costs" },
      { value: "100%", label: "Ownership" },
    ],
  },
  {
    slug: "automated-lead-generation-pipeline",
    category: "Sales & Marketing",
    title: "How I Turned Google Maps Into a Statewide Sales Machine",
    description:
      "An automated pipeline scrapes emails, pulls owner names from public records, and exports ready-to-contact leads\u201490% faster.",
    metrics: [
      { value: "60%", label: "Hours saved" },
      { value: "Daily", label: "Automated outreach" },
    ],
  },
  {
    slug: "automated-community-messaging",
    category: "Communications",
    title: "This iPhone Automation Runs a Chess Club (Without the Organizer)",
    description:
      "An Apple Shortcut reads the schedule, writes personalized messages, and posts to WhatsApp. Zero cost. 100% hands-free.",
    metrics: [
      { value: "100%", label: "Consistency" },
      { value: "0", label: "Manual effort" },
    ],
  },
  {
    slug: "self-hosted-cloud-storage",
    category: "Cloud & Backup",
    title: "I Canceled iCloud, Google Drive, and Arlo\u2014Here\u2019s What Replaced Them",
    description:
      "Photos, files, and security footage on my own server with full 3-2-1 backups. Tech companies don\u2019t own my data anymore.",
    metrics: [
      { value: "85%", label: "Cost reduction" },
      { value: "3-2-1", label: "Backup redundancy" },
    ],
  },
  {
    slug: "doyle-group-resume-formatter",
    category: "Staffing & Operations",
    title: "Automated Resume Formatting Saves a Staffing Firm 20+ Hours a Week",
    description:
      "n8n + Claude AI pipeline: resumes upload, PII is scrubbed, content restructures into branded DOCX templates\u2014in under 60 seconds.",
    metrics: [
      { value: "<60s", label: "Per resume" },
      { value: "20+ hrs", label: "Saved weekly" },
    ],
  },
];

export function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      ref={ref}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="section-label">Portfolio</p>
        <h2
          className="mb-4 text-3xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Our Recent Work
        </h2>
        <p
          className="mb-16 max-w-lg text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Real success stories from businesses that scaled smarter with Luwah
          Technologies automation services.
        </p>

        {/* Top row: 2 cards */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {PROJECTS.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Middle row: 2 cards */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {PROJECTS.slice(2, 4).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 2} inView={inView} />
          ))}
        </div>

        {/* Bottom: featured card full width */}
        <ProjectCard project={PROJECTS[4]} index={4} inView={inView} featured />

        <div className="mt-12 text-center">
          <Link href="/work" className="btn-secondary">
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
  featured = false,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card flex flex-col overflow-hidden ${featured ? "mt-6" : ""}`}
    >
      <div className="flex flex-1 flex-col p-8">
        <span
          className="mb-4 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-copper)", fontFamily: "var(--font-display)" }}
        >
          {project.category}
        </span>
        <h3
          className="mb-3 text-lg font-bold leading-snug md:text-xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        <p
          className="mb-6 flex-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>
        <div className="flex gap-8">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-lake-light)" }}
              >
                {metric.value}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
