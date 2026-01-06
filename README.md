# Vita-Life - Blood Donation Platform

A modern web application connecting blood donors with those in need, featuring real-time donor search, interactive maps, and user authentication.

## 🩸 Features

- **Donor Registration & Authentication**: Register as a donor with name + phone number login
- **Interactive Maps**: Find nearby donors using geolocation with Leaflet maps
- **Blood Group Search**: Search donors by blood group and city
- **Admin Dashboard**: Separate admin interface for management
- **Responsive Design**: Beautiful UI with Tailwind CSS and smooth animations
- **Real-time Updates**: Live donor availability status

## 🚀 Tech Stack

### Frontend

- React 19.2.3
- React Router 7.11.0
- Tailwind CSS
- Leaflet (React-Leaflet) for maps
- Lucide React for icons

### Backend

- Node.js & Express.js
- MongoDB (with in-memory fallback)
- Mongoose ODM
- CORS enabled

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (optional - in-memory storage available)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/dhruthirs/Vita-Life.2.git
   cd Vita-Life.2
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure Environment Variables**

   Create `backend/.env`:

   ```
   MONGO_URI=your_mongodb_atlas_uri
   LOCAL_MONGO_URI=mongodb://localhost:27017/bloodbank
   USE_LOCAL_DB=false
   ```

   If you don't have MongoDB Atlas, set `USE_LOCAL_DB=true` or leave it as is (in-memory storage will be used automatically).

5. **Start the Application**

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   npm start
   ```

   Backend runs on: `http://localhost:5000`

   **Terminal 2 - Frontend:**

   ```bash
   npm start
   ```

   Frontend runs on: `http://localhost:3000` (or next available port)

### Deployment

can use an application to perform this.
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## 🔐 Authentication

### Donor Login

1. Register first at `/register-donor` with:
   - Full Name
   - Phone Number (10 digits)
   - Blood Group
   - City, Age, etc.
2. Login at `/login` using:
   - **Name**: Your registered name
   - **Password**: Your phone number

### Admin Login

- Go to `/admin-login`
- **Username**: `admin`
- **Password**: `admin123`

## 🗺️ Map Feature

The interactive map shows nearby donors based on:

- Geolocation coordinates (latitude/longitude)
- Configurable radius (default: 10km)
- Blood group filtering
- Real-time availability status

## 📁 Project Structure

```
Vita-Life.2/
├── backend/
│   ├── index.js           # Express server with MongoDB
│   ├── .env              # Environment variables
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── DonorMap.js
│   │   ├── DonorRegistrationForm.js
│   │   ├── UserLogin.js
│   │   └── AdminLogin.js
│   ├── context/
│   │   └── AuthContext.js
│   └── App.js
├── public/
└── README.md
```

## 🛠️ API Endpoints

### Donors

- `GET /api/donors` - Get all donors
- `POST /api/donors` - Register new donor
- `GET /api/donors/search?bloodGroup=A+&city=Mumbai` - Search donors
- `GET /api/donors/nearby?latitude=X&longitude=Y&radius=10` - Find nearby donors

## 🎨 Design Features

- Gradient animations and hover effects
- Smooth transitions and loading states
- Mobile-responsive layouts
- Accessible form controls
- Color-coded blood group badges

## 🔄 In-Memory Storage

The backend automatically falls back to in-memory storage if MongoDB is unavailable. This means:

- ✅ Application works without database setup
- ⚠️ Data is lost on server restart
- 💡 Great for testing and development

To use persistent storage, configure MongoDB Atlas and whitelist your IP.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Dhruthi RS**

- GitHub: [@dhruthirs](https://github.com/dhruthirs)

## 🙏 Acknowledgments

- Blood donation saves lives - thank you to all donors!
- Built with React and modern web technologies
- Maps powered by Leaflet and OpenStreetMap

---

**Need Help?** Open an issue or contact the maintainer.
