import React from 'react';
import '../src/App.css';

const Card = ({ maneuver }) => {
    console.log(maneuver)
  // Styles for the card layout
  const cardStyles = {
    container: {
      position: 'absolute',
      left: '50%',
      top: '40%',
      height: '33vw',
      width: '33vw',
      transform: "translate(-50%, -50%)",
      backgroundColor: '#1a1a1a',
      borderRadius: '15px',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    header: {
      borderBottom: '2px solid #333',
      paddingBottom: '10px',
      paddingTop: '10px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#888',
    },
    section: {
      marginBottom: '15px',
    },
    propertyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      padding: '10px',
      backgroundColor: '#252525',
      borderRadius: '8px',
    },
    property: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    propertyLabel: {
      fontSize: '14px',
      color: '#888',
    },
    propertyValue: {
      fontSize: '16px',
      color: '#fff',
    },
    description: {
      padding: '15px',
      backgroundColor: '#252525',
      borderRadius: '8px',
      fontSize: '16px',
      lineHeight: '1.5',
    },
    svgContainer: {
      width: '100%',
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      borderRadius: '8px',
      overflow: 'hidden',
    },
  };

  return (
    <div style={cardStyles.container}>
      {/* Header Section */}
      <div style={cardStyles.header}>
        <div style={cardStyles.title}>{maneuver?.maneuver_name || 'Maneuver Name'}</div>
        <div style={cardStyles.subtitle}>{maneuver?.discipline || 'Discipline'}</div>
      </div>

      {/* Properties Section */}
      <div style={cardStyles.section}>
        <div style={cardStyles.propertyGrid}>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Type</span>
            <span style={cardStyles.propertyValue}>{maneuver?.maneuver_type || 'Type'}</span>
          </div>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Weight</span>
            <span style={cardStyles.propertyValue}>{maneuver?.weight || 'Weight'}</span>
          </div>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Paradigm</span>
            <span style={cardStyles.propertyValue}>{maneuver?.paradigm || 'Paradigm'}</span>
          </div>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Position</span>
            <span style={cardStyles.propertyValue}>{maneuver?.position || 'Position'}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div style={cardStyles.section}>
        <div style={cardStyles.description}>
          {maneuver?.description || 'Maneuver description goes here...'}
        </div>
      </div>

      {/* Ability Section */}
      <div style={cardStyles.section}>
        <div style={cardStyles.description}>
          <h3>Ability</h3>
          {maneuver?.ability || 'Ability description goes here...'}
        </div>
      </div>
    </div>
  );
};

export default Card;