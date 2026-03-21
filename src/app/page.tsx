import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
