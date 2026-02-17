import { renderToBuffer } from "@react-pdf/renderer";
import { convex } from "@/lib/server/convex";
import { PresentationDocument } from "@/lib/server/pdf/templates";
import { themes } from "@/lib/themes";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export async function POST(request: Request) {
  const { projectId } = (await request.json()) as { projectId: Id<"projects"> };

  const project = await convex.query(api.projects.get, { id: projectId });
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  const slides = await convex.query(api.slides.listByProject, { projectId });
  if (slides.length === 0) {
    return Response.json({ error: "No slides to render" }, { status: 400 });
  }

  const theme = themes.find((t) => t.id === project.themeId) || themes[1];

  const slideData = slides.map((s) => ({
    title: s.title,
    content: s.content,
    layout: s.layout,
    generatedImageUrl: s.generatedImageUrl,
  }));

  const buffer = await renderToBuffer(
    PresentationDocument({ slides: slideData, theme }),
  );

  const filename = `${project.title.replace(/[^a-zA-Z0-9 ]/g, "").trim() || "presentation"}.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
