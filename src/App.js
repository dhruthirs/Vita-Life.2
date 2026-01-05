import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import MainLayout from "./components/MainLayout";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import DonorSearchPage from "./components/DonorSearchPage";
import DonorRegistrationForm from "./components/DonorRegistrationForm";
import DonorMap from "./components/DonorMap";
import BloodRequestForm from "./components/BloodRequestForm";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
        <Route
          path="/search-donor"
          element={
            <MainLayout>
              <DonorSearchPage />
            </MainLayout>
          }
        />
        <Route
          path="/donor-map"
          element={
            <MainLayout>
              <DonorMap />
            </MainLayout>
          }
        />
        <Route
          path="/register-donor"
          element={
            <MainLayout>
              <DonorRegistrationForm />
            </MainLayout>
          }
        />
        <Route
          path="/request-blood"
          element={
            <MainLayout>
              <BloodRequestForm />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
