import * as React from "react";
import { useEffect, useState } from "react";
import { fetchCharDeck, removeFromDeck, addToDeck } from ".";

export default function Deck({ auth, char, deck, setDeck }) {

  useEffect(()=> {
    if(auth.id && char.id){
      fetchCharDeck(auth, char, setDeck);
    }
    else {
      setDeck([]);
    }
  }, [char]);

  const boxStyle = {
    maxWidth: "30vw",
    position: "absolute",
    right: "50%",
    top: "40%",
    transform: "translate(-60%, -50%)",
    height: "33vw",
    backgroundColor: "white",
    overflow: "auto"
  }

  return (
      <div
      style={boxStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
        addToDeck(auth, char, setDeck, data.id);
      }}
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
            {deck.map((maneuver, index) => (
              <tr
              key={index}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("application/x-maneuver", JSON.stringify({ name: maneuver.maneuver_name, id: maneuver.id }));
              }}
              style={{ cursor: "grab" }}
              >
                <td>
                  <button onClick={() => removeFromDeck(auth, char, setDeck, maneuver.id)}>Remove</button>
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
