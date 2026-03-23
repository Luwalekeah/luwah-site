/**
 * Sanity schema: Blog Post
 *
 * Import this into your Sanity Studio's schema index to register the "post" type.
 * Matches the BlogPost interface in src/data/posts.ts.
 */
const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      description: 'Display date, e.g. "Nov 20, 2025"',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
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
        ],
      },
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "7 min read"',
    },
    {
      name: "image",
      title: "Cover Image",
      type: "string",
      description: 'Local path (e.g. "/images/photo.jpg") or Sanity image URL',
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Each array item is a paragraph or markdown heading (e.g. ## Heading). Matches the static content[] format.",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
};

export default post;
