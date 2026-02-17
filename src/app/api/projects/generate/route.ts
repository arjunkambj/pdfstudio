import { convex } from "@/lib/server/convex";
import { generateImagesForProject } from "@/lib/server/imageGeneration";
import { refineSlidesWithSettings } from "@/lib/server/slidePlanning";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export async function POST(request: Request) {
  const { projectId } = (await request.json()) as { projectId: Id<"projects"> };

  const project = await convex.query(api.projects.get, { id: projectId });
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  await convex.mutation(api.projects.setStatus, {
    id: projectId,
    status: "processing",
  });

  try {
    // Read edited cards
    const slides = await convex.query(api.slides.listByProject, { projectId });
    const cards = slides.map((s) => ({
      title: s.title,
      content: s.content,
      order: s.order,
    }));

    // Refine slides with settings
    const refined = await refineSlidesWithSettings({
      cards,
      contentMode: project.contentMode || "generate",
      outputLanguage: project.outputLanguage || "en",
      contentStyle: project.contentStyle || "traditional",
      instructions: project.instructions || "",
      extraKeywords: project.extraKeywords || "",
      imageSource: project.imageSource || "ai",
      imageArtStyle: project.imageArtStyle || "photorealistic",
    });

    const normalizedSlides = refined.map((slide, index) => ({
      order: index,
      title: slide.title || `Slide ${index + 1}`,
      content: slide.content || "",
      layout: slide.layout,
      needsImage: slide.needsImage,
      imagePrompt: slide.needsImage ? slide.imagePrompt : undefined,
      sourceRefs: slide.sourceRefs || [],
    }));

    // Replace slides
    await convex.mutation(api.slides.replaceForProject, {
      projectId,
      userId: project.userId,
      slides: normalizedSlides,
    });

    // Generate images if requested
    if (project.imageSource === "ai") {
      await generateImagesForProject(projectId, project.imageArtStyle);
    }

    // Generate PDF
    await convex.mutation(api.projects.setStatus, {
      id: projectId,
      status: "generating_pdf",
      slideCount: normalizedSlides.length,
    });

    // Trigger PDF generation
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";
    await fetch(`${baseUrl}/api/projects/generate-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    await convex.mutation(api.projects.setStatus, {
      id: projectId,
      status: "ready",
      slideCount: normalizedSlides.length,
    });

    return Response.json({
      success: true,
      slideCount: normalizedSlides.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Generation failed";
    await convex.mutation(api.projects.setStatus, {
      id: projectId,
      status: "error",
      errorMessage: message,
    });
    return Response.json({ error: message }, { status: 500 });
  }
}
