"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { reports } from "@/lib/reports";
import { Report } from "@/types/report";
import {
  MapPin,
  Activity,
  Route,
  Wrench,
  BarChart3,
  FileText,
  Settings,
  Truck,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Activity,
  Route,
  Wrench,
  BarChart3,
  FileText,
  Settings,
  Truck,
};

interface SidebarProps {
  onReportSelect?: (report: Report) => void;
}

export default function Sidebar({ onReportSelect }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleReportClick = (report: Report) => {
    setSelectedReportId(report.id);
    if (onReportSelect) {
      onReportSelect(report);
    } else {
      router.push(`/?reportId=${report.id}`);
    }
  };

  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCurrentReportId(params.get("reportId"));
    }
  }, [pathname]);

  const getIcon = (iconName?: string) => {
    if (!iconName) return BarChart3;
    return iconMap[iconName] || BarChart3;
  };

  return (
    <aside className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 h-screen flex flex-col shadow-2xl transition-all duration-300 ${
      isMinimized ? 'w-16' : 'w-72'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        {!isMinimized && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg shadow-lg">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dashboard</h2>
              <p className="text-xs text-slate-400">Fleet Reports</p>
            </div>
          </div>
        )}
        {isMinimized && (
          <div className="mx-auto">
            <div className="p-2 bg-primary-600 rounded-lg shadow-lg">
              <Truck className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors duration-200"
          title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
        >
          {isMinimized ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {reports.map((report, index) => {
          const isActive =
            selectedReportId === report.id || currentReportId === report.id;
          const IconComponent = getIcon(report.icon);

          return (
            <button
              key={report.id}
              onClick={() => handleReportClick(report)}
              className={`w-full group relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
              title={isMinimized ? report.name : report.description}
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              <IconComponent
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                } ${isMinimized ? 'mx-auto' : 'mr-3'}`}
              />
              {!isMinimized && (
                <span className="flex-1 text-left font-medium truncate">
                  {report.name}
                </span>
              )}
              {isActive && !isMinimized && (
                <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {!isMinimized && (
        <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Reports</span>
            <span className="px-2.5 py-1 bg-primary-600/20 text-primary-400 rounded-full font-semibold">
              {reports.length}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
