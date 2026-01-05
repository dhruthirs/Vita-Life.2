// API Service for Blood Bank Management System
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Register a new donor
 */
export const registerDonor = async (donorData) => {
  try {
    console.log('📝 Registering donor:', donorData);
    const response = await axios.post(`${API_BASE_URL}/donors`, donorData);
    console.log('✅ Donor registered:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Error registering donor:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Get all donors
 */
export const getAllDonors = async () => {
  try {
    console.log('📥 Fetching all donors');
    const response = await axios.get(`${API_BASE_URL}/donors`);
    console.log(`📤 Returned ${response.data.data?.length || 0} donors`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching donors:', error.message);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Search donors by blood group and/or city
 */
export const searchDonors = async (bloodGroup = '', city = '') => {
  try {
    console.log('🔍 Searching donors:', { bloodGroup, city });
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (city) params.append('city', city);
    
    const response = await axios.get(`${API_BASE_URL}/donors/search?${params}`);
    console.log(`📤 Search returned ${response.data.data?.length || 0} donors`);
    return response.data;
  } catch (error) {
    console.error('❌ Error searching donors:', error.message);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Find nearby donors by location
 */
export const getNearbyDonors = async (latitude, longitude, radius = 10, bloodGroup = '') => {
  try {
    console.log('📍 Finding nearby donors:', { latitude, longitude, radius, bloodGroup });
    const params = new URLSearchParams();
    params.append('latitude', latitude);
    params.append('longitude', longitude);
    params.append('radius', radius);
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    
    const response = await axios.get(`${API_BASE_URL}/donors/nearby?${params}`);
    console.log(`📤 Found ${response.data.data?.length || 0} nearby donors`);
    return response.data;
  } catch (error) {
    console.error('❌ Error finding nearby donors:', error.message);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Create a blood request
 */
export const createBloodRequest = async (requestData) => {
  try {
    console.log('❤️ Creating blood request:', requestData);
    const response = await axios.post(`${API_BASE_URL}/requests`, requestData);
    console.log('✅ Blood request created:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating request:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Get all blood requests
 */
export const getAllBloodRequests = async () => {
  try {
    console.log('📥 Fetching all blood requests');
    const response = await axios.get(`${API_BASE_URL}/requests`);
    console.log(`📤 Returned ${response.data.data?.length || 0} requests`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching requests:', error.message);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Get blood request by ID
 */
export const getBloodRequestById = async (requestId) => {
  try {
    console.log('📥 Fetching blood request:', requestId);
    const response = await axios.get(`${API_BASE_URL}/requests/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching request:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Update blood request status
 */
export const updateRequestStatus = async (requestId, status) => {
  try {
    console.log('🔄 Updating request status:', { requestId, status });
    const response = await axios.patch(
      `${API_BASE_URL}/requests/${requestId}/status`,
      { status }
    );
    console.log('✅ Status updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating status:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Rate a blood request
 */
export const rateBloodRequest = async (requestId, rating, feedback = '') => {
  try {
    console.log('⭐ Rating request:', { requestId, rating });
    const response = await axios.patch(
      `${API_BASE_URL}/requests/${requestId}/rate`,
      { rating, feedback }
    );
    console.log('✅ Request rated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error rating request:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Get urgent blood requests
 */
export const getUrgentRequests = async () => {
  try {
    console.log('🚨 Fetching urgent requests');
    const response = await axios.get(`${API_BASE_URL}/requests/urgent`);
    console.log(`📤 Found ${response.data.data?.length || 0} urgent requests`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching urgent requests:', error.message);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Delete blood request
 */
export const deleteBloodRequest = async (requestId) => {
  try {
    console.log('🗑️ Deleting request:', requestId);
    const response = await axios.delete(`${API_BASE_URL}/requests/${requestId}`);
    console.log('✅ Request deleted');
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting request:', error.message);
    return { success: false, error: error.message };
  }
};

