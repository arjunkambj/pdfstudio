"use client";

import type { Project } from "@/types";
import { Icon } from "@iconify/react";
import { Button, Chip } from "@heroui/react";
import NextLink from "next/link";

const statusColorMap: Record<string, "primary" | "success" | "default"> = {
  active: "success",
  draft: "default",
  archived: "primary",
};

export default function EditorToolbar({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-3">
      <Button
        as={NextLink}
        href="/dashboard/projects"
        variant="light"
        size="sm"
        isIconOnly
      >
        <Icon icon="solar:arrow-left-linear" className="text-lg" />
      </Button>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{project.name}</h1>
          <Chip size="sm" variant="flat" color={statusColorMap[project.status]}>
            {project.status}
          </Chip>
        </div>
        <p className="text-xs text-foreground/50">{project.description}</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="bordered"
          size="sm"
          startContent={<Icon icon="solar:export-linear" />}
        >
          Export
        </Button>
        <Button
          color="primary"
          size="sm"
          startContent={<Icon icon="solar:share-linear" />}
        >
          Share
        </Button>
      </div>
    </div>
  );
}
