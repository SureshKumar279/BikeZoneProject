import React from 'react';
import '../theme.css';

const Logo = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--spacing-lg)'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'var(--accent-color)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'var(--spacing-md)',
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white'
      }}>
        B
      </div>
      <h1 style={{
        color: 'var(--primary-color)',
        margin: 0,
        fontSize: 'var(--font-size-xxl)'
      }}>
        BikeZone
      </h1>
    </div>
  );
};

export default Logo;