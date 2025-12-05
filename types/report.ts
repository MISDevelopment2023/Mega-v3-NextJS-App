export interface Report {
  id: string;
  name: string;
  grafanaUrl?: string;
  description?: string;
  icon?: string; // Icon name for lucide-react
}

export interface ReportConfig {
  reports: Report[];
}
