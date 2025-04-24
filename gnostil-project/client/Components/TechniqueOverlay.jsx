import React from 'react';

const TechniqueOverlay = () => {
  const hexStyles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px',
      pointerEvents: 'none',
      zIndex: 2
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: '20px',
      padding: '40px 0'
    },
    hexagon: {
      width: '120px',
      height: '104px',
      background: 'rgba(255, 255, 255, 0.1)',
      position: 'relative',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={hexStyles.container}>
      {/* Left Column */}
      <div style={hexStyles.column}>
        <div style={hexStyles.hexagon} />
        <div style={hexStyles.hexagon} />
        <div style={hexStyles.hexagon} />
      </div>

      {/* Right Column */}
      <div style={hexStyles.column}>
        <div style={hexStyles.hexagon} />
        <div style={hexStyles.hexagon} />
        <div style={hexStyles.hexagon} />
      </div>
    </div>
  );
};

export default TechniqueOverlay;