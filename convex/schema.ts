import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    userId: v.string(),
    title: v.string(),
    sourceType: v.union(v.literal("images"), v.literal("text")),
    status: v.union(
      v.literal("draft"),
      v.literal("processing"),
      v.literal("editing"),
      v.literal("generating_pdf"),
      v.literal("ready"),
      v.literal("error"),
    ),
    themeId: v.string(),
    rewritePolicy: v.literal("strict_preserve"),
    minSlides: v.number(),
    maxSlides: v.number(),
    sourceText: v.optional(v.string()),
    slideCount: v.number(),
    errorMessage: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    contentMode: v.optional(
      v.union(
        v.literal("generate"),
        v.literal("condense"),
        v.literal("preserve"),
      ),
    ),
    outputLanguage: v.optional(v.string()),
    imageSource: v.optional(
      v.union(v.literal("ai"), v.literal("none"), v.literal("upload")),
    ),
    imageArtStyle: v.optional(v.string()),
    contentStyle: v.optional(v.string()),
    extraKeywords: v.optional(v.string()),
    format: v.optional(v.string()),
    instructions: v.optional(v.string()),
    pdfUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_user_updated", ["userId", "updatedAt"]),

  slides: defineTable({
    projectId: v.id("projects"),
    userId: v.string(),
    order: v.number(),
    title: v.string(),
    content: v.string(),
    layout: v.union(
      v.literal("text-only"),
      v.literal("text-image"),
      v.literal("image-full"),
    ),
    needsImage: v.boolean(),
    imagePrompt: v.optional(v.string()),
    imageStatus: v.union(
      v.literal("none"),
      v.literal("pending"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("error"),
    ),
    generatedImageUrl: v.optional(v.string()),
    sourceRefs: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_order", ["projectId", "order"]),

  projectSources: defineTable({
    projectId: v.id("projects"),
    userId: v.string(),
    order: v.number(),
    kind: v.union(v.literal("image"), v.literal("text_block")),
    storageId: v.optional(v.id("_storage")),
    rawText: v.string(),
    extractStatus: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("error"),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_order", ["projectId", "order"]),
});
