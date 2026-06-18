/**
 * Catalog of web-build tiers, add-ons, and support plans.
 * The 2026 prices below are the seeded defaults. A Sanity `webCatalog`
 * singleton can override any of it without a deploy. The order form and the
 * services page both read getWebCatalog(), so editing one place updates both.
 */
export interface WebTier {
  key: string;
  name: string;
  price: number; // one-time base, used for the running total
  priceLabel: string;
  pages: string;
  summary: string;
  features: string[];
  perPage?: boolean; // charges +$50 per extra page
  includedAddons?: string[]; // addon keys already bundled, not charged again
  highlight?: boolean;
}

export interface WebAddon {
  key: string;
  name: string;
  oneTime: number; // 0 when there is no fixed setup fee
  oneTimeLabel: string;
  monthlyLabel?: string;
  includedIn?: string[]; // tier keys that bundle this addon
  variable?: boolean; // priced per project/unit, excluded from the fixed total
}

export interface WebSupportPlan {
  key: string;
  name: string;
  priceLabel: string;
  includes: string;
}

export interface WebCatalog {
  intro: string;
  perPagePrice: number;
  tiers: WebTier[];
  addons: WebAddon[];
  supportPlans: WebSupportPlan[];
  legal: string;
}

export const DEFAULT_CATALOG: WebCatalog = {
  intro:
    "Five options, transparent pricing, and a working site in days. Every option includes build, deployment, and 30 days of support. Hosting is separate and you keep ownership of your code and data.",
  perPagePrice: 50,
  tiers: [
    {
      key: "realtor-landing",
      name: "Realtor Landing",
      price: 300,
      priceLabel: "$300",
      pages: "Single Page",
      summary: "Conversion landing page for realtors.",
      features: [
        "1 page, designed to convert",
        "Up to 4 lead capture forms",
        "Gmail lead delivery (free)",
        "Mobile-first design",
        "Custom branding",
        "Listings not included",
      ],
    },
    {
      key: "tier-1",
      name: "Tier 1",
      price: 600,
      priceLabel: "$600",
      pages: "Basic Static Site",
      summary: "Marketing website with contact forms.",
      perPage: true,
      features: [
        "4 pages included (+$50 each add'l)",
        "Responsive design, on-page SEO",
        "Contact form",
        "Deployment and SSL setup",
        "30 days of support",
      ],
    },
    {
      key: "tier-1b",
      name: "Tier 1B",
      price: 800,
      priceLabel: "$800",
      pages: "Website + Booking",
      summary: "Showcase site with embedded scheduling.",
      perPage: true,
      features: [
        "Everything in Tier 1",
        "Embeds Acuity, Calendly, Square, etc.",
        "Live availability",
        "Mobile friendly booking",
        "Keeps your existing tools",
      ],
    },
    {
      key: "tier-2",
      name: "Tier 2",
      price: 1500,
      priceLabel: "$1,500",
      pages: "Premium Web Service",
      summary: "Full custom booking and admin portal.",
      highlight: true,
      features: [
        "React app with Express and Supabase",
        "Custom admin dashboard",
        "Real time calendar sync",
        "Email automation and SMS alerts",
        "Google Analytics",
        "2FA, audit logs, rate limiting",
        "60 days of priority support",
      ],
    },
    {
      key: "tier-3",
      name: "Tier 3",
      price: 3000,
      priceLabel: "$3,000",
      pages: "Full Platform",
      summary: "Everything, plus payments and a CMS.",
      includedAddons: ["stripe", "sanity-cms", "sentry", "resend", "multi-user"],
      features: [
        "Everything in Tier 2",
        "Stripe payment integration",
        "Sanity CMS for blog and pages",
        "Sentry errors, Plausible analytics",
        "Resend email, Cloudflare WAF",
        "90 days of priority support",
      ],
    },
  ],
  addons: [
    { key: "managed-hosting", name: "Managed hosting (Render)", oneTime: 0, oneTimeLabel: "No setup fee", monthlyLabel: "From $10/mo" },
    { key: "spreadsheet-leads", name: "Spreadsheet lead capture", oneTime: 80, oneTimeLabel: "+$80 per sheet", variable: true },
    { key: "local-seo", name: "Local SEO setup", oneTime: 0, oneTimeLabel: "Priced per project", variable: true },
    { key: "stripe", name: "Stripe payments", oneTime: 300, oneTimeLabel: "+$300", monthlyLabel: "2.9% + $0.30/tx", includedIn: ["tier-3"] },
    { key: "sanity-cms", name: "Sanity CMS / blog module", oneTime: 300, oneTimeLabel: "+$300", includedIn: ["tier-3"] },
    { key: "sentry", name: "Sentry error tracking", oneTime: 100, oneTimeLabel: "+$100", includedIn: ["tier-3"] },
    { key: "resend", name: "Resend transactional email", oneTime: 200, oneTimeLabel: "+$200", includedIn: ["tier-3"] },
    { key: "slack", name: "Slack notifications", oneTime: 100, oneTimeLabel: "+$100" },
    { key: "twilio", name: "Twilio SMS", oneTime: 200, oneTimeLabel: "+$200" },
    { key: "multi-user", name: "Multi-user admin accounts", oneTime: 200, oneTimeLabel: "+$200", includedIn: ["tier-3"] },
  ],
  supportPlans: [
    { key: "self-serve", name: "Self-Serve", priceLabel: "Free", includes: "Full documentation, best-effort email support, community forum." },
    { key: "light", name: "Light Support", priceLabel: "$100/mo", includes: "Email support (24-hr response), 4 hrs/mo customization, monthly check-ins." },
    { key: "standard", name: "Standard", priceLabel: "$300/mo", includes: "Priority email + Slack, 8 hrs/mo, bi-weekly check-ins, security patches." },
    { key: "premium", name: "Premium", priceLabel: "$750+/mo", includes: "24/7 on-call, dedicated Slack, 20 hrs/mo, weekly strategy calls, audits." },
    { key: "payg", name: "Pay as you go", priceLabel: "$100/hr", includes: "No subscription. Help on specific issues, 4 hour minimum." },
  ],
  legal:
    "Standard rates shown. Custom quotes may differ based on scope and timeline. Colorado professional services are exempt from sales tax per §39-26-104, C.R.S. Pricing effective 2026-04-23, subject to change.",
};

