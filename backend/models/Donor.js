const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 18,
    max: 65
  },
  lastDonation: {
    type: Date
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  // Geolocation fields
  latitude: {
    type: Number,
    required: false
  },
  longitude: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false,
    trim: true
  },
  // Donation history
  donationHistory: [{
    date: Date,
    quantity: Number
  }],
  // Medical information
  medicalConditions: [String],
  allergies: [String],
  // Engagement metrics
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for geospatial queries
donorSchema.index({ latitude: 1, longitude: 1 });

module.exports = mongoose.model('Donor', donorSchema);