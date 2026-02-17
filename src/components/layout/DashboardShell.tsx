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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — fixed, no scroll */}
      <div className="hidden md:block">
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

      {/* Main content — only this scrolls */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMobileMenuOpen={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
