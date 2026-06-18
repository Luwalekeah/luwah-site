import { defineField, defineType } from "sanity";

/**
 * A Learn entry: a plain-language explainer (domain, hosting, VPS, SEO, etc.).
 * Add as many as you like in Studio. They appear on /learn grouped by category.
 */
export default defineType({
  name: "guide",
  title: "Learn Entry",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Web Design",
          "Domains & DNS",
          "Hosting & Servers",
          "Networking",
          "Hardware",
          "Security",
          "AI",
          "SEO & Marketing",
          "General",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Short definition",
      type: "text",
      rows: 2,
      description: "One or two plain sentences. Shown in the list.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "string" }],
      description: "Each item is a paragraph or a markdown heading (## Heading).",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower shows first within its category.",
    }),
  ],
  orderings: [
    { title: "Category, then order", name: "cat", by: [{ field: "category", direction: "asc" }, { field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
