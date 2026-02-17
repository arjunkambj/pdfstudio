"use client";

import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ContentEditor, {
  type CardData,
} from "@/components/generate/ContentEditor";
import GenerateBottomBar from "@/components/generate/GenerateBottomBar";
import InstructionsPanel from "@/components/generate/InstructionsPanel";
import SettingsPanel, {
  type SettingsState,
} from "@/components/generate/SettingsPanel";
import { useGenerationWithCards } from "@/hooks/useGenerations";
import { api } from "../../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../../convex/_generated/dataModel";

const defaultSettings: SettingsState = {
  contentMode: "generate",
  outputLanguage: "en",
  theme: "indigo",
  imageSource: "ai",
  imageArtStyle: "photorealistic",
  style: "traditional",
  extraKeywords: "",
  format: "slides",
};

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const projectId = id as Id<"projects">;
  const router = useRouter();
  const user = useUser();
  const data = useGenerationWithCards(projectId);
  const updateSettings = useMutation(api.projects.updateSettings);
  const saveEditorCards = useMutation(api.slides.saveEditorCards);

  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [instructions, setInstructions] = useState("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [freeformContent, setFreeformContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize state from Convex data once loaded
  useEffect(() => {
    if (data && !initialized) {
      setSettings((prev) => ({
        ...prev,
        theme: data.themeId || prev.theme,
        contentMode: data.contentMode || prev.contentMode,
        outputLanguage: data.outputLanguage || prev.outputLanguage,
        imageSource: data.imageSource || prev.imageSource,
        imageArtStyle: data.imageArtStyle || prev.imageArtStyle,
        style: data.contentStyle || prev.style,
        extraKeywords: data.extraKeywords || prev.extraKeywords,
        format: data.format || prev.format,
      }));
      setInstructions(data.instructions || "");

      if (data.slides.length > 0) {
        setCards(
          data.slides.map((slide) => ({
            id: slide._id,
            title: slide.title,
            content: slide.content,
          })),
        );
        setFreeformContent(
          data.slides.map((s) => `${s.title}\n${s.content}`).join("\n\n"),
        );
      }
      setInitialized(true);
    }
  }, [data, initialized]);

  const handleSettingsChange = (updates: Partial<SettingsState>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    if (!user?.id) return;
    setIsGenerating(true);
    try {
      // Save settings to Convex
      await updateSettings({
        id: projectId,
        themeId: settings.theme,
        contentMode: settings.contentMode,
        outputLanguage: settings.outputLanguage,
        imageSource: settings.imageSource,
        imageArtStyle: settings.imageArtStyle,
        contentStyle: settings.style,
        extraKeywords: settings.extraKeywords,
        format: settings.format,
        instructions,
      });

      // Save edited cards
      await saveEditorCards({
        projectId,
        userId: user.id,
        cards: cards.map((card, index) => ({
          title: card.title,
          content: card.content,
          order: index,
        })),
      });

      // Call the generate endpoint
      const response = await fetch("/api/projects/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      router.push(`/dashboard/projects/${projectId}`);
    } catch (error) {
      console.error("Generate error:", error);
    } finally {
      setIsGenerating(false);
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

  const isProcessing = data.status === "processing";

  if (isProcessing) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-default-500">
          AI is parsing your content into slides...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-default-200 px-4 py-2">
        <Button
          as={Link}
          href="/dashboard"
          isIconOnly
          variant="light"
          size="sm"
        >
          <Icon icon="solar:arrow-left-linear" className="text-lg" />
        </Button>
        <h1 className="text-lg font-semibold">{data.title}</h1>
      </div>

      {/* 3-column layout */}
      <div className="flex min-h-0 flex-1">
        {/* Left sidebar: Settings */}
        <div className="w-[280px] shrink-0 overflow-y-auto border-r border-default-200">
          <SettingsPanel settings={settings} onChange={handleSettingsChange} />
        </div>

        {/* Center: Content editor */}
        <div className="min-w-0 flex-1">
          <ContentEditor
            cards={cards}
            onCardsChange={setCards}
            freeformContent={freeformContent}
            onFreeformChange={setFreeformContent}
          />
        </div>

        {/* Right sidebar: Instructions */}
        <div className="w-[280px] shrink-0 overflow-y-auto border-l border-default-200">
          <InstructionsPanel value={instructions} onChange={setInstructions} />
        </div>
      </div>

      {/* Bottom bar */}
      <GenerateBottomBar
        cardCount={cards.length}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
