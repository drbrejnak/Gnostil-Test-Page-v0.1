import * as React from "react";
import { useEffect, useState } from "react";
import { fetchCharDeck, removeFromDeck, addToDeck } from ".";

export default function Deck({ auth, char, deck, setDeck }) {
  const [localDeck, setLocalDeck] = useState([]); // Local deck state for unauthenticated users
  console.log(deck);

  useEffect(() => {
    if (auth.id && char.id) {
      // Fetch the deck from the database for authenticated users
      fetchCharDeck(auth, char, setDeck);
    } else {
      // Clear the database-backed deck for unauthenticated users
      setDeck([]);
    }
  }, [auth, char]);

  useEffect(() => {
    if (!auth.id) {
      const savedLocalDeck = JSON.parse(localStorage.getItem("localDeck")) || [];
      setLocalDeck(savedLocalDeck);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.id) {
      localStorage.setItem("localDeck", JSON.stringify(localDeck));
    }
  }, [localDeck]);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));

    if (auth.id) {
      // Add to the database-backed deck for authenticated users
      addToDeck(auth, char, setDeck, data.id);
    } else {
      // Add to the local deck for unauthenticated users
      setLocalDeck((prevLocalDeck) => {
        // Avoid duplicates in the local deck
        if (!prevLocalDeck.some((maneuver) => maneuver.id === data.id)) {
          return [...prevLocalDeck, data];
        }
        return prevLocalDeck;
      });
    }
  };

  const handleRemove = (maneuverId) => {
    if (auth.id) {
      // Remove from the database-backed deck for authenticated users
      removeFromDeck(auth, char, setDeck, maneuverId);
    } else {
      // Remove from the local deck for unauthenticated users
      setLocalDeck((prevLocalDeck) =>
        prevLocalDeck.filter((maneuver) => maneuver.id !== maneuverId)
      );
    }
  };

  const boxStyle = {
    maxWidth: "30vw",
    position: "absolute",
    right: "50%",
    top: "40%",
    transform: "translate(-60%, -50%)",
    height: "33vw",
    backgroundColor: "white",
    overflow: "auto",
  };

  const deckToRender = auth.id ? deck : localDeck; // Use the appropriate deck based on authentication

  return (
    <div
      style={boxStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Discipline</th>
            <th>Type</th>
            <th>Description</th>
            <th>Ability</th>
            <th>Toll</th>
            <th>Yield</th>
            <th>Weight</th>
            <th>Paradigm</th>
          </tr>
        </thead>
        <tbody>
          {deckToRender.map((maneuver, index) => (
            <tr
              key={index}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/x-maneuver",
                  JSON.stringify({
                    id: maneuver.id,
                    maneuver_name: maneuver.maneuver_name,
                    discipline: maneuver.discipline,
                    maneuver_type: maneuver.maneuver_type,
                    description: maneuver.description,
                    ability: maneuver.ability,
                    toll: maneuver.toll,
                    yield: maneuver.yield,
                    weight: maneuver.weight,
                    paradigm: maneuver.paradigm})
                );
              }}
              style={{ cursor: "grab" }}
            >
              <td>
                <button onClick={() => handleRemove(maneuver.id)}>Remove</button>
              </td>
              <td>{maneuver.maneuver_name}</td>
              <td>{maneuver.discipline}</td>
              <td>{maneuver.maneuver_type}</td>
              <td>{maneuver.description}</td>
              <td>{maneuver.ability}</td>
              <td>{maneuver.toll}</td>
              <td>{maneuver.yield}</td>
              <td>{maneuver.weight}</td>
              <td>{maneuver.paradigm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
