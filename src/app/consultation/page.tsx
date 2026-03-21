import type { Metadata } from "next";
import { ConsultationForm } from "./ConsultationForm";

export const metadata: Metadata = {
  title: "Free Consultation",
  description: "Book a free 30-minute consultation. Tell us about your business, we'll tell you what's possible. No pressure.",
};

export default function ConsultationPage() {
  return <ConsultationForm />;
}
