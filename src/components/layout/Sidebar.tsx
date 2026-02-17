"use client";

import Logo from "@/components/common/Logo";
import SidebarItem from "@/components/layout/SidebarItem";
import { useSidebar } from "@/hooks/useSidebar";
import type { NavItem } from "@/types";
import { Icon } from "@iconify/react";
import { Button, Tooltip } from "@heroui/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const topNavItems: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "solar:widget-5-bold-duotone",
  },
  {
    key: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: "solar:folder-with-files-bold-duotone",
  },
];

const bottomNavItems: NavItem[] = [
  {
    key: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: "solar:settings-bold-duotone",
  },
];

export default function Sidebar() {
  const { isCollapsed, toggle } = useSidebar();
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="sticky top-0 flex h-screen shrink-0 flex-col border-r border-default-200 bg-content1"
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4">
        <Logo collapsed={isCollapsed} />
      </div>

      {/* Top nav */}
      <nav className="flex-1 space-y-1 px-3 pt-4">
        {topNavItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            isActive={
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)
            }
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="space-y-1 px-3 pb-3">
        {bottomNavItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            isActive={pathname.startsWith(item.href)}
            isCollapsed={isCollapsed}
          />
        ))}

        {/* Collapse toggle */}
        <Tooltip
          content={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
          isDisabled={!isCollapsed}
        >
          <Button
            variant="light"
            size="sm"
            isIconOnly={isCollapsed}
            className="w-full justify-start text-foreground/50"
            onPress={toggle}
          >
            <Icon
              icon={
                isCollapsed
                  ? "solar:alt-arrow-right-linear"
                  : "solar:alt-arrow-left-linear"
              }
              className="text-lg"
            />
            {!isCollapsed && (
              <span className="ml-2 text-sm">Collapse</span>
            )}
          </Button>
        </Tooltip>
      </div>
    </motion.aside>
  );
}
