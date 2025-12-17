"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Report } from "@/types/report";
import { getReportById } from "@/lib/reports";
import { TrendingUp, AlertCircle, Loader2, FileWarning, BarChart3 } from "lucide-react";

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
      const savedCollapsed = localStorage.getItem('sidebarCollapsed');
      if (savedCollapsed !== null) {
        setIsSidebarCollapsed(savedCollapsed === 'true');
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      localStorage.setItem('sidebarCollapsed', String(newValue));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
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
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
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

function GrafanaEmbed({ report, reportId }: GrafanaEmbedProps) {
  if (!report && !reportId) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] p-6">
        <div className="text-center max-w-lg animate-fade-in">
          {/* Decorative Background */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 via-primary-300 to-cyan-200 rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-2xl shadow-primary-500/30 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Welcome to Fleet Dashboard
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Select a report from the sidebar to view detailed fleet analytics, 
            monitoring dashboards, and real-time insights.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-primary-600">22</p>
              <p className="text-xs text-slate-500 font-medium">Reports</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">6</p>
              <p className="text-xs text-slate-500 font-medium">Categories</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-2xl font-bold text-amber-600">Live</p>
              <p className="text-xs text-slate-500 font-medium">Status</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-4 py-2.5 rounded-full">
            <FileWarning className="w-4 h-4" />
            <span>Choose a report from the sidebar to get started</span>
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
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Report Not Found
          </h3>
          <p className="text-slate-600">
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
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Configuration Required
          </h3>
          <p className="text-slate-600 mb-6">
            The Grafana embed URL for <strong className="text-slate-900">{report.name}</strong> has not
            been configured yet.
          </p>
          <div className="text-left p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-slate-700 mb-3 font-semibold">
              To configure this report:
            </p>
            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
              <li>
                Open{" "}
                <code className="bg-amber-100 px-2 py-0.5 rounded text-amber-800 font-mono text-xs">
                  lib/reports.ts
                </code>
              </li>
              <li>
                Find the report with ID:{" "}
                <code className="bg-amber-100 px-2 py-0.5 rounded text-amber-800 font-mono text-xs">
                  {report.id}
                </code>
              </li>
              <li>
                Add your Grafana embed URL to the{" "}
                <code className="bg-amber-100 px-2 py-0.5 rounded text-amber-800 font-mono text-xs">
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

  return (
    <div className="h-full w-full animate-fade-in">
      {/* Report Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{report.name}</h2>
            {report.description && (
              <p className="text-sm text-slate-500">{report.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Grafana Embed Container */}
      <div className="h-[calc(100%-73px)] relative">
        <iframe
          src={report.grafanaUrl}
          className="w-full h-full border-0"
          title={report.name}
          allow="fullscreen"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
        {/* Loading overlay */}
        <div
          className="absolute inset-0 bg-slate-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"
          id="loading-overlay"
        >
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
