"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/data/posts";

function renderParagraph(text: string, index: number) {
  // Handle markdown-style h2 headers
  if (text.startsWith("## ")) {
    return (
      <h2
        key={index}
        className="mb-4 mt-10 text-2xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {text.replace("## ", "")}
      </h2>
    );
  }

  // Handle bold text and links within paragraphs
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  const rendered = parts.map((part, i) => {
    // Bold
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={i} style={{ color: "var(--color-text-primary)" }}>
          {boldMatch[1]}
        </strong>
      );
    }
    // Link
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <Link
          key={i}
          href={linkMatch[2]}
          className="no-underline transition-colors duration-200"
          style={{ color: "var(--color-copper)" }}
        >
          {linkMatch[1]}
        </Link>
      );
    }
    return part;
  });

  return (
    <p
      key={index}
      className="mb-5 text-base leading-relaxed"
      style={{ color: "var(--color-text-secondary)" }}
    >
      {rendered}
    </p>
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <div className="pt-24">
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm no-underline transition-colors duration-200"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="mb-4 flex items-center gap-4">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-copper)" }}
              >
                {post.category}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {post.date}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {post.readTime}
              </span>
            </div>
            <h1
              className="mb-6 max-w-3xl text-3xl font-bold md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-14 h-64 overflow-hidden md:h-96"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
            />
          </motion.div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            {post.content.map((block, i) => renderParagraph(block, i))}
          </motion.div>
        </div>
      </article>
    </div>
  );
}
