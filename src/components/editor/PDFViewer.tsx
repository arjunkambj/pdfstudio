"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

export default function PDFViewer() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-default-300 bg-content1/50 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Icon
          icon="solar:document-bold-duotone"
          className="text-4xl text-primary/50"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">PDF Workspace</h3>
      <p className="mt-1 max-w-sm text-sm text-foreground/50">
        Select a file from the sidebar to preview, or upload a new document to
        get started.
      </p>
      <div className="mt-6 flex gap-3">
        <Button
          variant="bordered"
          size="sm"
          startContent={<Icon icon="solar:upload-linear" />}
        >
          Upload PDF
        </Button>
        <Button
          color="primary"
          size="sm"
          startContent={<Icon icon="solar:magic-stick-3-linear" />}
        >
          Generate with AI
        </Button>
      </div>
    </div>
  );
}
