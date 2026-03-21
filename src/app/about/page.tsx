import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Daniel Cooke",
  description:
    "6+ years of enterprise data engineering, now helping small businesses automate. Fortune 10 experience. Aurora, Colorado.",
};

export default function AboutPage() {
  return <AboutContent />;
}
