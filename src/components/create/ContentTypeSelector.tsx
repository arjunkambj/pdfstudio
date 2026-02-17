"use client";

import { Tab, Tabs } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { ContentType } from "@/types";

const contentTypes: { key: ContentType; label: string; icon: string }[] = [
  {
    key: "presentation",
    label: "Presentation",
    icon: "solar:presentation-graph-bold-duotone",
  },
  {
    key: "webpage",
    label: "Webpage",
    icon: "solar:global-bold-duotone",
  },
  {
    key: "document",
    label: "Document",
    icon: "solar:document-bold-duotone",
  },
  {
    key: "social",
    label: "Social",
    icon: "solar:share-circle-bold-duotone",
  },
];

export default function ContentTypeSelector({
  value,
  onChange,
}: {
  value: ContentType;
  onChange: (type: ContentType) => void;
}) {
  return (
    <Tabs
      selectedKey={value}
      onSelectionChange={(key) => onChange(key as ContentType)}
      variant="bordered"
      size="sm"
    >
      {contentTypes.map((type) => (
        <Tab
          key={type.key}
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon={type.icon} className="text-base" />
              <span>{type.label}</span>
            </div>
          }
        />
      ))}
    </Tabs>
  );
}
