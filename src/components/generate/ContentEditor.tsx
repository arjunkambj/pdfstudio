"use client";

import { Button, Tab, Tabs, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import CardItem from "@/components/generate/CardItem";

export interface CardData {
  id: string;
  title: string;
  content: string;
}

export default function ContentEditor({
  cards,
  onCardsChange,
  freeformContent,
  onFreeformChange,
}: {
  cards: CardData[];
  onCardsChange: (cards: CardData[]) => void;
  freeformContent: string;
  onFreeformChange: (content: string) => void;
}) {
  const [mode, setMode] = useState<string>("freeform");

  const addCard = () => {
    onCardsChange([
      ...cards,
      { id: crypto.randomUUID(), title: "", content: "" },
    ]);
  };

  const updateCard = (
    index: number,
    field: "title" | "content",
    value: string,
  ) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    onCardsChange(updated);
  };

  const removeCard = (index: number) => {
    onCardsChange(cards.filter((_, i) => i !== index));
  };

  const totalChars = cards.reduce(
    (sum, c) => sum + c.title.length + c.content.length,
    0,
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-default-200 px-4 pt-3">
        <Tabs
          selectedKey={mode}
          onSelectionChange={(key) => setMode(key as string)}
          size="sm"
          variant="underlined"
        >
          <Tab key="freeform" title="Freeform" />
          <Tab key="cards" title="Card-by-card" />
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {mode === "freeform" ? (
          <Textarea
            placeholder="Write or paste your content here. Each paragraph or section will be turned into a card..."
            value={freeformContent}
            onValueChange={onFreeformChange}
            minRows={16}
            maxRows={40}
            variant="bordered"
          />
        ) : (
          <div className="flex flex-col gap-3">
            <Reorder.Group
              axis="y"
              values={cards}
              onReorder={onCardsChange}
              className="flex flex-col gap-3"
            >
              {cards.map((card, index) => (
                <Reorder.Item key={card.id} value={card}>
                  <CardItem
                    index={index}
                    title={card.title}
                    content={card.content}
                    onTitleChange={(v) => updateCard(index, "title", v)}
                    onContentChange={(v) => updateCard(index, "content", v)}
                    onRemove={() => removeCard(index)}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <Button
              variant="flat"
              size="sm"
              onPress={addCard}
              startContent={
                <Icon icon="solar:add-circle-linear" className="text-base" />
              }
            >
              Add card
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-default-200 px-4 py-2 text-xs text-default-400">
        <span>
          {mode === "cards" ? `${cards.length} cards` : "Freeform mode"}
        </span>
        <span>{totalChars.toLocaleString()} characters</span>
      </div>
    </div>
  );
}
