import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/data/posts";
import { getSanityPostBySlug, getSanityPostSlugs } from "@/lib/sanity";
import { BlogPostContent } from "./BlogPostContent";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const sanitySlugs = await getSanityPostSlugs();
  const slugs = sanitySlugs ?? getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getSanityPostBySlug(slug)) ?? getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getSanityPostBySlug(slug)) ?? getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
