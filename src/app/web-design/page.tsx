import type { Metadata } from "next";
import { WebDesignSection } from "@/components/WebDesignSection";
import { getWebCatalog } from "@/lib/getWebCatalog";

export const metadata: Metadata = {
  title: "Website Design & Build",
  description:
    "Fixed-price websites from $300. Realtor landing pages, marketing sites, booking systems, and full platforms. Build, deploy, and 30 days of support included.",
};

export default async function WebDesignPage() {
  const catalog = await getWebCatalog();
  return (
    <div className="pt-24">
      <WebDesignSection catalog={catalog} />
    </div>
  );
}
