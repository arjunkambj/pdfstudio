"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

export default function ProjectEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-default-300 py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Icon
          icon="solar:folder-with-files-bold-duotone"
          className="text-3xl text-primary"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
      <p className="mt-1 text-sm text-foreground/50">
        Create your first project to get started
      </p>
      <Button
        color="primary"
        className="mt-6"
        startContent={<Icon icon="solar:add-circle-bold" />}
      >
        Create Project
      </Button>
    </div>
  );
}
