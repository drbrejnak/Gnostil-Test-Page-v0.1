import React from 'react'
import { useState, useEffect } from 'react';

const host = "http://localhost:3000"

const CharSelect = ({auth, char, setChar}) => {

const [characters, setCharacters] = useState([])

  useEffect(()=> {
    const fetchCharacters = async()=> {
      const response = await fetch(`${host}/users/${auth.id}/characters`, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
      const json = await response.json();
      //MAKE THIS USABLE FOR MULTIPLE CHARACTERS
      console.log(json);
      if(response.ok){
        setCharacters(Array.isArray(json) ? json : []);
      }
    };
    if(auth.id){
      fetchCharacters();
    }
    else {
      setCharacters([]);
    }
  }, [auth]);

if (!auth.id) {
    return null;
}

return (
        <select
            value={JSON.stringify(char)}
            onChange={(event) => setChar(JSON.parse(event.target.value))}>
            {characters.map((character) => (
                <option key={character.id} value={JSON.stringify(character)}>
                    {character.char_name}
                </option>
            ))}
        </select>
    );
}

export default CharSelect