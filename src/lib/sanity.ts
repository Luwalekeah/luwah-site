import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { BlogPost } from "@/data/posts";
import type { Project } from "@/data/projects";

// ── Client ───────────────────────────────────────────────────────────
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});

// ── Image helper ─────────────────────────────────────────────────────
const builder = createImageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanityImageUrl(source: any) {
  return builder.image(source);
}

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

export async function getSanityProjectSlugs(): Promise<string[] | null> {
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
