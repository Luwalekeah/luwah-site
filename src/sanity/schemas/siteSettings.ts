import { defineField, defineType } from "sanity";

/**
 * Singleton holding editable site copy. One document, id "siteSettings".
 * Components read these values at render time and fall back to their built-in
 * defaults when a field is empty, so the site never breaks on a blank field.
 */
export default defineType({
  name: "siteSettings",
  title: "Site Content",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "company", title: "Company Info" },
    { name: "pricing", title: "Pricing" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", group: "hero" }),
    defineField({ name: "heroSubhead", title: "Hero Subheadline", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary Button Label", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaHref", title: "Primary Button Link", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary Button Label", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Secondary Button Link", type: "string", group: "hero" }),

    // ── Company ───────────────────────────────────────────
    defineField({ name: "contactEmail", title: "Contact Email", type: "string", group: "company" }),
    defineField({ name: "contactPhone", title: "Contact Phone", type: "string", group: "company" }),
    defineField({ name: "location", title: "Location", type: "string", group: "company" }),

    // ── Pricing ───────────────────────────────────────────
    defineField({ name: "pricingIntro", title: "Pricing Intro", type: "text", rows: 2, group: "pricing" }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      group: "pricing",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "price", title: "Price", type: "string" },
            { name: "unit", title: "Unit", type: "string" },
            { name: "cta", title: "Button Label", type: "string" },
            { name: "ctaHref", title: "Button Link", type: "string" },
            { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
            { name: "highlight", title: "Highlight this tier", type: "boolean" },
          ],
          preview: { select: { title: "title", subtitle: "price" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Content" }) },
});
