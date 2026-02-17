"use client";

import ThemeToggle from "@/components/layout/ThemeToggle";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";

const breadcrumbLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/projects": "Projects",
  "/dashboard/settings": "Settings",
};

export default function Header({
  onMobileMenuOpen,
}: { onMobileMenuOpen?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (
      pathname.startsWith("/dashboard/projects/") &&
      pathname !== "/dashboard/projects"
    ) {
      return "Project Editor";
    }
    return breadcrumbLabels[pathname] ?? "Dashboard";
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b border-default-200 bg-content1/50 px-4 backdrop-blur-md sm:px-6">
      {onMobileMenuOpen && (
        <Button
          variant="light"
          isIconOnly
          size="sm"
          className="md:hidden"
          onPress={onMobileMenuOpen}
        >
          <Icon icon="solar:hamburger-menu-linear" className="text-xl" />
        </Button>
      )}

      <h1 className="text-lg font-semibold">{getPageTitle()}</h1>

      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
