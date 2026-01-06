import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, MapPin, Droplet, Navigation, Users, Heart } from 'lucide-react';
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
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [radiusFilter, setRadiusFilter] = useState(10);
  const [mapCenter, setMapCenter] = useState([userLocation.lat, userLocation.lng]);
  const [searched, setSearched] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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

  const fetchNearbyDonors = async () => {
    setLoading(true);
    setSearched(true);
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

  useEffect(() => {
    if (bloodGroupFilter) {
      setFilteredDonors(
        donors.filter(donor => donor.bloodGroup === bloodGroupFilter)
      );
    } else {
      setFilteredDonors(donors);
    }
  }, [bloodGroupFilter, donors]);

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'O+': '#DC2626', 'O-': '#EF4444',
      'A+': '#06B6D4', 'A-': '#0891B2',
      'B+': '#EAB308', 'B-': '#FACC15',
      'AB+': '#8B5CF6', 'AB-': '#A78BFA'
    };
    return colors[bloodGroup] || '#6B7280';
  };

  const createMarkerIcon = (bloodGroup) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${getBloodGroupColor(bloodGroup)};
          border: 3px solid white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        ">
          ${bloodGroup}
        </div>
      `,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                Find Nearby Donors
              </h1>
              <p className="text-lg text-slate-600 mt-2 font-medium">
                Locate blood donors near you in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Search Controls */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blood Group Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                <Droplet className="inline w-4 h-4 mr-2 text-red-500" />
                Blood Group
              </label>
              <select
                value={bloodGroupFilter}
                onChange={(e) => setBloodGroupFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold transition-all"
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
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                <Navigation className="inline w-4 h-4 mr-2 text-blue-500" />
                Search Radius: <span className="text-red-600 font-black text-base">{radiusFilter} km</span>
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={radiusFilter}
                onChange={(e) => setRadiusFilter(e.target.value)}
                className="w-full h-3 bg-slate-300 border-2 border-slate-400 rounded-full appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>1 km</span>
                <span>50 km</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={fetchNearbyDonors}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Search Donors'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {searched && filteredDonors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Donors Found</p>
                  <p className="text-4xl font-black text-blue-600 mt-2">{filteredDonors.length}</p>
                </div>
                <Users className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Available Now</p>
                  <p className="text-4xl font-black text-green-600 mt-2">
                    {filteredDonors.filter(d => d.isAvailable).length}
                  </p>
                </div>
                <Heart className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Search Radius</p>
                  <p className="text-4xl font-black text-purple-600 mt-2">{radiusFilter} km</p>
                </div>
                <MapPin className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border border-slate-200" style={{ height: '600px' }}>
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div className="text-center font-semibold">
                  <p className="text-slate-900">📍 Your Location</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            {filteredDonors.map((donor) => (
              <Marker
                key={donor._id}
                position={[donor.latitude, donor.longitude]}
                icon={createMarkerIcon(donor.bloodGroup)}
              >
                <Popup>
                  <div className="min-w-max p-2">
                    <p className="font-bold text-lg text-slate-900 flex items-center gap-2">
                      <Droplet
                        className="w-5 h-5"
                        style={{ color: getBloodGroupColor(donor.bloodGroup) }}
                      />
                      {donor.name}
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="text-slate-700">
                        🩸 <span className="font-bold">{donor.bloodGroup}</span>
                      </p>
                      <p className="text-slate-600">
                        📍 {donor.distance ? donor.distance.toFixed(2) : 'N/A'} km away
                      </p>
                      <p className="text-slate-600">
                        📞 {donor.phone}
                      </p>
                      <p className="text-slate-600">
                        🏘️ {donor.city}
                      </p>
                      <p className="mt-2">
                        Status:{' '}
                        <span
                          className={`font-bold ${
                            donor.isAvailable ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {donor.isAvailable ? '✓ Available' : '✗ Not Available'}
                        </span>
                      </p>
                      {donor.rating && (
                        <p className="text-yellow-500 mt-1 font-semibold">
                          ⭐ {donor.rating}/5 ({donor.reviewCount} reviews)
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Donors Table */}
        {searched && filteredDonors.length > 0 && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-8 border-b-2 border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900">Nearby Donors</h2>
              <p className="text-slate-600 mt-1">Complete list of available donors in your area</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-300">
                    <th className="text-left py-4 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">
                      Blood Type
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">
                      Distance
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">
                      City
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">
                      Phone
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDonors.map((donor) => (
                    <tr key={donor._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900">{donor.name}</td>
                      <td className="py-4 px-6">
                        <span
                          className="px-4 py-2 rounded-full text-white font-bold text-sm shadow-md"
                          style={{ backgroundColor: getBloodGroupColor(donor.bloodGroup) }}
                        >
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-700">
                        {donor.distance
                          ? `${donor.distance.toFixed(2)} km`
                          : 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-slate-700">{donor.city}</td>
                      <td className="py-4 px-6 text-blue-600 font-semibold">{donor.phone}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold inline-block ${
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

        {/* Empty State */}
        {searched && donors.length === 0 && !loading && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-3xl p-12 text-center shadow-lg">
            <MapPin className="w-20 h-20 text-blue-400 mx-auto mb-4" />
            <p className="text-xl font-bold text-slate-800 mb-2">
              No Donors Found
            </p>
            <p className="text-slate-600">
              Try adjusting your search radius or blood group filter
            </p>
          </div>
        )}

        {/* Initial State */}
        {!searched && (
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-3xl p-12 text-center shadow-lg">
            <Heart className="w-20 h-20 text-red-400 mx-auto mb-4" />
            <p className="text-2xl font-bold text-slate-900 mb-2">
              Ready to Find Donors?
            </p>
            <p className="text-slate-700 text-lg">
              Click "Search Donors" to discover blood donors near you
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorMap;
