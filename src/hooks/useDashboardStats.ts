"use client";

import { mockActivity, mockStats } from "@/lib/mock-data";

export function useDashboardStats() {
  return { stats: mockStats, activity: mockActivity };
}
