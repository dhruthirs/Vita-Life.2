# Quick Test Guide for Blood-Don + Vita-Life Integration

## Prerequisites
- Both projects cloned/available locally
- Node.js and npm installed
- MongoDB running (local or Atlas)

## Step 1: Start the Backend Server

```bash
# Navigate to Vita-Life project
cd [your-vita-life-project-path]

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected to [your-database]
```

## Step 2: Start the Frontend Application

In a new terminal:

```bash
# Navigate to Blood-Don project
cd a:\react projects\blood-don

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view blood-don in the browser...
```

Browser will open to **http://localhost:3000**

## Step 3: Test Dashboard

1. Click "Dashboard" in the sidebar
2. **Expected behavior:**
   - Loading spinner appears briefly
   - Stats cards display:
     - Total Donors (count of all donors)
     - Available Donors (count with isAvailable=true)
     - Blood Types (count of types with at least one donor)
     - Last Updated (shows "Just now")
   - Blood Inventory grid shows all 8 blood types with unit counts
   - Recent Donors table shows first 5 donors with their data
   - All API field names correct: city, phone, bloodGroup, isAvailable

3. **If error appears:**
   - Check that backend server is running on port 5000
   - Click "Retry" button
   - Verify MongoDB is connected

## Step 4: Test Search Donors

1. Click "Search Donors" in the sidebar
2. **Test blood group filter:**
   - Select a blood group from dropdown
   - Results should update immediately
   - Table should show donors with that blood type

3. **Test location/name search:**
   - In text field, enter a city name
   - Results filter to show matching donors
   - Clear text and results reset

4. **Test combined filters:**
   - Select blood group AND enter city name
   - Should show donors matching both criteria

5. **Test phone search:**
   - Enter a phone number (or part of it)
   - Results should show matching donors

6. **Verify table columns:**
   - Name, Blood Type, Age, City, Phone, Last Donation, Status, Action
   - Status shows "Available" or "Not Available" based on isAvailable field
   - Last Donation shows formatted date or "Never"
   - Phone button links work: `tel:[phone]`

## Step 5: Test Donor Registration

1. Click "Register Donor" in the sidebar
2. **Fill out the form with test data:**
   ```
   Name: John Smith
   Age: 35
   Phone: 9876543210
   Blood Group: O+
   City: New York
   Last Donation Date: (leave blank or pick a past date)
   ```

3. **Click "Register as Donor"**
   - Loading spinner appears
   - Form submits to backend

4. **Expected outcomes:**
   - **Success:** Green message "Registration Successful!"
     - Form clears automatically
     - New donor should appear in Dashboard
   - **Error:** Red message with error details
     - Check backend logs for validation issues

5. **Test validation:**
   - Try submitting with phone number that's not 10 digits → Error
   - Try submitting with age outside 18-65 range → Error
   - Leave required fields empty → Error message
   - All errors display in red text below form field

## Step 6: Verify Integration by Registering Test Donors

1. Register 2-3 donors with different blood types
2. Go to Dashboard → Verify new donors appear in Recent Donors table
3. Go to Search → Filter by blood group of registered donor → Should find them
4. Check blood inventory updated correctly

## Test Data You Can Use

```javascript
// Donor 1
Name: Alice Johnson
Age: 28
Phone: 9812345678
Blood: B+
City: Los Angeles

// Donor 2
Name: Bob Williams
Age: 45
Phone: 9823456789
Blood: AB-
City: Chicago

// Donor 3
Name: Carol Davis
Age: 32
Phone: 9834567890
Blood: A+
City: Boston
```

## Troubleshooting

### Issue: "Cannot connect to backend server"
**Cause:** Backend not running on port 5000
**Fix:**
```bash
# Terminal 1
cd [vita-life-project]
npm start
# Verify: "Server running on port 5000"
```

### Issue: "Cannot GET /api/donors"
**Cause:** Backend server crashed or routes not set up correctly
**Fix:**
```bash
# Check Vita-Life backend logs
# Ensure routes are defined: GET /api/donors, POST /api/donors, GET /api/donors/search
# Restart backend
npm start
```

### Issue: Form submission fails with validation error
**Cause:** Data doesn't match backend requirements
**Fix:**
- Phone must be exactly 10 digits
- Age must be 18-65
- Blood group must be one of: O+, O-, A+, A-, B+, B-, AB+, AB-
- City is required
- Check backend logs for detailed error message

### Issue: Old data still showing after registration
**Cause:** Component not refetching from backend
**Fix:**
```
Refresh the page with F5 or Cmd+R
Data will reload from backend
```

### Issue: MongoDB connection error
**Cause:** MongoDB not running or connection string invalid
**Fix:**
```bash
# If using local MongoDB
# Windows: Start MongoDB service
net start MongoDB

# If using MongoDB Atlas
# Check connection string in .env file
# Verify IP whitelist includes your machine
```

## What Each Component Communicates

```
┌─────────────────────────────────────────┐
│         React Application               │
│  (Dashboard, Search, Registration)      │
│     localhost:3000                      │
└──────────────┬──────────────────────────┘
               │
        HTTP Requests
               │
               ▼
┌─────────────────────────────────────────┐
│      API Service Layer                  │
│      src/api/donorApi.js                │
│  (getAllDonors, searchDonors,           │
│   registerDonor)                        │
└──────────────┬──────────────────────────┘
               │
        HTTP REST Calls
               │
               ▼
┌─────────────────────────────────────────┐
│    Express Backend                      │
│    (Vita-Life Project)                  │
│    localhost:5000/api/                  │
│  - GET /donors                          │
│  - POST /donors                         │
│  - GET /donors/search?bloodGroup=X      │
└──────────────┬──────────────────────────┘
               │
        Database Queries
               │
               ▼
┌─────────────────────────────────────────┐
│        MongoDB Database                 │
│   (donors collection)                   │
└─────────────────────────────────────────┘
```

## Success Indicators

✅ Dashboard shows "X donors" on page load
✅ Blood inventory displays with correct counts
✅ Search returns results matching filter criteria
✅ Registration form accepts valid input and shows success message
✅ New registered donor appears in Dashboard within seconds
✅ All field names display correctly (city, phone, bloodGroup, etc.)
✅ Error messages appear if backend is offline
✅ Retry buttons work and reconnect to backend

---

**Ready to test!** Start with Step 1 and follow through Step 6.
If you encounter any issues, check the Troubleshooting section.
