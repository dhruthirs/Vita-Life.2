import React, { useState, useEffect } from "react";
import { Users, AlertCircle, Droplets, TrendingUp } from "lucide-react";
import { getAllDonors } from "../api/donorApi";

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getAllDonors();
      
      if (response.success) {
        setDonors(response.data);
        
        // Calculate blood inventory from actual donors
        const inv = {
          "O+": 0, "O-": 0, "A+": 0, "A-": 0,
          "B+": 0, "B-": 0, "AB+": 0, "AB-": 0,
        };
        
        response.data.forEach(donor => {
          inv[donor.bloodGroup] = (inv[donor.bloodGroup] || 0) + 1;
        });
        
        setInventory(inv);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Blood Bank Management System - Live Data</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100/90 backdrop-blur-sm border border-red-300 rounded-lg p-4">
          <p className="text-red-900 font-semibold">Error: {error}</p>
          <p className="text-red-800 text-sm mt-1">Make sure the backend server is running at http://localhost:5000</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="ml-4 text-gray-600">Loading dashboard data...</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border-l-4 border-blue-500 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Total Donors</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{donors.length}</p>
                </div>
                <Users className="text-blue-500" size={40} />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border-l-4 border-yellow-500 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Available Donors</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {donors.filter(d => d.isAvailable).length}
                  </p>
                </div>
                <AlertCircle className="text-yellow-500" size={40} />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border-l-4 border-red-500 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Blood Types</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {Object.values(inventory).filter(v => v > 0).length}
                  </p>
                </div>
                <Droplets className="text-red-500" size={40} />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border-l-4 border-green-500 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Last Updated</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">Just now</p>
                </div>
                <TrendingUp className="text-green-500" size={40} />
              </div>
            </div>
          </div>

          {/* Blood Inventory Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Blood Inventory</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(inventory).map(([bloodType, units]) => (
                <div
                  key={bloodType}
                  className={`rounded-lg p-4 text-center transition-all ${
                    units < 5
                      ? "bg-red-50 border-2 border-red-500"
                      : units < 15
                      ? "bg-yellow-50 border-2 border-yellow-400"
                      : "bg-green-50 border-2 border-green-400"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900">{bloodType}</p>
                  <p className="text-2xl font-bold text-gray-800 my-2">{units}</p>
                  <p className="text-xs text-gray-600">units</p>
                  {units < 5 && (
                    <span className="inline-block mt-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                      Low Stock
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Donors Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Donors</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Blood Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.slice(0, 5).map((donor) => (
                    <tr key={donor._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900">{donor.name}</td>
                      <td className="px-6 py-3">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{donor.city}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{donor.phone}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          donor.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {donor.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {donors.length === 0 && (
                <p className="text-center text-gray-500 py-8">No donors registered yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
