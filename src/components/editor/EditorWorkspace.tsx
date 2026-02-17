"use client";

import EditorToolbar from "@/components/editor/EditorToolbar";
import FileList from "@/components/editor/FileList";
import PDFViewer from "@/components/editor/PDFViewer";
import type { PDFFile, Project } from "@/types";

interface EditorWorkspaceProps {
  project: Project;
  files: PDFFile[];
}

export default function EditorWorkspace({
  project,
  files,
}: EditorWorkspaceProps) {
  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col gap-4">
      <EditorToolbar project={project} />
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="hidden w-64 shrink-0 overflow-auto rounded-xl border border-default-200 bg-content1 lg:block">
          <FileList files={files} />
        </div>
        <PDFViewer />
      </div>
    </div>
  );
}
