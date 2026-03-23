import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { getSanityProjects } from "@/lib/sanity";
import { WorkContent } from "./WorkContent";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Real automation case studies with real results. Lead generation, community messaging, self-hosted infrastructure, and more.",
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = (await getSanityProjects()) ?? PROJECTS;
  return <WorkContent projects={projects} />;
}
