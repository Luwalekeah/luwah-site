import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { PricingSection } from "@/components/PricingSection";
import { WebDesignSection } from "@/components/WebDesignSection";
import { getSiteSettings } from "@/lib/sanity";
import { getWebCatalog } from "@/lib/getWebCatalog";

export const metadata: Metadata = {
  title: "Automation Services",
  description:
    "20+ automation services from email setup to profitability dashboards. Fixed pricing starting at $150. See what we build.",
};

export default async function ServicesPage() {
  const [settings, catalog] = await Promise.all([getSiteSettings(), getWebCatalog()]);
  return (
    <>
      <ServicesContent />
      {/* Mounts the #pricing anchor the header's "Pricing" link points to. */}
      <PricingSection
        intro={settings?.pricingIntro}
        tiers={settings?.pricingTiers}
      />
      {/* Web-build offering at #web-design. */}
      <WebDesignSection catalog={catalog} />
    </>
  );
}
