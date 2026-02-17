import { convex } from "@/lib/server/convex";
import {
  extractTextFromImageUrl,
  planSlidesFromSources,
} from "@/lib/server/slidePlanning";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export async function POST(request: Request) {
  const { projectId } = (await request.json()) as { projectId: Id<"projects"> };

  const project = await convex.query(api.projects.get, { id: projectId });
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }
  if (project.sourceType !== "images") {
    return Response.json(
      { error: "Project is not an image project" },
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
    if (sources.length < 1 || sources.length > 30) {
      throw new Error("Image upload count must be between 1 and 30");
    }

    const sourceBlocks: { ref: string; text: string }[] = [];
    for (const source of sources) {
      if (source.kind !== "image" || !source.storageId) {
        continue;
      }

      await convex.mutation(api.projectSources.setExtractResult, {
        id: source._id,
        extractStatus: "processing",
      });

      try {
        const imageUrl = await convex.query(api.projectSources.getStorageUrl, {
          storageId: source.storageId,
        });
        if (!imageUrl) throw new Error("Image URL unavailable");

        const extractedText = await extractTextFromImageUrl(imageUrl);
        const imageIndex = source.order + 1;
        const blockText =
          (extractedText || "(No visible text detected)") +
          `\n\n[Image #${imageIndex}]`;

        await convex.mutation(api.projectSources.setExtractResult, {
          id: source._id,
          extractStatus: "completed",
          rawText: extractedText,
        });

        sourceBlocks.push({
          ref: `img:${imageIndex}`,
          text: blockText,
        });
      } catch {
        await convex.mutation(api.projectSources.setExtractResult, {
          id: source._id,
          extractStatus: "error",
          rawText: "",
        });
      }
    }

    if (sourceBlocks.length === 0) {
      throw new Error("Could not extract text from any uploaded image");
    }

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
        slide.sourceRefs.length > 0 ? slide.sourceRefs : [sourceBlocks[0].ref],
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
      sourceCount: sourceBlocks.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Image processing failed";
    await convex.mutation(api.projects.setStatus, {
      id: projectId,
      status: "error",
      errorMessage: message,
    });
    return Response.json({ error: message }, { status: 500 });
  }
}
