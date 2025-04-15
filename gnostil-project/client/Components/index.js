
const host = "http://localhost:3000"

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

export const addToDeck = async (auth, char, setDeck, maneuver_id) => {
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
      fetchCharDeck(auth, char, setDeck);
    }
  };

export const removeFromDeck = async (auth, char, setDeck, maneuver_id) => {
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
      fetchCharDeck(auth, char, setDeck);
    }
};

export const fetchCharHand = async (auth, char) => {
    console.log(auth)
    console.log(char)
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log('ok', json)
    }
};

export const addToHand = async (auth, char, maneuver_id, position, macro) => {
    const deck_id = char.deck_id;
    const hand_id = char.hand_id;
    const response = await fetch(`${host}/users/${auth.id}/characters/${char.id}/deck/${char.deck_id}/hand/${char.hand_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
      body: JSON.stringify({maneuver_id, deck_id, hand_id, position, macro}),
    })
    if (response.ok) {
        // Refetch the hand to update the state
        fetchCharHand(auth, char);
    }
};