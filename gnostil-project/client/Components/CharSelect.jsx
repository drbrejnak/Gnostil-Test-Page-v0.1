import React from 'react'
import { useState, useEffect } from 'react';
import { fetchCharacters } from '.';

const CharSelect = ({auth, char, setChar}) => {

const [characters, setCharacters] = useState([])

  useEffect(()=> {
    if(auth.id){
      fetchCharacters(auth, setCharacters);
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