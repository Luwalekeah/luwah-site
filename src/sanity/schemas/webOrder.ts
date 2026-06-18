import { defineField, defineType } from "sanity";

/**
 * A submitted web-build order from the /order configurator. Captured fields are
 * read-only. Status and adminNotes are editable for triage.
 */
export default defineType({
  name: "webOrder",
  title: "Web Order",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Quoted", value: "quoted" },
          { title: "Accepted", value: "accepted" },
          { title: "Building", value: "building" },
          { title: "Delivered", value: "delivered" },
          { title: "Lost", value: "lost" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({ name: "adminNotes", title: "Admin Notes", type: "text", rows: 3 }),
    defineField({ name: "submissionId", title: "Submission ID", type: "string", readOnly: true }),
    defineField({ name: "fullName", title: "Full Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "businessName", title: "Business", type: "string", readOnly: true }),
    defineField({ name: "tierKey", title: "Tier", type: "string", readOnly: true }),
    defineField({ name: "tierName", title: "Tier Name", type: "string", readOnly: true }),
    defineField({ name: "extraPages", title: "Extra Pages", type: "number", readOnly: true }),
    defineField({
      name: "addonKeys",
      title: "Add-ons",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
    }),
    defineField({ name: "supportPlanKey", title: "Support Plan", type: "string", readOnly: true }),
    defineField({
      name: "estimatedTotal",
      title: "Estimated One-Time Total (USD)",
      type: "number",
      readOnly: true,
    }),
    defineField({ name: "hasVariableItems", title: "Includes quoted items", type: "boolean", readOnly: true }),
    defineField({ name: "notes", title: "Customer Notes", type: "text", rows: 3, readOnly: true }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
    defineField({ name: "ipHash", title: "IP Hash", type: "string", readOnly: true }),
  ],
  orderings: [
    { title: "Newest first", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
  preview: {
    select: { name: "fullName", tier: "tierName", total: "estimatedTotal", date: "submittedAt", status: "status" },
    prepare({ name, tier, total, date, status }) {
      const when = date ? new Date(date).toLocaleDateString() : "";
      const flag = status && status !== "new" ? ` [${status}]` : "";
      return {
        title: `${name || "Unknown"} — ${tier || "order"}${flag}`,
        subtitle: `${total != null ? `$${total}` : ""} · ${when}`,
      };
    },
  },
});
