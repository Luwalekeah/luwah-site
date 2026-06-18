#!/usr/bin/env node

/**
 * One-time seed: create the `webCatalog` singleton with the 2026 defaults so
 * an editor sees the prices pre-filled in Studio. Safe to re-run: it replaces
 * the single document with id "webCatalog". The canonical defaults also live in
 * src/lib/webCatalog.ts as the code fallback. Keep them in sync if you change
 * pricing here.
 *
 * Usage:  node scripts/seed-web-catalog.mjs
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and a write-scoped SANITY_API_TOKEN in .env.local.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local ──────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  env[key.trim()] = rest.join("=").trim();
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ── Catalog (mirrors DEFAULT_CATALOG in src/lib/webCatalog.ts) ────────
const doc = {
  _id: "webCatalog",
  _type: "webCatalog",
  intro:
    "Five options, transparent pricing, and a working site in days. Every option includes build, deployment, and 30 days of support. Hosting is separate and you keep ownership of your code and data.",
  perPagePrice: 50,
  legal:
    "Standard rates shown. Custom quotes may differ based on scope and timeline. Colorado professional services are exempt from sales tax per §39-26-104, C.R.S. Pricing effective 2026-04-23, subject to change.",
  tiers: [
    { _key: "realtor-landing", key: "realtor-landing", name: "Realtor Landing", price: 300, priceLabel: "$300", pages: "Single Page", summary: "Conversion landing page for realtors.", features: ["1 page, designed to convert", "Up to 4 lead capture forms", "Gmail lead delivery (free)", "Mobile-first design", "Custom branding", "Listings not included"] },
    { _key: "tier-1", key: "tier-1", name: "Tier 1", price: 600, priceLabel: "$600", pages: "Basic Static Site", summary: "Marketing website with contact forms.", perPage: true, features: ["4 pages included (+$50 each add'l)", "Responsive design, on-page SEO", "Contact form", "Deployment and SSL setup", "30 days of support"] },
    { _key: "tier-1b", key: "tier-1b", name: "Tier 1B", price: 800, priceLabel: "$800", pages: "Website + Booking", summary: "Showcase site with embedded scheduling.", perPage: true, features: ["Everything in Tier 1", "Embeds Acuity, Calendly, Square, etc.", "Live availability", "Mobile friendly booking", "Keeps your existing tools"] },
    { _key: "tier-2", key: "tier-2", name: "Tier 2", price: 1500, priceLabel: "$1,500", pages: "Premium Web Service", summary: "Full custom booking and admin portal.", highlight: true, features: ["React app with Express and Supabase", "Custom admin dashboard", "Real time calendar sync", "Email automation and SMS alerts", "Google Analytics", "2FA, audit logs, rate limiting", "60 days of priority support"] },
    { _key: "tier-3", key: "tier-3", name: "Tier 3", price: 3000, priceLabel: "$3,000", pages: "Full Platform", summary: "Everything, plus payments and a CMS.", includedAddons: ["stripe", "sanity-cms", "sentry", "resend", "admin-account"], features: ["Everything in Tier 2", "Stripe payment integration", "Sanity CMS for blog and pages", "Sentry errors, Plausible analytics", "Resend email, Cloudflare WAF", "90 days of priority support"] },
  ],
  addons: [
    { _key: "managed-hosting", key: "managed-hosting", name: "Managed hosting (Render)", oneTime: 0, oneTimeLabel: "No setup fee", monthlyLabel: "From $10/mo", description: "We host, monitor, and maintain your site so you do not have to. Includes uptime monitoring and updates, starting at $10 a month." },
    { _key: "spreadsheet-leads", key: "spreadsheet-leads", name: "Spreadsheet lead capture", oneTime: 80, oneTimeLabel: "+$80 per sheet", variable: true, description: "Form submissions flow automatically into a Google Sheet you can sort, filter, and share. Priced per sheet." },
    { _key: "local-seo", key: "local-seo", name: "Local SEO setup", oneTime: 0, oneTimeLabel: "Priced per project", variable: true, description: "Setup that helps you show up in local Google searches and the map pack. Scoped and priced per project." },
    { _key: "stripe", key: "stripe", name: "Stripe payments", oneTime: 300, oneTimeLabel: "+$300", monthlyLabel: "2.9% + $0.30/tx", includedIn: ["tier-3"], description: "Accept card payments on your site through Stripe. The setup fee covers the integration; Stripe charges 2.9% plus $0.30 per transaction." },
    { _key: "sanity-cms", key: "sanity-cms", name: "Sanity CMS / blog module", oneTime: 300, oneTimeLabel: "+$300", includedIn: ["tier-3"], description: "A simple dashboard to edit your site's text, images, and blog yourself, with no code." },
    { _key: "sentry", key: "sentry", name: "Sentry error tracking", oneTime: 100, oneTimeLabel: "+$100", includedIn: ["tier-3"], description: "Automatic error tracking so we catch and fix problems before they affect your customers." },
    { _key: "resend", key: "resend", name: "Resend transactional email", oneTime: 200, oneTimeLabel: "+$200", includedIn: ["tier-3"], description: "Reliable automated emails like confirmations and receipts, sent from your own domain." },
    { _key: "slack", key: "slack", name: "Slack notifications", oneTime: 100, oneTimeLabel: "+$100", description: "Get a Slack message the moment a lead, order, or form submission comes in." },
    { _key: "twilio", key: "twilio", name: "Twilio SMS", oneTime: 200, oneTimeLabel: "+$200", description: "Send and receive text messages, such as appointment reminders or SMS alerts to customers." },
    { _key: "admin-account", key: "admin-account", name: "Admin account", oneTime: 200, oneTimeLabel: "+$200", includedIn: ["tier-3"], description: "A secure login to manage your site's content and data from one dashboard." },
    { _key: "client-portal", key: "client-portal", name: "Client portal", oneTime: 200, oneTimeLabel: "+$200", description: "A private, login-protected area where your clients can view their info, bookings, documents, or order status." },
  ],
  supportPlans: [
    { _key: "self-serve", key: "self-serve", name: "Self-Serve", priceLabel: "Free", includes: "Full documentation, best-effort email support, community forum." },
    { _key: "light", key: "light", name: "Light Support", priceLabel: "$50/mo", includes: "Email support (24-hr response), 2 hrs/mo customization, monthly check-ins." },
    { _key: "standard", key: "standard", name: "Standard", priceLabel: "$300/mo", includes: "Priority email + Slack, 8 hrs/mo, bi-weekly check-ins, security patches." },
    { _key: "premium", key: "premium", name: "Premium", priceLabel: "$750+/mo", includes: "24/7 on-call, dedicated Slack, 20 hrs/mo, weekly strategy calls, audits." },
    { _key: "payg", key: "payg", name: "Pay as you go", priceLabel: "$100/hr", includes: "No subscription. Help on specific issues, 4 hour minimum." },
  ],
};

const result = await client.createOrReplace(doc);
console.log(`OK: seeded ${result._id} into ${dataset} (${doc.tiers.length} tiers, ${doc.addons.length} add-ons)`);
