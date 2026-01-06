console.log('🚀 Starting Blood Donation Backend...');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('📦 Loaded dependencies');

const app = express();
const PORT = 5000;

console.log('⚙️  Setting up middleware...');
// Middleware
app.use(cors());
app.use(express.json());

console.log('🗄️  Connecting to MongoDB...');
// MongoDB connection with better error handling
const mongoURI = process.env.USE_LOCAL_DB === 'true' 
  ? process.env.LOCAL_MONGO_URI 
  : process.env.MONGO_URI;

console.log(`📍 Attempting: ${mongoURI?.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);

mongoose.connect(mongoURI).then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('⚠️  Server continues running, but DB operations will fail.');
  console.log('💡 Fix: Whitelist IP in Atlas or set USE_LOCAL_DB=true in .env');
});

// Donor Schema
console.log('📋 Setting up Donor schema...');
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  city: String,
  state: String,
  phone: String,
  email: String,
  age: Number,
  latitude: Number,
  longitude: Number,
  isAvailable: Boolean,
  rating: Number,
  reviewCount: Number
});

const Donor = mongoose.model('Donor', donorSchema);

// Temporary in-memory storage (fallback when MongoDB is unavailable)
let tempDonors = [];
let isMongoConnected = false;

// Check MongoDB connection status
mongoose.connection.on('connected', () => {
  isMongoConnected = true;
  console.log('✅ MongoDB ready for operations');
});

mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
  console.log('⚠️  MongoDB disconnected - using in-memory storage');
});

// Routes
console.log('🛣️  Setting up routes...');
app.get('/api/donors', async (req, res) => {
  console.log('📥 GET /api/donors request received');
  try {
    if (isMongoConnected) {
      const donors = await Donor.find();
      console.log(`📤 Returning ${donors.length} donors from MongoDB`);
      res.json({ success: true, data: donors });
    } else {
      console.log(`📤 Returning ${tempDonors.length} donors from memory`);
      res.json({ success: true, data: tempDonors });
    }
  } catch (error) {
    console.error('❌ Error, using fallback:', error.message);
    res.json({ success: true, data: tempDonors });
  }
});

app.post('/api/donors', async (req, res) => {
  console.log('📥 POST /api/donors request received');
  console.log('📍 Incoming donor body:', req.body);

  try {
    if (isMongoConnected) {
      const donor = new Donor(req.body);
      await donor.save();
      console.log('✅ Donor saved to MongoDB:', donor.name);
      res.status(201).json(donor);
    } else {
      // Use in-memory storage
      const donor = {
        _id: Date.now().toString(),
        ...req.body,
        isAvailable: req.body.isAvailable !== false
      };
      tempDonors.push(donor);
      console.log('✅ Donor saved to memory:', donor.name);
      res.status(201).json(donor);
    }
  } catch (error) {
    // Fallback to memory storage
    const donor = {
      _id: Date.now().toString(),
      ...req.body,
      isAvailable: req.body.isAvailable !== false
    };
    tempDonors.push(donor);
    console.log('⚠️  Error with MongoDB, saved to memory:', donor.name);
    res.status(201).json(donor);
  }
});

app.get('/api/donors/search', async (req, res) => {
  console.log('📥 GET /api/donors/search request received');
  try {
    const { bloodGroup, city } = req.query;
    
    if (isMongoConnected) {
      const query = {};
      if (bloodGroup) query.bloodGroup = bloodGroup;
      if (city) query.city = city;
      const donors = await Donor.find(query);
      console.log(`📤 Search returned ${donors.length} donors from MongoDB`);
      res.json(donors);
    } else {
      // Search in-memory storage
      let filtered = tempDonors;
      if (bloodGroup) filtered = filtered.filter(d => d.bloodGroup === bloodGroup);
      if (city) filtered = filtered.filter(d => d.city === city);
      console.log(`📤 Search returned ${filtered.length} donors from memory`);
      res.json(filtered);
    }
  } catch (error) {
    console.error('❌ Error searching donors:', error.message);
    // Fallback to memory search
    let filtered = tempDonors;
    const { bloodGroup, city } = req.query;
    if (bloodGroup) filtered = filtered.filter(d => d.bloodGroup === bloodGroup);
    if (city) filtered = filtered.filter(d => d.city === city);
    res.json(filtered);
  }
});

// Nearby donors endpoint (for map feature)
app.get('/api/donors/nearby', async (req, res) => {
  console.log('📥 GET /api/donors/nearby request received');
  try {
    const { latitude, longitude, radius = 10, bloodGroup } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const radiusKm = parseFloat(radius);

    let query = { latitude: { $exists: true }, longitude: { $exists: true } };
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const allDonors = await Donor.find(query);

    // Calculate distance and filter by radius
    const nearbyDonors = allDonors
      .map(donor => {
        const distance = calculateDistance(lat, lng, donor.latitude, donor.longitude);
        return { ...donor.toObject(), distance };
      })
      .filter(donor => donor.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    console.log(`📤 Found ${nearbyDonors.length} nearby donors within ${radiusKm}km`);
    res.json({ success: true, data: nearbyDonors });
  } catch (error) {
    console.error('❌ Error fetching nearby donors:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Test route
app.get('/', (req, res) => {
  console.log('📥 GET / request received');
  res.send('Blood Donation API is running!');
});

// Start server
console.log(`🌐 Attempting to start server on port ${PORT}...`);
try {
  const server = app.listen(PORT, () => {
    console.log(`🎉 SUCCESS: Server running on http://localhost:${PORT}`);
    console.log(`🔗 API endpoints:`);
    console.log(`   GET  /api/donors`);
    console.log(`   POST /api/donors`);
    console.log(`   GET  /api/donors/search?bloodGroup=A+&city=City`);
  });

  server.on('error', (err) => {
    console.error('❌ Server error:', err.message);
  });

  // Only handle SIGTERM, keep SIGINT for manual termination
  const shutdown = () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
      console.log('✅ Server closed');
      mongoose.connection.close(false, () => {
        console.log('✅ MongoDB connection closed');
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', shutdown);

} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}

console.log('🏁 Server setup complete');
