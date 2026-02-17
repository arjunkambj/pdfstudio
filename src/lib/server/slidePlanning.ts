import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const layoutSchema = z.enum(["text-only", "text-image", "image-full"]);

const slidePlanSchema = z.object({
  slides: z
    .array(
      z.object({
        title: z.string(),
        content: z.string(),
        layout: layoutSchema,
        needsImage: z.boolean(),
        imagePrompt: z.string().optional(),
        sourceRefs: z.array(z.string()),
      }),
    )
    .min(1),
});

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

function cleanOcrText(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

export async function extractTextFromImageUrl(imageUrl: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        temperature: 0,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all visible text from this image. Keep original wording, line breaks, and ordering. Return plain text only.",
              },
              {
                type: "image_url",
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`OCR failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = payload.choices?.[0]?.message?.content ?? "";
  return cleanOcrText(text);
}

export async function planSlidesFromSources(args: {
  projectTitle: string;
  minSlides: number;
  maxSlides: number;
  sourceBlocks: Array<{
    ref: string;
    text: string;
  }>;
}) {
  const sourceText = args.sourceBlocks
    .map((block) => `--- ${block.ref} ---\n${block.text}`)
    .join("\n\n");

  const { object } = await generateObject({
    model: openrouter("google/gemini-2.5-flash"),
    schema: slidePlanSchema,
    prompt: `You are creating presentation slides from source material.

Project title: ${args.projectTitle}
Slide count range: minimum ${args.minSlides}, maximum ${args.maxSlides}.

Rules:
- Preserve source meaning and facts. Do not invent claims.
- You may tighten wording for slide readability.
- Use only content grounded in source blocks.
- Each slide must include sourceRefs used.
- Decide layout per slide: text-only, text-image, image-full.
- Decide needsImage per slide.
- If needsImage is true, provide a concise, concrete imagePrompt.
- If needsImage is false, do not include imagePrompt.

Source blocks:
${sourceText}`,
  });

  return object.slides.map((slide, index) => ({
    ...slide,
    order: index,
    title: slide.title.trim(),
    content: slide.content.trim(),
  }));
}

export async function refineSlidesWithSettings(args: {
  cards: Array<{ title: string; content: string; order: number }>;
  contentMode: string;
  outputLanguage: string;
  contentStyle: string;
  instructions: string;
  extraKeywords: string;
  imageSource: string;
  imageArtStyle: string;
}) {
  const cardsText = args.cards
    .map((c) => `--- Card ${c.order + 1} ---\nTitle: ${c.title}\n${c.content}`)
    .join("\n\n");

  const contentModeInstructions =
    {
      generate:
        "Expand and enrich the content with additional details and transitions.",
      condense: "Shorten and distill the content to key points only.",
      preserve: "Keep the content as close to the original as possible.",
    }[args.contentMode] ?? "";

  const wantImages = args.imageSource === "ai";
  const imageInstructions = wantImages
    ? `Set needsImage to true for slides that benefit from a visual. Write imagePrompt as a concrete scene description in "${args.imageArtStyle}" art style.`
    : "Set needsImage to false for all slides. Do not include imagePrompt.";

  const { object } = await generateObject({
    model: openrouter("google/gemini-2.5-flash"),
    schema: slidePlanSchema,
    prompt: `You are refining user-edited presentation cards into final slides.

Content mode: ${args.contentMode}. ${contentModeInstructions}
Output language: ${args.outputLanguage}
Style: ${args.contentStyle}
${args.extraKeywords ? `Keywords to incorporate: ${args.extraKeywords}` : ""}
${args.instructions ? `Additional instructions: ${args.instructions}` : ""}

Image rules:
${imageInstructions}

Rules:
- Output slides in the specified output language.
- Each slide must have sourceRefs as an empty array (user-edited content).
- Decide layout per slide: text-only, text-image, image-full.
- Maintain the same number and order of cards unless condensing merges them.

User-edited cards:
${cardsText}`,
  });

  return object.slides.map((slide, index) => ({
    ...slide,
    order: index,
    title: slide.title.trim(),
    content: slide.content.trim(),
  }));
}
