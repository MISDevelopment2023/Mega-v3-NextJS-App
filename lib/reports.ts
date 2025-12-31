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
  {
    id: "cherat",
    label: "Cherat",
    icon: "Truck",
    color: "text-green-600",
    bgColor: "bg-green-50",
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
      "http://10.10.0.122:8080/d/speed-violations-dashboard/speed-violations-report?orgId=1&from=2025-11-10T11:04:41.170Z&to=2025-11-16T11:04:41.170Z&timezone=browser&var-vehicle=$__all&var-region=$__all&refresh=2h&kiosk=true",
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
      "http://10.10.0.122:8080/d/black-points-report-dashboard/black-points-report?orgId=1&from=now-30d&to=now&timezone=browser&var-report_type=$__all&var-corporate=$__all&var-vehicle=$__all&refresh=2h&kiosk=true",
    description: "Track blackpoints",
    icon: "AlertOctagon",
  },
  {
    id: "seatbelt-coneected-monitoring-report",
    name: "Seatbelt Connected Monitoring Report",
    category: "violations",
    grafanaUrl:
      "http://10.10.0.122:8080/d/seatbelt-monitoring-dashboard/seat-belt-connected-monitoring-report?orgId=1&from=now-30d&to=now-1d&timezone=browser&var-vehicle=$__all&refresh=1m&kiosk=true",
    description: "Monitor seatbelt connectivity status",
    icon: "Seatbelt",
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
    id: "hourly-mileage-report",
    name: "Hourly Mileage Report",
    category: "standard",
    grafanaUrl:
      "http://10.10.0.122:8080/d/hourly-mileage-dashboard/hourly-mileage-report?orgId=1&from=2025-11-23T19:00:00.000Z&to=2025-11-29T11:06:52.000Z&timezone=browser&var-vehicle=$__all&refresh=1m&kiosk=true",
    description: "Hourly distance traveled by vehicles",
    icon: "Clock",
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
  // ============ FUEL ============
  {
    id: "fuel-dashboard-report",
    name: "Fuel Dashboard",
    category: "fuel",
    grafanaUrl:
    "http://10.10.0.122:8080/d/fuel-dashboard-main-dashboard/fuel-dashboard-main?orgId=1&from=now-5m&to=now&timezone=browser&var-vehicle=$__all&refresh=2h&kiosk=true",
    description: "Comprehensive fuel monitoring dashboard",
    icon: "Fuel",
  },
  {
    id: "fuel-theft-report",
    name: "Fuel Theft Report",
    category: "fuel",
    grafanaUrl:
      "http://10.10.0.122:8080/d/fuel-theft-report-dashboard/fuel-theft-report?orgId=1&from=2025-11-09T19:00:00.000Z&to=2025-12-10T18:59:59.000Z&timezone=browser&var-vehicle=$__all&refresh=1d&kiosk=true",
    description: "Detect potential fuel theft incidents",
    icon: "AlertCircle",
  },
  {
    id: "fuel-consumption-report",
    name: "Fuel Consumption Report",
    category: "fuel",
    grafanaUrl: "http://10.10.0.122:8080/d/fuel-consumption-report-dashboard/fuel-consumption-report?orgId=1&from=2025-11-09T19:00:00.000Z&to=2025-12-10T18:59:59.000Z&timezone=browser&var-vehicle=$__all&refresh=1d&kiosk=true",
    description: "Monitor fuel usage across fleet",
    icon: "Droplet",
  },
  {
    id: "fuel-filling-report",
    name: "Fuel Filling Report",
    category: "fuel",
    grafanaUrl: "http://10.10.0.122:8080/d/fuel-filling-report-dashboard/fuel-filling-report?orgId=1&from=2025-11-09T19:00:00.000Z&to=2025-12-10T18:59:59.000Z&timezone=browser&var-vehicle=$__all&refresh=1d&kiosk=true",
    description: "Track fuel filling events",
    icon: "Plus",
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
    name: "Temperature Hourly Report Vertical",
    category: "temperature",
    grafanaUrl:
      "http://10.10.0.122:8080/d/temperature-hourly-dashboard/temperature-hourly-report?orgId=1&from=2025-11-29T19:00:00.000Z&to=2025-12-02T18:59:59.000Z&timezone=browser&var-vehicle=FSD-7890-Temperature&refresh=30m&kiosk=true",
    description: "Hourly temperature readings",
    icon: "Clock",
  },
  {
    id: "temperature-dashboard",
    name: "Temperature Dashboard",
    category: "temperature",
    grafanaUrl: "http://10.10.0.122:8080/d/temperature-dashboard-coldchainprimary/temperature-dashboard-coldchainprimary?orgId=1&from=now-24h&to=now&timezone=browser&var-vehicle=$__all&refresh=15m&var-status_filter=all%20:%20all%0Aloaded%20:%20loaded%0Aunloaded%20:%20unloaded%0Awithin%20:%20within%0Aoutside%20:%20outside%0AnotResponding%20:%20notResponding&kiosk=true",
    description: "Real-time temperature monitoring",
    icon: "Gauge",
  },

  // ============ VIDEO ============
  // {
  //   id: "live-video-monitoring",
  //   name: "Live Video Monitoring",
  //   category: "video",
  //   grafanaUrl: "",
  //   description: "Real-time video feeds from vehicles",
  //   icon: "Video",
  // },
  {
    id: "event-videos",
    name: "Event Videos",
    category: "video",
    grafanaUrl:
      "http://10.10.0.122:8080/d/mdvr-event-videos/event-videos?orgId=1&from=now-30d&to=now&timezone=browser&var-event_type=$__all&var-vehicle_no=$__all&refresh=30s&kiosk=true",
    description: "Video recordings of specific events",
    icon: "Film",
  },
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
  {
    id: "last-update-report",
    name: "Last Update Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/vehicle-last-update-dashboard/vehicle-last-update-report?orgId=1&from=now-90d&to=now&timezone=browser&var-vehicle=$__all&refresh=30s&kiosk=true",
    description: "Vehicle alerts",
    icon: "Settings",
  },
  {
    id: "last-position-report",
    name: "Last Position Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/last-position-report-dashboard/last-position-report?orgId=1&from=now-24h&to=now&timezone=browser&var-vehicle=$__all&refresh=1m&kiosk=true",
    description: "Most recent vehicle locations",
    icon: "Compass",
  },
  {
    id: "driver-observation-report",
    name: "Driving Observation Report",
    category: "others",
    grafanaUrl: "http://10.10.0.122:8080/d/driving-observation-dashboard/road-driving-assessment?orgId=1&from=now-30d&to=now&timezone=browser&refresh=1m&showCategory=Editable%20Data&var-driver_id=DRIVER-5678&kiosk=true",
    description: "Driver behavior analysis and scoring",
    icon: "User",
  },
  {
    id: "driver-profile",
    name: "Driver Profile Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/driver-profile/driver-profile?orgId=1&from=now-30d&to=now&timezone=browser&var-driver_id=DRV-001&refresh=30s&kiosk=true",
    description: "Comprehensive driver profiles",
    icon: "CircleUser",
  },
  {
    id: "origin-destination-report",
    name: "Origin To Destination Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/fence-wise-trip-report-dashboard/origin-to-destination-report?orgId=1&from=2025-11-15T20:26:17.760Z&to=2025-12-15T20:26:17.760Z&timezone=browser&var-vehicle=JW-3219&refresh=30m&kiosk=true",
    description: "Track trips between designated locations",
    icon: "Navigation",
  },
  {
    id: "idle-time-report",
    name: "Idling Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/idle-report-dashboard/idle-report?orgId=1&from=2025-11-14T12:35:46.952Z&to=2025-12-14T12:35:46.952Z&timezone=browser&var-vehicle=FSD-7890&var-min_idle_minutes=0&refresh=1m&kiosk=true",
    description: "Monitor vehicle idle durations",
    icon: "Clock",
  },
  {
    id: "not-responding-report",
    name: "Not Responding Report",
    category: "others",
    grafanaUrl:
      "http://10.10.0.122:8080/d/not-responding-report-dashboard/not-responding-report?orgId=1&from=2025-12-10T00:28:12.345Z&to=2025-12-12T13:00:44.016Z&timezone=browser&var-vehicle=$__all&var-min_hours=1&refresh=2h&kiosk=true",
    description: "Vehicles not responding for extended periods",
    icon: "CircleSlash2",
  },
  // =========== Trip ===========
  {
    id: "trip-sheet-uplload-report",
    name: "Trip Sheet Upload Report",
    category: "cherat",
    grafanaUrl:
      "http://10.10.0.122:8080/d/trip-sheet-uploads-dashboard/trip-sheet-uploads?orgId=1&from=now-30d&to=now&timezone=browser&var-user_id=MFN-20230704143527&refresh=10s0&kiosk=true",
    description: "Monitor trip sheet uploads by users",
    icon: "Upload",
  },
  {
    id: "trip-sheet-details-report",
    name: "Trip Sheet Details Report",
    category: "cherat",
    grafanaUrl:
      "http://10.10.0.122:8080/d/trip-sheet-details-dashboard/trip-sheet-details?orgId=1&from=now-30d&to=now&timezone=browser&var-sheet_id=SHEET-MFN-20230704143527-20251127-340761&refresh=10s0&kiosk=true",
    description: "Detailed trip sheet information and analysis",
    icon: "FileText",
  },
  {
    id: "trip-sheet-results-report",
    name: "Trip Sheet Results Report",
    category: "cherat",
    grafanaUrl:
      "http://10.10.0.122:8080/d/trip-sheet-results-dashboard/trip-sheet-results?orgId=1&from=now-90d&to=now&timezone=browser&var-sheet_id=SHEET-20251111&var-uploaded_on=&refresh=1m0&kiosk=true",
    description: "Results and summaries of trip sheets",
    icon: "BarChart3",
  },
  {
    id: "trip-search-engine-report",
    name: "Trip Search Engine Report",
    category: "cherat",
    grafanaUrl:
      "http://10.10.0.122:8080/d/trip-route-maps-dashboard/trip-route-maps?orgId=1&from=now-7d&to=now&timezone=browser&var-vehicle=YZA-890&var-trip_date=2025-12-09&var-selected_trip=TRIP-YZA-890-20251211-837&refresh=60s&kiosk=true",
    description: "Search and visualize trip routes",
    icon: "MapPin",
  },
];

/**
 * Get a report by ID
 */
export function getReportById(id: string): Report | undefined {
  // Handle Main Home reports
  if (id === "main-home") {
    return {
      id: "main-home",
      name: "Main Home",
      category: "others",
      grafanaUrl:
        "http://10.10.0.122:8080/d/mainhome-fleet-status/mainhome-fleet-status-dashboard?orgId=1&from=now-90d&to=now&timezone=browser&refresh=30s&kiosk=true",
      icon: "Home",
    };
  }
  if (id === "main-home-2") {
    return {
      id: "main-home-2",
      name: "Main Home 2",
      category: "others",
      grafanaUrl:
        "http://10.10.0.122:8080/d/mainhomenew-comprehensive/mainhomenew-comprehensive-dashboard?orgId=1&from=now-7d&to=now&timezone=browser&refresh=30s&kiosk=true",
      icon: "Home",
    };
  }
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
