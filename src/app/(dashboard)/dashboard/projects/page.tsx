"use client";

import CreateProjectModal from "@/components/projects/CreateProjectModal";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useState } from "react";

export default function ProjectsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-foreground/50">
            Manage your documents and presentations
          </p>
        </div>
        <Button
          color="primary"
          size="sm"
          startContent={<Icon icon="solar:add-circle-bold" />}
          onPress={() => setIsCreateOpen(true)}
        >
          New Project
        </Button>
      </div>

      <ProjectGrid projects={[]} />

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
