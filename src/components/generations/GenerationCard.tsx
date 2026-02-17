"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import type { Generation } from "@/types";

const statusColors: Record<
  string,
  "default" | "primary" | "success" | "warning" | "danger"
> = {
  draft: "default",
  processing: "warning",
  ready: "success",
  error: "danger",
};

export default function GenerationCard({
  generation,
  onDelete,
}: {
  generation: Generation;
  onDelete: (id: Generation["_id"]) => void;
}) {
  const href = `/dashboard/projects/${generation._id}`;

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardBody className="p-0">
        <Link href={href} className="block">
          <div className="relative flex h-36 items-center justify-center bg-default-100">
            {generation.thumbnailUrl ? (
              // biome-ignore lint/performance/noImgElement: external thumbnail URLs
              <img
                src={generation.thumbnailUrl}
                alt={generation.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <Icon
                icon="solar:document-bold-duotone"
                className="text-4xl text-default-300"
              />
            )}
            <Chip
              size="sm"
              color={statusColors[generation.status]}
              variant="flat"
              className="absolute right-2 top-2"
            >
              {generation.status}
            </Chip>
          </div>
        </Link>
      </CardBody>
      <CardFooter className="flex items-start justify-between gap-2 px-3 py-2">
        <Link href={href} className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{generation.title}</p>
          <p className="text-xs text-default-400">
            {formatRelativeTime(new Date(generation.updatedAt).toISOString())}
          </p>
        </Link>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="opacity-0 group-hover:opacity-100"
            >
              <Icon icon="solar:menu-dots-bold" className="text-lg" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="open" href={href}>
              Open
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onPress={() => onDelete(generation._id)}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card>
  );
}
