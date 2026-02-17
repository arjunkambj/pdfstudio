import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Title & subtitle */}
      <div>
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-72 rounded-lg" />
      </div>

      {/* Tab bar */}
      <div className="flex gap-6 border-b border-default-200 pb-2">
        <Skeleton className="h-5 w-14 rounded-lg" />
        <Skeleton className="h-5 w-24 rounded-lg" />
      </div>

      {/* Card with sidebar + content */}
      <div className="flex rounded-xl border border-default-200 bg-content1">
        {/* Left sidebar nav */}
        <div className="w-52 shrink-0 space-y-1 border-r border-default-200 p-5">
          <Skeleton className="mb-3 h-5 w-36 rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>

        {/* Right content area */}
        <div className="flex-1 p-6">
          {/* Section heading */}
          <Skeleton className="h-6 w-28 rounded-lg" />
          <div className="my-4 h-px bg-default-200" />

          {/* Row 1: User name */}
          <div className="flex items-center justify-between py-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-3 w-72 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="h-5 w-5 rounded-md" />
            </div>
          </div>

          <div className="h-px bg-default-200" />

          {/* Row 2: Profile image */}
          <div className="flex items-center justify-between py-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="h-3 w-56 rounded-lg" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
