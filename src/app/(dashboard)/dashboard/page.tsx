"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useUser } from "@stackframe/stack";
import NextLink from "next/link";

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
        </h1>
        <p className="mt-1 text-foreground/50">
          Here&apos;s what&apos;s happening with your projects
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-default-300 py-20">
        <Icon
          icon="solar:document-add-bold-duotone"
          className="text-5xl text-foreground/20"
        />
        <h2 className="mt-4 text-lg font-semibold">No projects yet</h2>
        <p className="mt-1 text-sm text-foreground/50">
          Create your first project to get started
        </p>
        <Button
          as={NextLink}
          href="/dashboard/projects"
          color="primary"
          size="sm"
          className="mt-6"
          startContent={<Icon icon="solar:add-circle-bold" />}
        >
          New Project
        </Button>
      </div>
    </div>
  );
}
