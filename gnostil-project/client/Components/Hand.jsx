import * as React from "react";
import { useEffect, useState } from "react";
import "../src/App.css";
import Card from "./HandCard";
import DropArea from "./DropArea";
import { fetchCharHand, addToHand, updateCardsInHand } from ".";
import { handStyles } from "./Styles/HandStyles";

export default function Hand({ auth, char, cards, setCards, setActiveCard, localCards, setLocalCards }) {
  const [isDragging, setIsDragging] = useState(false); // State to track if a card is being dragged over the hand area
  const [macro, setMacro] = useState(1);

  useEffect(() => {
    if (auth.id && char.id) {
      // Fetch the cards from the database for authenticated users
      fetchCharHand(auth, char, setCards);
    } else {
      // Clear the database-backed cards for unauthenticated users
      setCards([]);
    }
  }, [auth, char]);

  const handleSelectChange = (event) => {
    setMacro(Number(event.target.value));
  };

  const handleDrop = (data, position, macro) => {
    if (auth.id && (!char || !char.id)) {
      return;
    }
    setIsDragging(false); // Hide the drop area after dropping
    if (auth.id) {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];

        // Check if the card is already in the hand
        const existingIndex = updatedCards.findIndex(
          (card) => card.maneuver_name === data.maneuver_name
        );

        if (existingIndex !== -1) {
          // Remove the card from its original position
          updatedCards.splice(existingIndex, 1);
        }

        // Insert the card at the new position
        updatedCards.splice(position, 0, data);

        // Recalculate positions for all cards
        const newCards = updatedCards.map((card, index) => ({
          ...card,
          position: index, // Assign the new index as the position
          macro: macro,
        }));

        updateCardsInHand(auth, char, newCards, setCards);
        return newCards;
      });
      const cardExists = cards.some((card) => card.maneuver_name === data.maneuver_name);
      if (!cardExists) {
        addToHand(auth, char, setCards, data.id, position, macro);
      }
    } else {
      setLocalCards((prevCards) => {
        const updatedCards = [...prevCards];

        // Check if the card is already in the hand
        const existingIndex = updatedCards.findIndex(
          (card) => card.maneuver_name === data.maneuver_name
        );

        if (existingIndex !== -1) {
          // Remove the card from its original position
          updatedCards.splice(existingIndex, 1);
        }

        // Insert the card at the new position
        updatedCards.splice(position, 0, data);

        // Recalculate positions for all cards
        return updatedCards.map((card, index) => ({
          ...card,
          position: index, // Assign the new index as the position
          macro: macro,
        }));
      });
    }
  };

  const handToRender = auth.id ? cards : localCards;
  const sortedHandToRender = [...handToRender].sort((a, b) => a.position - b.position);

  return (
    <div
      style={{
        ...handStyles.container,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes("application/x-maneuver")) {
          setIsDragging(true);
        }
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.types.includes("application/x-maneuver")) {
          const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
          handleDrop(data, 0, macro);
        }
      }}
    >
      <div
        style={{
          ...handStyles.dropArea,
          ...(isDragging ? handStyles.dropAreaActive : {}),
        }}
      />

      <select
        style={handStyles.select}
        value={macro}
        onChange={handleSelectChange}
      >
        <option value={1}>Macro 1</option>
        <option value={2}>Macro 2</option>
        <option value={3}>Macro 3</option>
      </select>

      <DropArea onDrop={(data) => handleDrop(data, 0, macro)} />

      <div style={handStyles.cardsContainer}>
        {sortedHandToRender.map((card, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Card index={index} card={card} setActiveCard={setActiveCard} />
            <DropArea
              index={index}
              onDrop={(data) => {
                if (data.position === undefined) {
                  handleDrop(data, index + 1, macro);
                } else if (data.position === index || data.position - 1 === index) {
                  handleDrop(data, data.position, macro);
                } else if (index === 0) {
                  handleDrop(data, index + 1, macro);
                } else if (data.position > index) {
                  handleDrop(data, index + 1, macro);
                } else {
                  handleDrop(data, index, macro);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}