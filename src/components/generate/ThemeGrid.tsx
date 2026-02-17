"use client";

import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

export default function ThemeGrid({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (themeId: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onChange(theme.id)}
          className={cn(
            "flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors",
            value === theme.id
              ? "border-primary bg-primary/5"
              : "border-default-200 hover:border-default-400",
          )}
        >
          <div className="flex gap-0.5">
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: theme.colors.accent }}
            />
          </div>
          <span className="text-[10px] text-default-500">{theme.name}</span>
        </button>
      ))}
    </div>
  );
}
