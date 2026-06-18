import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with Luwah Technologies: process, pricing, hosting, ownership, and support.",
};

export default function FaqPage() {
  return (
    <div className="pt-24">
      <FAQSection />
      <div className="pb-24 text-center">
        <Link href="/contact" className="btn-secondary">Still have a question? Contact us</Link>
      </div>
    </div>
  );
}
