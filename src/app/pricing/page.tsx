import type { Metadata } from "next";
import { PricingSection } from "@/components/PricingSection";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Automation Project Levels",
  description:
    "Transparent, per-project automation pricing. Quick wins from $150 up to full premium integrations. Every project starts with a free consultation.",
};

export default async function PricingPage() {
  const settings = await getSiteSettings();
  return (
    <div className="pt-24">
      <PricingSection intro={settings?.pricingIntro} tiers={settings?.pricingTiers} />
    </div>
  );
}
