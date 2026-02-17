"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function GenerateBottomBar({
  cardCount,
  isGenerating,
  onGenerate,
}: {
  cardCount: number;
  isGenerating: boolean;
  onGenerate: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-default-200 bg-content1 px-4 py-3 sm:px-6">
      <span className="text-sm text-default-400">
        {cardCount} {cardCount === 1 ? "card" : "cards"}
      </span>
      <Button
        color="primary"
        size="lg"
        onPress={onGenerate}
        isLoading={isGenerating}
        startContent={
          !isGenerating && (
            <Icon icon="solar:magic-stick-3-bold-duotone" className="text-lg" />
          )
        }
      >
        Generate
      </Button>
    </div>
  );
}
