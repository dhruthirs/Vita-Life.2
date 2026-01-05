# Blood-Don API Integration Guide

## Overview
The Blood-Don React application has been successfully integrated with the Vita-Life backend database system.

## Backend Server Setup

### Starting the Backend Server
1. Navigate to the Vita-Life project directory
2. Ensure MongoDB is running (local or Atlas)
3. Install dependencies: `npm install`
4. Start the backend server:
   ```bash
   npm start
   ```
   The server should run on **http://localhost:5000**

## API Architecture

### API Service Layer
**File:** `src/api/donorApi.js`

Three main functions:

#### 1. Get All Donors
```javascript
getAllDonors()
```
- **Endpoint:** GET `/api/donors`
- **Returns:** `{ success: true, count: number, data: [] }`
- **Used in:** Dashboard.js (displays all donors and blood inventory)

#### 2. Search Donors
```javascript
searchDonors(bloodGroup = '', city = '')
```
- **Endpoint:** GET `/api/donors/search?bloodGroup=X&city=Y`
- **Returns:** `{ success: true, count: number, data: [] }`
- **Used in:** DonorSearchPage.js (search and filter donors)
- **Note:** Both parameters are optional; backend returns all if omitted

#### 3. Register Donor
```javascript
registerDonor(donorData)
```
- **Endpoint:** POST `/api/donors`
- **Request Body:**
  ```javascript
  {
    name: string,
    age: number (18-65),
    bloodGroup: string ('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'),
    phone: string (10 digits),
    city: string,
    lastDonationDate: date (optional),
    isAvailable: boolean
  }
  ```
- **Returns:** `{ success: true/false, message: string, data: donorObject }`
- **Used in:** DonorRegistrationForm.js

## Component Integration

### Dashboard.js
- **Status:** ✅ Fully integrated
- **Features:**
  - Fetches all donors on component mount
  - Displays 4 stat cards: Total Donors, Available Donors, Blood Types, Last Updated
  - Shows blood inventory grid with stock levels and low-stock warnings
  - Displays table of 5 most recent donors
  - Loading state with spinner animation
  - Error handling with retry button

### DonorSearchPage.js
- **Status:** ✅ Fully integrated
- **Features:**
  - Search by blood group (dropdown) and location/name/phone (text input)
  - Real-time filtering on input change
  - API call with useEffect hook
  - Client-side filtering augments server results
  - Loading state during search
  - Error handling with helpful messages
  - Full donor table with 8 columns: Name, Blood Type, Age, City, Phone, Last Donation, Status, Action

### DonorRegistrationForm.js
- **Status:** ✅ Fully integrated
- **Features:**
  - Form validation using React Hook Form + Zod
  - Simplified schema matching backend requirements:
    - Name, Age, Phone, Blood Group, City, Last Donation Date
    - Removed: Gender, Email (not in backend schema)
    - Removed: Health Checklist (not required by backend)
  - Success/Error messages
  - Loading state with spinner during submission
  - Auto-clears form on successful registration

## Field Mapping

### From Mock Data → To API Schema
| Mock Data Field | Backend API Field | Notes |
|-----------------|-------------------|-------|
| location | city | String |
| contactNumber | phone | 10-digit string |
| bloodType | bloodGroup | Valid blood group values |
| id | _id | MongoDB ObjectId |
| lastDonationDate | lastDonationDate | ISO Date string |
| N/A | isAvailable | Boolean, defaults to true |
| N/A | createdAt | Auto-generated timestamp |
| N/A | updatedAt | Auto-generated timestamp |

## Database Schema

Each donor record contains:
```javascript
{
  _id: ObjectId,
  name: string (required),
  age: number (required, 18-65),
  bloodGroup: string (required, one of 8 types),
  phone: string (required, 10 digits),
  city: string (required),
  lastDonationDate: date (optional, null if never donated),
  isAvailable: boolean (default: true),
  createdAt: date (auto-generated),
  updatedAt: date (auto-generated)
}
```

## Error Handling

### Backend Connection Errors
All components display helpful error messages:
- "Cannot connect to backend server. Make sure it's running at http://localhost:5000"
- Retry button to re-attempt the request

### Validation Errors
- Form validates before submission
- API validation errors display in error alert
- User-friendly error messages guide correction

## Testing the Integration

### Manual Testing Steps

1. **Start Backend Server**
   ```bash
   cd [vita-life-project]
   npm start
   ```

2. **Start Frontend**
   ```bash
   cd a:\react projects\blood-don
   npm start
   ```

3. **Test Dashboard**
   - Navigate to Dashboard
   - Should see loading spinner briefly
   - Displays donor statistics and blood inventory
   - If error appears, check backend server is running on port 5000

4. **Test Search**
   - Navigate to Search Donors
   - Select blood group or enter name/city/phone
   - Results update in real-time
   - Check table displays correct data

5. **Test Registration**
   - Navigate to Register Donor
   - Fill form with valid data:
     - Name: Any name
     - Age: 18-65
     - Phone: 10 digits (e.g., 9876543210)
     - Blood Group: Select from dropdown
     - City: Any city name
   - Submit form
   - Should see success message
   - New donor should appear in Dashboard immediately

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" error | Ensure Vita-Life backend is running on port 5000; check MongoDB connection |
| No donors displaying | Ensure some donors exist in database; may need to seed test data |
| Phone validation fails | Phone must be exactly 10 digits |
| Age validation fails | Age must be between 18 and 65 |
| Form submission fails | Check browser console for detailed error message from backend |

## Environment Configuration

**Frontend Base URL:** `http://localhost:5000/api`
- Located in: `src/api/donorApi.js`
- Can be updated for production deployment

**CORS:** Backend should have CORS enabled to accept requests from React app

## Next Steps for Production

1. Move API base URL to environment variables
2. Add authentication/authorization if needed
3. Implement request pagination for large datasets
4. Add data export functionality
5. Implement backup/archive features
6. Add admin dashboard for management
7. Set up monitoring and logging

---

**Last Updated:** 2024
**Integration Status:** Complete and tested
