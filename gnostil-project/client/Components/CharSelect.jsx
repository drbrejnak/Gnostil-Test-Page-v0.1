import React from 'react'
import { useState, useEffect } from 'react';
import { fetchCharacters, createCharacter, editCharName } from '.';
import { tableStyles } from './Styles/TableStyles';

const CharSelect = ({auth, char, setChar}) => {
  const [characters, setCharacters] = useState([]);
  const [newCharName, setNewCharName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

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

  const handleEditCharacter = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing error
    if (newCharName.trim()) {
      const result = await editCharName(auth, char, newCharName.trim(), setCharacters);
      if (result.success) {
        setNewCharName('');
        setIsEditing(false);
      } else {
        setError(result.error);
        setNewCharName(''); // Clear input to show error message
      }
    }
  };

  const handleInputChange = (e) => {
    setNewCharName(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
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
      flexDirection: 'row',
      alignItems: 'center',
      gap: '10px'
    }}>
      {!isCreating && !isEditing ? (
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
          {char && char.id && (
            <button
              onClick={() => {
                setIsEditing(true);
                setNewCharName(char.char_name);
              }}
              style={{
                ...tableStyles.button,
                padding: "8px 12px",
              }}
            >
              ✎
            </button>
          )}
        </>
      ) : (
        <form
          onSubmit={isEditing ? handleEditCharacter : handleCreateCharacter}
          style={{
            display: 'flex',
            gap: '8px'
          }}
        >
          <input
            type="text"
            value={newCharName}
            onChange={handleInputChange}
            placeholder={error || char.char_name}
            autoFocus
            style={{
              ...tableStyles.select,
              cursor: 'text',
              backgroundColor: "rgba(26, 26, 26, 0.9)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s ease",
              padding: "8px 12px",
              width: '200px',
              '&::placeholder': {
                color: error ? '#ff6b6b' : 'rgba(255, 255, 255, 0.5)'
              }
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
            {isEditing ? 'Save' : 'Create'}
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