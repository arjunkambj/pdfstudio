"use client";

import { Progress, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function GenerationProgress({
  status,
  cardCount,
  completedImages,
  totalImages,
}: {
  status: string;
  cardCount: number;
  completedImages: number;
  totalImages: number;
}) {
  if (status === "ready" && completedImages >= totalImages) return null;

  const isGenerating = status === "processing";
  const isImagesProcessing =
    status === "ready" && completedImages < totalImages;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-default-200 bg-content1 p-6">
      <Spinner size="lg" color="primary" />
      <h3 className="text-lg font-semibold">
        {isGenerating ? "Planning slides..." : "Generating images..."}
      </h3>
      <p className="text-sm text-default-400">
        {isGenerating
          ? "AI is creating your cards. This may take a moment."
          : `${completedImages} of ${totalImages} images completed`}
      </p>
      {isImagesProcessing && totalImages > 0 && (
        <Progress
          value={(completedImages / totalImages) * 100}
          color="primary"
          size="sm"
          className="max-w-xs"
        />
      )}
      {cardCount > 0 && (
        <div className="flex items-center gap-1 text-xs text-default-400">
          <Icon icon="solar:check-circle-bold" className="text-success" />
          <span>{cardCount} cards generated</span>
        </div>
      )}
    </div>
  );
}
