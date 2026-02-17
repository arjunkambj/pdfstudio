"use client";

import type { PDFFile } from "@/types";
import { formatFileSize } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button, Listbox, ListboxItem } from "@heroui/react";

export default function FileList({ files }: { files: PDFFile[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
        <h3 className="text-sm font-semibold">Files ({files.length})</h3>
        <Button size="sm" variant="light" isIconOnly>
          <Icon icon="solar:add-circle-linear" className="text-lg" />
        </Button>
      </div>
      {files.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <Icon
            icon="solar:document-add-bold-duotone"
            className="mb-2 text-3xl text-foreground/20"
          />
          <p className="text-xs text-foreground/40">No files yet</p>
        </div>
      ) : (
        <Listbox aria-label="Project files" className="p-2">
          {files.map((file) => (
            <ListboxItem
              key={file.id}
              startContent={
                <Icon
                  icon="solar:document-bold-duotone"
                  className="text-lg text-danger"
                />
              }
              description={`${file.pageCount} pages · ${formatFileSize(file.size)}`}
            >
              {file.name}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
}
