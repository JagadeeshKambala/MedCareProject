import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NearbyDoctors from './pages/NearbyDoctors';
import DoctorDetails from './pages/DoctorDetails';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import EmergencyAssistant from './pages/EmergencyAssistant';
import Fundraising from './pages/Fundraising';
import AppointmentDetails from './pages/AppointmentDetails';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<NearbyDoctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/history" element={<EmergencyAssistant />} />
            <Route path="/profile" element={<Fundraising />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;