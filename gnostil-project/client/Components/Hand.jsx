import * as React from "react";
import { useEffect, useState } from "react";
import "../src/App.css";
import HandCard from "./HandCard";
import DropArea from "./DropArea";
import { fetchCharHand, addToHand, updateCardsInHand, addToDeck } from ".";
import { handStyles } from "./Styles/HandStyles";

export default function Hand({ auth, char, cards, setCards, setActiveCard, localCards, setLocalCards, setDeck, setLocalDeck }) {
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

  const handleDrop = async (data, position, macro) => {
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
      const success = await addToHand(auth, char, setCards, data.id, position, macro);
      if (success) {
        // Also add to deck
        await addToDeck(auth, char, setDeck, data.id);
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
        const newCards = updatedCards.map((card, index) => ({
          ...card,
          position: index, // Assign the new index as the position
          macro: macro,
        }));

        setLocalDeck((prevDeck) => {
          if (!prevDeck.some((card) => card.id === data.id)) {
            return [...prevDeck, data];
          }
          return prevDeck;
        });

        return newCards;
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
      onDragLeave={(e) => {
        // Only trigger if leaving the main container
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragging(false);
        }
      }}
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
            <HandCard index={index} card={card} setActiveCard={setActiveCard} />
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