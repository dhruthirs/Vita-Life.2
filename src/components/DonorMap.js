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

const DonorMap = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [radius, setRadius] = useState(10);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
        },
        () => {
          // keep default location
        }
      );
    }
  }, []);

  // Fetch donors near the user from backend
  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        latitude: String(userLocation.lat),
        longitude: String(userLocation.lng),
        radius: String(radius || 10),
      });
      if (bloodGroup) params.append("bloodGroup", bloodGroup);

      const res = await fetch(`http://localhost:5000/api/donors/nearby?${params.toString()}`);
      const data = await res.json();

      if (data && (data.success || Array.isArray(data))) {
        const list = Array.isArray(data) ? data : data.data || [];
        setDonors(list);
        setFilteredDonors(list);
      }
    } catch (e) {
      console.error("Error fetching nearby donors", e);
    } finally {
      setLoading(false);
    }
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

        <button onClick={handleSearch} style={{ marginLeft: "10px" }} disabled={loading}>
          {loading ? "Searching..." : "Search Donors"}
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
