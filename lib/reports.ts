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
    id: "events-report",
    name: "Events Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/events-report-dashboard/events-report?orgId=1&from=now-90d&to=now&timezone=browser&var-vehicle=$__all&refresh=1h&kiosk=true",
    description: "Track events ",
    icon: "FileWarning",
  },
  {
    id: "seatbelt-speed-violations-report",
    name: "Violations Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/seatbelt-violations-dashboard/seatbelt-safety-violations-report?orgId=1&from=now-30d&to=now-1d&timezone=browser&var-vehicle=$__all&refresh=2h&kiosk=true",
    description: "Track seatbelt and speed violations",
    icon: "LayoutDashboard",
  },
  {
    id: "pasban-violations-dashboard",
    name: "Violations Dashboard",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/mdvr-violations-dashboard/mdvr-violations-dashboard?orgId=1&from=now-30d&to=now-1d&timezone=browser&var-vehicle=$__all&var-transporter=$__all&refresh=1m&var-region=$__all&var-business_group=$__all&kiosk=true",
    description: "Track MDVR violations",
    icon: "LayoutDashboard",
  },
  {
    id: "yearly-ai-violations-report",
    name: "Yearly Violations Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/yearly-ai-violations-dashboard/yearly-ai-violations-report?orgId=1&from=now-1y&to=now&timezone=browser&var-year=2024&refresh=1d&kiosk=true",
    description: "Yearly view of violations detected by AI cameras",
    icon: "AlertTriangle",
  },
  {
    id: "speed-violation-report",
    name: "Speed Violation Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/speed-violations-dashboard/speed-violations-report?orgId=1&from=2025-11-10T11:04:41.170Z&to=2025-11-16T11:04:41.170Z&timezone=browser&var-vehicle=$__all&var-region=$__all&refresh=2h",
    description: "Track geofence entry/exit violations",
    icon: "Gauge",
  },
  {
    id: "late-night-exit-report",
    name: "Late Night Exit Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/late-night-exit-report-dashboard/late-night-exit-report?orgId=1&from=now-90d&to=now&timezone=browser&var-vehicle=MUL-3456&refresh=1d&kiosk=true",
    description: "Track late night exit violations",
    icon: "Moon",
  },
  {
    id: "blackpoints-report",
    name: "Blackpoints Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/blackpoints-dashboard/blackpoints-report?orgId=1&from=now-90d&to=now&timezone=browser&var-vehicle=MUL-3456&refresh=1d&kiosk=true",
    description: "Track blackpoints",
    icon: "AlertOctagon",
  },

  // ============ STANDARD ============
  {
    id: "live-tracking-report",
    name: "Live Tracking Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/live-tracking/live-tracking-dashboard?orgId=1&from=2025-11-22T09:13:37.191Z&to=2025-12-22T09:13:37.191Z&timezone=browser&var-client_id=Lipton&var-vehicle_filter=All&var-status_filter=Total&var-selected_ffid=MFN-20230704143252&refresh=30s&var-selected_vehicle=&kiosk=true",
    description: "Real-time vehicle location tracking",
    icon: "MapPin",
  },
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
    id: "daily-mileage-report",
    name: "Daily Mileage Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/daily-mileage-dashboard/daily-mileage-report?orgId=1&from=now-90d&to=now&timezone=browser&var-vehicle=FSD-7890&refresh=1m&kiosk=true",
    description: "Daily distance traveled by vehicles",
    icon: "TrendingUp",
  },
  {
    id: "mileage-report",
    name: "Mileage Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/monthly-mileage-dashboard/monthly-mileage-report?orgId=1&from=now-30d&to=now-1d&timezone=browser&var-vehicle=$__all&refresh=30m&kiosk=true",
    description: "Distance traveled by vehicles over a period of time",
    icon: "BarChart3",
  },
  {
    id: "movement-report",
    name: "Movement Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/movement-report-dashboard/movement-report?orgId=1&from=now-30d&to=now&timezone=browser&var-vehicle=KHI-1234&refresh=15m&kiosk=true",
    description: "Vehicle movement and idle time analysis",
    icon: "Activity",
  },
  // {
  //   id: "stoppage-report",
  //   name: "Stoppage Report",
  //   category: "standard",
  //   grafanaUrl: "",
  //   description: "Vehicle stoppage locations and durations",
  //   icon: "PauseCircle",
  // },

  // ============ FUEL ============
  // {
  //   id: "fuel-consumption-report",
  //   name: "Fuel Consumption Report",
  //   category: "fuel",
  //   grafanaUrl: "",
  //   description: "Monitor fuel usage across fleet",
  //   icon: "Droplet",
  // },
  // {
  //   id: "fuel-filling-report",
  //   name: "Fuel Filling Report",
  //   category: "fuel",
  //   grafanaUrl: "",
  //   description: "Track fuel filling events",
  //   icon: "Plus",
  // },
  // {
  //   id: "fuel-drainage-report",
  //   name: "Fuel Drainage Report",
  //   category: "fuel",
  //   grafanaUrl: "",
  //   description: "Detect potential fuel theft",
  //   icon: "AlertTriangle",
  // },

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
    name: "Temperature Hourly Report Vertical",
    category: "temperature",
    grafanaUrl:
      "http://10.10.0.122:8080/d/temperature-hourly-dashboard/temperature-hourly-report?orgId=1&from=2025-11-29T19:00:00.000Z&to=2025-12-02T18:59:59.000Z&timezone=browser&var-vehicle=FSD-7890-Temperature&refresh=30m&kiosk=true",
    description: "Hourly temperature readings",
    icon: "Clock",
  },
  // {
  //   id: "temperature-dashboard",
  //   name: "Temperature Dashboard",
  //   category: "temperature",
  //   grafanaUrl: "",
  //   description: "Real-time temperature monitoring",
  //   icon: "Gauge",
  // },

  // ============ VIDEO ============
  // {
  //   id: "live-video-monitoring",
  //   name: "Live Video Monitoring",
  //   category: "video",
  //   grafanaUrl: "",
  //   description: "Real-time video feeds from vehicles",
  //   icon: "Video",
  // },
  // {
  //   id: "event-videos",
  //   name: "Event Videos",
  //   category: "video",
  //   grafanaUrl: "",
  //   description: "Video recordings of specific events",
  //   icon: "Film",
  // },
  // {
  //   id: "historical-videos",
  //   name: "Historical Videos",
  //   category: "video",
  //   grafanaUrl: "",
  //   description: "Access past video recordings",
  //   icon: "Archive",
  // },

  // ============ OTHERS ============
  {
    id: "market-visits-report",
    name: "Market Visits Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/market-visit-report-dashboard/market-visit-report?orgId=1&from=now-30d&to=now&timezone=browser&var-vehicle=KHI-1234&refresh=1m&kiosk=true",
    description: "Track market visits",
    icon: "MapPin",
  },
  // {
  //   id: "maintenance-schedule",
  //   name: "Maintenance Schedule",
  //   category: "others",
  //   grafanaUrl: "",
  //   description: "Vehicle maintenance alerts and scheduling",
  //   icon: "Wrench",
  // },
  // {
  //   id: "driver-performance",
  //   name: "Driver Performance",
  //   category: "others",
  //   grafanaUrl: "",
  //   description: "Driver behavior analysis and scoring",
  //   icon: "User",
  // },
  {
    id: "origin-destination-report",
    name: "Origin To Destination Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/fence-wise-trip-report-dashboard/origin-to-destination-report?orgId=1&from=2025-11-15T20:26:17.760Z&to=2025-12-15T20:26:17.760Z&timezone=browser&var-vehicle=JW-3219&refresh=30m&kiosk=true",
    description: "Track trips between designated locations",
    icon: "Navigation",
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
export function getCategoryConfig(
  categoryId: ReportCategory
): CategoryConfig | undefined {
  return categories.find((cat) => cat.id === categoryId);
}
