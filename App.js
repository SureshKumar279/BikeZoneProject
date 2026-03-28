 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import BikeList from './pages/BikeList';
import AddBike from './pages/AddBike';
import Booking from './pages/Booking';
import './theme.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<BikeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-bike" element={<AddBike />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
