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
  const [activeCard, setActiveCard] = useState(null);
  const [selectedManeuver, setSelectedManeuver] = useState(null);

  useEffect(() => {
    // Clear token on page load/refresh
    localStorage.clear();
    setAuth({});
    setChar({});
  }, []);

  return (
    <>
      <div>
      {selectedManeuver ? (
        <div>
          <Card maneuver={selectedManeuver} />
          <button
            onClick={() => setSelectedManeuver(null)}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '5px 10px',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
        ) : (
          <ExaminationArea />
        )}
      </div>
      <Login setAuth={setAuth} />
      <CharSelect
        auth={auth}
        char={char}
        setChar={setChar}
      />
      <Deck
        auth={auth}
        char={char}
        deck={deck}
        setDeck={setDeck}
        setSelectedManeuver={setSelectedManeuver}
      />
      <Compendium setSelectedManeuver={setSelectedManeuver} />
      <Hand
        auth={auth}
        deck={deck}
        char={char}
        cards={cards}
        setCards={setCards}
        setActiveCard={setActiveCard}
      />
    </>
  );
}

export default App;