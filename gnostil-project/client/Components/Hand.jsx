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
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (auth.id && char.id) {
      fetchCharHand(auth, char, setCards);
    } else {
      setCards([]);
    }
  }, [auth, char]);

  const handleDrop = async (data, position) => {
    if (auth.id && !char.id) return;

    setIsDragging(false);

    const currentCards = auth.id ? cards : localCards;
    if (currentCards.length >= 9) return;

    if (auth.id) {
      const isTechnique = data.discipline === "Technique";

      const success = await addToHand(
        auth,
        char,
        setCards,
        data.id,
        position,
        isTechnique
      );

      if (success && !isTechnique) {
        await addToDeck(
          auth,
          char,
          setDeck,
          data.id,
          null
        );
      }

      if (success) {
        const updatedCards = [...cards];
        const existingIndex = updatedCards.findIndex(
          (card) => card.id === data.id
        );
        if (existingIndex !== -1) {
          updatedCards.splice(existingIndex, 1);
        }
        updatedCards.splice(position, 0, data);
        const newCards = updatedCards.map((card, index) => ({
          ...card,
          position: index,
        }));
        await updateCardsInHand(auth, char, newCards, setCards);
      }
    } else {
      setLocalCards((prevCards) => {
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
        cursor: auth.id && !char.id ? 'not-allowed' : 'default',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      onDragOver={(e) => {
        if (auth.id && !char.id) return;
        e.preventDefault();
        if (e.dataTransfer.types.includes("application/x-maneuver")) {
          setIsDragging(true);
        }
      }}
      onDragLeave={(e) => {
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
              setSelectedManeuver={setSelectedManeuver}  
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