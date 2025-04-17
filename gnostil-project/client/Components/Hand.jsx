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
    bottom: 10,
    width: "100%",
    height: "25%",
  };

  const dropAreaStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
    display: isDragging ? "block" : "none", // Show only when dragging
    zIndex: 1,
  };
  console.log(cards)
  const handleDrop = (data, position, macro) => {
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

// useEffect(() => {
//     if (auth.id) {
//         updateCardsInHand(auth, char, cards, setCards);
//     }
// }, [auth]);

  const handToRender = auth.id ? cards : localCards;
  const sortedHandToRender = [...handToRender].sort((a, b) => a.position - b.position);

  return (
    <div
      style={{ ...boxStyle, display: "flex", flexDirection: "row", alignItems: "center" }}
      onDragOver={(e) => {
        e.preventDefault();
        if(e.dataTransfer.types.includes("application/x-maneuver")) {
            setIsDragging(true); // Show the drop area when dragging over
        }
      }}
      onDragLeave={() => setIsDragging(false)} // Hide the drop area when dragging out
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false); // Hide the drop area after dropping
        if (e.dataTransfer.types.includes("application/x-maneuver")) {
          const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
          handleDrop(data, 0, macro);
        }
      }}
    >
      {/* Drop Area Overlay */}
      <div style={dropAreaStyle}></div>

      <select
        style={{ top: 10, position: "absolute", left: 100 }}
        value={macro}
        onChange={handleSelectChange}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <DropArea onDrop={(data) => handleDrop(data, 0, macro)} />
      {sortedHandToRender.map((card, index) => (
        <div
          key={index}
          style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "66%" }}
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
  );
}