import "./App.css";
import Compendium from "../Components/Compendium";
import Deck from "../Components/Deck";
import { Login } from "../Components/Login";
import { useState, useEffect } from "react";
import Hand from "../Components/Hand";
import CharSelect from "../Components/CharSelect";
import ExaminationArea from "../Components/ExaminationArea";
import Card from "../Components/Card";
import TechniqueOverlay from "../Components/TechniqueOverlay";
import TechCard from "../Components/TechCard";
import { techniqueMessageStyles } from '../Components/Styles/TechOverlayStyles';
import { getActiveProperties } from '../Components/ExaminationArea';
import Tutorial from "../Components/Tutorial";
import { loginStyles } from '../Components/Styles/LoginStyles';
import OrientationWarning from "../Components/OrientationWarning";

function App() {
  const [auth, setAuth] = useState({});
  const [char, setChar] = useState({});
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [localCards, setLocalCards] = useState([]);
  const [localDeck, setLocalDeck] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedManeuver, setSelectedManeuver] = useState(null);
  const [hexagonStates, setHexagonStates] = useState({
    hex1: null,
    hex2: null,
    hex3: null,
    hex4: null,
    hex5: null,
    hex6: null
  });
  const [technique, setTechnique] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  console.log(localDeck)

  const hasAnyManeuvers = Object.values(hexagonStates).some(state => state !== null);

  const getManeuverCount = (hexStates) => {
    return Object.values(hexStates).filter(state => state !== null).length;
  };

  const handleCancelTechnique = () => {
    setHexagonStates({
      hex1: null,
      hex2: null,
      hex3: null,
      hex4: null,
      hex5: null,
      hex6: null
    });
  };

  const handleConfirmTechnique = () => {
    const maneuvers = Object.values(hexagonStates).filter(m => m !== null);
    const properties = getActiveProperties(hexagonStates);

    setTechnique({
      activeProperties: properties,
      maneuvers: maneuvers
    });

    setHexagonStates({
      hex1: null,
      hex2: null,
      hex3: null,
      hex4: null,
      hex5: null,
      hex6: null
    });
  };

  useEffect(() => {
    // Clear everything on page load/refresh
    localStorage.clear();
    setAuth({});
    setChar({});
    setDeck([]);
    setCards([]);
    setActiveCard(null);
    setSelectedManeuver(null);
    setHexagonStates({
      hex1: null,
      hex2: null,
      hex3: null,
      hex4: null,
      hex5: null,
      hex6: null
    });
    setTechnique(null);
  }, []);

  useEffect(() => {
    if (!auth.id) {
      setChar({});
      setDeck([]);
      setCards([]);
      setActiveCard(null);
      setSelectedManeuver(null);
      setHexagonStates({
        hex1: null,
        hex2: null,
        hex3: null,
        hex4: null,
        hex5: null,
        hex6: null
      });
      setTechnique(null);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.id) {
      const savedLocalCards = JSON.parse(localStorage.getItem("localCards")) || [];
      setLocalCards(savedLocalCards);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.id) {
      localStorage.setItem("localCards", JSON.stringify(localCards));
    }
  }, [localCards]);

  useEffect(() => {
    if (!auth.id) {
      const savedLocalDeck = JSON.parse(localStorage.getItem("localDeck")) || [];
      setLocalDeck(savedLocalDeck);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.id) {
      localStorage.setItem("localDeck", JSON.stringify(localDeck));
    }
  }, [localDeck]);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if device is mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setIsPortrait(window.innerHeight > window.innerWidth);
      } else {
        setIsPortrait(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (isPortrait) {
    return <OrientationWarning />;
  }

  return (
    <>
      {/* Header Section */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        padding: '0 20px',
        zIndex: 1000,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
                  }}>
            <div style={{
              fontFamily: 'UnifrakturMaguntia',
              fontSize: '32px',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}>
              Gnostil
                      </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <CharSelect
              auth={auth}
              char={char}
              setChar={setChar}
              currentUser={currentUser}
            />
            <Login setAuth={setAuth} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>
        </div>

        {/* Technique Creation Message */}
        {hasAnyManeuvers && (
          <div style={techniqueMessageStyles.messageContainer}>
            <span style={techniqueMessageStyles.message}>
              Create Technique:
            </span>
            <button
              style={{
                ...techniqueMessageStyles.button,
                opacity: getManeuverCount(hexagonStates) < 2 ? 0.5 : 1,
                cursor: getManeuverCount(hexagonStates) < 2 ? 'not-allowed' : 'pointer'
              }}
              onClick={handleConfirmTechnique}
              disabled={getManeuverCount(hexagonStates) < 2}
            >
              Confirm
            </button>
            <button
              style={loginStyles.logoutButton}
              onClick={handleCancelTechnique}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Tutorial component */}
      {showTutorial && (
        <Tutorial onClose={() => setShowTutorial(false)} />
      )}

      {/* Middle Section Container */}
      <div style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        bottom: '25%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '20px',
        pointerEvents: 'auto',
        overflow: 'hidden',
        zIndex: 1,
        WebkitUserDrag: 'none',
        MozUserDrag: 'none'
      }}>
        {/* Left Component - Deck */}
        <div style={{
              flex: '1 1 0',
              minWidth: 0,
              width: '33.333%'
            }}>
          <Deck
            auth={auth}
            char={char}
            deck={deck}
            cards={cards}
            setDeck={setDeck}
            setCards={setCards}
            setSelectedManeuver={setSelectedManeuver}
            localDeck={localDeck}
            setLocalDeck={setLocalDeck}
            localCards={localCards}
            setLocalCards={setLocalCards}
          />
        </div>

        {/* Middle Component - Card/ExaminationArea */}
        <div style={{
              flex: '1 1 0',
              minWidth: 0,
              width: '33.333%',
              position: 'relative'
            }}>
          {!technique && (
            <TechniqueOverlay
              selectedManeuver={selectedManeuver}
              setSelectedManeuver={setSelectedManeuver}
              hexagonStates={hexagonStates}
              setHexagonStates={setHexagonStates}
              auth={auth}
              char={char}
            />
          )}
          {technique ? (
            <TechCard
              setTechnique={setTechnique}
              activeProperties={technique.activeProperties}
              maneuvers={technique.maneuvers}
              localDeck={localDeck}
              setLocalDeck={setLocalDeck}
              auth={auth}
              char={char}
              deck={deck}
              setDeck={setDeck}
            />
          ) : selectedManeuver ? (
            <Card maneuver={selectedManeuver} setSelectedManeuver={setSelectedManeuver} />
          ) : (
            <ExaminationArea
              setSelectedManeuver={setSelectedManeuver}
              hexagonStates={hexagonStates}
            />
          )}
        </div>

        {/* Right Component - Compendium */}
        <div style={{
              flex: '1 1 0',
              minWidth: 0,
              width: '33.333%'
            }}>
          <Compendium
            setSelectedManeuver={setSelectedManeuver}
            auth={auth}
            char={char}
            deck={deck}
            setDeck={setDeck}
            cards={cards}
            setCards={setCards}
            localDeck={localDeck}
            setLocalDeck={setLocalDeck}
            localCards={localCards}
            setLocalCards={setLocalCards}
          />
        </div>
      </div>

      {/* Hand Component */}
      <div style={{
        position: 'fixed',
        bottom: 5,
        left: 0,
        right: 0,
        height: '22.5%',
      }}>
        <Hand
          auth={auth}
          deck={deck}
          char={char}
          setDeck={setDeck}
          cards={cards}
          setCards={setCards}
          localDeck={localDeck}
          setLocalDeck={setLocalDeck}
          localCards={localCards}
          setLocalCards={setLocalCards}
          setActiveCard={setActiveCard}
          setSelectedManeuver={setSelectedManeuver} 
        />
      </div>
    </>
  );
}

export default App;