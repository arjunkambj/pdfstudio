"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icon icon="solar:document-bold" className="text-lg" />
      </div>
      {!collapsed && (
        <span className="text-lg font-bold tracking-tight">PDF Studio</span>
      )}
    </Link>
  );
}
