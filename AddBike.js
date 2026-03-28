import React, { useState } from 'react';
import api from '../services/api';
import '../theme.css';

const AddBike = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [price, setPrice] = useState('');

  const handleAddBike = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please log in to add a bike');
      return;
    }
    
    try {
      await api.post('/bikes', { name, brand, modelYear: +modelYear, price: +price }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Bike added successfully!');
      setName(''); setBrand(''); setModelYear(''); setPrice('');
    } catch (err) {
      alert('Error adding bike: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Add Bike</h2>
      <p style={{color: 'red', fontSize: '14px', marginBottom: '15px'}}>Note: Only admin users can add bikes</p>
      <form onSubmit={handleAddBike}>
        <div className="form-group">
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Model Year" value={modelYear} onChange={e => setModelYear(e.target.value)} required className="form-input" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="form-input" />
        </div>
        <button type="submit" className="btn btn-primary">Add Bike</button>
      </form>
    </div>
  );
};

export default AddBike;
