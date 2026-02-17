"use client";

import CreateProjectModal from "@/components/projects/CreateProjectModal";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectToolbar from "@/components/projects/ProjectToolbar";
import { useProjects } from "@/hooks/useProjects";
import type { ProjectStatus } from "@/types";
import { useMemo, useState } from "react";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filterStatus =
    statusFilter === "all" ? undefined : (statusFilter as ProjectStatus);
  const { projects } = useProjects(filterStatus);

  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [projects, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="mt-1 text-foreground/50">
          Manage your documents and presentations
        </p>
      </div>

      <ProjectToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateProject={() => setIsCreateOpen(true)}
      />

      <ProjectGrid projects={filtered} />

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
