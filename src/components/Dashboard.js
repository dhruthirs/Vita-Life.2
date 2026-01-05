import React, { useState, useEffect } from "react";
import { Users, AlertCircle, Droplets, TrendingUp, Heart, MapPin, FileText } from "lucide-react";
import { getAllDonors } from "../api/donorApi";
import { Link } from "react-router-dom";

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
    <div className="space-y-8">
      {/* Hero Home Section */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(31, 41, 55, 0.85) 0%, rgba(239, 68, 68, 0.75) 100%), url('https://images.unsplash.com/photo-1579154204601-01d5d6016da7?w=1200&h=400&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="p-12 md:p-16">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center space-x-3">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-4xl">🩸</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                Welcome to BloodBank
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/95 mb-8 font-semibold drop-shadow-md">
              Your trusted platform for blood donation management. Save lives, one donation at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/donor-map"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 drop-shadow-lg"
              >
                <MapPin size={20} />
                <span>Find Nearby Donors</span>
              </Link>
              <Link
                to="/request-blood"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 drop-shadow-lg"
              >
                <Heart size={20} />
                <span>Request Blood</span>
              </Link>
              <Link
                to="/register-donor"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 drop-shadow-lg"
              >
                <span>❤️</span>
                <span>Become a Donor</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="pt-6">
        <h2 className="text-4xl font-black text-white drop-shadow-lg mb-2">Dashboard Overview</h2>
        <p className="text-xl text-white/90 font-semibold drop-shadow-md">Real-time Blood Bank Statistics</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-800 rounded-2xl p-6 shadow-xl">
          <p className="text-white font-bold text-lg drop-shadow-sm">⚠️ Error: {error}</p>
          <p className="text-red-100 text-sm mt-2 drop-shadow-sm">Make sure the backend server is running at http://localhost:5000</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-white text-red-700 font-bold rounded-lg hover:bg-red-50 transition-all duration-200 drop-shadow-md"
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-red-600"></div>
          <p className="ml-6 text-white font-bold text-lg drop-shadow-sm">Loading dashboard data...</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 border-2 border-blue-400 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-wide drop-shadow-sm">Total Donors</p>
                  <p className="text-5xl font-black text-white mt-3 drop-shadow-lg">{donors.length}</p>
                </div>
                <Users className="text-blue-200" size={48} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-8 border-2 border-yellow-300 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-bold uppercase tracking-wide drop-shadow-sm">Available Donors</p>
                  <p className="text-5xl font-black text-white mt-3 drop-shadow-lg">
                    {donors.filter(d => d.isAvailable).length}
                  </p>
                </div>
                <Heart className="text-yellow-200" size={48} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl p-8 border-2 border-red-400 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-bold uppercase tracking-wide drop-shadow-sm">Blood Types</p>
                  <p className="text-5xl font-black text-white mt-3 drop-shadow-lg">
                    {Object.values(inventory).filter(v => v > 0).length}
                  </p>
                </div>
                <Droplets className="text-red-200" size={48} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl p-8 border-2 border-green-400 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-bold uppercase tracking-wide drop-shadow-sm">Last Updated</p>
                  <p className="text-3xl font-black text-white mt-3 drop-shadow-lg">Just now</p>
                </div>
                <TrendingUp className="text-green-200" size={48} />
              </div>
            </div>
          </div>

          {/* Blood Inventory Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border-2 border-slate-700">
            <h2 className="text-3xl font-black text-white mb-8 drop-shadow-lg">🩸 Blood Inventory Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(inventory).map(([bloodType, units]) => (
                <div
                  key={bloodType}
                  className={`rounded-xl p-4 text-center transition-all transform hover:scale-110 font-bold border-2 ${
                    units < 5
                      ? "bg-gradient-to-br from-red-600 to-red-700 border-red-400 text-white"
                      : units < 15
                      ? "bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-300 text-white"
                      : "bg-gradient-to-br from-green-600 to-green-700 border-green-400 text-white"
                  }`}
                >
                  <p className="text-sm font-black uppercase tracking-wide drop-shadow-sm">{bloodType}</p>
                  <p className="text-4xl font-black my-3 drop-shadow-lg">{units}</p>
                  <p className="text-xs font-bold drop-shadow-sm">units</p>
                  {units < 5 && (
                    <span className="inline-block mt-3 px-3 py-1 bg-white text-red-700 text-xs font-black rounded-lg drop-shadow-md">
                      🚨 LOW
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Donors Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border-2 border-slate-700">
            <h2 className="text-3xl font-black text-white mb-6 drop-shadow-lg">👥 Recent Donors</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-600 border-2 border-slate-600">
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase drop-shadow-sm">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase drop-shadow-sm">Blood</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase drop-shadow-sm">City</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase drop-shadow-sm">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase drop-shadow-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.slice(0, 5).map((donor) => (
                    <tr key={donor._id} className="border-b-2 border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-bold drop-shadow-sm">{donor.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-sm drop-shadow-md">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/80 font-semibold drop-shadow-sm">{donor.city}</td>
                      <td className="px-6 py-4 text-sm text-white/80 font-semibold drop-shadow-sm">{donor.phone}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-2 rounded-lg text-xs font-black inline-block drop-shadow-md ${
                          donor.isAvailable 
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                        }`}>
                          {donor.isAvailable ? '✓ Available' : '✗ Unavailable'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {donors.length === 0 && (
                <p className="text-center text-white/70 py-8 font-bold text-lg drop-shadow-sm">No donors registered yet. Be the first! ❤️</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
