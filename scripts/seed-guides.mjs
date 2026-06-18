#!/usr/bin/env node

/**
 * Seed the Learn section with starter entries. Safe to re-run: each entry has a
 * fixed id, so it is replaced, not duplicated. Add or edit entries in Studio
 * afterward; this script only seeds the initial set.
 *
 * Usage:  node scripts/seed-guides.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const [k, ...rest] = t.split("=");
  env[k.trim()] = rest.join("=").trim();
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = env.SANITY_API_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const g = (slug, title, category, order, summary, body) => ({
  _id: `guide-${slug}`,
  _type: "guide",
  title,
  slug: { _type: "slug", current: slug },
  category,
  order,
  summary,
  body,
});

const GUIDES = [
  g("domain", "What is a Domain?", "Domains & DNS", 1,
    "Your website's address on the internet, like luwahtechnologies.com.",
    ["A domain is the name people type to reach your site. You rent it yearly from a registrar (GoDaddy, Namecheap, Cloudflare) for about $12 to $15 a year.",
     "## Owning vs hosting",
     "Owning a domain is separate from hosting. The domain is the address. Hosting is the actual building the site lives in. You can keep your domain at one company and host the site somewhere else."]),
  g("dns", "What is DNS?", "Domains & DNS", 2,
    "The internet's phone book. It points your domain to the server your site lives on.",
    ["DNS (Domain Name System) translates your domain name into the numeric address of the server hosting your site.",
     "When you change hosts, you update DNS records to point the domain at the new server. Changes can take a few minutes to a few hours to take effect."]),
  g("web-hosting", "What is Web Hosting?", "Hosting & Servers", 1,
    "The service that keeps your website online and reachable 24/7.",
    ["Hosting is renting space on a server that is always on, so visitors can load your site any time.",
     "## Types",
     "Static hosting (Netlify, Vercel, Cloudflare Pages) is cheap or free and great for marketing sites. App hosting (Render, Railway) runs sites with databases and logins. We pick the right one for your build."]),
  g("vps", "What is a VPS?", "Hosting & Servers", 2,
    "A Virtual Private Server: your own slice of a server with full control.",
    ["A VPS gives you a dedicated portion of a physical server, with your own operating system and resources, for more control and consistent performance than shared hosting.",
     "It is a step up from basic hosting and a step below renting a whole machine. Good for custom apps, heavier traffic, or when you need software a simple host will not allow."]),
  g("ssl", "What is SSL / HTTPS?", "Security", 1,
    "The padlock in the browser. It encrypts data between your site and visitors.",
    ["SSL (now technically TLS) encrypts the connection so passwords and form data cannot be read in transit. Sites with it show https and a padlock.",
     "Google ranks secure sites higher and browsers warn visitors away from sites without it. Every site we build includes it, set up for free."]),
  g("cms", "What is a CMS?", "General", 1,
    "A Content Management System lets you edit your site without touching code.",
    ["A CMS is the dashboard where you change text, images, prices, and posts yourself. WordPress is the famous one. We use Sanity, which is faster and cleaner.",
     "It means you are not paying a developer every time you want to fix a typo or add a blog post."]),
  g("seo", "What is SEO?", "SEO & Marketing", 1,
    "Search Engine Optimization: getting found on Google without paying for ads.",
    ["SEO is the work that helps your site rank in Google search results for the things your customers look for.",
     "## What it involves",
     "Fast pages, clear titles and descriptions, a sitemap, structured data, and useful content like guides and case studies. It is a long game, but it compounds. Paid ads stop the moment you stop paying. SEO keeps working."]),
  g("cdn", "What is a CDN?", "Hosting & Servers", 3,
    "A Content Delivery Network serves your site from locations near each visitor for speed.",
    ["A CDN keeps copies of your site on servers around the world, so a visitor in Florida loads it from a nearby server instead of one far away.",
     "It makes pages faster and absorbs traffic spikes. Cloudflare is the common one, and it doubles as a security layer."]),
];

const tx = client.transaction();
for (const doc of GUIDES) tx.createOrReplace(doc);
await tx.commit();
console.log(`OK: seeded ${GUIDES.length} Learn entries into ${client.config().dataset}`);
