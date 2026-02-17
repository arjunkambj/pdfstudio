export type ProjectStatus = "draft" | "active" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string | null;
  fileCount: number;
}

export interface PDFFile {
  id: string;
  projectId: string;
  name: string;
  url: string;
  size: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalFiles: number;
  storageUsed: string;
}

export interface ActivityItem {
  id: string;
  type: "project_created" | "file_uploaded" | "project_updated" | "file_deleted";
  description: string;
  timestamp: string;
  projectId: string;
  projectName: string;
}
