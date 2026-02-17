import type { ContentStyle, ImageArtStyle, ThemeDefinition } from "@/types";

export const themes: ThemeDefinition[] = [
  {
    id: "dawn",
    name: "Dawn",
    colors: {
      background: "#FFF7ED",
      foreground: "#1C1917",
      primary: "#EA580C",
      accent: "#FB923C",
    },
  },
  {
    id: "indigo",
    name: "Indigo",
    colors: {
      background: "#EEF2FF",
      foreground: "#1E1B4B",
      primary: "#4F46E5",
      accent: "#818CF8",
    },
  },
  {
    id: "nightSky",
    name: "Night Sky",
    colors: {
      background: "#0F172A",
      foreground: "#F8FAFC",
      primary: "#3B82F6",
      accent: "#60A5FA",
    },
  },
  {
    id: "pistachio",
    name: "Pistachio",
    colors: {
      background: "#F0FDF4",
      foreground: "#14532D",
      primary: "#16A34A",
      accent: "#4ADE80",
    },
  },
  {
    id: "creme",
    name: "Creme",
    colors: {
      background: "#FFFBEB",
      foreground: "#451A03",
      primary: "#D97706",
      accent: "#FBBF24",
    },
  },
  {
    id: "sanguine",
    name: "Sanguine",
    colors: {
      background: "#FFF1F2",
      foreground: "#4C0519",
      primary: "#E11D48",
      accent: "#FB7185",
    },
  },
];

export const imageArtStyles: ImageArtStyle[] = [
  {
    id: "photorealistic",
    name: "Photorealistic",
    description: "High-quality realistic photos",
  },
  {
    id: "illustration",
    name: "Illustration",
    description: "Hand-drawn illustration style",
  },
  { id: "3d-render", name: "3D Render", description: "3D rendered graphics" },
  {
    id: "flat-design",
    name: "Flat Design",
    description: "Minimal flat design style",
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Watercolor painting style",
  },
  { id: "abstract", name: "Abstract", description: "Abstract art style" },
];

export const contentStyles: ContentStyle[] = [
  { id: "traditional", name: "Traditional" },
  { id: "modern", name: "Modern" },
  { id: "minimal", name: "Minimal" },
  { id: "bold", name: "Bold" },
  { id: "playful", name: "Playful" },
  { id: "professional", name: "Professional" },
];

export const outputLanguages = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" },
  { id: "fr", name: "French" },
  { id: "de", name: "German" },
  { id: "pt", name: "Portuguese" },
  { id: "ja", name: "Japanese" },
  { id: "ko", name: "Korean" },
  { id: "zh", name: "Chinese" },
];
