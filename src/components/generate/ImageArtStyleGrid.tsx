"use client";

import { imageArtStyles } from "@/lib/themes";
import { cn } from "@/lib/utils";

export default function ImageArtStyleGrid({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (styleId: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {imageArtStyles.map((style) => (
        <button
          key={style.id}
          type="button"
          onClick={() => onChange(style.id)}
          className={cn(
            "rounded-lg border p-2 text-left transition-colors",
            value === style.id
              ? "border-primary bg-primary/5"
              : "border-default-200 hover:border-default-400",
          )}
        >
          <span className="text-xs font-medium">{style.name}</span>
        </button>
      ))}
    </div>
  );
}