export interface OrderSelection {
  tierKey: string;
  addonKeys: string[];
  extraPages: number;
}

export interface OrderTotal {
  tierName: string;
  total: number; // one-time fixed total in USD
  hasVariableItems: boolean; // true when a quoted add-on was selected
  chargedAddonKeys: string[]; // add-ons that contributed to the total
}

/**
 * Single source of truth for the running total. Used by the order form to
 * display it and by the API route to recompute it server-side, so a tampered
 * client total is never trusted.
 */
export function computeOrderTotal(
  catalog: WebCatalog,
  sel: OrderSelection
): OrderTotal {
  const tier = catalog.tiers.find((t) => t.key === sel.tierKey);
  if (!tier) {
    return { tierName: "", total: 0, hasVariableItems: false, chargedAddonKeys: [] };
  }

  let total = tier.price;
  if (tier.perPage && sel.extraPages > 0) {
    total += sel.extraPages * catalog.perPagePrice;
  }

  const included = new Set(tier.includedAddons || []);
  const charged: string[] = [];
  let hasVariable = false;

  for (const key of sel.addonKeys) {
    const addon = catalog.addons.find((a) => a.key === key);
    if (!addon || included.has(key)) continue; // bundled add-ons are free
    if (addon.variable) {
      hasVariable = true; // quoted separately, not added to the fixed total
      continue;
    }
    total += addon.oneTime;
    charged.push(key);
  }

  return { tierName: tier.name, total, hasVariableItems: hasVariable, chargedAddonKeys: charged };
}
