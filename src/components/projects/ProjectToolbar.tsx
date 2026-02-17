"use client";

import type { ProjectStatus } from "@/types";
import { Icon } from "@iconify/react";
import { Button, Input, Select, SelectItem } from "@heroui/react";

interface ProjectToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onCreateProject: () => void;
}

const statusOptions = [
  { key: "all", label: "All Status" },
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
  { key: "archived", label: "Archived" },
];

export default function ProjectToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCreateProject,
}: ProjectToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 gap-3">
        <Input
          placeholder="Search projects..."
          size="sm"
          variant="bordered"
          value={search}
          onValueChange={onSearchChange}
          className="max-w-xs"
          startContent={
            <Icon
              icon="solar:magnifer-linear"
              className="text-foreground/40"
            />
          }
        />
        <Select
          size="sm"
          variant="bordered"
          selectedKeys={[statusFilter]}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            onStatusFilterChange(value ?? "all");
          }}
          className="max-w-[150px]"
        >
          {statusOptions.map((opt) => (
            <SelectItem key={opt.key}>{opt.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Button
        color="primary"
        size="sm"
        startContent={<Icon icon="solar:add-circle-bold" />}
        onPress={onCreateProject}
      >
        New Project
      </Button>
    </div>
  );
}
