import type { Metadata } from "next";
import { WorkContent } from "./WorkContent";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Real automation case studies with real results. Lead generation, community messaging, self-hosted infrastructure, and more.",
};

export default function WorkPage() {
  return <WorkContent />;
}
