"use client";

import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import { themes } from "@/lib/themes";
import type { Card } from "@/types";

/** Render inline markdown (bold) within a text string */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while (true) {
    match = regex.exec(text);
    if (!match) break;
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`${keyPrefix}-b-${match.index}`}>{match[1]}</strong>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

interface Block {
  type: "heading1" | "heading2" | "ul" | "ol" | "paragraph" | "blank";
  lines: string[];
}

/** Group lines into semantic blocks */
function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      blocks.push({ type: "heading1", lines: [line.slice(2)] });
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "heading2", lines: [line.slice(3)] });
    } else if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") {
        last.lines.push(line.slice(2));
      } else {
        blocks.push({ type: "ul", lines: [line.slice(2)] });
      }
    } else if (/^\d+\.\s/.test(line)) {
      const last = blocks[blocks.length - 1];
      const text = line.replace(/^\d+\.\s/, "");
      if (last?.type === "ol") {
        last.lines.push(text);
      } else {
        blocks.push({ type: "ol", lines: [text] });
      }
    } else if (line.trim() === "") {
      blocks.push({ type: "blank", lines: [] });
    } else {
      blocks.push({ type: "paragraph", lines: [line] });
    }
  }

  return blocks;
}

function renderBlocks(content: string, cardId: string): ReactNode[] {
  const blocks = parseBlocks(content);
  return blocks.map((block, bi) => {
    const key = `${cardId}-block-${bi}`;
    switch (block.type) {
      case "heading1":
        return (
          <h4 key={key} className="text-lg font-bold mt-2">
            {renderInline(block.lines[0], key)}
          </h4>
        );
      case "heading2":
        return (
          <h5 key={key} className="text-base font-semibold mt-2">
            {renderInline(block.lines[0], key)}
          </h5>
        );
      case "ul":
        return (
          <ul key={key} className="list-disc ml-5 space-y-0.5">
            {block.lines.map((item) => {
              const liKey = `${key}-${item.slice(0, 32)}`;
              return <li key={liKey}>{renderInline(item, liKey)}</li>;
            })}
          </ul>
        );
      case "ol":
        return (
          <ol key={key} className="list-decimal ml-5 space-y-0.5">
            {block.lines.map((item) => {
              const liKey = `${key}-${item.slice(0, 32)}`;
              return <li key={liKey}>{renderInline(item, liKey)}</li>;
            })}
          </ol>
        );
      case "blank":
        return <div key={key} className="h-2" />;
      default:
        return <p key={key}>{renderInline(block.lines[0], key)}</p>;
    }
  });
}

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
    <div className="aspect-video">
      <div
        className="group relative h-full overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
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
        <div
          className="overflow-y-auto p-5"
          style={{
            maxHeight:
              card.layout !== "text-only" ? "calc(100% - 12rem)" : "100%",
          }}
        >
          <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
          <div className="prose prose-sm max-w-none text-sm opacity-80 space-y-1">
            {renderBlocks(card.content, card._id)}
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
    </div>
  );
}
