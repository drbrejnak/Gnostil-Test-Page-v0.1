import * as React from "react";
import { useEffect, useState } from "react";

const host = "http://localhost:3000"

export default function Deck() {

  const [auth, setAuth] = useState([]);
  const [char, setChar] = useState([]);
  const [deck, setDeck] = useState([]);

  const login = async(credentials)=> {
    try {
      //CHANGE THIS LATER
      const body = {
        "username": "admin",
        "password": "password"
      }
      const response = await fetch(`${host}/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type':'application/json',
        }
      });
      const json = await response.json();

      if(response.ok){
        window.localStorage.setItem('token', json.token);
        attemptLoginWithToken();
      }
      else {
        console.log(json);
      }
    } catch (error) {
      console.error(error);
    }
};

useEffect(()=> {
  login();},
  []);

  const attemptLoginWithToken = async()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await fetch(`${host}/me`, {
        headers: {
          authorization: token
        }
      });
      const json = await response.json();
      if(response.ok){
        setAuth(json);
      }
      else {
        window.localStorage.removeItem('token');
      }
    }
  };

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

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
    if(auth.id){
      fetchCharDeck();
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
  console.log(auth)

  return (
      <div style={boxStyle}>
        <table>
          <thead>
            <tr>
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
              <tr key={index}>
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
