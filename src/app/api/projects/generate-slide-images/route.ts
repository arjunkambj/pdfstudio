import { convex } from "@/lib/server/convex";
import { generateImagesForProject } from "@/lib/server/imageGeneration";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export async function POST(request: Request) {
  const { projectId } = (await request.json()) as { projectId: Id<"projects"> };

  const project = await convex.query(api.projects.get, { id: projectId });
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const result = await generateImagesForProject(projectId);
    return Response.json({ success: true, ...result });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Image generation failed",
      },
      { status: 500 },
    );
  }
}
