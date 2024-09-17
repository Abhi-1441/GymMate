import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import FoodPage from './pages/FoodPage';
import CheckProteinRequirement from './pages/CheckProteinRequirement';
import CalendarPage from './pages/CalendarPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <div className="min-h-screen mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/check-protein-requirement" element={<CheckProteinRequirement />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/food" element={<FoodPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
