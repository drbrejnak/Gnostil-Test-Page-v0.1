const host = import.meta.env.VITE_API_URL;

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


export const getManeuvers = async (setCompendium) => {
  try {
    const response = await fetch(`${host}/maneuvers`);
    const maneuvers = await response.json();
    setCompendium(maneuvers);
  } catch (error) {
    console.error(error);
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
    if (auth.id !== char.user_id) {
        console.error('Unauthorized access attempt');
        setDeck([]);
        return;
    }

    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}`, {
        headers: {
            authorization: window.localStorage.getItem('token')
        }
    });
    const json = await response.json();
    if (response.ok) {
        setDeck(json);
    } else {
        setDeck([]);
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
        is_technique: isTechnique
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

export const addToHand = async (auth, char, setCards, id, position, isTechnique = false) => {
    const deck_id = char.deck_id;
    const hand_id = char.hand_id;

    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id: id,
        maneuver_id: isTechnique ? null : id,
        tech_id: isTechnique ? id : null,
        deck_id,
        hand_id,
        position,
        discipline: isTechnique ? "Technique" : null,
        is_technique: isTechnique
      }),
    });

    if (response.ok) {
        await fetchCharHand(auth, char, setCards);
        return true;
    }
    return false;
};

export const updateCardsInHand = async (auth, char, cards, setCards) => {
  const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: window.localStorage.getItem('token'),
    },
    body: JSON.stringify(cards.map(card => ({
      id: card.id,
      position: card.position,
      discipline: card.discipline,
      is_technique: card.discipline === "Technique"
    }))),
  });

  if (response.ok) {
    await fetchCharHand(auth, char, setCards);
    return true;
  }
  return false;
};

export const removeFromHand = async (auth, char, setCards, id, isTechnique = false) => {
  try {

    if (!auth?.id || !char?.id || !char?.deck_id || !char?.hand_id || !id) {
      throw new Error('Missing required parameters');
    }

    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        maneuver_id: isTechnique ? null : id,
        tech_id: isTechnique ? id : null,
        is_technique: isTechnique
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(`Failed to remove card: ${data?.error || response.statusText}`);
    }

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
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}/techniques`, {
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

    const createdTechnique = await response.json();

    await fetchCharDeck(auth, char, setDeck);
    return true;
  } catch (error) {
    console.error('Error adding technique:', error);
    return false;
  }
};
