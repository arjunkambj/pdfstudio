"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import type { Card, SlideLayout } from "@/types";

export default function EditCardModal({
  card,
  isOpen,
  onClose,
  onSave,
}: {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    cardId: Card["_id"],
    values: {
      title: string;
      content: string;
      layout: SlideLayout;
      needsImage: boolean;
      imagePrompt?: string;
    },
  ) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [layout, setLayout] = useState<SlideLayout>("text-only");
  const [needsImage, setNeedsImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");

  useEffect(() => {
    if (!card) return;
    setTitle(card.title);
    setContent(card.content);
    setLayout(card.layout);
    setNeedsImage(card.needsImage);
    setImagePrompt(card.imagePrompt || "");
  }, [card]);

  const handleSave = () => {
    if (!card) return;
    onSave(card._id, {
      title,
      content,
      layout,
      needsImage,
      imagePrompt: needsImage ? imagePrompt : undefined,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>Edit Slide</ModalHeader>
        <ModalBody>
          <Input label="Title" value={title} onValueChange={setTitle} />
          <Textarea
            label="Content"
            value={content}
            onValueChange={setContent}
            minRows={8}
            maxRows={20}
          />
          <Select
            label="Layout"
            selectedKeys={[layout]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as SlideLayout;
              if (value) setLayout(value);
            }}
          >
            <SelectItem key="text-only">Text only</SelectItem>
            <SelectItem key="text-image">Text + image</SelectItem>
            <SelectItem key="image-full">Image full</SelectItem>
          </Select>
          <Switch isSelected={needsImage} onValueChange={setNeedsImage}>
            Slide needs image
          </Switch>
          {needsImage && (
            <Input
              label="Image prompt"
              value={imagePrompt}
              onValueChange={setImagePrompt}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
