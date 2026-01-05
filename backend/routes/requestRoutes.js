const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const Donor = require('../models/Donor');

// Create a new blood request
router.post('/', async (req, res) => {
  console.log('📥 POST /api/requests - Creating new blood request');
  try {
    const request = new BloodRequest(req.body);
    await request.save();
    console.log('✅ Blood request created:', request._id);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('❌ Error creating request:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all blood requests
router.get('/', async (req, res) => {
  console.log('📥 GET /api/requests - Fetching all requests');
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    console.log(`📤 Returning ${requests.length} requests`);
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('❌ Error fetching requests:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get request by ID
router.get('/:id', async (req, res) => {
  console.log(`📥 GET /api/requests/${req.params.id}`);
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }
    res.json({ success: true, data: request });
  } catch (error) {
    console.error('❌ Error fetching request:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update request status
router.patch('/:id/status', async (req, res) => {
  console.log(`📥 PATCH /api/requests/${req.params.id}/status`);
  try {
    const { status } = req.body;
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    console.log('✅ Request status updated:', status);
    res.json({ success: true, data: request });
  } catch (error) {
    console.error('❌ Error updating request:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Add rating and feedback
router.patch('/:id/rate', async (req, res) => {
  console.log(`📥 PATCH /api/requests/${req.params.id}/rate`);
  try {
    const { rating, feedback } = req.body;
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { rating, feedback },
      { new: true }
    );
    console.log('✅ Request rated:', rating);
    res.json({ success: true, data: request });
  } catch (error) {
    console.error('❌ Error rating request:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete request
router.delete('/:id', async (req, res) => {
  console.log(`📥 DELETE /api/requests/${req.params.id}`);
  try {
    await BloodRequest.findByIdAndDelete(req.params.id);
    console.log('✅ Request deleted');
    res.json({ success: true, message: 'Request deleted' });
  } catch (error) {
    console.error('❌ Error deleting request:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get requests by status
router.get('/status/:status', async (req, res) => {
  console.log(`📥 GET /api/requests/status/${req.params.status}`);
  try {
    const requests = await BloodRequest.find({ status: req.params.status }).sort({ createdAt: -1 });
    console.log(`📤 Returning ${requests.length} requests with status: ${req.params.status}`);
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('❌ Error fetching requests:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get critical/urgent requests
router.get('/urgent', async (req, res) => {
  console.log('📥 GET /api/requests/urgent - Fetching urgent requests');
  try {
    const requests = await BloodRequest.find({
      urgency: { $in: ['Critical', 'High'] },
      status: 'Pending'
    }).sort({ createdAt: -1 });
    console.log(`📤 Returning ${requests.length} urgent requests`);
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('❌ Error fetching urgent requests:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
