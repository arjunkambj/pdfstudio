"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { themes } from "@/lib/themes";
import { api } from "../../../../../../convex/_generated/api";

export default function CreateTextProjectPage() {
  const user = useUser();
  const router = useRouter();
  const createProject = useMutation(api.projects.createDraft);
  const attachText = useMutation(api.projectSources.attachText);

  const [title, setTitle] = useState("");
  const [themeId, setThemeId] = useState("indigo");
  const [sourceText, setSourceText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!user?.id || !sourceText.trim()) return;

    setIsSubmitting(true);
    try {
      const projectId = await createProject({
        userId: user.id,
        title: title.trim() || "Untitled presentation",
        sourceType: "text",
        themeId,
        sourceText: sourceText.trim(),
      });

      await attachText({
        projectId,
        userId: user.id,
        text: sourceText.trim(),
      });

      const response = await fetch("/api/projects/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error("Failed to process text");
      }

      router.push(`/dashboard/projects/${projectId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 py-6">
      <div>
        <Button
          variant="light"
          size="sm"
          startContent={
            <Icon icon="solar:arrow-left-linear" className="text-lg" />
          }
          onPress={() => router.push("/dashboard/create")}
        >
          Back
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Create from text</h1>
          <p className="text-sm text-default-500">
            Paste source content and AI will build slide cards while preserving
            meaning and facts.
          </p>

          <Input
            label="Project title"
            placeholder="Q4 Product Strategy"
            value={title}
            onValueChange={setTitle}
          />

          <Select
            label="Theme"
            selectedKeys={[themeId]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              if (value) setThemeId(value);
            }}
          >
            {themes.map((theme) => (
              <SelectItem key={theme.id}>{theme.name}</SelectItem>
            ))}
          </Select>

          <Textarea
            label="Source text"
            placeholder="Paste your full content..."
            value={sourceText}
            onValueChange={setSourceText}
            minRows={14}
            maxRows={28}
          />

          <Button
            color="primary"
            size="lg"
            onPress={handleCreate}
            isLoading={isSubmitting}
            isDisabled={!sourceText.trim()}
            startContent={
              !isSubmitting && (
                <Icon
                  icon="solar:magic-stick-3-bold-duotone"
                  className="text-lg"
                />
              )
            }
          >
            Build slides
          </Button>
        </div>

        <div className="rounded-xl border border-default-200 bg-content1 p-4">
          <h3 className="text-sm font-semibold uppercase text-default-500">
            Pipeline
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-default-500">
            <li>1. Parse source blocks</li>
            <li>2. LLM plans slide cards</li>
            <li>3. LLM picks layout and image need</li>
            <li>4. You can edit slide content and layout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
