import * as React from "react";
import { useEffect, useState } from "react";
import "../src/App.css";
import Card from "./HandCard";
import DropArea from "./DropArea";
import { fetchCharHand, addToHand, updateCardsInHand } from ".";

export default function Hand({ auth, char, cards, setCards, setActiveCard }) {
  const [localCards, setLocalCards] = useState([]); // Local cards state for unauthenticated users
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

  const handleSelectChange = (event) => {
    setMacro(Number(event.target.value));
  };

  const handStyles = {
    container: {
      backgroundColor: "#1a1a1a",
      display: "flex",
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "96vw",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 10,
      width: "100%",
      height: "30%",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
    },
    dropArea: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      display: "none",
      zIndex: 1,
      borderRadius: "15px",
      transition: "background-color 0.2s ease",
    },
    dropAreaActive: {
      display: "block",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    select: {
      position: "absolute",
      top: "10px",
      left: "20px",
      backgroundColor: "#252525",
      color: "white",
      border: "1px solid #333",
      borderRadius: "4px",
      padding: "6px",
      fontSize: "12px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#333",
      },
    },
    cardsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "0 20px",
      overflowX: "auto",      // Allow horizontal scrolling if needed
      overflowY: "hidden",    // Prevent vertical scrolling
    },
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