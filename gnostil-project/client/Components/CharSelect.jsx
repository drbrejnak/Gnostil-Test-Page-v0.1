import React from 'react'
import { useState, useEffect } from 'react';
import { fetchCharacters, createCharacter } from '.';
import { tableStyles } from './Styles/TableStyles';

const CharSelect = ({auth, char, setChar}) => {
  const [characters, setCharacters] = useState([]);
  const [newCharName, setNewCharName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(()=> {
    if(auth.id){
      fetchCharacters(auth, setCharacters);
    }
    else {
      setCharacters([]);
    }
  }, [auth]);

  const handleCreateCharacter = async (e) => {
    e.preventDefault();
    if (newCharName.trim()) {
      await createCharacter(auth, newCharName.trim(), setCharacters);
      setNewCharName('');
      setIsCreating(false); // Return to character select after creation
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewCharName('');
  };

  if (!auth.id) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'row', // Changed to row for horizontal layout
      alignItems: 'center',
      gap: '10px'
    }}>
      {!isCreating ? (
        <>
          <select
            value={JSON.stringify(char)}
            onChange={(event) => setChar(JSON.parse(event.target.value))}
            style={{
              ...tableStyles.select,
              minWidth: '200px',
              backgroundColor: "rgba(26, 26, 26, 0.9)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s ease",
              padding: "8px 12px",
            }}
          >
            <option value={JSON.stringify({})}>Select Character</option>
            {characters.map((character) => (
              <option key={character.id} value={JSON.stringify(character)}>
                {character.char_name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsCreating(true)}
            style={{
              ...tableStyles.button,
              padding: "8px 12px",
            }}
          >
            +
          </button>
        </>
      ) : (
        <form
          onSubmit={handleCreateCharacter}
          style={{
            display: 'flex',
            gap: '8px'
          }}
        >
          <input
            type="text"
            value={newCharName}
            onChange={(e) => setNewCharName(e.target.value)}
            placeholder="New character name"
            autoFocus
            style={{
              ...tableStyles.select,
              backgroundColor: "rgba(26, 26, 26, 0.9)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s ease",
              padding: "8px 12px",
              width: '200px'
            }}
          />
          <button
            type="submit"
            disabled={!newCharName.trim()}
            style={{
              ...tableStyles.button,
              padding: "8px 12px",
            }}
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              ...tableStyles.button,
              padding: "8px 12px",
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default CharSelect