import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'Display date, e.g. "Nov 20, 2025"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Automation", value: "Automation" },
          { title: "AI", value: "AI" },
          { title: "Integration", value: "Integration" },
          { title: "Infrastructure", value: "Infrastructure" },
          { title: "Strategy", value: "Strategy" },
          { title: "Sales", value: "Sales" },
          { title: "Analytics", value: "Analytics" },
          { title: "Education", value: "Education" },
          { title: "Case Study", value: "Case Study" },
        ],
      },
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "7 min read"',
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "string",
      description: 'Local path (e.g. "/images/photo.jpg") or external URL',
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Each item is a paragraph or markdown heading (e.g. ## Heading).",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
