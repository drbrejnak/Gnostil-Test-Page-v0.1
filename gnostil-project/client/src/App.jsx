import "./App.css";
import Compendium from "../Components/Compendium";
import Deck from "../Components/Deck";
import { Login } from "../Components/Login";
import { useState, useEffect } from "react";
import Hand from "../Components/Hand";
import CharSelect from "../Components/CharSelect";
import ExaminationArea from "../Components/ExaminationArea";
import Card from "../Components/Card";

function App() {
  const [auth, setAuth] = useState({});
  const [char, setChar] = useState({});
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [localCards, setLocalCards] = useState([]);
  const [localDeck, setLocalDeck] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedManeuver, setSelectedManeuver] = useState(null);
  console.log(selectedManeuver)

  useEffect(() => {
    // Clear token on page load/refresh
    localStorage.clear();
    setAuth({});
    setChar({});
  }, []);

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

  return (
    <>
      {/* Header Section */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1000,
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
          />
          <Login setAuth={setAuth} />
        </div>
      </div>

      {/* Middle Section Container */}
      <div style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        bottom: '150px',
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
              height: '100%', // Ensure full height
              position: 'relative' // Add this for proper child positioning
            }}>
          {selectedManeuver ? (
            <Card maneuver={selectedManeuver} setSelectedManeuver={setSelectedManeuver} />
          ) : (
            <ExaminationArea setSelectedManeuver={setSelectedManeuver} />
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
        height: '22.5%', // Fixed height for Hand component
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
          setSelectedManeuver={setSelectedManeuver} // Add this prop
        />
      </div>
    </>
  );
}

export default App;