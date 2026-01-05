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
// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Donor Schema
console.log('📋 Setting up Donor schema...');
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  city: String,
  phone: String,
  email: String,
  age: Number
});

const Donor = mongoose.model('Donor', donorSchema);

// Routes
console.log('🛣️  Setting up routes...');
app.get('/api/donors', async (req, res) => {
  console.log('📥 GET /api/donors request received');
  try {
    const donors = await Donor.find();
    console.log(`📤 Returning ${donors.length} donors`);
    res.json(donors);
  } catch (error) {
    console.error('❌ Error fetching donors:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/donors', async (req, res) => {
  console.log('📥 POST /api/donors request received');
  try {
    const donor = new Donor(req.body);
    await donor.save();
    console.log('✅ Donor saved:', donor.name);
    res.status(201).json(donor);
  } catch (error) {
    console.error('❌ Error saving donor:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/donors/search', async (req, res) => {
  console.log('📥 GET /api/donors/search request received');
  try {
    const { bloodGroup, city } = req.query;
    const query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.city = city;
    const donors = await Donor.find(query);
    console.log(`📤 Search returned ${donors.length} donors`);
    res.json(donors);
  } catch (error) {
    console.error('❌ Error searching donors:', error.message);
    res.status(500).json({ error: error.message });
  }
});

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
    process.exit(1);
  });

  // Keep process alive
  process.on('SIGINT', () => {
    console.log('🛑 Shutting down server...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}

console.log('🏁 Server setup complete');
