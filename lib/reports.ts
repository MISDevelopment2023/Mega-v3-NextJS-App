import { Report, CategoryConfig, ReportCategory } from "@/types/report";

/**
 * Category configuration with icons and colors
 */
export const categories: CategoryConfig[] = [
  {
    id: "violations",
    label: "Violations",
    icon: "AlertTriangle",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    id: "standard",
    label: "Standard",
    icon: "LayoutDashboard",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "fuel",
    label: "Fuel",
    icon: "Fuel",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: "temperature",
    label: "Temperature",
    icon: "Thermometer",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    id: "video",
    label: "Video",
    icon: "Video",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "others",
    label: "Others",
    icon: "MoreHorizontal",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
];

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
  // ============ VIOLATIONS ============
  {
    id: "overspeed-report",
    name: "Overspeed Report",
    category: "violations",
    grafanaUrl: "",
    description: "Track vehicle speed violations",
    icon: "Gauge",
  },
  {
    id: "harsh-driving-report",
    name: "Harsh Driving Report",
    category: "violations",
    grafanaUrl: "",
    description: "Monitor harsh acceleration and braking events",
    icon: "AlertOctagon",
  },
  {
    id: "geofence-violation-report",
    name: "Geofence Violation Report",
    category: "violations",
    grafanaUrl: "",
    description: "Track geofence entry/exit violations",
    icon: "MapPinOff",
  },

  // ============ STANDARD ============
  {
    id: "trip-report",
    name: "Trip Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/trip-report-dashboard/trip-report?orgId=1&from=2025-10-31T19:00:00.000Z&to=2025-12-16T18:59:59.000Z&timezone=browser&var-vehicle=FSD-7890&var-duration_min=5&refresh=1m&&kiosk=true",
    description: "Detailed trip history and route analysis",
    icon: "Route",
  },
  {
    id: "origin-destination-report",
    name: "Origin To Destination Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/fence-wise-trip-report-dashboard/origin-to-destination-report?orgId=1&from=2025-11-15T20:26:17.760Z&to=2025-12-15T20:26:17.760Z&timezone=browser&var-vehicle=JW-3219&refresh=30m&kiosk=true",
    description: "Track trips between designated locations",
    icon: "Navigation",
  },
  {
    id: "daily-mileage-report",
    name: "Daily Mileage Report",
    category: "standard",
    grafanaUrl: "",
    description: "Daily distance traveled by vehicles",
    icon: "TrendingUp",
  },
  {
    id: "movement-report",
    name: "Movement Report",
    category: "standard",
    grafanaUrl: "",
    description: "Vehicle movement and idle time analysis",
    icon: "Activity",
  },
  {
    id: "stoppage-report",
    name: "Stoppage Report",
    category: "standard",
    grafanaUrl: "",
    description: "Vehicle stoppage locations and durations",
    icon: "PauseCircle",
  },

  // ============ FUEL ============
  {
    id: "fuel-consumption-report",
    name: "Fuel Consumption Report",
    category: "fuel",
    grafanaUrl: "",
    description: "Monitor fuel usage across fleet",
    icon: "Droplet",
  },
  {
    id: "fuel-filling-report",
    name: "Fuel Filling Report",
    category: "fuel",
    grafanaUrl: "",
    description: "Track fuel filling events",
    icon: "Plus",
  },
  {
    id: "fuel-drainage-report",
    name: "Fuel Drainage Report",
    category: "fuel",
    grafanaUrl: "",
    description: "Detect potential fuel theft",
    icon: "AlertTriangle",
  },

  // ============ TEMPERATURE ============
  {
    id: "temperature-threshold-report",
    name: "Temperature Threshold Report",
    category: "temperature",
    grafanaUrl:
      "http://10.10.0.122:8080/d/temperature-threshold-report/temperature-threshold-report-by-vehicle?orgId=1&from=2025-11-30T19:00:00.000Z&to=2025-12-04T18:59:59.000Z&timezone=browser&var-vehicle=JWV-3417&refresh=30m&kiosk=true",
    description: "Temperature limit alerts and violations",
    icon: "ThermometerSun",
  },
  {
    id: "temperature-hourly-report",
    name: "Temperature Hourly Report",
    category: "temperature",
    grafanaUrl: "",
    description: "Hourly temperature readings",
    icon: "Clock",
  },
  {
    id: "temperature-dashboard",
    name: "Temperature Dashboard",
    category: "temperature",
    grafanaUrl: "",
    description: "Real-time temperature monitoring",
    icon: "Gauge",
  },

  // ============ VIDEO ============
  {
    id: "live-video-monitoring",
    name: "Live Video Monitoring",
    category: "video",
    grafanaUrl: "",
    description: "Real-time video feeds from vehicles",
    icon: "Video",
  },
  {
    id: "event-videos",
    name: "Event Videos",
    category: "video",
    grafanaUrl: "",
    description: "Video recordings of specific events",
    icon: "Film",
  },
  {
    id: "historical-videos",
    name: "Historical Videos",
    category: "video",
    grafanaUrl: "",
    description: "Access past video recordings",
    icon: "Archive",
  },

  // ============ OTHERS ============
  {
    id: "live-tracking",
    name: "Live Tracking",
    category: "others",
    grafanaUrl: "",
    description: "Real-time vehicle location tracking",
    icon: "MapPin",
  },
  {
    id: "maintenance-schedule",
    name: "Maintenance Schedule",
    category: "others",
    grafanaUrl: "",
    description: "Vehicle maintenance alerts and scheduling",
    icon: "Wrench",
  },
  {
    id: "driver-performance",
    name: "Driver Performance",
    category: "others",
    grafanaUrl: "",
    description: "Driver behavior analysis and scoring",
    icon: "User",
  },
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

/**
 * Get reports by category
 */
export function getReportsByCategory(category: ReportCategory): Report[] {
  return reports.filter((report) => report.category === category);
}

/**
 * Get category configuration
 */
export function getCategoryConfig(categoryId: ReportCategory): CategoryConfig | undefined {
  return categories.find((cat) => cat.id === categoryId);
}
