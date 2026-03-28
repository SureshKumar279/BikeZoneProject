import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../theme.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role || '');
        } catch (e) {
          console.error('Error decoding token:', e);
          setIsAuthenticated(false);
          setUserRole('');
        }
      } else {
        setIsAuthenticated(false);
        setUserRole('');
      }
    };
    
    checkAuth();
  }, [location]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole('');
    navigate('/');
  };
  
  return (
    <nav style={{ 
      padding: 'var(--spacing-md)', 
      backgroundColor: 'var(--primary-color)', 
      color: 'var(--surface-color)',
      boxShadow: 'var(--shadow-md)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ 
        color: 'var(--surface-color)', 
        marginRight: 'var(--spacing-md)', 
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: 'var(--font-size-lg)',
        transition: 'color var(--transition-fast)'
      }}
      onMouseOver={(e) => e.target.style.color = 'var(--accent-light)'}
      onMouseOut={(e) => e.target.style.color = 'var(--surface-color)'}>
        Home
      </Link>
      
      <Link to="/add-bike" style={{ 
        color: 'var(--surface-color)', 
        marginRight: 'var(--spacing-md)', 
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: 'var(--font-size-lg)',
        transition: 'color var(--transition-fast)'
      }}
      onMouseOver={(e) => e.target.style.color = 'var(--accent-light)'}
      onMouseOut={(e) => e.target.style.color = 'var(--surface-color)'}>
        Add Bike
      </Link>
      
      {isAuthenticated && (
        <Link to="/booking" style={{ 
          color: 'var(--surface-color)', 
          marginRight: 'var(--spacing-md)', 
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: 'var(--font-size-lg)',
          transition: 'color var(--transition-fast)'
        }}
        onMouseOver={(e) => e.target.style.color = 'var(--accent-light)'}
        onMouseOut={(e) => e.target.style.color = 'var(--surface-color)'}>
          My Bookings
        </Link>
      )}
      
      {isAuthenticated ? (
        <button 
          onClick={handleLogout}
          style={{
            color: 'var(--surface-color)',
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: 'var(--spacing-md)',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: 'var(--font-size-lg)',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)',
            background: 'none',
            outline: 'none'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--accent-light)'}
          onMouseOut={(e) => e.target.style.color = 'var(--surface-color)'}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={{ 
            color: 'var(--surface-color)', 
            marginRight: 'var(--spacing-md)', 
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: 'var(--font-size-lg)',
            transition: 'color var(--transition-fast)'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--accent-light)'}
          onMouseOut={(e) => e.target.style.color = 'var(--surface-color)'}>
            Login
          </Link>
          <Link to="/register" style={{ 
            color: 'var(--surface-color)', 
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: 'var(--font-size-lg)',
            transition: 'color var(--transition-fast)'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--accent-light)'}
          onMouseOut={(e) => e.target.style.color = 'var(--surface-color)'}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
