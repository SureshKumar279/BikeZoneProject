import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Logo from '../components/Logo';
import '../theme.css';

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchBikes = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      const res = await api.get('/bikes', { headers });
      setBikes(res.data);
    } catch (err) {
      console.log('Error fetching bikes', err);
    }
  };

  useEffect(() => {
    fetchBikes();
    // Get user ID from token by decoding JWT
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id);
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
  }, []);

  const handleBookNow = async (bikeId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to book a bike');
      return;
    }
    
    try {
      const bookingData = {
        bikeId: bikeId,
        date: new Date().toISOString().split('T')[0]
      };
      
      await api.post('/bookings', bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Bike booked successfully!');
      // Refresh the bike list
      fetchBikes();
    } catch (err) {
      console.log('Error booking bike', err);
      alert('Failed to book bike: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="card" style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <Logo />
      <h2>Available Bikes</h2>
      <p style={{color: 'green', fontSize: '14px', marginBottom: '15px'}}>Note: Login to book a bike</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Year</th>
            <th>Price</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td>{bike.id}</td>
              <td>{bike.name}</td>
              <td>{bike.brand}</td>
              <td>{bike.modelYear}</td>
              <td>${bike.price}</td>
              <td>{bike.available ? 'Yes' : 'No'}</td>
              <td>
                {bike.available ? (
                  <button 
                    onClick={() => handleBookNow(bike.id)}
                    className="btn btn-primary"
                  >
                    Book Now
                  </button>
                ) : (
                  <span>Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BikeList;
