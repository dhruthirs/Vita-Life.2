const mongoose = require('mongoose');
const Donor = require('./models/Donor');
require('dotenv').config();

const seedData = [
  { name: 'John Doe', bloodGroup: 'A+', city: 'Springfield', phone: '555-0101', email: 'john@example.com', age: 30 },
  { name: 'Jane Smith', bloodGroup: 'B-', city: 'Shelbyville', phone: '555-0202', email: 'jane@example.com', age: 25 },
  { name: 'Bob Johnson', bloodGroup: 'O+', city: 'Springfield', phone: '555-0303', email: 'bob@example.com', age: 35 },
  { name: 'Alice Brown', bloodGroup: 'AB+', city: 'Capital City', phone: '555-0404', email: 'alice@example.com', age: 28 }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Donor.deleteMany({});
    console.log('Cleared existing donors');

    // Insert seed data
    await Donor.insertMany(seedData);
    console.log('Seeded database with sample donors');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();