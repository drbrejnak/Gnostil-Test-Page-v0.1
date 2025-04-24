export const techOverlayStyles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '4vh'
  },
  centerGap: {
    width: '20vh'
  },
  column: {
    position: 'relative',
    width: '6vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20vh',
    height: '100%'
  },
  hexagonContainer: {
    position: 'absolute',
    width: '6vh',
    zIndex: 2,
  },
  leftHexagon: {
    right: "5vh"
  },
  rightHexagon: {
    left: "5vh"
  },
  hexagonPositions: {
    firstColumn: {
      top: "calc(50% - 3.5vh)"
    },
    secondTop: {
      top: "5%",
      right: "100%"
    },
    secondBottom: {
      bottom: "calc(7vh + 5%)",
      right: "100%"
    },
    thirdTop: {
      top: "5%",
      left: "100%"
    },
    thirdBottom: {
      bottom: "calc(7vh + 5%)",
      left: "100%"
    },
    thirdColumn: {
      top: "calc(50% - 3.5vh)"
    }
  }
};

export const techniqueMessageStyles = {
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2vh'
  },
  message: {
    color: 'white',
    fontSize: '2.5vh',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: "rgba(51, 51, 51, 0.9)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "6px",
    height: "32px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    padding: "0 16px"
  }
};