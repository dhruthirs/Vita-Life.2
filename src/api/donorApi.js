// API Service for Blood Bank Management System
// Temporarily using mock data until backend is fixed

// Mock data for donors
const mockDonors = [
  {
    _id: '1',
    name: 'John Doe',
    bloodGroup: 'A+',
    city: 'Springfield',
    phone: '555-0101',
    email: 'john@example.com',
    age: 30,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Jane Smith',
    bloodGroup: 'B-',
    city: 'Shelbyville',
    phone: '555-0202',
    email: 'jane@example.com',
    age: 25,
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    bloodGroup: 'O+',
    city: 'Springfield',
    phone: '555-0303',
    email: 'bob@example.com',
    age: 35,
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Alice Brown',
    bloodGroup: 'AB+',
    city: 'Capital City',
    phone: '555-0404',
    email: 'alice@example.com',
    age: 28,
    createdAt: new Date().toISOString()
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Register a new donor
 * @param {Object} donorData - Donor information
 * @returns {Promise} Response from server
 */
export const registerDonor = async (donorData) => {
  console.log('📝 Registering donor (mock):', donorData);

  // Simulate API delay
  await delay(500);

  // Create new donor with mock ID
  const newDonor = {
    _id: Date.now().toString(),
    ...donorData,
    createdAt: new Date().toISOString()
  };

  // Add to mock data
  mockDonors.push(newDonor);

  console.log('✅ Donor registered (mock):', newDonor);

  // Return expected format
  return {
    success: true,
    data: newDonor,
    message: 'Donor registered successfully'
  };
};

/**
 * Get all donors
 * @returns {Promise} Array of all donors
 */
export const getAllDonors = async () => {
  console.log('📥 Fetching all donors (mock)');

  // Simulate API delay
  await delay(300);

  console.log(`📤 Returning ${mockDonors.length} donors (mock)`);

  // Return expected format
  return {
    success: true,
    data: [...mockDonors],
    message: 'Donors fetched successfully'
  };
};

/**
 * Search donors by blood group and/or city
 * @param {string} bloodGroup - Blood group to search for
 * @param {string} city - City to search for
 * @returns {Promise} Filtered list of donors
 */
export const searchDonors = async (bloodGroup = '', city = '') => {
  console.log('🔍 Searching donors (mock):', { bloodGroup, city });

  // Simulate API delay
  await delay(400);

  // Filter mock data
  const filtered = mockDonors.filter(donor => {
    const bloodMatch = !bloodGroup || donor.bloodGroup.toLowerCase().includes(bloodGroup.toLowerCase());
    const cityMatch = !city || donor.city.toLowerCase().includes(city.toLowerCase());
    return bloodMatch && cityMatch;
  });

  console.log(`📤 Search returned ${filtered.length} donors (mock)`);

  // Return expected format
  return {
    success: true,
    data: [...filtered],
    message: 'Search completed successfully'
  };
};
