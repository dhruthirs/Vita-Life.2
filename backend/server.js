console.log('🚀 Starting Blood Donation Backend...');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const donorRoutes = require('./routes/donorRoutes');
const requestRoutes = require('./routes/requestRoutes');

console.log('📦 Loaded dependencies');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
console.log('⚙️  Setting up middleware...');
app.use(cors());
app.use(express.json());

// Database connection
console.log('🗄️  Connecting to MongoDB...');
connectDB();

// Routes
console.log('🛣️  Setting up routes...');
app.get('/', (req, res) => {
  console.log('📥 GET / request received');
  res.send('Blood Donation API is running!');
});

app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);

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

  // Graceful shutdown
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
