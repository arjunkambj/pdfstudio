"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export function useGenerations(userId: string | undefined) {
  return useQuery(api.projects.list, userId ? { userId } : "skip");
}

export function useGeneration(id: Id<"projects"> | undefined) {
  return useQuery(api.projects.get, id ? { id } : "skip");
}

export function useGenerationWithCards(id: Id<"projects"> | undefined) {
  return useQuery(api.projects.getWithSlides, id ? { id } : "skip");
}
