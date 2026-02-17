"use client";

import type { DashboardStats } from "@/types";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/react";

const statConfig = [
  {
    key: "totalProjects" as const,
    label: "Total Projects",
    icon: "solar:folder-with-files-bold-duotone",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "activeProjects" as const,
    label: "Active",
    icon: "solar:play-circle-bold-duotone",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    key: "totalFiles" as const,
    label: "Total Files",
    icon: "solar:document-bold-duotone",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    key: "storageUsed" as const,
    label: "Storage Used",
    icon: "solar:cloud-storage-bold-duotone",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statConfig.map((cfg) => (
        <Card key={cfg.key} shadow="none" className="border border-default-200">
          <CardBody className="flex flex-row items-center gap-3 p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}
            >
              <Icon icon={cfg.icon} className={`text-xl ${cfg.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats[cfg.key]}</p>
              <p className="text-xs text-foreground/50">{cfg.label}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
