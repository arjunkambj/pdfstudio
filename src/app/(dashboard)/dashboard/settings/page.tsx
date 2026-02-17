"use client";

import PreferencesSection from "@/components/settings/PreferencesSection";
import ProfileSection from "@/components/settings/ProfileSection";
import { Tab, Tabs } from "@heroui/react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-foreground/50">
          Manage your account and preferences
        </p>
      </div>

      <Tabs variant="underlined" aria-label="Settings tabs">
        <Tab key="profile" title="Profile">
          <div className="pt-4">
            <ProfileSection />
          </div>
        </Tab>
        <Tab key="preferences" title="Preferences">
          <div className="pt-4">
            <PreferencesSection />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
