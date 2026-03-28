import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../theme.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [viewMode, setViewMode] = useState('my'); // 'my' for my bookings, 'all' for all bookings
  const [userId, setUserId] = useState(null);

  const fetchMyBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    
    try {
      const res = await api.get(`/bookings/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBookings(res.data);
    } catch (err) {
      console.log('Error fetching my bookings', err);
    }
  };

  const fetchAllBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    
    try {
      const res = await api.get('/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBookings(res.data);
    } catch (err) {
      console.log('Error fetching all bookings', err);
    }
  };

  useEffect(() => {
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
    
    // Load initial bookings
    fetchMyBookings();
  }, []);

  const toggleViewMode = () => {
    if (viewMode === 'my') {
      setViewMode('all');
      fetchAllBookings();
    } else {
      setViewMode('my');
      fetchMyBookings();
    }
  };
  
  // Only show the toggle button if user is admin
  const isAdmin = userId && localStorage.getItem('token') ? 
    JSON.parse(atob(localStorage.getItem('token').split('.')[1])).role === 'admin' : false;

  return (
    <div className="card" style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <h2>{viewMode === 'my' ? 'My Bookings' : 'All Bookings'}</h2>
        {isAdmin && (
          <button 
            onClick={toggleViewMode}
            className="btn btn-primary"
          >
            View {viewMode === 'my' ? 'All Bookings' : 'My Bookings'}
          </button>
        )}
      </div>
      
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Bike</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user?.name}</td>
                <td>{b.bike?.name}</td>
                <td>{b.date}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Booking;
