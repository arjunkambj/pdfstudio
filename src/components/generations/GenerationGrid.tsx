"use client";

import GenerationCard from "@/components/generations/GenerationCard";
import GenerationEmptyState from "@/components/generations/GenerationEmptyState";
import type { Generation } from "@/types";

export default function GenerationGrid({
  generations,
  onDelete,
}: {
  generations: Generation[];
  onDelete: (id: Generation["_id"]) => void;
}) {
  if (generations.length === 0) {
    return <GenerationEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {generations.map((gen) => (
        <GenerationCard key={gen._id} generation={gen} onDelete={onDelete} />
      ))}
    </div>
  );
}
