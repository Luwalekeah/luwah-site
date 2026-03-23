import { notFound } from "next/navigation";
import { getProjectBySlug, getAllSlugs } from "@/data/projects";
import { getSanityProjectBySlug, getSanityProjectSlugs } from "@/lib/sanity";
import { CaseStudyContent } from "./CaseStudyContent";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const sanitySlugs = await getSanityProjectSlugs();
  const slugs = sanitySlugs ?? getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getSanityProjectBySlug(slug)) ?? getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (await getSanityProjectBySlug(slug)) ?? getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
