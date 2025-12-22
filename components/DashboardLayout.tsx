"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Report } from "@/types/report";
import { getReportById } from "@/lib/reports";
import { useTheme } from "@/contexts/ThemeContext";
import {
  TrendingUp,
  AlertCircle,
  Loader2,
  FileWarning,
  BarChart3,
} from "lucide-react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  defaultReportId?: string;
}

export default function DashboardLayout({
  children,
  defaultReportId,
}: DashboardLayoutProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportId, setReportId] = useState<string | null>(
    defaultReportId || null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlReportId = params.get("reportId") || defaultReportId;
      if (urlReportId) {
        setReportId(urlReportId);
        const report = getReportById(urlReportId);
        if (report) {
          setSelectedReport(report);
        }
      }

      // Restore collapsed state from localStorage
      const savedCollapsed = localStorage.getItem("sidebarCollapsed");
      if (savedCollapsed !== null) {
        setIsSidebarCollapsed(savedCollapsed === "true");
      }
    }
  }, [defaultReportId]);

  // Close sidebar on window resize (when going to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
    setReportId(report.id);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("reportId", report.id);
      window.history.pushState({}, "", url);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleToggleSidebarCollapse = () => {
    const newValue = !isSidebarCollapsed;
    setIsSidebarCollapsed(newValue);
    // Persist collapsed state to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", String(newValue));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors">
      {/* Sidebar */}
      <Sidebar
        onReportSelect={handleReportSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebarCollapse}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <Topbar
          onLogout={handleLogout}
          onMenuClick={() => setIsSidebarOpen(true)}
          companyName={selectedReport?.name || "Select a report"}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
          {children || (
            <GrafanaEmbed report={selectedReport} reportId={reportId} />
          )}
        </main>
      </div>
    </div>
  );
}

interface GrafanaEmbedProps {
  report: Report | null;
  reportId: string | null;
}

/**
 * Utility function to add or update theme parameter in Grafana URL
 */
function addThemeToGrafanaUrl(url: string, theme: "light" | "dark"): string {
  if (!url) return url;

  try {
    const urlObj = new URL(url);
    // Remove existing theme parameter if present
    urlObj.searchParams.delete("theme");
    // Add the new theme parameter
    urlObj.searchParams.set("theme", theme);
    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, try simple string replacement
    // Remove existing theme parameter
    let modifiedUrl = url.replace(/[?&]theme=(light|dark)/g, "");
    // Add new theme parameter
    const separator = modifiedUrl.includes("?") ? "&" : "?";
    return `${modifiedUrl}${separator}theme=${theme}`;
  }
}

function GrafanaEmbed({ report, reportId }: GrafanaEmbedProps) {
  const { theme } = useTheme();
  if (!report && !reportId) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] p-6">
        <div className="text-center max-w-2xl animate-fade-in">
          {/* Decorative Background */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 via-primary-300 to-cyan-200 rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <div className="relative">
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-2xl shadow-primary-500/30 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <BarChart3 className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
            Select a Report
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto">
            Choose a report from the sidebar to view detailed fleet analytics,
            monitoring dashboards, and real-time insights.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                22
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Reports
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                6
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Categories
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                Live
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Status
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 text-base text-slate-600 dark:text-slate-300 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800 px-6 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <FileWarning className="w-5 h-5 text-primary-500 dark:text-primary-400" />
            <span className="font-medium">
              Choose a report from the sidebar to get started
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] p-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-rose-200 rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-2xl shadow-rose-500/30 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Report Not Found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            The requested report could not be found. Please select a different
            report from the sidebar.
          </p>
        </div>
      </div>
    );
  }

  if (!report.grafanaUrl) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] p-6">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-amber-200 rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center justify-center">
              <FileWarning className="w-10 h-10 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Configuration Required
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The Grafana embed URL for{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {report.name}
            </strong>{" "}
            has not been configured yet.
          </p>
          <div className="text-left p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 font-semibold">
              To configure this report:
            </p>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-decimal list-inside">
              <li>
                Open{" "}
                <code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 font-mono text-xs">
                  lib/reports.ts
                </code>
              </li>
              <li>
                Find the report with ID:{" "}
                <code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 font-mono text-xs">
                  {report.id}
                </code>
              </li>
              <li>
                Add your Grafana embed URL to the{" "}
                <code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 font-mono text-xs">
                  grafanaUrl
                </code>{" "}
                field
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Generate theme-aware Grafana URL
  const themedGrafanaUrl = useMemo(() => {
    if (!report?.grafanaUrl) return "";
    return addThemeToGrafanaUrl(report.grafanaUrl, theme);
  }, [report?.grafanaUrl, theme]);

  return (
    <div className="h-full w-full animate-fade-in">
      {/* Grafana Embed Container */}
      <div className="h-full relative">
        <iframe
          key={`${report.id}-${theme}`} // Force reload when theme changes
          src={themedGrafanaUrl}
          className="w-full h-full border-0"
          title={report.name}
          allow="fullscreen"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
        {/* Loading overlay */}
        <div
          className="absolute inset-0 bg-slate-50 dark:bg-slate-900 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"
          id="loading-overlay"
        >
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary-500 dark:text-primary-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
