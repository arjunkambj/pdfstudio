"use client";

import { Tab, Tabs } from "@heroui/react";

export default function DashboardHeader({
  filter,
  onFilterChange,
}: {
  filter: string;
  onFilterChange: (key: string) => void;
}) {
  return (
    <Tabs
      selectedKey={filter}
      onSelectionChange={(key) => onFilterChange(key as string)}
      size="sm"
      variant="light"
    >
      <Tab key="all" title="All" />
      <Tab key="recent" title="Recently viewed" />
      <Tab key="mine" title="Created by you" />
    </Tabs>
  );
}
