"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const PROJECTS = [
  { slug: "zero-cost-business-infrastructure", category: "Operations", title: "I Got Quoted $600 for a Website. I Built One in 3 Days for $0.", description: "Deployed a fully branded landing page with legal docs, contact forms, and a resource hub\u2014all self-hosted, zero monthly fees.", m1: "$0/mo", m1l: "Recurring costs", m2: "100%", m2l: "Ownership" },
  { slug: "automated-lead-generation-pipeline", category: "Sales & Marketing", title: "How I Turned Google Maps Into a Statewide Sales Machine", description: "An automated pipeline scrapes emails, pulls owner names from public records, and exports ready-to-contact leads\u201490% faster.", m1: "60%", m1l: "Hours saved", m2: "Daily", m2l: "Automated outreach" },
  { slug: "automated-community-messaging", category: "Communications", title: "This iPhone Automation Runs a Chess Club (Without the Organizer)", description: "An Apple Shortcut reads the schedule, writes personalized messages, and posts to WhatsApp. Zero cost. 100% hands-free.", m1: "100%", m1l: "Consistency", m2: "0", m2l: "Manual effort" },
  { slug: "self-hosted-cloud-storage", category: "Cloud & Backup", title: "I Canceled iCloud, Google Drive, and Arlo\u2014Here\u2019s What Replaced Them", description: "Photos, files, and security footage on my own server with full 3-2-1 backups. $40+/month gone.", m1: "85%", m1l: "Cost reduction", m2: "3-2-1", m2l: "Backup redundancy" },
  { slug: "doyle-group-resume-formatter", category: "Staffing & Operations", title: "Automated Resume Formatting Saves a Staffing Firm 20+ Hours a Week", description: "n8n + Claude AI pipeline: resumes upload, PII is scrubbed, content restructures into branded DOCX templates\u2014in under 60 seconds.", m1: "<60s", m1l: "Per resume", m2: "20+ hrs", m2l: "Saved weekly" },
];

export function WorkContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="pt-24" ref={ref}>
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="section-label">Portfolio</p>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            Our Recent Work
          </h1>
          <p className="mb-16 max-w-lg text-base" style={{ color: "var(--color-text-secondary)" }}>
            Real success stories from businesses that scaled smarter with Luwah Technologies automation services.
          </p>

          <div className="flex flex-col gap-6">
            {PROJECTS.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card grid gap-6 p-8 md:grid-cols-[1fr_200px]"
              >
                <div>
                  <span className="section-label" style={{ fontSize: "0.7rem" }}>{p.category}</span>
                  <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{p.description}</p>
                </div>
                <div className="flex flex-row gap-6 md:flex-col md:items-end md:justify-center md:gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-lake-light)" }}>{p.m1}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{p.m1l}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-lake-light)" }}>{p.m2}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{p.m2l}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/consultation" className="btn-primary">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
