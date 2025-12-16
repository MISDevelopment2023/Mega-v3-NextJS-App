import { Report } from "@/types/report";

/**
 * Reports configuration
 * Add your Grafana embed URLs here
 *
 * To get a Grafana embed URL:
 * 1. Open your Grafana dashboard
 * 2. Click on "Share" button
 * 3. Select "Embed" tab
 * 4. Copy the iframe src URL
 * 5. Optionally, append &theme=light or &theme=dark for theme
 * 6. Add authentication parameters if required (e.g., ?kiosk=tv&autofitpanels)
 */
export const reports: Report[] = [
    {
    id: "dashboard-1",
    name: "Trip Report",
    grafanaUrl:
      "http://10.10.0.122:8080/d/trip-report-dashboard/trip-report?orgId=1&from=2025-10-31T19:00:00.000Z&to=2025-12-16T18:59:59.000Z&timezone=browser&var-vehicle=FSD-7890&var-duration_min=5&refresh=1m&&kiosk=true",
    description: "Detailed trip history and route analysis",
    icon: "Route", // Icon name for lucide-react
  },
  {
    id: "dashboard-2",
    name: "Temperature Threshold Report",
    // Slug-based URL format: /d/SLUG/dashboard-slug
    // Using kiosk=true parameter to hide sidebar - this works perfectly!
    grafanaUrl:
      "http://10.10.0.122:8080/d/temperature-threshold-report/temperature-threshold-report-by-vehicle?orgId=1&from=2025-11-30T19:00:00.000Z&to=2025-12-04T18:59:59.000Z&timezone=browser&var-vehicle=JWV-3417&refresh=30m&kiosk=true",
    // Note: To restrict users to viewing and filtering only, configure Grafana Viewer role
    // See GRAFANA_VIEWER_RESTRICTIONS.md for details
    description: "Real-time fleet status and location tracking",
    icon: "MapPin", // Icon name for lucide-react
  },
  {
    id: "dashboard-3",
    name: "Origin To Destination Report",
    grafanaUrl: "http://10.10.0.122:8080/d/fence-wise-trip-report-dashboard/origin-to-destination-report?orgId=1&from=2025-11-15T20:26:17.760Z&to=2025-12-15T20:26:17.760Z&timezone=browser&var-vehicle=JW-3219&refresh=30m&kiosk=true", // Add your Grafana embed URL here
    description: "Performance metrics and vehicle diagnostics",
    icon: "Activity", // Icon name for lucide-react
  },
  // {
  //   id: "dashboard-4",
  //   name: "Maintenance Schedule",
  //   grafanaUrl: "", // Add your Grafana embed URL here
  //   description: "Vehicle maintenance alerts and scheduling",
  //   icon: "Wrench", // Icon name for lucide-react
  // },
];

/**
 * Get a report by ID
 */
export function getReportById(id: string): Report | undefined {
  return reports.find((report) => report.id === id);
}

/**
 * Get all reports
 */
export function getAllReports(): Report[] {
  return reports;
}
