import React, { useState, useEffect } from 'react';
import { loginStyles } from './Styles/LoginStyles';
import Cookies from 'js-cookie';  // You'll need to npm install js-cookie

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Check for skip preference on mount
  useEffect(() => {
    const hasSkipped = Cookies.get('skipTutorial');
    if (hasSkipped === 'true') {
      onClose();
    }
  }, [onClose]);

  const handleSkip = () => {
    Cookies.set('skipTutorial', 'true', { expires: 1 });
    onClose();
  };

  const getOverlayStyle = (currentStep) => {
    if (currentStep === 0) {
      return {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'transparent',
        },
        blur: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      };
    } else if (currentStep === 1) {
      return {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'transparent',
        },
        blur: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          maskImage: `linear-gradient(to right,
            rgba(0, 0, 0, 1) 66.666%,
            rgba(0, 0, 0, 0) 66.666%,
            rgba(0, 0, 0, 0) 100%,
            rgba(0, 0, 0, 1) 100%
            ),
            linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 80px,
            rgba(0, 0, 0, 0) 75%,
            rgba(0, 0, 0, 1) 75%
            )`,
          WebkitMaskImage: `linear-gradient(to right,
            rgba(0, 0, 0, 1) 66.666%,
            rgba(0, 0, 0, 0) 66.666%,
            rgba(0, 0, 0, 0) 100%,
            rgba(0, 0, 0, 1) 100%
            ),
            linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 80px,
            rgba(0, 0, 0, 0) 75%,
            rgba(0, 0, 0, 1) 75%
            )`
        }
      };
    } else if (currentStep === 2) {
        return {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'transparent',
          },
          blur: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            maskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 1) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 75%
              )`,
            WebkitMaskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 1) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 75%
              )`
          }
        };
      } else if (currentStep === 3) {
        return {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'transparent',
          },
          blur: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            maskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 1) 33.333%,
              rgba(0, 0, 0, 1) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 75%
              )`,
            WebkitMaskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 1) 33.333%,
              rgba(0, 0, 0, 1) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 75%
              )`
          }
        };
      } else if (currentStep === 4) {
        return {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'transparent',
          },
          blur: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            maskImage: `
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 77.5%,
              rgba(0, 0, 0, 0) 77.5%,
              rgba(0, 0, 0, 0) 100%
              )`,
            WebkitMaskImage: `
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 77.5%,
              rgba(0, 0, 0, 0) 77.5%,
              rgba(0, 0, 0, 0) 100%
              )`
          }
        };
      } else if (currentStep === 5) {
        return {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'transparent',
          },
          blur: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            maskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 33.333%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 1) 45%,
              rgba(0, 0, 0, 1) 55%,
              rgba(0, 0, 0, 0) 66.666%,
              rgba(0, 0, 0, 1) 66.666%,
              rgba(0, 0, 0, 1) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 75%
              )`,
            WebkitMaskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 33.333%,
              rgba(0, 0, 0, 0) 33.333%,
              rgba(0, 0, 0, 1) 45%,
              rgba(0, 0, 0, 1) 55%,
              rgba(0, 0, 0, 0) 66.666%,
              rgba(0, 0, 0, 1) 66.666%,
              rgba(0, 0, 0, 1) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 75%
              )`
          }
        };
      } else if (currentStep === 6) {
        return {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'transparent',
          },
          blur: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            maskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 75%,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 0) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 1) 80px,
              rgba(0, 0, 0, 1) 100%
              )`,
            WebkitMaskImage: `linear-gradient(to right,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) 75%,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 0) 100%
              ),
              linear-gradient(to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 80px,
              rgba(0, 0, 0, 1) 80px,
              rgba(0, 0, 0, 1) 100%
              )`
          }
        };
      }
    return loginStyles.loginOverlay;
  };

  // Tutorial content
  const tutorialSteps = [
    {
        title: "Welcome to Gnostil",
        content: (
            <>
                This web application will serve as a technical demo for the digital character creator tool of the Gnostil TTRPG system.
                <br />
                <br />
                PLEASE NOTE: The Gnostil game system is still in development and this application is currently a work in progress. None of the content presented here should be considered reflective of the final product.
                <br />
                <br />
                You may exit this tutorial at any time by pressing the <strong>ESC</strong> key or by pressing "Don't Show Again" (you may view it again at any time by pressing the help button in the upper right corner).
            </>
        ),
        position: "center"
    },
    {
        title: "The Maneuver Compendium",
        content: (
            <>
                This Compendium table provides a full catalogue of Gnostil's <strong>Maneuvers</strong>.
                <br />
                <br />
                Unlike many other RPG systems which present players with a list of classes that determine their abilities, Gnostil instead presents Players with a wide variety of <strong>Maneuvers</strong> that can be used o create your own unique role as a character.
            </>
        ),
        position: "center"
    },
    {
        title: "Examination Area",
        content: (
            <>
                To view a Maneuver's properties, abilities, and other information, you may either click on the Maneuver in the compendium or drag and drop it into the Examination Area.
            </>
        ),
        position: "center"
    },
    {
        title: "The Deck",
        content: (
            <>
                The Deck area is where you will build your character's unique set of Maneuvers.
                <br />
                <br />
                You may drag and drop Maneuvers from the Compendium into the Deck area to add them to your character's Deck.
            </>
        ),
        position: "center"
    },
    {
        title: "The Hand",
        content: (
            <>
                The Hand area serves as a convenient way to access Maneuvers you find yourself using more often than others.
                <br />
                <br />
                A hand may hold up to 9 Maneuvers at a time, and you may drag and drop Maneuvers from the Compendium or the Deck into the Hand area to add them to your character's Hand
                <br />
                <br />
                Maneuvers added directly from the Compendium will also automatically be added to the Deck.
            </>
        ),
        position: "center"
    },
    {
        title: "Techniques",
        content: (
            <>
                You may also combine two or more Maneuvers together to create a <strong>Technique</strong>.
                <br />
                <br />
                A <strong>Technique</strong> is a special type of Maneuver that combines the attributes and abilities of individual Maneuvers to create powerful new skills unique to your character and playstyle.
                <br />
                <br />
                To create a <strong>Technique</strong>, simply drag and drop two ore more Maneuvers into the hexagonal Inputs surrouding the Examination Area.
            </>
        ),
        position: "center"
    },
    {
        title: "Account Verification & Character Creation",
        content: (
            <>
                You are free to experiment with the listed Maneuvers and create Techniques without an account.
                <br />
                <br />
                However, exiting or refreshing this page WILL RESET THE APPLICATION.
                <br />
                <br />
                If you would like to save your Deck/Hand, as well as any created Techniques, you will need to create an account.
                <br />
                <br />
                Once complete, you may create character profiles which will securely store your Deck, Hand, and Techniques for future use.
            </>
        ),
        position: "center"
    },
  ];

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

return (
    <>
        <div style={getOverlayStyle(currentStep).overlay}>
            <div style={getOverlayStyle(currentStep).blur} />
        </div>
        <div style={{
            ...loginStyles.loginContainer,
            position: 'fixed',
            ...(currentStep === 2 ? {
                transform: 'translate(15%, 50%)'
            } : currentStep === 4 ? {
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            } : currentStep === 5 ? {
                transform: 'translate(15%, 20%)',
            } : {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }),
            maxWidth: '400px',
            padding: '20px',
            zIndex: 1001
        }}>
            {/* Content */}
            <h2 style={{ color: 'white', margin: "0" }}>
                {tutorialSteps[currentStep].title}
            </h2>
            <p style={{ color: 'white', margin: "0" }}>
                {tutorialSteps[currentStep].content}
            </p>

            {/* Navigation buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                marginTop: '20px'
            }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        style={{
                            ...loginStyles.loginButton,
                            opacity: currentStep === 0 ? 0.5 : 1
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        style={loginStyles.loginButton}
                    >
                        {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
                <button
                    onClick={handleSkip}
                    style={{
                        ...loginStyles.loginButton,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        fontSize: '0.9em'
                    }}
                >
                    Don't Show Again
                </button>
            </div>
        </div>
    </>
);
};

export default Tutorial;