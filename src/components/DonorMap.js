import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Recenter map component
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);
  return null;
};

// Mock donor data
const mockDonors = [
  { _id: 1, name: "Alice", bloodGroup: "A+", city: "Bangalore", latitude: 12.9716, longitude: 77.5946, phone: "9999999991", isAvailable: true },
  { _id: 2, name: "Bob", bloodGroup: "B+", city: "Bangalore", latitude: 12.9720, longitude: 77.5950, phone: "9999999992", isAvailable: false },
  { _id: 3, name: "Charlie", bloodGroup: "O-", city: "Bangalore", latitude: 12.9750, longitude: 77.5930, phone: "9999999993", isAvailable: true },
  { _id: 4, name: "David", bloodGroup: "AB+", city: "Bangalore", latitude: 12.9740, longitude: 77.5960, phone: "9999999994", isAvailable: true },
  { _id: 5, name: "Eve", bloodGroup: "A-", city: "Bangalore", latitude: 12.9730, longitude: 77.5920, phone: "9999999995", isAvailable: false }
];

const DonorMap = () => {
  const [donors, setDonors] = useState(mockDonors); // Use mock data
  const [filteredDonors, setFilteredDonors] = useState(mockDonors);
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default Bangalore
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [radius, setRadius] = useState(10);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Filter donors based on blood group
  const handleSearch = () => {
    let results = donors;
    if (bloodGroup) {
      results = results.filter((d) => d.bloodGroup === bloodGroup);
    }
    setFilteredDonors(results);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* Filters */}
      <div style={{ padding: "10px" }}>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">All Blood Groups</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Radius km"
          style={{ marginLeft: "10px", width: "120px" }}
        />

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search Donors
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={15}
        style={{ width: "100%", height: "90%" }}
      >
        <RecenterMap center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* User Location */}
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Donor Markers */}
        {filteredDonors.map((donor) => (
          <Marker
            key={donor._id}
            position={[donor.latitude, donor.longitude]}
          >
            <Popup>
              <strong>{donor.name}</strong>
              <br />
              Blood Group: {donor.bloodGroup}
              <br />
              City: {donor.city}
              <br />
              Phone: {donor.phone}
              <br />
              Status: {donor.isAvailable ? "Available" : "Not Available"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DonorMap;
