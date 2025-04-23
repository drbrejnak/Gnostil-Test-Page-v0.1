import React from 'react'
import { useState, useEffect } from 'react';
import { fetchCharacters, createCharacter, editCharName, deleteCharacter } from '.';
import { tableStyles } from './Styles/TableStyles';
import { loginStyles } from './Styles/LoginStyles';

const CharSelect = ({auth, char, setChar}) => {
  const [characters, setCharacters] = useState([]);
  const [newCharName, setNewCharName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  console.log(char)

  const refreshCharacterList = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(()=> {
    if(auth.id){
      fetchCharacters(auth, setCharacters);
    }
    else {
      setCharacters([]);
    }
  }, [auth, refreshTrigger]);

  const handleCreateCharacter = async (e) => {
    e.preventDefault();
    if (newCharName.trim()) {
      const result = await createCharacter(auth, newCharName.trim(), setCharacters);
      if (result.success) {
        setChar(result.character);  // Set the newly created character as selected
        setNewCharName('');
        setIsCreating(false);
        refreshCharacterList();
      } else {
        setError(result.error);
        setNewCharName(''); // Clear input to show error message
      }
    }
  };

  const handleEditCharacter = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing error
    if (newCharName.trim()) {
      const result = await editCharName(auth, char, newCharName.trim(), setCharacters);
      if (result.success) {
        // Update the selected character with the new name
        setChar({ ...char, char_name: newCharName.trim() });
        setNewCharName('');
        setIsEditing(false);
        refreshCharacterList();
      } else {
        setError(result.error);
        setNewCharName(''); // Clear input to show error message
      };
    };
  };

  const handleDelete = async () => {
    await deleteCharacter(auth, char, setCharacters);
    setChar({});
    setIsDeleting(false);
    refreshCharacterList();
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

  // Create a common button style object
  const actionButtonStyle = {
    ...tableStyles.button,
    minWidth: '36px',
    height: '32px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
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
        {!isCreating && !isEditing && auth.id ? (
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
              {[...characters]
                .sort((a, b) => a.char_name.localeCompare(b.char_name))
                .map((character) => (
                  <option key={character.id} value={JSON.stringify(character)}>
                    {character.char_name}
                  </option>
                ))}
            </select>
            <button
              onClick={() => setIsCreating(true)}
              style={actionButtonStyle}
            >
              +
            </button>
            {char && char.id && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setNewCharName(char.char_name);
                  }}
                  style={actionButtonStyle}
                >
                  ✎
                </button>
                <button
                  onClick={() => setIsDeleting(true)}
                  style={actionButtonStyle}
                >
                  🗑️
                </button>
              </>
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

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div style={loginStyles.loginOverlay}>
          <div style={{
            ...loginStyles.loginContainer,
            maxWidth: "400px",
            textAlign: "center"
          }}>
            <button
              onClick={() => setIsDeleting(false)}
              style={{
                ...loginStyles.closeButton,
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <h2 style={{ color: 'white', margin: "0"}}>Delete Character?</h2>
            <p style={{ color: 'white', margin: "0"}}>
              Are you sure you want to delete {char.char_name}? <br /><br /> This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={handleDelete}
                style={{
                  ...loginStyles.loginButton,
                  color: "rgba(51, 51, 51, 0.9)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleting(false)}
                style={loginStyles.loginButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CharSelect