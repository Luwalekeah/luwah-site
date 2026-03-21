import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Automation Services",
  description:
    "20+ automation services from email setup to profitability dashboards. Fixed pricing starting at $150. See what we build.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
