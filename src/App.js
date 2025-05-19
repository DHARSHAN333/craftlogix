import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PaymentPage from './pages/PaymentPage';

import Navbar from './components/Navbar';

// Import nested pages for the dashboard
import WorkerDetails from './pages/WorkerDetails';
import Attendance from './pages/Attendance';
import WorkAllotment from './pages/WorkAllotment';
import SalaryCalculation from './pages/SalaryCalculation';
import VoiceTranslation from './pages/VoiceTranslation';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Nested routes inside Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="worker" element={<WorkerDetails />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="allotment" element={<WorkAllotment />} />
            <Route path="salary" element={<SalaryCalculation />} />
            <Route path="voice" element={<VoiceTranslation />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
