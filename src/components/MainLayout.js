import React, { useState } from "react";
import { Menu, X, DropletIcon, Home, Search, FileText, Settings, LogOut, MapPin, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white transition-all duration-300 fixed left-0 top-16 h-[calc(100vh-4rem)] shadow-2xl overflow-y-auto z-40 border-r border-slate-700`}
      >
        <nav className="p-4 space-y-1">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive("/dashboard")
                ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/50"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Home size={20} className={isActive("/dashboard") ? "" : "group-hover:scale-110 transition-transform"} />
            {sidebarOpen && <span className="font-bold tracking-wide">{isActive("/dashboard") ? "Dashboard" : "Dashboard"}</span>}
          </Link>

          {/* Phase 2 Features Section */}
          <div className={`${sidebarOpen ? "pt-6 pb-3 border-t border-slate-700/50" : "pt-3 pb-2"}`}>
            {sidebarOpen && (
              <p className="text-xs text-slate-500 px-4 font-black mb-3 uppercase tracking-widest">
                ✨ New Features
              </p>
            )}
          </div>

          <Link
            to="/donor-map"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive("/donor-map")
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/50"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <MapPin size={20} className={isActive("/donor-map") ? "" : "group-hover:scale-110 transition-transform"} />
            {sidebarOpen && <span className="font-bold tracking-wide">Find Nearby Donors</span>}
          </Link>

          <Link
            to="/request-blood"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive("/request-blood")
                ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-600/50"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Heart size={20} className={isActive("/request-blood") ? "" : "group-hover:scale-110 transition-transform"} />
            {sidebarOpen && <span className="font-bold tracking-wide">Request Blood</span>}
          </Link>

          {/* Core Features Section */}
          <div className={`${sidebarOpen ? "pt-6 pb-3 border-t border-slate-700/50" : "pt-3 pb-2"}`}>
            {sidebarOpen && (
              <p className="text-xs text-slate-500 px-4 font-black mb-3 uppercase tracking-widest">
                Core Features
              </p>
            )}
          </div>

          <Link
            to="/search-donor"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive("/search-donor")
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/50"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Search size={20} className={isActive("/search-donor") ? "" : "group-hover:scale-110 transition-transform"} />
            {sidebarOpen && <span className="font-bold tracking-wide">Search Donors</span>}
          </Link>

          <Link
            to="/register-donor"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive("/register-donor")
                ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-600/50"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <FileText size={20} className={isActive("/register-donor") ? "" : "group-hover:scale-110 transition-transform"} />
            {sidebarOpen && <span className="font-bold tracking-wide">Register Donor</span>}
          </Link>

          <Link
            to="/settings"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive("/settings")
                ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-600/50"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Settings size={20} className={isActive("/settings") ? "" : "group-hover:scale-110 transition-transform"} />
            {sidebarOpen && <span className="font-bold tracking-wide">Settings</span>}
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="flex items-center space-x-3 w-full px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 font-bold group">
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-20 md:ml-64 w-full">
        {/* Topbar */}
        <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 fixed top-0 left-20 md:left-64 right-0 z-50 shadow-xl backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center justify-between h-16 px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg blur-lg opacity-50"></div>
                  <div className="relative w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                    <DropletIcon className="text-white" size={20} />
                  </div>
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 via-red-400 to-pink-500 bg-clip-text text-transparent">
                  BloodBank
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-300">Admin User</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto mt-16 p-6 md:p-8 w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
