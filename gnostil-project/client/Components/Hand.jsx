import * as React from "react";
import { useEffect, useState } from "react";
import '../src/App.css'
import Card from "./Card";
import DropArea from "./DropArea";

const host = "http://localhost:3000"

export default function Hand({ auth, deck, cards, setCards, setActiveCard, onDrop }) {

      const [char, setChar] = useState([]);

      useEffect(()=> {
        const fetchCharacters = async()=> {
          const response = await fetch(`${host}/users/${auth.id}/characters`, {
            headers: {
              authorization: window.localStorage.getItem('token')
            }
          });
          const json = await response.json();
          //MAKE THIS USABLE FOR MULTIPLE CHARACTERS
          if(response.ok){
            setChar(json[0]);
          }
        };
        if(auth.id){
          fetchCharacters();
        }
        else {
          setChar([]);
        }
      }, [auth]);

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

    const addToHand = async (maneuver_id, position, macro) => {
        const deck_id = char.deck_id;
        const hand_id = char.hand_id;
        console.log(maneuver_id)
        console.log(position)
        console.log(macro)
        const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: window.localStorage.getItem('token'),
          },
          body: JSON.stringify({maneuver_id, deck_id, hand_id, position, macro}),
        })

        if (response.ok) {

            // Refetch the hand to update the state
            const fetchCharHand = async () => {
              const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
                headers: {
                  authorization: window.localStorage.getItem('token'),
                },
              });
              const json = await response.json();
              if (response.ok) {
                console.log('ok', json)
              }
            };

            fetchCharHand();
          }
        };

    const handleDrop = (data, position, macro) => {
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

            // Recalculate positions for all cards
            return updatedCards
            .map((card, index) => ({
            ...card,
            position: index, // Assign the new index as the position
            macro: macro
            }));
        });
        addToHand(data.id, position, macro)
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
            {cards.map((card, index) => (
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