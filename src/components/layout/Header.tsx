"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/layout/ThemeToggle";

const breadcrumbLabels: Record<string, string> = {
  "/dashboard": "Home",
  "/dashboard/create": "Create",
  "/dashboard/create/text": "Paste text",
  "/dashboard/create/images": "Import images",
  "/dashboard/settings": "Settings",
  "/dashboard/templates": "Templates",
  "/dashboard/library": "Library",
};

export default function Header({
  onMobileMenuOpen,
}: {
  onMobileMenuOpen?: () => void;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/dashboard/projects/")) return "Project";
    return breadcrumbLabels[pathname] ?? "Home";
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
