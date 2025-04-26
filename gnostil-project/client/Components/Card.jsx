import React from 'react';
import '../src/App.css';
import { cardStyles } from './Styles/CardStyles';

const Hexagon = () => (
  <div style={{
    flex: '0 0 16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 104 120"
    >
      <path
        d="M52 0 L104 30 L104 90 L52 120 L0 90 L0 30 Z"
        fill="rgba(255, 0, 0, 0.5)"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  </div>
);

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
        flex: '1 1 50%',
        minHeight: 0
      })
    };

    if (maneuver?.is_technique) {
      const abilities = JSON.parse(maneuver.ability);
      return (
        <div style={abilityStyle}>
          <div style={cardStyles.propertyLabel}>Combined Abilities</div>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            wordBreak: 'break-word',
            margin: '8px',
          }}>
            {abilities.map((ability, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {ability.name}:
                </div>
                <div>{ability.text}</div>
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
      <div style={{
        ...cardStyles.header,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <div style={cardStyles.title}>
          {maneuver?.maneuver_name || 'Maneuver Name'}
        </div>
        {maneuver?.is_technique ? (
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}>
            {[...Array(maneuver.inputs)].map((_, index) => (
                <Hexagon key={index} />
            ))}
          </div>
        ) : (
          <div style={cardStyles.subtitle}>
            {maneuver?.discipline || 'Discipline'}
          </div>
        )}
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
        gap: '5px'
      }}>
        {renderAbility()}

        {maneuver?.description && (
          <div style={{
            ...cardStyles.wording,
            flex: '1 1 50%', 
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={cardStyles.propertyLabel}>Description</div>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
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