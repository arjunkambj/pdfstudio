import { convex } from "@/lib/server/convex";
import { planSlidesFromSources } from "@/lib/server/slidePlanning";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

function splitTextIntoBlocks(source: string) {
  return source
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const { projectId } = (await request.json()) as { projectId: Id<"projects"> };

  const project = await convex.query(api.projects.get, { id: projectId });
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }
  if (project.sourceType !== "text") {
    return Response.json(
      { error: "Project is not a text project" },
      { status: 400 },
    );
  }

  await convex.mutation(api.projects.setStatus, {
    id: projectId,
    status: "processing",
  });

  try {
    const sources = await convex.query(api.projectSources.listByProject, {
      projectId,
    });
    const rawText =
      project.sourceText ||
      sources.map((source) => source.rawText).join("\n\n");
    const blocks = splitTextIntoBlocks(rawText);

    if (blocks.length === 0) {
      throw new Error("No text content found");
    }

    const sourceBlocks = blocks.map((text, index) => ({
      ref: `text:block:${index + 1}`,
      text,
    }));

    const plannedSlides = await planSlidesFromSources({
      projectTitle: project.title,
      minSlides: project.minSlides,
      maxSlides: project.maxSlides,
      sourceBlocks,
    });

    const normalizedSlides = plannedSlides.map((slide, index) => ({
      order: index,
      title: slide.title || `Slide ${index + 1}`,
      content: slide.content || "",
      layout: slide.layout,
      needsImage: slide.needsImage,
      imagePrompt: slide.needsImage ? slide.imagePrompt : undefined,
      sourceRefs:
        slide.sourceRefs.length > 0
          ? slide.sourceRefs
          : [`text:block:${Math.min(index + 1, blocks.length)}`],
    }));

    await convex.mutation(api.slides.replaceForProject, {
      projectId,
      userId: project.userId,
      slides: normalizedSlides,
    });

    await convex.mutation(api.projects.setStatus, {
      id: projectId,
      status: "editing",
      slideCount: normalizedSlides.length,
    });

    return Response.json({
      success: true,
      slideCount: normalizedSlides.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Text processing failed";
    await convex.mutation(api.projects.setStatus, {
      id: projectId,
      status: "error",
      errorMessage: message,
    });
    return Response.json({ error: message }, { status: 500 });
  }
}
