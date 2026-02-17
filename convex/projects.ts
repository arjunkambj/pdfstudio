import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user_updated", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getWithSlides = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) return null;

    const slides = await ctx.db
      .query("slides")
      .withIndex("by_project_order", (q) => q.eq("projectId", args.id))
      .collect();

    const sources = await ctx.db
      .query("projectSources")
      .withIndex("by_project_order", (q) => q.eq("projectId", args.id))
      .collect();

    return { ...project, slides, sources };
  },
});

export const createDraft = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    sourceType: v.union(v.literal("images"), v.literal("text")),
    themeId: v.string(),
    sourceText: v.optional(v.string()),
    minSlides: v.optional(v.number()),
    maxSlides: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("projects", {
      userId: args.userId,
      title: args.title,
      sourceType: args.sourceType,
      status: "draft",
      themeId: args.themeId,
      rewritePolicy: "strict_preserve",
      minSlides: args.minSlides ?? 6,
      maxSlides: args.maxSlides ?? 20,
      sourceText: args.sourceText,
      slideCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    themeId: v.optional(v.string()),
    minSlides: v.optional(v.number()),
    maxSlides: v.optional(v.number()),
    sourceText: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const setStatus = mutation({
  args: {
    id: v.id("projects"),
    status: v.union(
      v.literal("draft"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("error"),
    ),
    errorMessage: v.optional(v.string()),
    slideCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const patch: {
      status: "draft" | "processing" | "ready" | "error";
      updatedAt: number;
      errorMessage?: string;
      slideCount?: number;
    } = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.errorMessage) {
      patch.errorMessage = args.errorMessage;
    } else if (args.status !== "error") {
      patch.errorMessage = undefined;
    }
    if (typeof args.slideCount === "number") {
      patch.slideCount = args.slideCount;
    }

    await ctx.db.patch(args.id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const slides = await ctx.db
      .query("slides")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    for (const slide of slides) {
      await ctx.db.delete(slide._id);
    }

    const sources = await ctx.db
      .query("projectSources")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    for (const source of sources) {
      await ctx.db.delete(source._id);
    }

    await ctx.db.delete(args.id);
  },
});
