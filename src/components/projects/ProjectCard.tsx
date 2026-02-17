"use client";

import type { Project } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Card, CardBody, Chip } from "@heroui/react";
import NextLink from "next/link";

const statusColorMap: Record<string, "primary" | "success" | "default"> = {
  active: "success",
  draft: "default",
  archived: "primary",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      as={NextLink}
      href={`/dashboard/projects/${project.id}`}
      isPressable
      shadow="none"
      className="border border-default-200 transition-colors hover:border-primary/30"
    >
      <CardBody className="gap-3 p-4">
        <div className="flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5">
          <Icon
            icon="solar:document-bold-duotone"
            className="text-5xl text-primary/30"
          />
        </div>
        <div>
          <h3 className="font-semibold">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-foreground/50">
            {project.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Chip size="sm" variant="flat" color={statusColorMap[project.status]}>
              {project.status}
            </Chip>
            <span className="text-xs text-foreground/40">
              {project.fileCount} {project.fileCount === 1 ? "file" : "files"}
            </span>
          </div>
          <span className="text-xs text-foreground/40">
            {formatRelativeTime(project.updatedAt)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
