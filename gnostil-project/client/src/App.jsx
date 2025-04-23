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
  const [activeCard, setActiveCard] = useState(null);
  const [selectedManeuver, setSelectedManeuver] = useState(null);

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

  return (
    <>
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

      <div>
        {selectedManeuver ? (
          <div>
            <Card maneuver={selectedManeuver} setSelectedManeuver={setSelectedManeuver} />
          </div>
        ) : (
          <ExaminationArea />
        )}
      </div>

      <Deck
        auth={auth}
        char={char}
        deck={deck}
        setDeck={setDeck}
        setSelectedManeuver={setSelectedManeuver}
      />
      <Compendium
      setSelectedManeuver={setSelectedManeuver}
      auth={auth}
      char={char}
      cards={cards}
      setCards={setCards}
      localCards={localCards}
      setLocalCards={setLocalCards}
      />
      <Hand
        auth={auth}
        deck={deck}
        char={char}
        cards={cards}
        setCards={setCards}
        localCards={localCards}
        setLocalCards={setLocalCards}
        setActiveCard={setActiveCard}
      />
    </>
  );
}

export default App;