import "./App.css";
import Compendium from "../Components/Compendium";
import Deck from "../Components/Deck";
import { Login } from "../Components/Login";
import { useState, useEffect } from "react";
import Hand from "../Components/Hand";
import CharSelect from "../Components/CharSelect";
import ExaminationArea from "../Components/ExaminationArea";

function App() {
  const [auth, setAuth] = useState({});
  const [char, setChar] = useState([]);
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null)

  return (
    <>
      <ExaminationArea />
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
      />
      <Compendium />
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