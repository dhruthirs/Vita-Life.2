import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, MapPin, Droplet } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DonorMap = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: NYC
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [radiusFilter, setRadiusFilter] = useState(10);
  const [mapCenter, setMapCenter] = useState([userLocation.lat, userLocation.lng]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('Using default location:', error.message);
        }
      );
    }
  }, []);

  // Fetch nearby donors
  const fetchNearbyDonors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        radius: radiusFilter,
        ...(bloodGroupFilter && { bloodGroup: bloodGroupFilter })
      });

      const response = await fetch(
        `http://localhost:5000/api/donors/nearby?${params}`
      );
      const result = await response.json();

      if (result.success) {
        setDonors(result.data);
        setFilteredDonors(result.data);
      }
    } catch (error) {
      console.error('Error fetching nearby donors:', error);
      alert('Error fetching nearby donors. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Filter donors by blood group
  useEffect(() => {
    if (bloodGroupFilter) {
      setFilteredDonors(
        donors.filter(donor => donor.bloodGroup === bloodGroupFilter)
      );
    } else {
      setFilteredDonors(donors);
    }
  }, [bloodGroupFilter, donors]);

  // Get color based on blood group
  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'O+': '#FF6B6B', 'O-': '#FF8C8C',
      'A+': '#4ECDC4', 'A-': '#45A29E',
      'B+': '#FFD93D', 'B-': '#F4D35E',
      'AB+': '#6C5CE7', 'AB-': '#A29BFE'
    };
    return colors[bloodGroup] || '#999';
  };

  // Custom marker icon
  const createMarkerIcon = (bloodGroup) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${getBloodGroupColor(bloodGroup)};
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          ${bloodGroup}
        </div>
      `,
      className: 'custom-marker',
      iconSize: [35, 35],
      iconAnchor: [17, 35],
      popupAnchor: [0, -35]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white drop-shadow-lg flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          Find Nearby Donors
        </h1>
        <p className="text-lg text-white/90 font-semibold drop-shadow-md">
          Locate blood donors near you and filter by blood type
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 space-y-6 border-2 border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blood Group Filter */}
          <div>
            <label className="block text-sm font-bold text-white/90 mb-3 uppercase tracking-wide drop-shadow-sm">
              🩸 Blood Group
            </label>
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Radius Filter */}
          <div>
            <label className="block text-sm font-bold text-white/90 mb-3 uppercase tracking-wide drop-shadow-sm">
              📍 Search Radius: <span className="text-blue-400 text-base">{radiusFilter} km</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={radiusFilter}
              onChange={(e) => setRadiusFilter(e.target.value)}
              className="w-full h-3 bg-slate-700 border-2 border-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={fetchNearbyDonors}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg drop-shadow-md"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Searching...' : 'Search Donors'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      {filteredDonors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Donors Found</p>
            <p className="text-2xl font-bold text-blue-600">{filteredDonors.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Available Donors</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredDonors.filter(d => d.isAvailable).length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Search Radius</p>
            <p className="text-2xl font-bold text-purple-600">{radiusFilter} km</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '500px' }}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User Location Marker */}
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              <div className="text-center">
                <p className="font-bold">Your Location</p>
                <p className="text-sm text-gray-600">
                  {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Donor Markers */}
          {filteredDonors.map((donor) => (
            <Marker
              key={donor._id}
              position={[donor.latitude, donor.longitude]}
              icon={createMarkerIcon(donor.bloodGroup)}
            >
              <Popup>
                <div className="min-w-max">
                  <p className="font-bold text-lg flex items-center gap-2">
                    <Droplet
                      className="w-4 h-4"
                      style={{ color: getBloodGroupColor(donor.bloodGroup) }}
                    />
                    {donor.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Blood: <span className="font-bold">{donor.bloodGroup}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Distance: <span className="font-bold">
                      {donor.distance ? donor.distance.toFixed(2) : 'N/A'} km
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {donor.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    City: {donor.city}
                  </p>
                  <p className="text-sm mt-2">
                    Status:{' '}
                    <span
                      className={`font-bold ${
                        donor.isAvailable ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {donor.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </p>
                  {donor.rating && (
                    <p className="text-sm text-yellow-500 mt-1">
                      ⭐ {donor.rating}/5 ({donor.reviewCount} reviews)
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Donors List */}
      {filteredDonors.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Donors</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Blood Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Distance
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    City
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((donor) => (
                  <tr key={donor._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{donor.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-white font-bold text-sm"
                        style={{ backgroundColor: getBloodGroupColor(donor.bloodGroup) }}
                      >
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {donor.distance
                        ? `${donor.distance.toFixed(2)} km`
                        : 'N/A'}
                    </td>
                    <td className="py-3 px-4">{donor.city}</td>
                    <td className="py-3 px-4 text-blue-600">{donor.phone}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          donor.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {donor.isAvailable ? '✓ Available' : '✗ Not Available'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && donors.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <MapPin className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <p className="text-gray-700">
            Click "Search Donors" to find nearby blood donors
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorMap;
