"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <Button variant="light" isIconOnly size="sm" onPress={toggle}>
      <Icon
        icon={isDark ? "solar:sun-bold-duotone" : "solar:moon-bold-duotone"}
        className="text-xl"
      />
    </Button>
  );
}
