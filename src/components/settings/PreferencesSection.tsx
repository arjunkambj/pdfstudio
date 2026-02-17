"use client";

import { Icon } from "@iconify/react";
import { Card, CardBody, Switch } from "@heroui/react";
import { useEffect, useState } from "react";

export default function PreferencesSection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = (value: boolean) => {
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("theme", value ? "dark" : "light");
    setIsDark(value);
  };

  return (
    <div className="space-y-4">
      <Card shadow="none" className="border border-default-200">
        <CardBody className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
              <Icon
                icon="solar:moon-bold-duotone"
                className="text-xl text-secondary"
              />
            </div>
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-xs text-foreground/50">
                Switch between light and dark themes
              </p>
            </div>
          </div>
          <Switch isSelected={isDark} onValueChange={toggleTheme} />
        </CardBody>
      </Card>

      <Card shadow="none" className="border border-default-200">
        <CardBody className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Icon
                icon="solar:bell-bold-duotone"
                className="text-xl text-primary"
              />
            </div>
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-xs text-foreground/50">
                Get notified about project updates
              </p>
            </div>
          </div>
          <Switch defaultSelected />
        </CardBody>
      </Card>
    </div>
  );
}
