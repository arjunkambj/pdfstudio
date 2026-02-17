"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { Spinner } from "@heroui/react";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/sign-in");
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (user === null) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
