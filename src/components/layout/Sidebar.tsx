"use client";

import SidebarItem from "@/components/layout/SidebarItem";
import UserAvatar from "@/components/layout/UserAvatar";
import type { NavItem } from "@/types";
import { usePathname } from "next/navigation";

const navItems: NavItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/dashboard",
    icon: "solar:home-smile-bold-duotone",
  },
  {
    key: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: "solar:settings-bold-duotone",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[72px] shrink-0 flex-col items-center border-r border-default-200 bg-content1 py-4">
      <nav className="flex flex-1 flex-col items-center gap-2 pt-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            isActive={
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </nav>

      <div className="pb-2">
        <UserAvatar />
      </div>
    </aside>
  );
}
