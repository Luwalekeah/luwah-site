"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const SERVICE_CATEGORIES = [
  {
    title: "Business Infrastructure & Professional Setup",
    services: [
      { name: "Professional Email & Domain Setup", description: "Custom domain email with Cloudflare DNS, SPF/DKIM/DMARC records, spam filtering, and deliverability testing." },
      { name: "Email Deliverability Audit & Repair", description: "Comprehensive testing to identify why messages hit spam. DNS analysis, authentication fixes, and verification across Gmail, Outlook, and Yahoo." },
    ],
  },
  {
    title: "Client Retention & Communication",
    services: [
      { name: "\u201CTime for Service\u201D Reminder System", description: "Automated system tracking individual client service cycles with personalized reminders via text, email, or both." },
      { name: "SMS/Email Opt-In & List Building", description: "Complete signup infrastructure with QR codes, website widgets, and text-to-join keywords with proper compliance." },
      { name: "Win-Back Campaign for Lapsed Clients", description: "Automated identification of clients who haven\u2019t returned within their normal cycle, with triggered outreach sequences." },
      { name: "VIP & Loyalty Notification System", description: "First access to new products and prime appointment openings for your best customers, identified automatically." },
    ],
  },
  {
    title: "Data Analytics & Business Intelligence",
    services: [
      { name: "True Profitability Dashboard", description: "Custom reporting showing actual profit by product, service, or client\u2014factoring in labor, costs, overhead, and processing fees." },
      { name: "Client Lifetime Value Tracking", description: "Calculate what each client is worth over time, identify valuable segments, and focus retention where it matters." },
      { name: "Cash Flow Forecasting", description: "Automated projections based on recurring revenue, seasonal trends, and upcoming expenses delivered to your inbox." },
      { name: "Service & Product Performance Scorecard", description: "Weekly or monthly automated reports showing what\u2019s selling, trends, and actionable recommendations." },
    ],
  },
  {
    title: "Cross-Platform Integration",
    services: [
      { name: "Customer Data Unification", description: "Merge customer records from POS, booking software, email marketing, and accounting into a single clean database." },
      { name: "Inventory Sync Across Platforms", description: "Real-time inventory updates between e-commerce, in-store POS, and supplier systems." },
      { name: "Multi-Source Accounting Reconciliation", description: "Automatically match transactions from Square, Venmo, Zelle, and online payments with accounting software." },
    ],
  },
  {
    title: "Operational Automation",
    services: [
      { name: "Smart Reorder Alerts", description: "Monitor inventory levels and notify when to reorder with suggested quantities based on sales velocity." },
      { name: "Review Request & Reputation Management", description: "Automated review requests at optimal timing with monitoring and alerts for new reviews." },
      { name: "Appointment-to-Invoice Pipeline", description: "Automatically generate and send invoices when services complete, apply deposits, and track payment status." },
    ],
  },
  {
    title: "Industry-Specific Solutions",
    services: [
      { name: "Brewery: Keg Tracking & Deposit Management", description: "Track keg locations, automate deposit invoicing, and trigger follow-ups for unreturned kegs." },
      { name: "Salon: Commission & Tip Calculation", description: "Complex commission structures exported directly to payroll, handling scenarios generic software can\u2019t configure." },
      { name: "Staffing: Timesheet Collection & Approval", description: "Automated reminders, approval routing, and direct export to payroll/billing systems." },
      { name: "Liquor Store: Intelligent Loyalty System", description: "Advanced loyalty recognizing individual buying patterns with personalized offers based on category preferences." },
    ],
  },
];

const TIERS = [
  { tier: "Quick Wins", start: "$150", description: "Email setup, basic reporting, single-platform automation" },
  { tier: "Core Projects", start: "$300", description: "Reminder systems, dashboards, win-back campaigns" },
  { tier: "Premium Integrations", start: "$750", description: "Multi-system solutions, full analytics suites" },
  { tier: "Ongoing Support", start: "$50/mo", description: "Hosting, monitoring, and maintenance" },
];

export function ServicesContent() {
  const [openCat, setOpenCat] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="pt-24" ref={ref}>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="section-label">Services</p>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What We Build
          </h1>
          <p
            className="mb-16 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Most small business software handles the basics well. But when you
            need systems to talk to each other, reports that show actual profit,
            or customers that keep coming back automatically&mdash;that&apos;s where
            standard tools fall short. These services show what&apos;s possible.
            Your project will be scoped to your business after a free consultation.
          </p>

          {/* Categories accordion */}
          <div className="flex flex-col gap-4">
            {SERVICE_CATEGORIES.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenCat(openCat === catIdx ? null : catIdx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <h2
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {cat.title}
                  </h2>
                  <ChevronDown
                    size={20}
                    style={{
                      color: "var(--color-copper)",
                      transform: openCat === catIdx ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.25s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>
                <AnimatePresence>
                  {openCat === catIdx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="grid gap-4 px-6 pb-6 md:grid-cols-2"
                      >
                        {cat.services.map((s) => (
                          <div
                            key={s.name}
                            className="rounded-xl p-5"
                            style={{
                              backgroundColor: "var(--color-bg-tertiary)",
                              border: "1px solid var(--color-border-default)",
                            }}
                          >
                            <h3
                              className="mb-2 text-sm font-bold"
                              style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--color-copper-light)",
                              }}
                            >
                              {s.name}
                            </h3>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {s.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            className="mb-12 text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Investment Levels
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {TIERS.map((t) => (
              <div key={t.tier} className="glass-card p-6">
                <h3
                  className="mb-1 text-sm font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-copper)" }}
                >
                  {t.tier}
                </h3>
                <div
                  className="mb-3 text-2xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Starting at {t.start}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/consultation" className="btn-primary">
              Get a Personalized Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
