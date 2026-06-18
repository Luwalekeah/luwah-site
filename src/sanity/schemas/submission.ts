import { defineField, defineType } from "sanity";

/**
 * A captured form submission (contact, consultation, or an abandoned partial).
 * Written server-side by the API routes. The captured fields are read-only in
 * Studio so an admin cannot accidentally alter the record of what a lead sent.
 * Only `status` and `adminNotes` are editable, for triage.
 */
export default defineType({
  name: "submission",
  title: "Form Submission",
  type: "document",
  // Submissions are created by the API, never hand-authored in Studio.
  // Hiding the "create new" action keeps the dataset honest.
  __experimental_omnisearch_visibility: false,
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "Your triage state. The only field you set by hand.",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Won", value: "won" },
          { title: "Lost", value: "lost" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "adminNotes",
      title: "Admin Notes",
      type: "text",
      rows: 3,
      description: "Internal notes. Not visible to the lead.",
    }),
    defineField({
      name: "formType",
      title: "Form",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Contact", value: "contact" },
          { title: "Consultation", value: "consultation" },
          { title: "Partial (abandoned)", value: "partial" },
        ],
      },
    }),
    defineField({ name: "leadStatus", title: "Lead Status", type: "string", readOnly: true }),
    defineField({ name: "submissionId", title: "Submission ID", type: "string", readOnly: true }),
    defineField({ name: "fullName", title: "Full Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "preferredContact", title: "Preferred Contact", type: "string", readOnly: true }),
    defineField({ name: "companyName", title: "Company", type: "string", readOnly: true }),
    defineField({ name: "industry", title: "Industry", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4, readOnly: true }),
    defineField({
      name: "helpAreas",
      title: "Help Areas",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
    }),
    defineField({ name: "urgency", title: "Urgency", type: "string", readOnly: true }),
    defineField({ name: "referralSource", title: "Referral Source", type: "string", readOnly: true }),
    defineField({ name: "pos", title: "POS Tool", type: "string", readOnly: true }),
    defineField({ name: "booking", title: "Booking Tool", type: "string", readOnly: true }),
    defineField({ name: "accounting", title: "Accounting Tool", type: "string", readOnly: true }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({ name: "ipHash", title: "IP Hash", type: "string", readOnly: true }),
    defineField({ name: "source", title: "Source", type: "string", readOnly: true }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { name: "fullName", email: "email", form: "formType", date: "submittedAt", status: "status" },
    prepare({ name, email, form, date, status }) {
      const when = date ? new Date(date).toLocaleString() : "no date";
      const flag = status && status !== "new" ? ` [${status}]` : "";
      return {
        title: `${name || email || "Unknown"} — ${form || "form"}${flag}`,
        subtitle: `${email || ""} · ${when}`,
      };
    },
  },
});
