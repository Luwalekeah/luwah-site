"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "luwah-studio",
  title: "Luwah Technologies",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Submissions split by form so leads are easy to scan.
            S.listItem()
              .title("Submissions")
              .child(
                S.list()
                  .title("Submissions")
                  .items([
                    S.listItem()
                      .title("Consultations")
                      .child(
                        S.documentList()
                          .title("Consultations")
                          .filter('_type == "submission" && formType == "consultation"')
                          .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("Contact Messages")
                      .child(
                        S.documentList()
                          .title("Contact Messages")
                          .filter('_type == "submission" && formType == "contact"')
                          .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("Partial (abandoned)")
                      .child(
                        S.documentList()
                          .title("Partial (abandoned)")
                          .filter('_type == "submission" && formType == "partial"')
                          .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("All Submissions")
                      .child(
                        S.documentList()
                          .title("All Submissions")
                          .filter('_type == "submission"')
                          .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                      ),
                  ])
              ),
            S.divider(),
            // Web-build offering: orders and intakes from the /order and /intake forms.
            S.listItem()
              .title("Web Orders")
              .child(
                S.documentList()
                  .title("Web Orders")
                  .filter('_type == "webOrder"')
                  .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
              ),
            S.listItem()
              .title("Build Intakes")
              .child(
                S.documentList()
                  .title("Build Intakes")
                  .filter('_type == "buildIntake"')
                  .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
              ),
            S.divider(),
            // Singletons for editable content and the web services catalog.
            S.listItem()
              .title("Site Content")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.listItem()
              .title("Web Services Catalog")
              .id("webCatalog")
              .child(
                S.document().schemaType("webCatalog").documentId("webCatalog")
              ),
            S.divider(),
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("project").title("Projects"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
