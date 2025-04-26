import React from 'react';
import { useState } from 'react';
import { techOverlayStyles } from './Styles/TechOverlayStyles';

const TechniqueOverlay = ({ selectedManeuver, hexagonStates, setHexagonStates }) => {
  if (selectedManeuver) return null;

  const Hexagon = ({ style, hexId }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const hasManeuver = hexagonStates[hexId] !== null;

    const handleDragOver = (e) => {
      e.preventDefault();
      if (!hasManeuver) {
        setIsDragOver(true);
      }
    };

    const handleDragLeave = () => {
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);

      // If hexagon already has a maneuver, do nothing
      if (hasManeuver) return;

      // Try both data transfer types
      const maneuverData = e.dataTransfer.getData('application/x-maneuver') ||
                           e.dataTransfer.getData('application/x-card');

      if (!maneuverData) return; // Exit if no valid data found

      try {
        const parsedData = JSON.parse(maneuverData);

        // Check if the maneuver is a Technique
        if (parsedData.discipline === "Technique") return;

        // Check if maneuver already exists in any hexagon
        const isManeuverUsed = Object.values(hexagonStates).some(
          state => state && state.id === parsedData.id
        );

        if (isManeuverUsed) {
          console.log('This maneuver is already assigned to a hexagon');
          return;
        }

        setHexagonStates(prev => ({
          ...prev,
          [hexId]: parsedData
        }));
      } catch (error) {
        console.error('Error parsing maneuver data:', error);
      }
    };

    return (
      <div
        style={{...style, pointerEvents: 'auto'}}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg
          width="52"
          height="60"
          viewBox="0 0 104 120"
          style={{
            width: '6vh',
            height: '7vh'
          }}
        >
          <path
            d="M52 0 L104 30 L104 90 L52 120 L0 90 L0 30 Z"
            fill={hasManeuver ? 'rgba(255, 0, 0, 0.5)' :
                  isDragOver ? 'rgba(255, 99, 71, 0.2)' :
                  'transparent'}
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  return (
    <div style={techOverlayStyles.container}>
      {/* Left pair */}
      <div style={{ display: 'flex', gap: '4vh' }}>
        {/* First column - 1 hexagon */}
        <div style={techOverlayStyles.column}>
          <Hexagon
            hexId="hex1"
            style={{
              ...techOverlayStyles.hexagonContainer,
              ...techOverlayStyles.leftHexagon,
              ...techOverlayStyles.hexagonPositions.firstColumn
            }}
          />
        </div>

        {/* Second column - 2 hexagons */}
        <div style={techOverlayStyles.column}>
          <Hexagon
            hexId="hex2"
            style={{
              ...techOverlayStyles.hexagonContainer,
              ...techOverlayStyles.hexagonPositions.secondTop
            }}
          />
          <Hexagon
            hexId="hex3"
            style={{
              ...techOverlayStyles.hexagonContainer,
              ...techOverlayStyles.hexagonPositions.secondBottom
            }}
          />
        </div>
      </div>

      {/* Center gap */}
      <div style={techOverlayStyles.centerGap} />

      {/* Right pair */}
      <div style={{ display: 'flex', gap: '4vh' }}>
        {/* Third column - 2 hexagons */}
        <div style={techOverlayStyles.column}>
          <Hexagon
            hexId="hex4"
            style={{
              ...techOverlayStyles.hexagonContainer,
              ...techOverlayStyles.hexagonPositions.thirdTop
            }}
          />
          <Hexagon
            hexId="hex5"
            style={{
              ...techOverlayStyles.hexagonContainer,
              ...techOverlayStyles.hexagonPositions.thirdBottom
            }}
          />
        </div>

        {/* Fourth column - 1 hexagon */}
        <div style={techOverlayStyles.column}>
          <Hexagon
            hexId="hex6"
            style={{
              ...techOverlayStyles.hexagonContainer,
              ...techOverlayStyles.rightHexagon,
              ...techOverlayStyles.hexagonPositions.thirdColumn
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TechniqueOverlay;