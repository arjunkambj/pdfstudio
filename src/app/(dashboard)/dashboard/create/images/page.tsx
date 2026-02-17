"use client";

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { themes } from "@/lib/themes";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

const MAX_IMAGES = 30;

export default function ImagesPage() {
  const user = useUser();
  const router = useRouter();
  const createProject = useMutation(api.projects.createDraft);
  const generateUploadUrl = useMutation(api.projectSources.generateUploadUrl);
  const attachImages = useMutation(api.projectSources.attachImages);

  const [title, setTitle] = useState("");
  const [themeId, setThemeId] = useState("indigo");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => files.length > 0 && files.length <= MAX_IMAGES && !isSubmitting,
    [files.length, isSubmitting],
  );

  const onFileChange = (list: FileList | null) => {
    const next = Array.from(list ?? []).slice(0, MAX_IMAGES);
    setFiles(next);
  };

  const handleCreate = async () => {
    if (!user?.id || !canSubmit) return;

    setIsSubmitting(true);
    try {
      const projectId = await createProject({
        userId: user.id,
        title: title.trim() || "Image-based presentation",
        sourceType: "images",
        themeId,
      });

      const uploaded = [];
      for (let i = 0; i < files.length; i += 1) {
        const uploadUrl = await generateUploadUrl({});
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": files[i].type },
          body: files[i],
        });
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${files[i].name}`);
        }

        const json = (await uploadResponse.json()) as { storageId: string };
        uploaded.push({
          order: i,
          storageId: json.storageId as Id<"_storage">,
        });
      }

      await attachImages({
        projectId,
        userId: user.id,
        files: uploaded,
      });

      const response = await fetch("/api/projects/process-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!response.ok) {
        throw new Error("Failed to process uploaded images");
      }

      router.push(`/dashboard/projects/${projectId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-6">
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

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Create from images</h1>
        <p className="text-sm text-default-500">
          Upload up to {MAX_IMAGES} images. OCR extracts text, then AI maps
          content into slide cards.
        </p>

        <Input
          label="Project title"
          placeholder="Sales Deck from Screenshots"
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

        <label
          htmlFor="image-files"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-default-300 px-6 py-16 text-center hover:bg-default-50"
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Icon
              icon="solar:gallery-bold-duotone"
              className="text-2xl text-primary"
            />
          </div>
          <p className="font-medium">Choose image files</p>
          <p className="mt-1 text-xs text-default-500">
            PNG, JPG, WEBP up to {MAX_IMAGES} files
          </p>
        </label>
        <input
          id="image-files"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => onFileChange(event.target.files)}
        />

        <p className="text-sm text-default-500">
          Selected: {files.length} / {MAX_IMAGES}
        </p>

        {files.length > 0 && (
          <div className="max-h-48 overflow-y-auto rounded-xl border border-default-200 p-3">
            <ul className="space-y-1 text-sm">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`} className="truncate">
                  {index + 1}. {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          color="primary"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={!canSubmit}
          onPress={handleCreate}
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
    </div>
  );
}
