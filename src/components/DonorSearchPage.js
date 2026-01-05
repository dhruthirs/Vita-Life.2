import React, { useState, useEffect } from "react";
import { Search, Phone, Mail } from "lucide-react";
import { searchDonors } from "../api/donorApi";

const DonorSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  // Perform search when filters change
  useEffect(() => {
    performSearch();
  }, [selectedBloodType, searchQuery]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchDonors(selectedBloodType, searchQuery);

      if (response.success) {
        // Filter results based on search query (name, location, phone)
        let results = response.data;
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          results = results.filter(donor =>
            donor.name.toLowerCase().includes(query) ||
            donor.city.toLowerCase().includes(query) ||
            donor.phone.includes(query)
          );
        }

        setFilteredDonors(results);
      } else {
        setError(response.message || 'Failed to search donors');
      }
    } catch (err) {
      console.error('Error searching donors:', err);
      setError('Backend server is not running. Make sure to start it at http://localhost:5000');
      setFilteredDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleContactDonor = (donor) => {
    // Replace with your actual contact logic
    alert(`Contact ${donor.name} at ${donor.phone}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white drop-shadow-lg flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
            <Search className="w-6 h-6 text-white" />
          </div>
          Search Donors
        </h1>
        <p className="text-lg text-white/90 font-semibold drop-shadow-md">
          Find donors by blood type or location
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 space-y-6 md:flex md:items-end md:space-y-0 md:space-x-4 border-2 border-slate-700">
        {/* Blood Type Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-white mb-2">
            Blood Group
          </label>
          <select
            value={selectedBloodType}
            onChange={(e) => setSelectedBloodType(e.target.value)}
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="">All Blood Types</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location/Search Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-white mb-2">
            Location / Name / Phone
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-purple-400" size={18} />
            <input
              type="text"
              placeholder="Enter location, name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedBloodType("");
          }}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {error ? (
          <span className="text-red-600 font-semibold">{error}</span>
        ) : loading ? (
          <span className="text-gray-600">Searching...</span>
        ) : (
          <>
            Found <span className="font-bold text-gray-900">{filteredDonors.length}</span> donor(s)
          </>
        )}
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
          </div>
        ) : filteredDonors.length > 0 ? (
          <div className="overflow-x-auto">
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
                {filteredDonors.map((donor) => (
                  <tr key={donor._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{donor.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{donor.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{donor.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{donor.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {donor.lastDonationDate 
                        ? new Date(donor.lastDonationDate).toLocaleDateString() 
                        : "Never"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        donor.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {donor.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleContactDonor(donor)}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Contact
                        </button>
                        <a
                          href={`tel:${donor.phone}`}
                          className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
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
          </div>
        ) : (
          <div className="p-12 text-center">
            <Search className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600 font-medium">
              {error ? `Error: ${error}` : 'No donors found matching your criteria'}
            </p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorSearchPage;
