"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Drawer, DrawerBody, DrawerContent } from "@heroui/react";
import { useState } from "react";

export default function DashboardShell({
  children,
}: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <Drawer
        isOpen={isMobileOpen}
        onOpenChange={setIsMobileOpen}
        placement="left"
        size="xs"
      >
        <DrawerContent>
          <DrawerBody className="p-0">
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <Header onMobileMenuOpen={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
