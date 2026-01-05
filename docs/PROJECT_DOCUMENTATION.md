# Blood Bank Management System - Project Documentation

## 🩸 Project Overview

A complete React-based Blood Bank Management System built with modern technologies including React, Tailwind CSS, React Hook Form, and Zod validation.

## ✅ Completed Features

### 1. **Dashboard Component** (`src/components/Dashboard.js`)
- **Stats Grid**: Shows total donors, pending requests, units collected today, and total units in stock
- **Blood Inventory Grid**: Displays all blood types (A+, A-, B+, B-, O+, O-, AB+, AB-) with unit counts
  - Color-coded status: Green (normal), Yellow (medium), Red (low stock < 5 units)
  - "Low Stock" badge appears when units are critically low
- **Recent Activity Table**: Shows the last 5 blood donations with donor name, blood type, date, time, and units collected
- **API Ready**: Structured to easily replace mock data with fetch/Axios calls

### 2. **Donor Search Page** (`src/components/DonorSearchPage.js`)
- **Filter Bar**: 
  - Blood Group dropdown (O+, O-, A+, A-, B+, B-, AB+, AB-)
  - Search input for Location/Name/Phone number
  - Reset button to clear all filters
- **Results Table**: Displays donor information with columns:
  - Name (with age indicator)
  - Blood Type (color-coded badge)
  - Location
  - Last Donation Date
  - Contact button with phone and email quick actions
- **Client-side Filtering**: Real-time table updates as user types or selects options
- **Mobile Responsive**: Clean, professional medical color palette (whites, grays, deep reds)

### 3. **Donor Registration Form** (`src/components/DonorRegistrationForm.js`)
- **Form Validation**: Using React Hook Form + Zod for robust validation
- **Personal Information Section**:
  - Name (required, min 2 chars)
  - Age (required, must be 18+)
  - Gender (dropdown: Male, Female, Other)
  - Contact Number (10-digit validation)
  - Email Address (email format validation)
- **Medical Information Section**:
  - Blood Group dropdown
  - Last Donation Date picker
- **Health Checklist**:
  - Recent Tattoos (checkbox)
  - Existing Medications (checkbox)
  - Chronic Illness (checkbox)
- **Submit Button**: 
  - Loading state with spinner animation
  - Success/Error alert messages
  - Ready for POST request integration
- **Professional Styling**: Proper spacing, field labels, and error messages

### 4. **MainLayout Component** (`src/components/MainLayout.js`)
- **Persistent Sidebar**:
  - Navigation links: Dashboard, Search Donors, Register Donor, Reports, Settings
  - Active route highlighting
  - Collapsible sidebar for mobile responsiveness
  - Blood Bank branding with icon
- **Topbar**:
  - Toggle sidebar button
  - Application title with logo
  - User profile section
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Medical Color Scheme**: Red gradient sidebar (matching blood bank theme)

### 5. **Mock Data** (`src/mockData.js`)
- **20 Realistic Donor Records**: Complete with:
  - Personal info (name, age, gender, location)
  - Contact details (phone, email)
  - Medical info (blood type, last donation date)
  - Health history (tattoos, medications, chronic illness)
- **Recent Donations**: 5 sample donation records
- **Blood Inventory**: Stock levels for all 8 blood types
- **Stats**: Total donors, pending requests, units collected today

### 6. **Additional Pages**
- **Reports Page** (`src/components/Reports.js`): Placeholder for analytics
- **Settings Page** (`src/components/Settings.js`): Placeholder for configuration

## 🛠️ Tech Stack

- **React**: 19.2.3
- **React Router**: For navigation between pages
- **Tailwind CSS**: 3.x for responsive styling
- **React Hook Form**: For efficient form handling
- **Zod**: For schema validation and type safety
- **Lucide React**: For modern icons
- **Axios**: (installed) For API calls

## 📦 Project Structure

```
src/
├── components/
│   ├── Dashboard.js
│   ├── DonorRegistrationForm.js
│   ├── DonorSearchPage.js
│   ├── MainLayout.js
│   ├── Reports.js
│   └── Settings.js
├── App.js                 # Routing setup
├── index.js               # Entry point
├── index.css              # Tailwind CSS imports
└── mockData.js            # Mock data for development
```

## 🚀 How to Use

### Starting the Development Server
```bash
npm start
```
The app runs at `http://localhost:3000`

### Building for Production
```bash
npm run build
```

### Project Navigation
- **Dashboard**: View statistics, blood inventory, and recent donations
- **Search Donors**: Filter and find donors by blood type or location
- **Register Donor**: New donor registration with validation
- **Reports**: (Coming soon) Analytics dashboard
- **Settings**: (Coming soon) System configuration

## 🔌 API Integration Guide

### Dashboard - Replace Mock Data
In `src/components/Dashboard.js`, replace the mock data fetch:

```javascript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/dashboard');
    // or using axios:
    // const response = await axios.get('/api/dashboard');
    const data = await response.json();
    setInventory(data.inventory);
    setDonations(data.recentDonations);
  };
  fetchData();
}, []);
```

### Donor Registration - Handle Form Submission
In `src/components/DonorRegistrationForm.js`, update the `onSubmit` function:

```javascript
const onSubmit = async (data) => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/donors/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Handle response...
    setSubmitStatus('success');
    reset();
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsLoading(false);
  }
};
```

### Donor Search - Fetch Real Data
Replace mock data in `src/components/DonorSearchPage.js`:

```javascript
useEffect(() => {
  const fetchDonors = async () => {
    const response = await fetch('/api/donors');
    const data = await response.json();
    setFilteredDonors(data);
  };
  fetchDonors();
}, []);
```

## 📋 Validation Rules

### Donor Registration Form
- **Name**: 2-50 characters
- **Age**: 18-100 years (must be 18+)
- **Gender**: Required (Male, Female, Other)
- **Contact Number**: Exactly 10 digits
- **Email**: Valid email format
- **Blood Group**: Required (one of 8 types)
- **Last Donation Date**: Cannot be in the future (optional)

## 🎨 Design Features

- **Medical Color Palette**: 
  - Primary Red: #DC2626 (blood bank theme)
  - Neutral Grays: #F3F4F6 and #E5E7EB
  - Status colors: Green (normal), Yellow (warning), Red (critical)
- **Responsive Design**: Works on mobile (320px), tablet (768px), and desktop (1024px+)
- **Accessibility**: Proper labels, semantic HTML, focus states
- **Professional UI**: Clean spacing, consistent typography, smooth transitions

## 📝 Notes

1. All components are production-ready but use mock data
2. The app is fully functional for UI/UX testing before backend integration
3. Error handling and loading states are implemented
4. Form validation provides user-friendly error messages
5. The sidebar collapses on mobile for better space utilization

## 🔄 Next Steps

1. Replace mock data with actual API endpoints
2. Set up authentication/authorization
3. Add backend integration for form submissions
4. Implement Reports page with charts/analytics
5. Add blood request management features
6. Set up database schema for donors and donations

---

**Project Status**: ✅ UI/Frontend Complete - Ready for Backend Integration
