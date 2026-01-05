// API Service for Blood Bank Management System
// Integrates with Vita-life backend at http://localhost:5000/api

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Register a new donor
 * @param {Object} donorData - Donor information
 * @returns {Promise} Response from server
 */
export const registerDonor = async (donorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donorData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register donor');
    }

    return data;
  } catch (error) {
    console.error('Error registering donor:', error);
    throw error;
  }
};

/**
 * Get all donors
 * @returns {Promise} Array of all donors
 */
export const getAllDonors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch donors');
    }

    return data;
  } catch (error) {
    console.error('Error fetching donors:', error);
    throw error;
  }
};

/**
 * Search donors by blood group and/or city
 * @param {string} bloodGroup - Blood group to search for
 * @param {string} city - City to search for
 * @returns {Promise} Filtered list of donors
 */
export const searchDonors = async (bloodGroup = '', city = '') => {
  try {
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (city) params.append('city', city);

    const url = params.toString() 
      ? `${API_BASE_URL}/donors/search?${params.toString()}`
      : `${API_BASE_URL}/donors`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to search donors');
    }

    return data;
  } catch (error) {
    console.error('Error searching donors:', error);
    throw error;
  }
};
