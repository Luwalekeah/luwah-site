import { createClient, type SanityClient } from "@sanity/client";
import type { BlogPost } from "@/data/posts";
import type { Project } from "@/data/projects";

// ── Client ───────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

let sanityClient: SanityClient | null = null;
if (projectId) {
  sanityClient = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_TOKEN,
    useCdn: process.env.NODE_ENV === "production",
    // Public site must never see drafts. This keeps unvetted AI blog drafts
    // (and any other draft) off the live site until you Publish in Studio.
    perspective: "published",
  });
}

export { sanityClient };

// ── GROQ queries ─────────────────────────────────────────────────────
const postFields = `
  "slug": slug.current,
  title,
  date,
  category,
  readTime,
  image,
  excerpt,
  content
`;

const projectFields = `
  "slug": slug.current,
  category,
  title,
  description,
  image,
  client,
  location,
  industry,
  completed,
  metrics,
  overview,
  challenge,
  solution,
  technologies
`;

// ── Fetchers ─────────────────────────────────────────────────────────

export async function getSanityPosts(): Promise<BlogPost[] | null> {
  if (!sanityClient) return null;
  try {
    const posts = await sanityClient.fetch<BlogPost[]>(
      `*[_type == "post"] | order(date desc) { ${postFields} }`
    );
    return posts.length > 0 ? posts : null;
  } catch (err) {
    console.error("Sanity fetch (posts) failed, using static data:", err);
    return null;
  }
}

export async function getSanityPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) return null;
  try {
    const post = await sanityClient.fetch<BlogPost | null>(
      `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
      { slug }
    );
    return post;
  } catch (err) {
    console.error("Sanity fetch (post) failed, using static data:", err);
    return null;
  }
}

export async function getSanityPostSlugs(): Promise<string[] | null> {
  if (!sanityClient) return null;
  try {
    const slugs = await sanityClient.fetch<string[]>(
      `*[_type == "post"].slug.current`
    );
    return slugs.length > 0 ? slugs : null;
  } catch (err) {
    console.error("Sanity fetch (post slugs) failed:", err);
    return null;
  }
}

export async function getSanityProjects(): Promise<Project[] | null> {
  if (!sanityClient) return null;
  try {
    const projects = await sanityClient.fetch<Project[]>(
      `*[_type == "project"] | order(completed desc) { ${projectFields} }`
    );
    return projects.length > 0 ? projects : null;
  } catch (err) {
    console.error("Sanity fetch (projects) failed, using static data:", err);
    return null;
  }
}

export async function getSanityProjectBySlug(slug: string): Promise<Project | null> {
  if (!sanityClient) return null;
  try {
    const project = await sanityClient.fetch<Project | null>(
      `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
      { slug }
    );
    return project;
  } catch (err) {
    console.error("Sanity fetch (project) failed, using static data:", err);
    return null;
  }
}

// ── Site settings (editable copy) ────────────────────────────────────
export interface PricingTier {
  title: string;
  description?: string;
  price?: string;
  unit?: string;
  cta?: string;
  ctaHref?: string;
  features?: string[];
  highlight?: boolean;
}

export interface SiteSettings {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubhead?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  pricingIntro?: string;
  pricingTiers?: PricingTier[];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]`
    );
  } catch (err) {
    console.error("Sanity fetch (siteSettings) failed, using defaults:", err);
    return null;
  }
}

export async function getSanityProjectSlugs(): Promise<string[] | null> {
  if (!sanityClient) return null;
  try {
    const slugs = await sanityClient.fetch<string[]>(
      `*[_type == "project"].slug.current`
    );
    return slugs.length > 0 ? slugs : null;
  } catch (err) {
    console.error("Sanity fetch (project slugs) failed:", err);
    return null;
  }
}

// ── Learn entries (guides) ───────────────────────────────────────────
export interface Guide {
  title: string;
  slug: string;
  category: string;
  summary?: string;
  body?: string[];
  order?: number;
}

const guideFields = `
  "slug": slug.current,
  title,
  category,
  summary,
  body,
  order
`;

export async function getGuides(): Promise<Guide[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<Guide[]>(
      `*[_type == "guide"] | order(category asc, order asc) { ${guideFields} }`
    );
  } catch (err) {
    console.error("Sanity fetch (guides) failed:", err);
    return [];
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<Guide | null>(
      `*[_type == "guide" && slug.current == $slug][0] { ${guideFields} }`,
      { slug }
    );
  } catch (err) {
    console.error("Sanity fetch (guide) failed:", err);
    return null;
  }
}

export async function getGuideSlugs(): Promise<string[] | null> {
  if (!sanityClient) return null;
  try {
    const slugs = await sanityClient.fetch<string[]>(`*[_type == "guide"].slug.current`);
    return slugs.length > 0 ? slugs : null;
  } catch (err) {
    console.error("Sanity fetch (guide slugs) failed:", err);
    return null;
  }
}
