import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import DonorSearchPage from "./components/DonorSearchPage";
import DonorRegistrationForm from "./components/DonorRegistrationForm";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
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
          path="/register-donor"
          element={
            <MainLayout>
              <DonorRegistrationForm />
            </MainLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <MainLayout>
              <Reports />
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
    </Router>
  );
}

export default App;
