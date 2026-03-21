import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Luwah Technologies. We respond within 24 hours. Free consultation available. Aurora, Colorado.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
