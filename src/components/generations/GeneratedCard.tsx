"use client";

import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { themes } from "@/lib/themes";
import type { Card } from "@/types";

export default function GeneratedCard({
  card,
  themeId,
  onEdit,
}: {
  card: Card;
  themeId?: string;
  onEdit: (card: Card) => void;
}) {
  const theme = themes.find((t) => t.id === themeId) || themes[1];

  return (
    <div
      className="group relative overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        borderColor: `${theme.colors.primary}20`,
      }}
    >
      {/* Image section */}
      {card.layout !== "text-only" && (
        <div className="relative h-48 w-full bg-black/5">
          {card.imageStatus === "generating" ? (
            <div className="flex h-full items-center justify-center">
              <Spinner size="sm" />
            </div>
          ) : card.generatedImageUrl ? (
            // biome-ignore lint/performance/noImgElement: external AI-generated image URLs
            <img
              src={card.generatedImageUrl}
              alt={card.title}
              className="h-full w-full object-cover"
            />
          ) : card.imageStatus === "error" ? (
            <div className="flex h-full flex-col items-center justify-center gap-1 text-sm opacity-50">
              <Icon icon="solar:gallery-broken" className="text-2xl" />
              <span>Image failed</span>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center opacity-20">
              <Icon icon="solar:gallery-bold-duotone" className="text-3xl" />
            </div>
          )}
        </div>
      )}

      {/* Content section */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
        <div className="prose prose-sm max-w-none text-sm opacity-80">
          {card.content.split("\n").map((line, i) => {
            const key = `${card._id}-line-${i}`;
            if (line.startsWith("# "))
              return (
                <h1 key={key} className="text-lg font-bold">
                  {line.slice(2)}
                </h1>
              );
            if (line.startsWith("## "))
              return (
                <h2 key={key} className="text-base font-semibold">
                  {line.slice(3)}
                </h2>
              );
            if (line.startsWith("- "))
              return (
                <li key={key} className="ml-4">
                  {line.slice(2)}
                </li>
              );
            if (line.startsWith("**") && line.endsWith("**"))
              return (
                <p key={key} className="font-bold">
                  {line.slice(2, -2)}
                </p>
              );
            if (line.trim() === "") return <br key={key} />;
            return <p key={key}>{line}</p>;
          })}
        </div>
      </div>

      {/* Actions overlay */}
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => onEdit(card)}
          className="bg-white/80 backdrop-blur-sm"
        >
          <Icon icon="solar:pen-bold" className="text-sm" />
        </Button>
      </div>

      {/* Card number badge */}
      <div
        className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: theme.colors.primary }}
      >
        {card.order + 1}
      </div>
    </div>
  );
}
