// src/api/donorApi.js

// src/api/donorApi.js
export const getAllDonors = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/donors"); // exact backend route
    const data = await response.json();
    console.log("Backend donors:", data);
    return data;
  } catch (err) {
    console.error("Error fetching donors:", err);
    return { success: false, message: "Backend not reachable" };
  }
};


export const searchDonors = async (bloodGroup = "", searchQuery = "") => {
  try {
    const params = new URLSearchParams();
    if (bloodGroup) params.append("bloodGroup", bloodGroup);
    if (searchQuery) params.append("search", searchQuery); // backend should handle name/city/phone search

    const response = await fetch(
      `http://localhost:5000/api/donors/search?${params.toString()}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching donors:", error);
    return { success: false, message: "Backend server not reachable" };
  }
};
