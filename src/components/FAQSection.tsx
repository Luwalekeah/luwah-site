"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What industries do you provide automation services for?",
    answer:
      "We work with small businesses across industries\u2014salons, staffing firms, breweries, liquor stores, restaurants, healthcare practices, nonprofits, and professional services. If your business has repetitive processes that follow a pattern, automation can help regardless of industry.",
  },
  {
    question: "How long does it take to automate business processes?",
    answer:
      "It depends on complexity. Quick wins like email setup or basic reporting take 1\u20133 days. Core projects like reminder systems or dashboards typically take 1\u20132 weeks. Premium integrations involving multiple systems can take 2\u20134 weeks. Every project includes a clear timeline in the proposal.",
  },
  {
    question: "Is my business data secure with AI automation?",
    answer:
      "Yes. Unlike many agencies that rely entirely on shared public-cloud tools, Luwah Technologies operates its own private, self-hosted infrastructure. Your core automation logic and sensitive data triggers are processed on our dedicated Proxmox servers located in Aurora, CO, secured via Cloudflare zero-trust tunnels. When AI is involved, your data is processed but never stored by AI providers. We prioritize data sovereignty because you should own your processes, not lease them to a third-party server.",
  },
  {
    question: "What AI and automation tools do you work with?",
    answer:
      "Our primary platform is n8n\u2014an open-source workflow engine that connects to hundreds of services. We also work with Python, Apple Shortcuts, the Claude AI API, and integrations with Snowflake, Salesforce, and Microsoft 365. Tool selection depends on what fits your business best.",
  },
  {
    question: "Can I see a demo before committing?",
    answer:
      "The free 30-minute consultation is a live walkthrough of what\u2019s possible for your specific business. We\u2019ll discuss your challenges and show relevant examples. For custom projects, the proposal details exactly what you\u2019ll receive before you commit.",
  },
  {
    question: "How much does workflow automation cost?",
    answer:
      "Quick wins start at $150, core projects at $300, and premium integrations at $750+. Ongoing retainers start at $50/month. Every project gets a fixed-price quote\u2014no surprises, no hourly billing that spirals. The consultation is free.",
  },
  {
    question: "Do I need to pay monthly fees for automation?",
    answer:
      "Not necessarily. Most projects are one-time builds you own outright. Some solutions benefit from ongoing hosting or maintenance ($50\u2013$200/month), but that\u2019s optional. We\u2019ll always tell you upfront if a solution has recurring costs.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-20">
          {/* Left: Label */}
          <div>
            <p className="section-label">Answers</p>
            <h2
              className="text-3xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              FAQs
            </h2>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-b"
                style={{ borderColor: "var(--color-border-default)" }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  <span className="pr-4">{faq.question}</span>
                  {openIndex === i ? (
                    <Minus size={18} style={{ color: "var(--color-copper)", flexShrink: 0 }} />
                  ) : (
                    <Plus size={18} style={{ color: "var(--color-copper)", flexShrink: 0 }} />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-5 text-sm leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
