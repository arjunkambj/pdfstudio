"use client";

import { mockFiles, mockProjects } from "@/lib/mock-data";
import type { PDFFile, Project, ProjectStatus } from "@/types";
import { useMemo, useState } from "react";

export function useProjects(filterStatus?: ProjectStatus) {
  const [projects] = useState<Project[]>(mockProjects);

  const filtered = useMemo(() => {
    if (!filterStatus) return projects;
    return projects.filter((p) => p.status === filterStatus);
  }, [projects, filterStatus]);

  return { projects: filtered, allProjects: projects };
}

export function useProject(id: string) {
  const project = mockProjects.find((p) => p.id === id) ?? null;
  const files: PDFFile[] = mockFiles.filter((f) => f.projectId === id);
  return { project, files };
}
