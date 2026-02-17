"use client";

import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useState } from "react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    // Mock: just close for now
    onClose();
    setName("");
    setDescription("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <Icon icon="solar:add-circle-bold-duotone" className="text-xl text-primary" />
          New Project
        </ModalHeader>
        <ModalBody>
          <Input
            label="Project Name"
            placeholder="e.g. Q1 Marketing Deck"
            value={name}
            onValueChange={setName}
            variant="bordered"
          />
          <Textarea
            label="Description"
            placeholder="What is this project about?"
            value={description}
            onValueChange={setDescription}
            variant="bordered"
            minRows={3}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleCreate}
            isDisabled={!name.trim()}
          >
            Create Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
