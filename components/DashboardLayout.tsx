"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Report } from "@/types/report";
import { getReportById } from "@/lib/reports";
import { TrendingUp, AlertCircle, Loader2, FileWarning } from "lucide-react";

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
    }
  }, [defaultReportId]);

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

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-slate-100 overflow-hidden flex-col">
      <Topbar onLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onReportSelect={handleReportSelect} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">
            {children || (
              <GrafanaEmbed report={selectedReport} reportId={reportId} />
            )}
          </main>
        </div>
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
      <div className="flex items-center justify-center h-full min-h-[600px]">
        <div className="text-center max-w-md animate-fade-in">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-xl inline-block">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Dashboard
          </h3>
          <p className="text-gray-600 mb-6">
            Select a report from the sidebar to view detailed fleet analytics
            and monitoring dashboards
          </p>
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            <FileWarning className="w-4 h-4" />
            <span>Choose a report to get started</span>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px]">
        <div className="text-center max-w-md animate-fade-in">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-red-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl inline-block">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Report Not Found
          </h3>
          <p className="text-gray-600">
            The requested report could not be found. Please select a different
            report from the sidebar.
          </p>
        </div>
      </div>
    );
  }

  if (!report.grafanaUrl) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px]">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-yellow-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-xl inline-block">
              <FileWarning className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Configuration Required
          </h3>
          <p className="text-gray-600 mb-4">
            The Grafana embed URL for <strong>{report.name}</strong> has not
            been configured yet.
          </p>
          <div className="inline-block mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
            <p className="text-sm text-gray-700 mb-2 font-medium">
              To configure this report:
            </p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>
                Open{" "}
                <code className="bg-yellow-100 px-2 py-0.5 rounded">
                  lib/reports.ts
                </code>
              </li>
              <li>
                Find the report with ID:{" "}
                <code className="bg-yellow-100 px-2 py-0.5 rounded">
                  {report.id}
                </code>
              </li>
              <li>
                Add your Grafana embed URL to the{" "}
                <code className="bg-yellow-100 px-2 py-0.5 rounded">
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
      {/* Grafana Embed Container */}
      <div
        className="overflow-hidden"
        style={{ height: "100%" }}
      >
        <div className="h-full relative">
          <iframe
            src={report.grafanaUrl}
            className="w-full h-full border-0"
            title={report.name}
            allow="fullscreen"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            // Note: Editing restrictions come from Grafana Viewer role, not iframe sandbox
          />
          {/* Loading overlay (shows briefly) */}
          <div
            className="absolute inset-0 bg-gray-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"
            id="loading-overlay"
          >
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
