import * as React from "react";
import { useEffect, useState } from "react";
import "../src/App.css";
import HandCard from "./HandCard";
import DropArea from "./DropArea";
import { fetchCharHand, addToHand, updateCardsInHand, addToDeck } from ".";
import { handStyles } from "./Styles/HandStyles";

export default function Hand({
  auth,
  char,
  cards,
  setCards,
  setActiveCard,
  localCards,
  setLocalCards,
  setDeck,
  setLocalDeck,
  setSelectedManeuver
}) {
  const [isDragging, setIsDragging] = useState(false); // State to track if a card is being dragged over the hand area

  useEffect(() => {
    if (auth.id && char.id) {
      // Fetch the cards from the database for authenticated users
      fetchCharHand(auth, char, setCards);
    } else {
      // Clear the database-backed cards for unauthenticated users
      setCards([]);
    }
  }, [auth, char]);

  const handleDrop = async (data, position) => {
    if (auth.id && (!char || !char.id)) {
      return;
    }
    setIsDragging(false);

    // Check for 9 card limit
    const currentCards = auth.id ? cards : localCards;
    if (currentCards.length >= 9) {
      return; // Do nothing if trying to add a 10th card
    }

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

        // Recalculate positions
        const newCards = updatedCards.map((card, index) => ({
          ...card,
          position: index,
        }));

        updateCardsInHand(auth, char, newCards, setCards);
        return newCards;
      });

      const success = await addToHand(auth, char, setCards, data.id, position);
      if (success) {
        await addToDeck(auth, char, setDeck, data.id);
      }
    } else {
      setLocalCards((prevCards) => {
        // Check if adding would exceed 9 cards
        if (prevCards.length >= 9) {
          return prevCards;
        }

        const updatedCards = [...prevCards];
        const existingIndex = updatedCards.findIndex(
          (card) => card.maneuver_name === data.maneuver_name
        );

        if (existingIndex !== -1) {
          updatedCards.splice(existingIndex, 1);
        }

        updatedCards.splice(position, 0, data);

        const newCards = updatedCards.map((card, index) => ({
          ...card,
          position: index,
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
          handleDrop(data, 0);
        }
      }}
    >
      <div
        style={{
          ...handStyles.dropArea,
          ...(isDragging ? handStyles.dropAreaActive : {}),
        }}
      />

      <DropArea onDrop={(data) => handleDrop(data, 0)} />

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
            <HandCard
              index={index}
              card={card}
              setActiveCard={setActiveCard}
              setSelectedManeuver={setSelectedManeuver}  // Pass to HandCard
            />
            <DropArea
              index={index}
              onDrop={(data) => {
                if (data.position === undefined) {
                  handleDrop(data, index + 1);
                } else if (data.position === index || data.position - 1 === index) {
                  handleDrop(data, data.position);
                } else if (index === 0) {
                  handleDrop(data, index + 1);
                } else if (data.position > index) {
                  handleDrop(data, index + 1);
                } else {
                  handleDrop(data, index);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}