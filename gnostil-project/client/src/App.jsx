import "./App.css";
import Modify from "../Maneuver_Properties/Modify";
import Light from "../Maneuver_Properties/Light";
import Honorable from "../Maneuver_Properties/Honorable";
import Combat from "../Maneuver_Properties/Combat";
import Narrative from "../Maneuver_Properties/Narrative";
import Infamous from "../Maneuver_Properties/Infamous";
import Heavy from "../Maneuver_Properties/Heavy";
import Attack from "../Maneuver_Properties/Attack";
import Rings from "../Maneuver_Properties/Rings";
import Aura from "../Maneuver_Properties/Aura";
import Reaction from "../Maneuver_Properties/Reaction";
import Inciting from "../Maneuver_Properties/Inciting";
import Compendium from "../Components/Compendium";
import Deck from "../Components/Deck";
import { Login } from "../Components/Login";
import { useState, useEffect } from "react";
import Hand from "../Components/Hand";

const prevCards = localStorage.getItem("cards")

function App() {
  const [auth, setAuth] = useState({});
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState(JSON.parse(prevCards) || []);
  const [activeCard, setActiveCard] = useState(null)

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);
  console.log(cards)

  return (
    <>
      <div className="container">
        <Rings />
        <Combat />
        {/* <Narrative /> */}
        <Honorable />
        {/* <Infamous /> */}
        <Light />
        {/* <Heavy /> */}
        {/* <Attack /> */}
        {/* <Aura /> */}
        <Inciting />
        {/* <Modify /> */}
        {/* <Reaction /> */}
      </div>
      <Login setAuth={setAuth} />
      <Deck auth={auth} deck={deck} setDeck={setDeck} />
      <Compendium />
      <Hand deck={deck} cards={cards} setCards={setCards} setActiveCard={setActiveCard} />
    </>
  );
}

export default App;
