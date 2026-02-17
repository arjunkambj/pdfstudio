"use client";

import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import Link from "next/link";
import GenerationGrid from "@/components/generations/GenerationGrid";
import { useGenerations } from "@/hooks/useGenerations";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export default function DashboardPage() {
  const user = useUser();
  const generations = useGenerations(user?.id);
  const removeGeneration = useMutation(api.projects.remove);

  const handleDelete = async (id: Id<"projects">) => {
    await removeGeneration({ id });
  };

  if (!generations) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            icon="solar:home-smile-bold-duotone"
            className="text-2xl text-primary"
          />
          <h2 className="text-xl font-semibold">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
          </h2>
        </div>
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

      <GenerationGrid generations={generations} onDelete={handleDelete} />
    </div>
  );
}
