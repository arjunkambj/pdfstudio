"use client";

import type { NavItem } from "@/types";
import { Icon } from "@iconify/react";
import NextLink from "next/link";

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
}

export default function SidebarItem({ item, isActive }: SidebarItemProps) {
  return (
    <NextLink
      href={item.href}
      className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground/50 hover:bg-default-100 hover:text-foreground/80"
      }`}
    >
      <Icon icon={item.icon} className="text-xl" />
      <span className="text-[10px] font-medium leading-tight">
        {item.label}
      </span>
    </NextLink>
  );
}
