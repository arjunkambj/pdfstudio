import type { Doc, Id } from "../../convex/_generated/dataModel";

export type Project = Doc<"projects">;
export type Slide = Doc<"slides">;
export type ProjectSource = Doc<"projectSources">;

export type ProjectId = Id<"projects">;
export type SlideId = Id<"slides">;
export type ProjectSourceId = Id<"projectSources">;

export type SourceType = "images" | "text";
export type ProjectStatus = "draft" | "processing" | "ready" | "error";
export type ImageStatus =
  | "none"
  | "pending"
  | "generating"
  | "completed"
  | "error";
export type SlideLayout = "text-only" | "text-image" | "image-full";

// Legacy aliases for existing component names.
export type Generation = Project;
export type Card = Slide;

// Legacy model exports kept for backward file compatibility.
export type ContentType = "presentation" | "webpage" | "document" | "social";
export type ContentMode = "generate" | "condense" | "preserve";
export type ImageSource = "ai" | "none" | "upload";
export type GenerationStatus = "draft" | "processing" | "ready" | "error";
export type CardLayout = SlideLayout;

export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    accent: string;
  };
}

export interface ImageArtStyle {
  id: string;
  name: string;
  description: string;
}

export interface ContentStyle {
  id: string;
  name: string;
}
