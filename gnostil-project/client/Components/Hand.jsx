import * as React from "react";
import { useEffect, useState } from "react";
import '../src/App.css'
import Card from "./Card";
import DropArea from "./DropArea";
import { fetchCharHand, addToHand } from ".";

export default function Hand({ auth, char, cards, setCards, setActiveCard }) {
    const [localCards, setLocalCards] = useState([]); // Local cards state for unauthenticated users

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

    const handleDrop = (data, position, macro) => {
        if(auth.id) {
          setCards((prevCards) => {
              const updatedCards = [...prevCards];

              // Check if the card is already in the hand
              const existingIndex = updatedCards.findIndex(card => card.maneuver_name === data.maneuver_name);

              if (existingIndex !== -1) {
                  // Remove the card from its original position
                  updatedCards.splice(existingIndex, 1);
              }

              // Insert the card at the new position
              updatedCards.splice(position, 0, data);

              // Recalculate positions for all cards
              return updatedCards
              .map((card, index) => ({
                ...card,
                position: index, // Assign the new index as the position
                macro: macro
              }));
          });
          addToHand(auth, char, setCards, data.id, position, macro)
        } else {
            setLocalCards((prevCards) => {
                const updatedCards = [...prevCards];

                // Check if the card is already in the hand
                const existingIndex = updatedCards.findIndex(card => card.maneuver_name === data.maneuver_name);

                if (existingIndex !== -1) {
                    // Remove the card from its original position
                    updatedCards.splice(existingIndex, 1);
                }

                // Insert the card at the new position
                updatedCards.splice(position, 0, data);

                // Recalculate positions for all cards
                return updatedCards
                .map((card, index) => ({
                ...card,
                position: index, // Assign the new index as the position
                macro: macro
                }));
            });
        }
    };

    const handToRender = auth.id ? cards : localCards

    return (
        <div
            style={{ ...boxStyle, display: "flex", flexDirection: "row", alignItems: "center" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.types.includes("application/x-maneuver")) {
                  const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
                  handleDrop(data, 0, macro)
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
        <DropArea onDrop={(data) => handleDrop(data, 0, macro)} />
            {handToRender.map((card, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Card index={index} card={card} setActiveCard={setActiveCard} />
                    <DropArea index={index} onDrop={(data) => {
                        if(data.position === undefined){
                            handleDrop(data, index + 1, macro)
                        } else if(data.position === index || data.position - 1 === index) {
                            handleDrop(data, data.position, macro);
                        } else if(index === 0) {
                            handleDrop(data, index + 1, macro)
                        } else if(data.position > index){
                            handleDrop(data, index + 1, macro)
                        } else {
                            handleDrop(data, index, macro)
                        }
                    }} />
                </div>
            ))}
        </div>
    );
}