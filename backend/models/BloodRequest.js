const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  // Requester information
  requesterName: {
    type: String,
    required: true,
    trim: true
  },
  requesterPhone: {
    type: String,
    required: true,
    trim: true
  },
  requesterEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  
  // Blood requirement
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  
  // Location
  latitude: {
    type: Number,
    required: false
  },
  longitude: {
    type: Number,
    required: false
  },
  hospitalName: {
    type: String,
    required: false,
    trim: true
  },
  hospitalAddress: {
    type: String,
    required: false,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  
  // Request details
  urgency: {
    type: String,
    enum: ['Critical', 'High', 'Moderate', 'Low'],
    default: 'Moderate'
  },
  medicalCondition: {
    type: String,
    required: false,
    trim: true
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  
  // Matched donors
  matchedDonors: [{
    donorId: mongoose.Schema.Types.ObjectId,
    donorName: String,
    donorPhone: String,
    distance: Number,
    status: {
      type: String,
      enum: ['Notified', 'Accepted', 'Rejected'],
      default: 'Notified'
    }
  }],
  
  // Fulfillment
  fulfilledBy: [{
    donorId: mongoose.Schema.Types.ObjectId,
    donorName: String,
    quantityProvided: Number,
    donationDate: Date
  }],
  
  // Metrics
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  feedback: String
}, {
  timestamps: true
});

// Index for location-based queries
bloodRequestSchema.index({ latitude: 1, longitude: 1 });
bloodRequestSchema.index({ bloodGroup: 1, status: 1 });
bloodRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
