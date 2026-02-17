"use client";

import type { NavItem } from "@/types";
import { Icon } from "@iconify/react";
import { Button, Tooltip } from "@heroui/react";
import NextLink from "next/link";

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}

export default function SidebarItem({
  item,
  isActive,
  isCollapsed,
}: SidebarItemProps) {
  const button = (
    <Button
      as={NextLink}
      href={item.href}
      variant={isActive ? "flat" : "light"}
      color={isActive ? "primary" : "default"}
      size="sm"
      isIconOnly={isCollapsed}
      className={`w-full justify-start ${
        isActive ? "" : "text-foreground/70"
      }`}
    >
      <Icon icon={item.icon} className="text-lg" />
      {!isCollapsed && <span className="ml-2 text-sm">{item.label}</span>}
    </Button>
  );

  if (isCollapsed) {
    return (
      <Tooltip content={item.label} placement="right">
        {button}
      </Tooltip>
    );
  }

  return button;
}
