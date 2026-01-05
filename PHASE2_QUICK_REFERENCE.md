# Phase 2 Quick Reference Guide

## 🎯 What You Now Have

### 1. Map Feature (Find Nearby Donors)

**Path**: `/donor-map`

- See all donors on an interactive map
- Filter by blood type and radius (1-50 km)
- Click markers for donor details
- Table view with all results

**Key Functions**:

```javascript
getNearbyDonors(latitude, longitude, radius, bloodGroup);
```

### 2. Blood Request System

**Path**: `/request-blood`

- Submit blood requests with urgency levels
- Auto-detect your location
- Track hospital location
- Include medical conditions

**Key Functions**:

```javascript
createBloodRequest(requestData);
getAllBloodRequests();
getBloodRequestById(id);
updateRequestStatus(id, status);
rateBloodRequest(id, rating, feedback);
getUrgentRequests();
```

---

## 🔌 Backend New Endpoints

### Donors (Location-Based)

```
GET /api/donors/nearby?latitude=40.7128&longitude=-74.0060&radius=10&bloodGroup=O+
```

### Blood Requests

```
POST   /api/requests                  # Create request
GET    /api/requests                  # Get all
GET    /api/requests/:id              # Get one
PATCH  /api/requests/:id/status       # Update status
PATCH  /api/requests/:id/rate         # Rate request
DELETE /api/requests/:id              # Delete
GET    /api/requests/urgent           # Get critical requests
```

---

## 📦 Database Models

### Donor Schema (Updated)

```javascript
{
  name: String,
  bloodGroup: String,
  city: String,
  phone: String,
  email: String,
  age: Number,

  // NEW FIELDS
  latitude: Number,
  longitude: Number,
  address: String,
  donationHistory: [{date, quantity}],
  medicalConditions: [String],
  allergies: [String],
  rating: Number,
  reviewCount: Number,

  // Metadata
  createdAt: Date,
  updatedAt: Date
}
```

### BloodRequest Schema (New)

```javascript
{
  // Requester Info
  requesterName: String,
  requesterPhone: String,
  requesterEmail: String,

  // Request Details
  bloodGroup: String,
  quantity: Number,
  urgency: String, // Critical, High, Moderate, Low
  status: String, // Pending, Accepted, Completed, Cancelled

  // Location
  latitude: Number,
  longitude: Number,
  hospitalName: String,
  hospitalAddress: String,
  city: String,

  // Medical Info
  medicalCondition: String,

  // Fulfillment
  matchedDonors: [{donorId, donorName, distance, status}],
  fulfilledBy: [{donorId, donorName, quantityProvided, date}],

  // Feedback
  rating: Number,
  feedback: String,

  // Metadata
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ How to Use the Map

### Frontend Code Example:

```javascript
import { getNearbyDonors } from "./api/donorApi";

// Get nearby O+ donors within 15km
const donors = await getNearbyDonors(40.7128, -74.006, 15, "O+");

if (donors.success) {
  console.log(`Found ${donors.data.length} donors`);
  donors.data.forEach((donor) => {
    console.log(`${donor.name} - ${donor.distance.toFixed(2)}km away`);
  });
}
```

### Backend Calculation:

The API uses the **Haversine formula** to calculate distances:

- Takes into account Earth's curvature
- Accurate for distances in kilometers
- Returns results sorted by distance

---

## 💾 How to Add Test Data

### Add Donor with Coordinates:

```bash
curl -X POST http://localhost:5000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "bloodGroup": "O+",
    "city": "New York",
    "phone": "1234567890",
    "email": "john@example.com",
    "age": 30,
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 Main St, NYC"
  }'
```

### Submit Blood Request:

```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "requesterName": "Jane Smith",
    "requesterPhone": "9876543210",
    "requesterEmail": "jane@example.com",
    "bloodGroup": "O+",
    "quantity": 2,
    "urgency": "High",
    "hospitalName": "City Hospital",
    "city": "New York",
    "latitude": 40.7580,
    "longitude": -73.9855
  }'
```

---

## 🗺️ Map Features Detail

### Color Coding

- O+: Red (#FF6B6B)
- O-: Light Red (#FF8C8C)
- A+: Teal (#4ECDC4)
- A-: Green (#45A29E)
- B+: Yellow (#FFD93D)
- B-: Light Yellow (#F4D35E)
- AB+: Purple (#6C5CE7)
- AB-: Light Purple (#A29BFE)

### Distance Calculation

- Uses Haversine formula
- Accurate to ±0.5 km for typical distances
- Accounts for Earth's curvature

### Search Radius

- Minimum: 1 km
- Maximum: 50 km
- Adjustable with slider

---

## 🔒 Important Security Notes

1. **Location Data**: Store responsibly
2. **Phone Numbers**: Verify before sharing
3. **Medical Info**: Keep confidential
4. **Request Status**: Update appropriately

---

## 🐛 Troubleshooting

### Map Not Showing Donors

**Solution**: Ensure donors have latitude/longitude fields in database

### Location Access Denied

**Solution**: Check browser permissions for location access

### API Not Responding

**Solution**: Make sure backend is running on port 5000

### Map Not Loading

**Solution**: Check internet connection (needs tiles from OpenStreetMap)

---

## 📊 Next Phase Ideas

1. **SMS/Email Notifications** - Notify donors of nearby requests
2. **Analytics Dashboard** - Track blood demand patterns
3. **Hospital Integration** - Connect with local blood banks
4. **Donor Rewards** - Gamification system
5. **Admin Panel** - Manage requests and donors

---

## 🎓 Learning Resources

### Leaflet.js

- Documentation: https://leafletjs.com/
- React Integration: https://react-leaflet.js.org/

### Geolocation

- MDN Geolocation API: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- Haversine Formula: https://en.wikipedia.org/wiki/Haversine_formula

### MongoDB Geospatial

- MongoDB Geospatial Queries: https://docs.mongodb.com/manual/geospatial-queries/

---

## 📝 API Response Examples

### Get Nearby Donors Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "bloodGroup": "O+",
      "phone": "1234567890",
      "city": "New York",
      "latitude": 40.7128,
      "longitude": -74.006,
      "distance": 2.5,
      "isAvailable": true,
      "rating": 4.5,
      "reviewCount": 10
    }
  ]
}
```

### Create Blood Request Response

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "requesterName": "Jane Smith",
    "bloodGroup": "O+",
    "quantity": 2,
    "urgency": "High",
    "status": "Pending",
    "city": "New York",
    "latitude": 40.758,
    "longitude": -73.9855,
    "createdAt": "2026-01-05T10:30:00Z"
  }
}
```

---

## ✨ That's Phase 2! 🎉

You now have a fully functional map-based blood donor discovery system with blood request capabilities!

Start exploring at:

- `/donor-map` - Find nearby donors
- `/request-blood` - Request blood
