// src/components/DonorSearchPage.js
import React, { useState, useEffect } from "react";
import { Search, Phone } from "lucide-react";
import { getAllDonors } from "../api/donorApi"; // make sure this function exists

const DonorSearchPage = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  // Fetch all donors from backend on mount
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        const response = await getAllDonors();
        if (response.success) {
          setDonors(response.data);
          setFilteredDonors(response.data);
        } else {
          setError(response.message || "Failed to fetch donors");
        }
      } catch (err) {
        console.error("Error fetching donors:", err);
        setError("Backend not reachable. Make sure your server is running at http://localhost:5000");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // Filter donors whenever search or blood type changes
  useEffect(() => {
    let results = donors;

    if (selectedBloodType) {
      results = results.filter(d => d.bloodGroup === selectedBloodType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        d =>
          d.name.toLowerCase().includes(query) ||
          d.city.toLowerCase().includes(query) ||
          d.phone.includes(query)
      );
    }

    setFilteredDonors(results);
  }, [searchQuery, selectedBloodType, donors]);

  const handleContactDonor = donor => {
    alert(`Contact ${donor.name} at ${donor.phone}`);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-900">Search Donors</h1>
      <p className="text-gray-700 mt-1">Find donors by blood type or location</p>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
        {/* Blood Group */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
          <select
            value={selectedBloodType}
            onChange={e => setSelectedBloodType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">All Blood Types</option>
            {bloodTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Search Query */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location / Name / Phone
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Enter location, name, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSelectedBloodType("");
            setSearchQuery("");
          }}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Result Info */}
      <div className="text-sm text-gray-600">
        {loading ? (
          <span>Loading donors...</span>
        ) : error ? (
          <span className="text-red-600 font-semibold">{error}</span>
        ) : (
          <>Found <strong>{filteredDonors.length}</strong> donor(s)</>
        )}
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
          </div>
        ) : filteredDonors.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Blood Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Donation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map(donor => (
                <tr key={donor._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{donor.name}</td>
                  <td className="px-6 py-4">{donor.bloodGroup}</td>
                  <td className="px-6 py-4">{donor.age}</td>
                  <td className="px-6 py-4">{donor.city}</td>
                  <td className="px-6 py-4">{donor.phone}</td>
                  <td className="px-6 py-4">{donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : "Never"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      donor.isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {donor.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => handleContactDonor(donor)}
      className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
    >
      Contact
    </button>
    <a
      href={`tel:${donor.phone}`}
      className="flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
      title="Call donor"
    >
      <Phone size={16} />
    </a>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-600">No donors found.</div>
        )}
      </div>
    </div>
  );
};

export default DonorSearchPage;
