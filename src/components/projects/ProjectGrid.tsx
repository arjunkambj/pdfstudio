"use client";

import ProjectCard from "@/components/projects/ProjectCard";
import ProjectEmptyState from "@/components/projects/ProjectEmptyState";
import type { Project } from "@/types";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <ProjectEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
