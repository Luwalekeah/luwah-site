import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Automation Lab | Blog",
  description: "Practical articles on small business automation, n8n workflows, and technology strategy from a hands-on consultant.",
};

const POSTS = [
  { slug: "future-of-workflow-automation-2026", title: "The Future of Workflow Automation in 2026", date: "Nov 20, 2025", category: "Automation" },
  { slug: "ai-chatbots-customer-experience", title: "How AI Chatbots Are Redefining Customer Experience", date: "Nov 29, 2025", category: "AI" },
  { slug: "ai-boosts-lead-generation", title: "5 Ways AI Boosts Lead Generation & Outreach", date: "Jan 7, 2026", category: "Sales" },
  { slug: "data-to-decisions-ai-insights", title: "From Data to Decisions: How AI Unlocks Business Insights", date: "Jan 20, 2026", category: "Analytics" },
  { slug: "real-roi-ai-automation-small-business", title: "The Real ROI of AI Automation for Small Businesses", date: "Feb 5, 2026", category: "Education" },
  { slug: "why-your-small-business-needs-automation", title: "Why Your Small Business Needs Automation (And Where to Start)", date: "Mar 10, 2026", category: "Automation" },
  { slug: "n8n-vs-zapier-honest-comparison", title: "n8n vs. Zapier: An Honest Comparison from Someone Who Uses Both", date: "Mar 14, 2026", category: "Automation" },
  { slug: "automated-resume-formatter-case-study", title: "How We Built a Resume Formatter That Saves 20 Hours a Week", date: "Mar 18, 2026", category: "Case Study" },
  { slug: "5-signs-your-business-is-ready-for-automation", title: "5 Signs Your Business Is Ready for Automation", date: "Mar 22, 2026", category: "Education" },
  { slug: "small-business-email-deliverability", title: "The Small Business Email Problem Nobody Talks About", date: "Mar 26, 2026", category: "Education" },
];

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="section-label" style={{ color: "#B87333" }}>Blog</p>
          <h1
            className="mb-4 text-4xl font-bold md:text-6xl"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            The Automation Lab
          </h1>
          <p
            className="mb-16 max-w-lg text-base"
            style={{ color: "#A8A5A0" }}
          >
            Explore the latest trends, strategies, and real-world use cases in
            AI and automation.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="glass-card group flex flex-col overflow-hidden"
              >
                {/* Image placeholder */}
                <div
                  className="flex h-48 items-center justify-center"
                  style={{ backgroundColor: "#141C32" }}
                >
                  <span className="text-xs" style={{ color: "#6B6965" }}>
                    [Featured Image]
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2
                    className="mb-2 text-base font-bold leading-snug"
                    style={{ fontFamily: "var(--font-display, sans-serif)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="mt-auto text-xs" style={{ color: "#6B6965" }}>
                    {post.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
