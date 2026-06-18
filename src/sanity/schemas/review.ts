import { defineField, defineType } from "sanity";

const star = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "number",
    readOnly: true,
    validation: (r) => r.min(1).max(5),
  });

/**
 * A client review submitted from /review. Stored unapproved. It only appears on
 * the site after you set `approved` to true in Studio. Star scores are captured
 * read-only; you control approval and feature placement.
 */
export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "approved",
      title: "Approved (show on site)",
      type: "boolean",
      initialValue: false,
      description: "Off until you vet it. The site only shows approved reviews.",
    }),
    defineField({
      name: "featured",
      title: "Featured (pin to top)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "adminNotes", title: "Admin Notes", type: "text", rows: 2 }),

    defineField({ name: "reviewerName", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "company", title: "Company", type: "string", readOnly: true }),
    defineField({ name: "role", title: "Role", type: "string", readOnly: true }),
    defineField({ name: "quote", title: "Review", type: "text", rows: 4, readOnly: true }),

    defineField({
      name: "ratings",
      title: "Category Ratings (1-5)",
      type: "object",
      readOnly: true,
      fields: [
        star("communication", "Communication & Responsiveness"),
        star("expertise", "Technical Expertise & Quality"),
        star("timeliness", "Timeliness & Deadlines"),
        star("value", "Value for the Price"),
        star("recommend", "Overall & Likelihood to Recommend"),
      ],
    }),
    defineField({ name: "overall", title: "Overall (avg of 5)", type: "number", readOnly: true }),

    defineField({ name: "date", title: "Submitted", type: "datetime", readOnly: true }),
    defineField({ name: "ipHash", title: "IP Hash", type: "string", readOnly: true }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { name: "reviewerName", company: "company", overall: "overall", approved: "approved" },
    prepare({ name, company, overall, approved }) {
      return {
        title: `${name || "Anonymous"}${company ? ` — ${company}` : ""}`,
        subtitle: `${overall != null ? `${overall}/5` : ""} ${approved ? "· approved" : "· pending"}`,
      };
    },
  },
});
