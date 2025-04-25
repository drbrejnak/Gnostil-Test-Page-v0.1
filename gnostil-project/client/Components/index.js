const host = "http://localhost:3000"

export const register = async(setAuth, credentials)=> {
    try {
        const response = await fetch(`${host}/register`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type':'application/json',
            }
        });
        const json = await response.json();

        if(response.ok){
            window.localStorage.setItem('token', json.token);
            attemptLoginWithToken(setAuth);
            return { success: true };
        } else {
            return {
                success: false,
                error: json.error || 'Registration failed. Please try again.'
            };
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'An unexpected error occurred. Please try again.'
        };
    }
}

export const login = async(setAuth, credentials)=> {
    try {
        const response = await fetch(`${host}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type':'application/json',
            }
        });
        const json = await response.json();

        if(response.ok){
            window.localStorage.setItem('token', json.token);
            attemptLoginWithToken(setAuth);
            return true;
        }
        else {
            console.log(json);
        }
    } catch (error) {
            console.error(error);
    }
};

export const attemptLoginWithToken = async(setAuth)=> {
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

export const fetchCharacters = async(auth, setCharacters)=> {
    const response = await fetch(`${host}/users/${auth.id}/characters`, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if(response.ok){
      setCharacters(Array.isArray(json) ? json : []);
    }
};

export const createCharacter = async(auth, newCharacter, setCharacters)=> {
  try{
      const response = await fetch(`${host}/users/${auth.id}/characters/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: window.localStorage.getItem('token'),
          },
          body: JSON.stringify({newCharacter}),
        });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || 'Failed to create character');
        }

        setCharacters(json.characters);
        return {
          success: true,
          character: json.newCharacter
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to create character'
        };
    };
};

export const editCharName = async(auth, char, newName, setCharacters)=> {
    try {
        const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            },
            body: JSON.stringify({ char_id: char.id, char_name: newName }),
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error || 'Failed to create character');
        }

        setCharacters(json);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to create character'
        };
    }
};

export const deleteCharacter = async(auth, char, setCharacters)=> {
    try{
      const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: window.localStorage.getItem('token'),
        },
    });
    const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error || 'Failed to delete character');
        }

        setCharacters(json);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to delete character'
        };
    }
};

export const fetchCharDeck = async (auth, char, setDeck) => {
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
        headers: {
            authorization: window.localStorage.getItem('token')
        }
    });
    const json = await response.json();
    if (response.ok) {
        setDeck(json);
    }
};

export const addToDeck = async (auth, char, setDeck, maneuver_id, tech_id) => {
    const deck_id = char.deck_id;
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        maneuver_id: tech_id ? null : maneuver_id,
        tech_id: tech_id || null,
        deck_id
      }),
    });

    if (response.ok) {
      fetchCharDeck(auth, char, setDeck);
      return true;
    }
    return false;
};

export const removeFromDeck = async (auth, char, setDeck, id, isTechnique) => {
    const deck_id = char.deck_id;
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        maneuver_id: isTechnique ? null : id,
        tech_id: isTechnique ? id : null,
        deck_id,
        is_technique: isTechnique // Add this line to send the flag
      }),
    });

    if (response.ok) {
      fetchCharDeck(auth, char, setDeck);
      return true;
    }
    return false;
};

export const fetchCharHand = async (auth, char, setCards) => {
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    if (response.ok) {
      setCards(json)
    }
};

export const addToHand = async (auth, char, setCards, maneuver_id, position) => {
    const deck_id = char.deck_id;
    const hand_id = char.hand_id;
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({maneuver_id, deck_id, hand_id, position}),
    })
    if (response.ok) {
        // Refetch the hand to update the state
        fetchCharHand(auth, char, setCards);
        return true;  // Add this return value
      }
      return false;  // Add this return value
  };

export const updateCardsInHand = async (auth, char, cards, setCards) => {
  const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    authorization: window.localStorage.getItem('token'),
    },
    body: JSON.stringify(cards),
  });
}

export const removeFromHand = async (auth, char, setCards, maneuver_id) => {
  try {
    console.log('RemoveFromHand params:', {
      authId: auth?.id,
      charId: char?.id,
      deckId: char?.deck_id,
      handId: char?.hand_id,
      maneuver_id
    });

    if (!auth?.id || !char?.id || !char?.deck_id || !char?.hand_id || !maneuver_id) {
      throw new Error('Missing required parameters');
    }

    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ maneuver_id }),
    });

    const data = await response.json().catch(() => null);
    console.log('Server response:', { status: response.status, data });

    if (!response.ok) {
      throw new Error(`Failed to remove card: ${data?.error || response.statusText}`);
    }

    // Refresh the hand data
    await fetchCharHand(auth, char, setCards);
    return true;
  } catch (error) {
    console.error('Error removing card:', error.message);
    console.error('Error details:', error);
    return false;
  }
};

export const addToTechniques = async (auth, char, setDeck, technique) => {
  try {
    console.log(technique)
    // First create the technique
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify(technique),
    });

    if (!response.ok) {
      throw new Error('Failed to add technique');
    }

    // Get the created technique data
    const createdTechnique = await response.json();
    console.log(createdTechnique)

    // Add technique to deck
    const deckResponse = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        tech_id: createdTechnique.tech_id,
        deck_id: char.deck_id
      }),
    });

    if (!deckResponse.ok) {
      throw new Error('Failed to add technique to deck');
    }

    // Finally refresh the deck
    await fetchCharDeck(auth, char, setDeck);
    return true;
  } catch (error) {
    console.error('Error adding technique:', error);
    return false;
  }
};
