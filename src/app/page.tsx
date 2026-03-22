import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ImageDivider } from "@/components/ImageDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
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
