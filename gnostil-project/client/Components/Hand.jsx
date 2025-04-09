import * as React from "react";
import { useEffect, useState } from "react";
import '../src/App.css'
import Card from "./Card";
import DropArea from "./DropArea";

const host = "http://localhost:3000"

export default function Hand({ auth, deck, cards, setCards, setActiveCard, onDrop }) {

    const [macro, setMacro] = useState(1);

    const handleSelectChange = (event) => {
        setMacro(Number(event.target.value));
    };

    const boxStyle = {
        backgroundColor: "#dadada",
        margin: 10,
        display: "flex",
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "96vw",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 50,
        width: "100%",
        height: "100px"
    };

    const handleDrop = (data, position) => {
        setCards((prevCards) => {
            const updatedCards = [...prevCards];

            // Check if the card is already in the hand
            const existingIndex = updatedCards.findIndex(card => card.name === data.name);

            if (existingIndex !== -1) {
                // Remove the card from its original position
                updatedCards.splice(existingIndex, 1);
            }

            // Insert the card at the new position
            updatedCards.splice(position, 0, data);

            return updatedCards;
        });
    };

    // localStorage.clear();

    return (
        <div
            style={{ ...boxStyle, display: "flex", flexDirection: "row", alignItems: "center" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.types.includes("application/x-maneuver")) {
                  const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
                  setCards((prevCards) => {
                      if (!prevCards.some(card => card.name === data.name)) {
                          return [...prevCards, data];
                      }
                      return prevCards;
                  });
              }
            }}
        >
        <select
        style={{ top: 10, position: "absolute", left: 100 }}
        value={macro}
        onChange={handleSelectChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </select>
        <DropArea onDrop={(data) => handleDrop(data, 0)} />
            {cards.map((card, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Card index={index} card={card} setActiveCard={setActiveCard} />
                    <DropArea onDrop={(data) => handleDrop(data, index + 1)} />
                </div>
            ))}
        </div>
    );
}