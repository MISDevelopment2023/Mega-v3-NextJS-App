"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import {
  LogOut,
  Bell,
  User,
  Menu,
  Settings,
  ChevronDown,
  HelpCircle,
  Moon,
  Sun,
  RefreshCw,
} from "lucide-react";

interface TopbarProps {
  onLogout?: () => void;
  onMenuClick?: () => void;
  companyName?: string;
}

export default function Topbar({
  onLogout,
  onMenuClick,
  companyName = "Select a Report",
}: TopbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Logging out...");
    }
  };

  return (
    <header className="sticky top-0 z-30 transition-colors">
      {/* Top Bar - Company Name and Actions */}
      <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-700/80 grid grid-cols-3 items-center px-4 lg:px-6">
        {/* Left Section - Mobile Menu */}
        <div className="flex items-center justify-start">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center Section - Company Name */}
        <div className="flex justify-center items-center">
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight text-center">
            Megatech Fleet Management Portal
          </h1>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center justify-end gap-1">
          {/* Refresh Button */}
          <button
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Refresh data"
            title="Refresh"
          >
            <RefreshCw className="w-[18px] h-[18px]" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Toggle theme"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 dark:bg-rose-400 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Help */}
          <button
            className="hidden sm:flex p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Help"
            title="Help & Support"
          >
            <HelpCircle className="w-[18px] h-[18px]" />
          </button>

          {/* Settings */}
          <button
            className="hidden sm:flex p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                U
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                  User
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                  Administrator
                </p>
              </div>
              <ChevronDown
                className={`
                hidden sm:block w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200
                ${isUserMenuOpen ? "rotate-180" : ""}
              `}
              />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 z-50 overflow-hidden animate-fade-in">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Fleet Manager
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      admin@megatech.com
                    </p>
                  </div>
                  <div className="p-1.5">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Preferences</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg transition-colors">
                      <HelpCircle className="w-4 h-4" />
                      <span>Help Center</span>
                    </button>
                  </div>
                  <div className="p-1.5 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Report Name */}
      <div className="h-12 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-700/80 grid grid-cols-3 items-center px-4 lg:px-6">
        {/* Left Spacer */}
        <div></div>

        {/* Center Section - Report Name */}
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-3">
            {companyName && companyName !== "Select a Report" && (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                  Live Dashboard
                </span>
                <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
              </>
            )}
            <h2 className="text-base lg:text-lg font-semibold text-slate-700 dark:text-slate-200">
              {companyName}
            </h2>
          </div>
        </div>

        {/* Right Spacer */}
        <div></div>
      </div>
    </header>
  );
}
