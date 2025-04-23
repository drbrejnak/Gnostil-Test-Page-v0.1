import React from 'react';
import '../src/App.css';
import { cardStyles } from './Styles/CardStyles';

const Card = ({ maneuver, setSelectedManeuver }) => {
  return (
    <div style={cardStyles.container}>
      {/* Close Button */}
      <button
        onClick={() => setSelectedManeuver(null)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        &times;
      </button>

    {/* Header Section */}
      <div style={cardStyles.header}>
        <div style={cardStyles.title}>{maneuver?.maneuver_name || 'Maneuver Name'}</div>
        <div style={cardStyles.subtitle}>{maneuver?.discipline || 'Discipline'}</div>
      </div>

    {/* Properties Grid */}
        <div style={cardStyles.propertyGrid}>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Type</span>
            <span style={cardStyles.propertyValue}>
            {maneuver?.maneuver_type || 'Type'}
            </span>
          </div>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>
            {maneuver?.toll === 0 ? 'Yield' : 'Toll'}
            </span>
            <span style={cardStyles.propertyValue}>
            {maneuver?.toll === 0 ? maneuver?.yield : maneuver?.toll}
            </span>
          </div>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Weight</span>
            <span style={cardStyles.propertyValue}>
            {maneuver?.weight || 'Weight'}
            </span>
          </div>
          <div style={cardStyles.property}>
            <span style={cardStyles.propertyLabel}>Paradigm</span>
            <span style={cardStyles.propertyValue}>
            {maneuver?.paradigm || 'Paradigm'}
            </span>
          </div>
        </div>

      {/* Ability Section */}
        <div style={cardStyles.wording}>
            <div style={cardStyles.propertyLabel}>Ability</div>
            {maneuver?.ability || 'Ability description goes here...'}
        </div>

    {/* Description Section */}
        <div style={cardStyles.wording}>
            <div style={cardStyles.propertyLabel}>Description</div>
            {maneuver?.description || 'Maneuver description goes here...'}
        </div>

    </div>
  );
};

export default Card;