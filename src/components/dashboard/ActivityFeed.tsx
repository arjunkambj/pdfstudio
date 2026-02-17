"use client";

import type { ActivityItem } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { Icon } from "@iconify/react";

const activityIcons: Record<string, string> = {
  project_created: "solar:add-circle-bold-duotone",
  file_uploaded: "solar:upload-bold-duotone",
  project_updated: "solar:pen-new-square-bold-duotone",
  file_deleted: "solar:trash-bin-trash-bold-duotone",
};

const activityColors: Record<string, string> = {
  project_created: "text-success",
  file_uploaded: "text-primary",
  project_updated: "text-warning",
  file_deleted: "text-danger",
};

export default function ActivityFeed({
  activity,
}: { activity: ActivityItem[] }) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
      <div className="space-y-3">
        {activity.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-default-200 p-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-default-100">
              <Icon
                icon={activityIcons[item.type]}
                className={`text-base ${activityColors[item.type]}`}
              />
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm">{item.description}</p>
              <p className="text-xs text-foreground/40">
                {item.projectName}
              </p>
            </div>
            <span className="shrink-0 text-xs text-foreground/40">
              {formatRelativeTime(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
