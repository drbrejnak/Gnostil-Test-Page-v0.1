import React from 'react';

const TechniqueOverlay = () => {
  const styles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 2,
      display: 'flex',
      justifyContent: 'center', // Changed from space-between
      gap: '4vh' // Small default gap
    },
    centerGap: {
      width: '20vh' // Large gap in the center
    },
    column: {
      position: 'relative',
      width: '6vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Changed from space-between
      gap: '20vh', // Added gap for consistent spacing
      height: '100%'
    },
    hexagonContainer: {
      position: 'absolute',
      width: '6vh'
    },
    leftHexagon: {
      right: "5vh"
    },
    middleHexagon: {
      left: '50%',
      transform: 'translateX(-50%)'
    },
    rightHexagon: {
      left: "5vh"
    },
    hexagonPositions: {
      firstColumn: {
        top: "calc(50% - 3.5vh)"
      },
      secondTop: {
        top: 0
      },
      secondBottom: {
        bottom: "7vh"
      },
      thirdTop: {
        top: 0
      },
      thirdBottom: {
        bottom: "7vh"
      },
      thirdColumn: {
        top: "calc(50% - 3.5vh)"
      }
    }
  };

  const Hexagon = ({ style }) => (
    <div style={style}>
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
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Left pair */}
      <div style={{ display: 'flex', gap: '4vh' }}>
        {/* First column - 1 hexagon */}
        <div style={styles.column}>
          <Hexagon style={{
            ...styles.hexagonContainer,
            ...styles.leftHexagon,
            ...styles.hexagonPositions.firstColumn
          }} />
        </div>

        {/* Second column - 2 hexagons */}
        <div style={styles.column}>
          <Hexagon style={{
            ...styles.hexagonContainer,
            ...styles.middleHexagon,
            ...styles.hexagonPositions.secondTop
          }} />
          <Hexagon style={{
            ...styles.hexagonContainer,
            ...styles.middleHexagon,
            ...styles.hexagonPositions.secondBottom
          }} />
        </div>
      </div>

      {/* Center gap */}
      <div style={styles.centerGap} />

      {/* Right pair */}
      <div style={{ display: 'flex', gap: '4vh' }}>
        {/* Third column - 2 hexagons */}
        <div style={styles.column}>
          <Hexagon style={{
            ...styles.hexagonContainer,
            ...styles.middleHexagon,
            ...styles.hexagonPositions.thirdTop
          }} />
          <Hexagon style={{
            ...styles.hexagonContainer,
            ...styles.middleHexagon,
            ...styles.hexagonPositions.thirdBottom
          }} />
        </div>

        {/* Fourth column - 1 hexagon */}
        <div style={styles.column}>
          <Hexagon style={{
            ...styles.hexagonContainer,
            ...styles.rightHexagon,
            ...styles.hexagonPositions.thirdColumn
          }} />
        </div>
      </div>
    </div>
  );
};

export default TechniqueOverlay;