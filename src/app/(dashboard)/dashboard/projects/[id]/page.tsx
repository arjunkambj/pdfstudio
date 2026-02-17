"use client";

import EditorWorkspace from "@/components/editor/EditorWorkspace";
import { useProject } from "@/hooks/useProjects";
import { Icon } from "@iconify/react";
import { Button, Spinner } from "@heroui/react";
import NextLink from "next/link";
import { use } from "react";

export default function ProjectEditorPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { project, files } = useProject(id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon
          icon="solar:folder-error-bold-duotone"
          className="text-5xl text-foreground/20"
        />
        <h2 className="mt-4 text-lg font-semibold">Project not found</h2>
        <p className="mt-1 text-sm text-foreground/50">
          This project may have been deleted or doesn&apos;t exist.
        </p>
        <Button
          as={NextLink}
          href="/dashboard/projects"
          variant="bordered"
          className="mt-6"
          startContent={<Icon icon="solar:arrow-left-linear" />}
        >
          Back to Projects
        </Button>
      </div>
    );
  }

  return <EditorWorkspace project={project} files={files} />;
}
