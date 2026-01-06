import React, { useState } from "react";
import { Menu, X, DropletIcon, Home, Search, FileText, Settings, LogOut, Map } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-red-900 via-red-800 to-rose-900 text-white transition-all duration-300 fixed left-0 top-16 h-[calc(100vh-4rem)] shadow-2xl`}
      >
        <nav className="p-4 space-y-2">
          <style>{`
            @keyframes slide-in {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .nav-item { animation: slide-in 0.3s ease-out forwards; }
            .nav-item:nth-child(2) { animation-delay: 0.05s; }
            .nav-item:nth-child(3) { animation-delay: 0.1s; }
            .nav-item:nth-child(4) { animation-delay: 0.15s; }
            .nav-item:nth-child(5) { animation-delay: 0.2s; }
            .nav-item:nth-child(6) { animation-delay: 0.25s; }
          `}</style>
          <Link
            to="/"
            className={`nav-item flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform duration-200 ${
              isActive("/")
                ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-red-900 shadow-lg scale-105"
                : "hover:bg-white/15 text-red-100 hover:translate-x-1"
            }`}
          >
            <Home size={20} />
            {sidebarOpen && <span className="font-semibold">Dashboard</span>}
          </Link>

          <Link
            to="/search-donor"
            className={`nav-item flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform duration-200 ${
              isActive("/search-donor")
                ? "bg-gradient-to-r from-cyan-400 to-blue-300 text-red-900 shadow-lg scale-105"
                : "hover:bg-white/15 text-red-100 hover:translate-x-1"
            }`}
          >
            <Search size={20} />
            {sidebarOpen && <span className="font-semibold">Search Donors</span>}
          </Link>

          <Link
            to="/donor-map"
            className={`nav-item flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform duration-200 ${
              isActive("/donor-map")
                ? "bg-gradient-to-r from-rose-400 to-pink-300 text-red-900 shadow-lg scale-105"
                : "hover:bg-white/15 text-red-100 hover:translate-x-1"
            }`}
          >
            <Map size={20} />
            {sidebarOpen && <span className="font-semibold">Donor Map</span>}
          </Link>

          <Link
            to="/register-donor"
            className={`nav-item flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform duration-200 ${
              isActive("/register-donor")
                ? "bg-gradient-to-r from-green-400 to-emerald-300 text-red-900 shadow-lg scale-105"
                : "hover:bg-white/15 text-red-100 hover:translate-x-1"
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span className="font-semibold">Register Donor</span>}
          </Link>

          <Link
            to="/reports"
            className={`nav-item flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform duration-200 ${
              isActive("/reports")
                ? "bg-gradient-to-r from-purple-400 to-indigo-300 text-red-900 shadow-lg scale-105"
                : "hover:bg-white/15 text-red-100 hover:translate-x-1"
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span className="font-semibold">Reports</span>}
          </Link>

          <Link
            to="/settings"
            className={`nav-item flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform duration-200 ${
              isActive("/settings")
                ? "bg-gradient-to-r from-orange-400 to-red-300 text-red-900 shadow-lg scale-105"
                : "hover:bg-white/15 text-red-100 hover:translate-x-1"
            }`}
          >
            <Settings size={20} />
            {sidebarOpen && <span className="font-semibold">Settings</span>}
          </Link>
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4 nav-item" style={{ animationDelay: '0.3s' }}>
          <button className="flex items-center space-x-4 w-full px-4 py-3 rounded-xl hover:bg-white/15 text-red-100 hover:text-white transition-all transform hover:scale-105 duration-200">
            <LogOut size={20} />
            {sidebarOpen && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-20 md:ml-64">
        {/* Topbar */}
        <header className="bg-gradient-to-r from-white via-gray-50 to-white border-b-2 border-gray-200 fixed top-0 left-0 right-0 z-50 ml-20 md:ml-64 shadow-md">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-red-100 rounded-lg transition-all transform hover:scale-110 duration-200 text-red-600"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center space-x-2 group">
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg group-hover:shadow-lg transition-all duration-200 transform group-hover:scale-110">
                  <DropletIcon className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-red-700 to-rose-600 bg-clip-text text-transparent">BloodBank</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 rounded-full flex items-center justify-center text-white font-black shadow-lg hover:shadow-xl transition-all transform hover:scale-110 cursor-pointer">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto mt-16 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
