import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const extractStatusValidator = v.union(
  v.literal("pending"),
  v.literal("processing"),
  v.literal("completed"),
  v.literal("error"),
);

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projectSources")
      .withIndex("by_project_order", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const attachImages = mutation({
  args: {
    projectId: v.id("projects"),
    userId: v.string(),
    files: v.array(
      v.object({
        order: v.number(),
        storageId: v.id("_storage"),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projectSources")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    for (const source of existing) {
      await ctx.db.delete(source._id);
    }

    const now = Date.now();
    const ids = [];
    for (const file of args.files) {
      const id = await ctx.db.insert("projectSources", {
        projectId: args.projectId,
        userId: args.userId,
        order: file.order,
        kind: "image",
        storageId: file.storageId,
        rawText: "",
        extractStatus: "pending",
        createdAt: now,
        updatedAt: now,
      });
      ids.push(id);
    }
    return ids;
  },
});

export const attachText = mutation({
  args: {
    projectId: v.id("projects"),
    userId: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projectSources")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    for (const source of existing) {
      await ctx.db.delete(source._id);
    }

    const now = Date.now();
    return await ctx.db.insert("projectSources", {
      projectId: args.projectId,
      userId: args.userId,
      order: 0,
      kind: "text_block",
      rawText: args.text,
      extractStatus: "completed",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const setExtractResult = mutation({
  args: {
    id: v.id("projectSources"),
    extractStatus: extractStatusValidator,
    rawText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = {
      extractStatus: args.extractStatus,
      updatedAt: Date.now(),
    };
    if (typeof args.rawText === "string") {
      patch.rawText = args.rawText;
    }
    await ctx.db.patch(args.id, patch);
  },
});

export const getStorageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
