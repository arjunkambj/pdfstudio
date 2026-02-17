"use client";

import { Button, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function CardItem({
  index,
  title,
  content,
  onTitleChange,
  onContentChange,
  onRemove,
}: {
  index: number;
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="group rounded-lg border border-default-200 p-3 transition-colors hover:border-default-400">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-default-400">
          Card {index + 1}
        </span>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="opacity-0 group-hover:opacity-100"
          onPress={onRemove}
        >
          <Icon
            icon="solar:trash-bin-trash-linear"
            className="text-sm text-danger"
          />
        </Button>
      </div>
      <Textarea
        value={title}
        onValueChange={onTitleChange}
        placeholder="Card title"
        minRows={1}
        maxRows={2}
        size="sm"
        variant="underlined"
        classNames={{ input: "font-medium" }}
      />
      <Textarea
        value={content}
        onValueChange={onContentChange}
        placeholder="Card content..."
        minRows={2}
        maxRows={6}
        size="sm"
        variant="flat"
        className="mt-1"
      />
    </div>
  );
}
