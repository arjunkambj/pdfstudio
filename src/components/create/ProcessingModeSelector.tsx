"use client";

import { Radio, RadioGroup } from "@heroui/react";
import type { ContentMode } from "@/types";

const modes: { key: ContentMode; label: string; description: string }[] = [
  {
    key: "generate",
    label: "Generate",
    description: "AI generates new content based on your text",
  },
  {
    key: "condense",
    label: "Summarize",
    description: "Condense your text into key points",
  },
  {
    key: "preserve",
    label: "Preserve",
    description: "Keep your text as-is, split into cards",
  },
];

export default function ProcessingModeSelector({
  value,
  onChange,
}: {
  value: ContentMode;
  onChange: (mode: ContentMode) => void;
}) {
  return (
    <RadioGroup
      label="Processing mode"
      value={value}
      onValueChange={(v) => onChange(v as ContentMode)}
    >
      {modes.map((mode) => (
        <Radio key={mode.key} value={mode.key} description={mode.description}>
          {mode.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
