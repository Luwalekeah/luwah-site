import { sanityClient } from "@/lib/sanity";
import { DEFAULT_CATALOG, type WebCatalog } from "@/lib/webCatalog";

/**
 * Reads the Sanity catalog and merges it over the code defaults. Any field the
 * editor leaves empty keeps its default, so the catalog never renders blank.
 * Lives apart from webCatalog.ts so client components can import the pure
 * pricing logic without pulling in the Sanity client.
 */
export async function getWebCatalog(): Promise<WebCatalog> {
  if (!sanityClient) return DEFAULT_CATALOG;
  try {
    const doc = await sanityClient.fetch<Partial<WebCatalog> | null>(
      `*[_type == "webCatalog"][0]`
    );
    if (!doc) return DEFAULT_CATALOG;
    return {
      intro: doc.intro || DEFAULT_CATALOG.intro,
      perPagePrice: doc.perPagePrice ?? DEFAULT_CATALOG.perPagePrice,
      tiers: doc.tiers?.length ? doc.tiers : DEFAULT_CATALOG.tiers,
      addons: doc.addons?.length ? doc.addons : DEFAULT_CATALOG.addons,
      supportPlans: doc.supportPlans?.length ? doc.supportPlans : DEFAULT_CATALOG.supportPlans,
      legal: doc.legal || DEFAULT_CATALOG.legal,
    };
  } catch (err) {
    console.error("Sanity fetch (webCatalog) failed, using defaults:", err);
    return DEFAULT_CATALOG;
  }
}
