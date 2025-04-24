import React from 'react';
import '../src/App.css';
import { cardStyles } from './Styles/CardStyles';

const Card = ({ maneuver, setSelectedManeuver }) => {
  // Render ability section based on maneuver type
  const renderAbility = () => {
    const abilityStyle = {
      ...cardStyles.wording,
      ...((!maneuver?.description) && {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }),
      ...(maneuver?.description && {
        flex: '1 1 50%', // Take up equal space when description exists
        minHeight: 0 // Allow container to shrink
      })
    };

    if (maneuver?.is_technique) {
      return (
        <div style={abilityStyle}>
          <div style={cardStyles.propertyLabel}>Combined Abilities</div>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '8px',
            wordBreak: 'break-word'
          }}>
            {maneuver.component_maneuvers.map((m, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {m.maneuver_name}:
                </div>
                <div>{m.ability}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={abilityStyle}>
        <div style={cardStyles.propertyLabel}>Ability</div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '8px',
          wordBreak: 'break-word'
        }}>
          {maneuver?.ability || 'Ability description goes here...'}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      ...cardStyles.container,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
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

      {/* Ability and Description sections in flex container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: '5px' // Add spacing between sections
      }}>
        {renderAbility()}

        {maneuver?.description && (
          <div style={{
            ...cardStyles.wording,
            flex: '1 1 50%', // Take up equal space with ability section
            minHeight: 0, // Allow container to shrink
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={cardStyles.propertyLabel}>Description</div>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: '8px',
              wordBreak: 'break-word'
            }}>
              {maneuver.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;