"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import NextLink from "next/link";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        as={NextLink}
        href="/dashboard/projects"
        color="primary"
        startContent={<Icon icon="solar:add-circle-bold" />}
      >
        New Project
      </Button>
      <Button
        variant="bordered"
        startContent={<Icon icon="solar:upload-linear" />}
      >
        Upload PDF
      </Button>
      <Button
        variant="bordered"
        startContent={<Icon icon="solar:magic-stick-3-linear" />}
      >
        Generate with AI
      </Button>
    </div>
  );
}
