"use client";

import { Input, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";
import ImageArtStyleGrid from "@/components/generate/ImageArtStyleGrid";
import ThemeGrid from "@/components/generate/ThemeGrid";
import { contentStyles, outputLanguages } from "@/lib/themes";
import type { ContentMode, ImageSource } from "@/types";

export interface SettingsState {
  contentMode: ContentMode;
  outputLanguage: string;
  theme: string;
  imageSource: ImageSource;
  imageArtStyle: string;
  style: string;
  extraKeywords: string;
  format: string;
}

export default function SettingsPanel({
  settings,
  onChange,
}: {
  settings: SettingsState;
  onChange: (updates: Partial<SettingsState>) => void;
}) {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto p-4">
      <h3 className="text-sm font-semibold text-default-500 uppercase">
        Settings
      </h3>

      <RadioGroup
        label="Text content mode"
        value={settings.contentMode}
        onValueChange={(v) => onChange({ contentMode: v as ContentMode })}
        size="sm"
      >
        <Radio value="generate">Generate</Radio>
        <Radio value="condense">Condense</Radio>
        <Radio value="preserve">Preserve</Radio>
      </RadioGroup>

      <Select
        label="Output language"
        selectedKeys={[settings.outputLanguage]}
        onSelectionChange={(keys) => {
          const val = Array.from(keys)[0] as string;
          if (val) onChange({ outputLanguage: val });
        }}
        size="sm"
      >
        {outputLanguages.map((lang) => (
          <SelectItem key={lang.id}>{lang.name}</SelectItem>
        ))}
      </Select>

      <div>
        <span className="mb-1.5 block text-xs text-default-500">Theme</span>
        <ThemeGrid
          value={settings.theme}
          onChange={(theme) => onChange({ theme })}
        />
      </div>

      <Select
        label="Image source"
        selectedKeys={[settings.imageSource]}
        onSelectionChange={(keys) => {
          const val = Array.from(keys)[0] as string;
          if (val) onChange({ imageSource: val as ImageSource });
        }}
        size="sm"
      >
        <SelectItem key="ai">AI Generated</SelectItem>
        <SelectItem key="none">No images</SelectItem>
        <SelectItem key="upload">Upload</SelectItem>
      </Select>

      {settings.imageSource === "ai" && (
        <div>
          <span className="mb-1.5 block text-xs text-default-500">
            Image art style
          </span>
          <ImageArtStyleGrid
            value={settings.imageArtStyle}
            onChange={(imageArtStyle) => onChange({ imageArtStyle })}
          />
        </div>
      )}

      <Select
        label="Style"
        selectedKeys={[settings.style]}
        onSelectionChange={(keys) => {
          const val = Array.from(keys)[0] as string;
          if (val) onChange({ style: val });
        }}
        size="sm"
      >
        {contentStyles.map((s) => (
          <SelectItem key={s.id}>{s.name}</SelectItem>
        ))}
      </Select>

      <Input
        label="Extra keywords"
        placeholder="e.g. sustainability, innovation"
        value={settings.extraKeywords}
        onValueChange={(v) => onChange({ extraKeywords: v })}
        size="sm"
      />

      <Select
        label="Format"
        selectedKeys={[settings.format]}
        onSelectionChange={(keys) => {
          const val = Array.from(keys)[0] as string;
          if (val) onChange({ format: val });
        }}
        size="sm"
      >
        <SelectItem key="cards">Cards</SelectItem>
        <SelectItem key="slides">Slides</SelectItem>
        <SelectItem key="sections">Sections</SelectItem>
      </Select>
    </div>
  );
}
