"use client";

import ActivityFeed from "@/components/dashboard/ActivityFeed";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProjects from "@/components/dashboard/RecentProjects";
import StatsCards from "@/components/dashboard/StatsCards";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useProjects } from "@/hooks/useProjects";
import { useUser } from "@stackframe/stack";

export default function DashboardPage() {
  const user = useUser();
  const { stats, activity } = useDashboardStats();
  const { projects } = useProjects();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
        </h1>
        <p className="mt-1 text-foreground/50">
          Here&apos;s what&apos;s happening with your projects
        </p>
      </div>

      <QuickActions />
      <StatsCards stats={stats} />
      <RecentProjects projects={projects} />
      <ActivityFeed activity={activity} />
    </div>
  );
}
