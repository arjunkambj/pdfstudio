import { fal } from "@fal-ai/client";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { convex } from "./convex";

export async function generateImagesForProject(
  projectId: Id<"projects">,
  artStyle?: string,
) {
  const slides = await convex.query(api.slides.listByProject, { projectId });
  const targetSlides = slides.filter(
    (slide) => slide.needsImage && slide.imagePrompt,
  );

  fal.config({ credentials: process.env.FAL_KEY });

  let completed = 0;
  for (const slide of targetSlides) {
    try {
      await convex.mutation(api.slides.updateImageState, {
        id: slide._id,
        imageStatus: "generating",
      });

      const result = await fal.subscribe("fal-ai/flux/schnell", {
        input: {
          prompt: `${slide.imagePrompt}. ${artStyle ? `${artStyle} style.` : ""} 16:9 presentation visual.`,
          image_size: "landscape_16_9",
          num_images: 1,
        },
      });

      const imageUrl = (result.data as { images?: { url: string }[] })
        ?.images?.[0]?.url;

      if (imageUrl) {
        await convex.mutation(api.slides.updateImageState, {
          id: slide._id,
          imageStatus: "completed",
          generatedImageUrl: imageUrl,
        });
        completed += 1;
      } else {
        await convex.mutation(api.slides.updateImageState, {
          id: slide._id,
          imageStatus: "error",
        });
      }
    } catch {
      await convex.mutation(api.slides.updateImageState, {
        id: slide._id,
        imageStatus: "error",
      });
    }
  }

  return { total: targetSlides.length, completed };
}
