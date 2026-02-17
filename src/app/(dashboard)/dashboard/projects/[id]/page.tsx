"use client";

import { Button, Chip, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMutation } from "convex/react";
import Link from "next/link";
import { use, useState } from "react";
import EditCardModal from "@/components/generations/EditCardModal";
import GeneratedCard from "@/components/generations/GeneratedCard";
import GenerationProgress from "@/components/generations/GenerationProgress";
import { useGenerationWithCards } from "@/hooks/useGenerations";
import type { Card, SlideLayout } from "@/types";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

const statusColor: Record<
  string,
  "default" | "warning" | "success" | "danger"
> = {
  draft: "default",
  processing: "warning",
  ready: "success",
  error: "danger",
};

export default function ProjectViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const projectId = id as Id<"projects">;
  const data = useGenerationWithCards(projectId);
  const updateSlide = useMutation(api.slides.update);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isReprocessing, setIsReprocessing] = useState(false);

  const handleSaveEdit = async (
    cardId: Id<"slides">,
    values: {
      title: string;
      content: string;
      layout: SlideLayout;
      needsImage: boolean;
      imagePrompt?: string;
    },
  ) => {
    await updateSlide({
      id: cardId,
      title: values.title,
      content: values.content,
      layout: values.layout,
      needsImage: values.needsImage,
      imagePrompt: values.imagePrompt,
    });
    setEditingCard(null);
  };

  const handleGenerateImages = async () => {
    setIsGeneratingImages(true);
    try {
      await fetch("/api/projects/generate-slide-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleReprocess = async (sourceType: "images" | "text") => {
    setIsReprocessing(true);
    try {
      await fetch(
        sourceType === "images"
          ? "/api/projects/process-images"
          : "/api/projects/process-text",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId }),
        },
      );
    } finally {
      setIsReprocessing(false);
    }
  };

  if (data === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <p className="text-default-400">Project not found</p>
        <Button as={Link} href="/dashboard" variant="light">
          Back to dashboard
        </Button>
      </div>
    );
  }

  const { slides: cards, ...project } = data;
  const completedImages = cards.filter(
    (card) => card.imageStatus === "completed",
  ).length;
  const totalImages = cards.filter((card) => card.needsImage).length;
  const pendingImages = cards.filter(
    (card) => card.needsImage && card.imageStatus !== "completed",
  ).length;

  const isProcessing = project.status === "processing" || isGeneratingImages;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button
              as={Link}
              href="/dashboard"
              isIconOnly
              variant="light"
              size="sm"
            >
              <Icon icon="solar:arrow-left-linear" className="text-lg" />
            </Button>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <Chip
              size="sm"
              color={statusColor[project.status] ?? "default"}
              variant="flat"
            >
              {project.status}
            </Chip>
          </div>
          <p className="mt-1 text-sm text-default-500">
            {project.slideCount} slides • {project.sourceType} source
          </p>
          {project.errorMessage && (
            <p className="mt-2 text-sm text-danger">{project.errorMessage}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="flat"
            size="sm"
            isLoading={isReprocessing}
            onPress={() =>
              handleReprocess(project.sourceType as "images" | "text")
            }
            startContent={
              !isReprocessing && (
                <Icon icon="solar:refresh-circle-bold" className="text-base" />
              )
            }
          >
            Re-run AI mapping
          </Button>
          <Button
            color="primary"
            size="sm"
            isLoading={isGeneratingImages}
            isDisabled={pendingImages === 0}
            onPress={handleGenerateImages}
            startContent={
              !isGeneratingImages && (
                <Icon
                  icon="solar:gallery-send-bold-duotone"
                  className="text-base"
                />
              )
            }
          >
            Generate images ({pendingImages})
          </Button>
        </div>
      </div>

      {isProcessing && (
        <GenerationProgress
          status={project.status}
          cardCount={cards.length}
          completedImages={completedImages}
          totalImages={totalImages}
        />
      )}

      {cards.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <GeneratedCard
              key={card._id}
              card={card}
              themeId={project.themeId}
              onEdit={setEditingCard}
            />
          ))}
        </div>
      ) : (
        !isProcessing && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon
              icon="solar:document-bold-duotone"
              className="text-4xl text-default-300"
            />
            <p className="mt-2 text-default-400">No slides generated yet</p>
          </div>
        )
      )}

      <EditCardModal
        card={editingCard}
        isOpen={!!editingCard}
        onClose={() => setEditingCard(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
