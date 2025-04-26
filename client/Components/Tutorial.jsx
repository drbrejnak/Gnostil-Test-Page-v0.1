import React, { useState, useEffect } from 'react';
import { loginStyles } from './Styles/LoginStyles';
import Cookies from 'js-cookie';

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('tutorialManuallyOpened')) {
      const hasSkipped = Cookies.get('skipTutorial');
      if (hasSkipped === 'true') {
        onClose();
      }
    }
    return () => localStorage.removeItem('tutorialManuallyOpened');
  }, [onClose]);

  const handleSkip = () => {
    Cookies.set('skipTutorial', 'true', { expires: 1 });
    onClose();
  };

  const createMaskGradient = (maskConfig) => {
    const { horizontal, vertical } = maskConfig;
    const gradients = [];

    if (horizontal) {
      gradients.push(`linear-gradient(to right, ${horizontal})`);
    }

    if (vertical) {
      gradients.push(`linear-gradient(to bottom, ${vertical})`);
    }

    return gradients.join(',');
  };

  const getOverlayStyle = (currentStep) => {
    const baseOverlay = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      backgroundColor: 'transparent',
    };

    const baseBlur = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    const maskConfigs = {
      0: null, // Full blur
      1: { // Compendium
        horizontal: 'rgba(0, 0, 0, 1) 66.666%, rgba(0, 0, 0, 0) 66.666%, rgba(0, 0, 0, 0) 100%',
        vertical: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 75%'
      },
      2: { // Examination Area
        horizontal: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 33.333%, rgba(0, 0, 0, 0) 33.333%, rgba(0, 0, 0, 1) 100%',
        vertical: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 75%'
      },
      3: { // Deck
        horizontal: 'rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 33.333%, rgba(0, 0, 0, 1) 33.333%, rgba(0, 0, 0, 1) 100%',
        vertical: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 75%'
      },
      4: { // Hand
        vertical: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 77.5%, rgba(0, 0, 0, 0) 77.5%, rgba(0, 0, 0, 0) 100%'
      },
      5: { // Techniques
        horizontal: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 33.333%, rgba(0, 0, 0, 0) 33.333%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 66.666%, rgba(0, 0, 0, 1) 66.666%, rgba(0, 0, 0, 1) 100%',
        vertical: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 75%'
      },
      6: { // Login/Register
        horizontal: 'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%',
        vertical: 'rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 80px, rgba(0, 0, 0, 1) 80px, rgba(0, 0, 0, 1) 100%'
      },
      7: null
    };

    const maskConfig = maskConfigs[currentStep];
    if (!maskConfig) {
      return { overlay: baseOverlay, blur: baseBlur };
    }

    const maskImage = createMaskGradient(maskConfig);
    return {
      overlay: baseOverlay,
      blur: {
        ...baseBlur,
        maskImage,
        WebkitMaskImage: maskImage
      }
    };
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
                PLEASE NOTE: The Gnostil game system is still in development and this application is currently a work in progress. None of the content or mechanics presented here should be considered reflective of the final product.
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
                Unlike many other RPG systems, which present players with a list of roles or classes that determine their abilities, Gnostil instead presents Players with a wide variety of <strong>Maneuvers</strong> that can be used o create your own unique role as a character.
            </>
        ),
        position: "center"
    },
    {
        title: "Examination Area",
        content: (
            <>
                To view a Maneuver's properties, abilities, and other information, you may either click on the Maneuver in the Compendium or drag and drop it into the Examination Area.
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
                <br />
                <br />
                To remove a Maneuver, drag and drop it from the Deck or Hand over the Compendium area. To remove multiple maneuvers at once, check the ones you wish to remove, then press the Delete button in the table header.
                <br />
                <br />
                Maneuvers removed from the Deck will also be removed from the Hand.
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
                A hand may hold up to 9 Maneuvers at a time, and you may drag and drop Maneuvers from the Compendium or the Deck into the Hand area to add them to your character's Hand.
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
                To create a <strong>Technique</strong>, simply drag and drop two ore more Maneuvers into the <strong>Hexagonal Inputs</strong>.
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
                However, if you would like to save your Deck and Hand layout as well as your Techniques, be sure to register your User Profile.
                <br />
                <br />
                Once registered, you may create individual Character Profiles which will securely store your Deck, Hand, and Techniques for future use.
            </>
        ),
        position: "center"
    },
    {
        title: "Thank You!",
        content: (
            <>
                Thank you for your interest in Gnostil!
                <br />
                <br />
                Be sure to check back often as more content and features are made available!
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
                top: '25%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            } : currentStep === 3 ? {
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            } : currentStep === 5 ? {
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            } : {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }),
            maxWidth: '400px',
            padding: '20px',
            zIndex: 1001,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
        }}>
            {/* Content */}
            <h2 style={{
                color: 'white',
                margin: "0",
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                letterSpacing: '0.3px'
            }}>
                {tutorialSteps[currentStep].title}
            </h2>
            <p style={{
                color: 'white',
                margin: "0",
                textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                letterSpacing: '0.2px',
                lineHeight: '1.5'
            }}>
                {tutorialSteps[currentStep].content}
            </p>

            {/* Navigation buttons */}
            <div style={{
                display: 'flex',
                justifyContent: currentStep === 0 ? 'space-between' : 'center',
                gap: '10px',
                marginTop: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px'
                }}>
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
                {currentStep === 0 && (
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
                )}
            </div>
        </div>
    </>
);
};

export default Tutorial;