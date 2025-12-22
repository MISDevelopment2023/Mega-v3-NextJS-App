"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { reports, categories, getReportsByCategory } from "@/lib/reports";
import { Report, ReportCategory, CategoryConfig } from "@/types/report";
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
  ChevronDown,
  AlertTriangle,
  LayoutDashboard,
  Fuel,
  Thermometer,
  Video,
  MoreHorizontal,
  Gauge,
  AlertOctagon,
  MapPinOff,
  Navigation,
  TrendingUp,
  PauseCircle,
  Droplet,
  Plus,
  ThermometerSun,
  Clock,
  Film,
  Archive,
  User,
  X,
  Menu,
  PanelLeftClose,
  PanelLeftOpen
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
  AlertTriangle,
  LayoutDashboard,
  Fuel,
  Thermometer,
  Video,
  MoreHorizontal,
  Gauge,
  AlertOctagon,
  MapPinOff,
  Navigation,
  TrendingUp,
  PauseCircle,
  Droplet,
  Plus,
  ThermometerSun,
  Clock,
  Film,
  Archive,
  User
};

interface SidebarProps {
  onReportSelect?: (report: Report) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ 
  onReportSelect, 
  isOpen = true, 
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<ReportCategory[]>(["standard"]);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Get reportId from URL search params - this automatically updates when URL changes
  const reportIdFromUrl = searchParams.get("reportId");

  useEffect(() => {
    // Update current report ID from URL
    setCurrentReportId(reportIdFromUrl);
    // Clear selectedReportId when URL changes to ensure only URL-based selection is used
    setSelectedReportId(null);
    
    // Auto-expand the category containing the current report
    if (reportIdFromUrl) {
      const report = reports.find(r => r.id === reportIdFromUrl);
      if (report) {
        setExpandedCategories(prev => {
          if (!prev.includes(report.category)) {
            return [...prev, report.category];
          }
          return prev;
        });
      }
    }
  }, [reportIdFromUrl]);

  const handleReportClick = (report: Report) => {
    // Update immediately for instant feedback
    setCurrentReportId(report.id);
    setSelectedReportId(report.id);
    
    if (onReportSelect) {
      onReportSelect(report);
    } else {
      router.push(`/?reportId=${report.id}`);
    }
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const toggleCategory = (categoryId: ReportCategory) => {
    // When collapsed, expand sidebar first
    if (isCollapsed && onToggleCollapse) {
      onToggleCollapse();
    }
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return BarChart3;
    return iconMap[iconName] || BarChart3;
  };

  const getCategoryIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || LayoutDashboard;
  };

  // Tooltip component for collapsed state
  const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => {
    if (!isCollapsed) return <>{children}</>;
    return (
      <div className="relative group/tooltip">
        {children}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-[100] shadow-lg">
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          h-screen
          bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-700/80
          flex flex-col
          transition-all duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-[72px]' : 'w-[280px]'}
          shadow-xl lg:shadow-none
        `}
      >
        {/* Sidebar Header */}
        <div className={`relative border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 ${isCollapsed ? 'px-3 py-4' : 'px-5 py-5'}`}>
          <div className={`flex flex-col ${isCollapsed ? 'items-center' : 'items-start'} gap-4`}>
            {/* Megatech Logo */}
            <div className={`relative ${isCollapsed ? 'w-12 h-12' : 'w-[220px] h-14'}`}>
              <Image
                src="/megatech-logo.png"
                alt="Megatech Trackers (Pvt) Ltd."
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            
            {/* Reports Icon & Heading */}
            {!isCollapsed && (
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 flex-shrink-0">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">Reports</h2>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Fleet Dashboard</p>
                </div>
              </div>
            )}
            
            {/* Collapsed State - Just show icon */}
            {isCollapsed && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Truck className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          
          {/* Mobile Close Button */}
          {!isCollapsed && (
            <button
              onClick={onClose}
              className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Collapse Toggle Button - Desktop Only */}
        <div className={`hidden lg:flex items-center border-b border-slate-100 dark:border-slate-700 ${isCollapsed ? 'justify-center p-2' : 'justify-end px-3 py-2'}`}>
          <button
            onClick={onToggleCollapse}
            className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto py-4 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          <div className="space-y-1">
            {categories.map((category, categoryIndex) => {
              const CategoryIcon = getCategoryIcon(category.icon);
              const isExpanded = expandedCategories.includes(category.id) && !isCollapsed;
              const categoryReports = getReportsByCategory(category.id);
              // Only use currentReportId from URL to ensure each tab/window shows correct selection
              const hasActiveReport = categoryReports.some(
                r => r.id === currentReportId
              );

              return (
                <div 
                  key={category.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${categoryIndex * 50}ms` }}
                >
                  {/* Category Header */}
                  <Tooltip label={category.label}>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`
                        w-full flex items-center rounded-xl
                        transition-all duration-200 group
                        ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2.5'}
                        ${hasActiveReport 
                          ? 'bg-primary-50/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                        }
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        transition-colors duration-200
                        ${hasActiveReport 
                          ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300' 
                          : `${category.bgColor} dark:bg-slate-800 ${category.color} dark:text-slate-300 group-hover:opacity-80`
                        }
                      `}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left text-sm font-semibold tracking-tight">
                            {category.label}
                          </span>
                          <div className={`
                            w-5 h-5 rounded-md flex items-center justify-center
                            transition-all duration-200
                            ${isExpanded ? 'bg-slate-100 dark:bg-slate-800 rotate-0' : 'bg-transparent -rotate-90'}
                          `}>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          </div>
                        </>
                      )}
                    </button>
                  </Tooltip>

                  {/* Category Reports - Only show when expanded and not collapsed */}
                  {!isCollapsed && (
                    <div className={`
                      overflow-hidden transition-all duration-300 ease-out
                      ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="pl-4 pr-1 py-1 space-y-0.5">
                        {categoryReports.map((report, reportIndex) => {
                          // Only use currentReportId from URL to ensure each tab/window shows correct selection
                          const isActive = currentReportId === report.id;
                          const ReportIcon = getIcon(report.icon);

                          return (
                            <button
                              key={report.id}
                              onClick={() => handleReportClick(report)}
                              className={`
                                w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                                transition-all duration-200
                                ${isActive
                                  ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                                }
                              `}
                              style={{
                                animationDelay: `${(categoryIndex * 50) + (reportIndex * 30)}ms`,
                              }}
                            >
                              {/* Left Border Indicator */}
                              <div className={`
                                absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full
                                transition-all duration-200
                                ${isActive ? 'bg-white/50' : 'bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-slate-600'}
                              `} />
                              
                              <ReportIcon className={`
                                w-4 h-4 flex-shrink-0 transition-transform duration-200
                                ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                              `} />
                              <span className="flex-1 text-left text-[13px] font-medium truncate">
                                {report.name}
                              </span>
                              {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className={`border-t border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" title="System Active" />
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">System Active</span>
              </div>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-semibold">
                {reports.length} Reports
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
