export type ReportCategory = 
  | "violations"
  | "standard"
  | "fuel"
  | "temperature"
  | "video"
  | "others";

export interface Report {
  id: string;
  name: string;
  category: ReportCategory;
  grafanaUrl?: string;
  description?: string;
  icon?: string; // Icon name for lucide-react
}

export interface CategoryConfig {
  id: ReportCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface ReportConfig {
  reports: Report[];
  categories: CategoryConfig[];
}
