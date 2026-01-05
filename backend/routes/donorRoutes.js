const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Get all donors
router.get('/', async (req, res) => {
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

// Create new donor
router.post('/', async (req, res) => {
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

// Search donors
router.get('/search', async (req, res) => {
  console.log('📥 GET /api/donors/search request received');
  try {
    const { bloodGroup, city } = req.query;
    const query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.city = city;
    const donors = await Donor.find(query);
    console.log(`📤 Search returned ${donors.length} donors`);
    res.json({ success: true, data: donors });
  } catch (error) {
    console.error('❌ Error searching donors:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find nearby donors by coordinates
router.get('/nearby', async (req, res) => {
  console.log('📥 GET /api/donors/nearby - Finding nearby donors');
  try {
    const { latitude, longitude, radius = 10, bloodGroup } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ 
        success: false, 
        error: 'Latitude and longitude are required' 
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const radiusKm = parseFloat(radius);

    // Build query
    const query = {
      latitude: { $exists: true, $ne: null },
      longitude: { $exists: true, $ne: null }
    };
    
    if (bloodGroup) query.bloodGroup = bloodGroup;

    // Get all donors with coordinates
    const donors = await Donor.find(query);

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Filter donors within radius and add distance
    const nearbyDonors = donors
      .map(donor => {
        const distance = calculateDistance(lat, lng, donor.latitude, donor.longitude);
        return { ...donor.toObject(), distance };
      })
      .filter(donor => donor.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    console.log(`📤 Found ${nearbyDonors.length} donors within ${radiusKm}km`);
    res.json({ success: true, data: nearbyDonors });
  } catch (error) {
    console.error('❌ Error finding nearby donors:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
