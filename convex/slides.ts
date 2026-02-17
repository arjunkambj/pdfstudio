import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const layoutValidator = v.union(
  v.literal("text-only"),
  v.literal("text-image"),
  v.literal("image-full"),
);

const imageStatusValidator = v.union(
  v.literal("none"),
  v.literal("pending"),
  v.literal("generating"),
  v.literal("completed"),
  v.literal("error"),
);

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("slides")
      .withIndex("by_project_order", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const get = query({
  args: { id: v.id("slides") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const replaceForProject = mutation({
  args: {
    projectId: v.id("projects"),
    userId: v.string(),
    slides: v.array(
      v.object({
        order: v.number(),
        title: v.string(),
        content: v.string(),
        layout: layoutValidator,
        needsImage: v.boolean(),
        imagePrompt: v.optional(v.string()),
        sourceRefs: v.array(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("slides")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    for (const slide of existing) {
      await ctx.db.delete(slide._id);
    }

    const now = Date.now();
    const ids = [];
    for (const slide of args.slides) {
      const id = await ctx.db.insert("slides", {
        projectId: args.projectId,
        userId: args.userId,
        order: slide.order,
        title: slide.title,
        content: slide.content,
        layout: slide.layout,
        needsImage: slide.needsImage,
        imagePrompt: slide.imagePrompt,
        imageStatus: slide.needsImage ? "pending" : "none",
        generatedImageUrl: undefined,
        sourceRefs: slide.sourceRefs,
        createdAt: now,
        updatedAt: now,
      });
      ids.push(id);
    }

    return ids;
  },
});

export const update = mutation({
  args: {
    id: v.id("slides"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    layout: v.optional(layoutValidator),
    needsImage: v.optional(v.boolean()),
    imagePrompt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = { ...fields, updatedAt: Date.now() };

    if (typeof args.needsImage === "boolean") {
      patch.imageStatus = args.needsImage ? "pending" : "none";
      if (!args.needsImage) {
        patch.generatedImageUrl = undefined;
      }
    }

    await ctx.db.patch(id, patch);
  },
});

export const updateOrder = mutation({
  args: { id: v.id("slides"), order: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { order: args.order, updatedAt: Date.now() });
  },
});

export const updateImageState = mutation({
  args: {
    id: v.id("slides"),
    imageStatus: imageStatusValidator,
    generatedImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = {
      imageStatus: args.imageStatus,
      updatedAt: Date.now(),
    };
    if (args.generatedImageUrl) {
      patch.generatedImageUrl = args.generatedImageUrl;
    }
    await ctx.db.patch(args.id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("slides") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
