/**
 * Sanity schema: Case Study / Project
 *
 * Import this into your Sanity Studio's schema index to register the "project" type.
 * Matches the Project interface in src/data/projects.ts.
 */
const project = {
  name: "project",
  title: "Case Study",
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
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    },
    {
      name: "image",
      title: "Cover Image",
      type: "string",
      description: 'Local path (e.g. "/images/photo.jpg") or Sanity image URL',
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "industry",
      title: "Industry",
      type: "string",
    },
    {
      name: "completed",
      title: "Completed",
      type: "string",
      description: 'Year or date string, e.g. "2026"',
    },
    {
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    },
    {
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
    },
    {
      name: "challenge",
      title: "Challenges",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "solution",
      title: "Solutions",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "image" },
  },
};

export default project;
