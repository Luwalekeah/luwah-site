import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ImageDivider } from "@/components/ImageDivider";
import { getSiteSettings } from "@/lib/sanity";

export default async function HomePage() {
  const settings = await getSiteSettings();
  return (
    <>
      <HeroSection
        content={
          settings ? {
            eyebrow: settings.heroEyebrow,
            headline: settings.heroHeadline,
            subhead: settings.heroSubhead,
            primaryCtaLabel: settings.heroPrimaryCtaLabel,
            primaryCtaHref: settings.heroPrimaryCtaHref,
            secondaryCtaLabel: settings.heroSecondaryCtaLabel,
            secondaryCtaHref: settings.heroSecondaryCtaHref,
          } : undefined
        }
      />
      <ProcessSection />
      <ImageDivider
        src="/images/pexels-brett-sayles-4520560.jpg"
        alt="Server infrastructure"
      />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
