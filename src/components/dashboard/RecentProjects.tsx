"use client";

import type { Project } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import NextLink from "next/link";

const statusColorMap: Record<string, "primary" | "success" | "default"> = {
  active: "success",
  draft: "default",
  archived: "primary",
};

export default function RecentProjects({
  projects,
}: { projects: Project[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <Button
          as={NextLink}
          href="/dashboard/projects"
          variant="light"
          size="sm"
          endContent={<Icon icon="solar:arrow-right-linear" />}
        >
          View All
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <Card
            key={project.id}
            as={NextLink}
            href={`/dashboard/projects/${project.id}`}
            isPressable
            shadow="none"
            className="border border-default-200 transition-colors hover:border-primary/30"
          >
            <CardBody className="gap-3 p-4">
              <div className="flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5">
                <Icon
                  icon="solar:document-bold-duotone"
                  className="text-4xl text-primary/30"
                />
              </div>
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="mt-1 line-clamp-1 text-xs text-foreground/50">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Chip size="sm" variant="flat" color={statusColorMap[project.status]}>
                  {project.status}
                </Chip>
                <span className="text-xs text-foreground/40">
                  {formatRelativeTime(project.updatedAt)}
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
