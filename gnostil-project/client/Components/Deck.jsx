import * as React from "react";
import { useEffect, useState } from "react";

const host = "http://localhost:3000"

export default function Deck({ auth, deck, setDeck }) {

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
      console.log(json[0]);
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

  useEffect(()=> {
    const fetchCharDeck = async()=> {
      const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      if(response.ok){
        setDeck(json);
        console.log(deck)
      }
    };
    if(auth.id && char.id){
      fetchCharDeck();
    }
    else {
      setDeck([]);
    }
  }, [char]);

  const addToDeck = async (maneuver_id) => {
    const deck_id = char.deck_id;
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ maneuver_id, deck_id }),
    });

    if (response.ok) {

      // Refetch the deck to update the state
      const fetchCharDeck = async () => {
        const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        if (response.ok) {
          setDeck(json);
        }
      };

      fetchCharDeck();
    }
  };

  const removeFromDeck = async (maneuver_id) => {
    const deck_id = char.deck_id;
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ maneuver_id, deck_id }),
    });

    if (response.ok) {

      // Refetch the deck to update the state
      const fetchCharDeck = async () => {
        const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        if (response.ok) {
          setDeck(json);
        }
      };

      fetchCharDeck();
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
    overflow: "auto"
  }

  return (
      <div
      style={boxStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
        addToDeck(data.id);
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
                  <button onClick={() => removeFromDeck(maneuver.id)}>Remove</button>
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
