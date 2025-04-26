import React from 'react';

const OrientationWarning = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 2000,
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '24px',
        marginBottom: '20px'
      }}>
        ↻ Please Rotate Your Device
      </div>
      <div>
        This application requires landscape orientation for optimal viewing.
      </div>
    </div>
  );
};

export default OrientationWarning;