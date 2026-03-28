import React from 'react';
import '../theme.css';

const Footer = () => {
  return (
    <footer style={{ 
      padding: 'var(--spacing-md)', 
      backgroundColor: 'var(--primary-dark)', 
      color: 'var(--surface-color)', 
      marginTop: 'var(--spacing-xl)', 
      textAlign: 'center',
      fontSize: 'var(--font-size-sm)'
    }}>
      &copy; 2025 BikeZone. All Rights Reserved.
    </footer>
  );
};

export default Footer;
