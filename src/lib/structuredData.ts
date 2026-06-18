const BASE = "https://luwahtechnologies.com";

/**
 * Site-wide Organization schema. Deliberately NOT LocalBusiness and with no
 * AggregateRating: Google disallows self-serving review markup, and a
 * service-area business has no public storefront address. areaServed is the US.
 */
export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Luwah Technologies",
  url: BASE,
  logo: `${BASE}/images/sharing-img-logo.jpg`,
  description:
    "Custom automation, web development, and workflow solutions for small businesses. Based in the Denver metro, serving the entire USA.",
  areaServed: { "@type": "Country", name: "United States" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-720-421-7184",
    email: "hello@luwahtechnologies.com",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
};

/** BlogPosting schema for an individual article. */
export function blogPostingSchema(post: {
  title: string;
  excerpt?: string;
  slug: string;
  date?: string;
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${BASE}${post.image.startsWith("/") ? "" : "/"}${post.image}` : undefined,
    datePublished: post.date,
    mainEntityOfPage: `${BASE}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Luwah Technologies", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Luwah Technologies",
      logo: { "@type": "ImageObject", url: `${BASE}/images/sharing-img-logo.jpg` },
    },
  };
}
