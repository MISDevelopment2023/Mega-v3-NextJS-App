"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Bell,
  User,
  Search,
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
  companyName = "UNI.OPERATION",
}: TopbarProps) {
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Logging out...");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-[180px] h-10">
            <Image
              src="/megatech-logo.png"
              alt="Megatech Trackers (Pvt) Ltd."
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-slate-200" />

        {/* Company Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200/80">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-slate-700 tracking-tight">
            {companyName}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search Bar - Desktop */}
        <div
          className={`
          hidden md:flex items-center relative transition-all duration-300
          ${isSearchFocused ? "w-80" : "w-64"}
        `}
        >
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 
                       transition-all bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-400"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <kbd className="absolute right-3 hidden lg:flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded-md">
            ⌘K
          </kbd>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Refresh Button */}
          <button
            className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Refresh data"
            title="Refresh"
          >
            <RefreshCw className="w-[18px] h-[18px]" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Help */}
          <button
            className="hidden sm:flex p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Help"
            title="Help & Support"
          >
            <HelpCircle className="w-[18px] h-[18px]" />
          </button>

          {/* Settings */}
          <button
            className="hidden sm:flex p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              U
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-700 leading-tight">
                User
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Administrator
              </p>
            </div>
            <ChevronDown
              className={`
              hidden sm:block w-4 h-4 text-slate-400 transition-transform duration-200
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
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 z-50 overflow-hidden animate-fade-in">
                <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-sm font-semibold text-slate-900">
                    Fleet Manager
                  </p>
                  <p className="text-xs text-slate-500">admin@megatech.com</p>
                </div>
                <div className="p-1.5">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Preferences</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help Center</span>
                  </button>
                </div>
                <div className="p-1.5 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
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
    </header>
  );
}
