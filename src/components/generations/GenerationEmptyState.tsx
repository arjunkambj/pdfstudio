"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function GenerationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon
          icon="solar:magic-stick-3-bold-duotone"
          className="text-3xl text-primary"
        />
      </div>
      <h3 className="mb-1 text-lg font-semibold">No projects yet</h3>
      <p className="mb-6 max-w-sm text-sm text-default-400">
        Start from a group of images or raw text and let AI map it into slides.
      </p>
      <Button
        as={Link}
        href="/dashboard/create"
        color="primary"
        startContent={
          <Icon icon="solar:magic-stick-3-bold-duotone" className="text-lg" />
        }
      >
        Create new
      </Button>
    </div>
  );
}
