import React, { useState } from "react";
import { Menu, X, DropletIcon, Home, Search, FileText, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-red-900 to-red-800 text-white transition-all duration-300 fixed left-0 top-16 h-[calc(100vh-4rem)] shadow-lg`}
      >
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-red-700 text-white"
                : "hover:bg-red-700/50 text-red-100"
            }`}
          >
            <Home size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/search-donor"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
              isActive("/search-donor")
                ? "bg-red-700 text-white"
                : "hover:bg-red-700/50 text-red-100"
            }`}
          >
            <Search size={20} />
            {sidebarOpen && <span>Search Donors</span>}
          </Link>

          <Link
            to="/register-donor"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
              isActive("/register-donor")
                ? "bg-red-700 text-white"
                : "hover:bg-red-700/50 text-red-100"
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span>Register Donor</span>}
          </Link>

          <Link
            to="/reports"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
              isActive("/reports")
                ? "bg-red-700 text-white"
                : "hover:bg-red-700/50 text-red-100"
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span>Reports</span>}
          </Link>

          <Link
            to="/settings"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
              isActive("/settings")
                ? "bg-red-700 text-white"
                : "hover:bg-red-700/50 text-red-100"
            }`}
          >
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </Link>
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button className="flex items-center space-x-4 w-full px-4 py-3 rounded-lg hover:bg-red-700/50 text-red-100 transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-20 md:ml-64">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 ml-20 md:ml-64">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center space-x-2">
                <DropletIcon className="text-red-600" size={28} />
                <h1 className="text-2xl font-bold text-gray-800">BloodBank</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto mt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
