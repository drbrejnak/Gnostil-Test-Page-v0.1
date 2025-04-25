require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://postgres:@localhost/GnostilDB');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const fetchManeuvers = async()=> {
  const SQL = `
    SELECT * FROM maneuvers
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchManeuver = async(id)=> {
  const SQL = `
    SELECT * FROM maneuvers WHERE id = $1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

const fetchDeck = async(id)=> {
  const SQL = `
    SELECT maneuver_id FROM character_deck WHERE deck_id = $1
  `;
  const response = await client.query(SQL, [id]);
  const ids = response.rows.map(row => row.maneuver_id);
  return ids;
}

const fetchDeckManeuvers = async(ids)=> {
  const SQL = `
    SELECT * FROM maneuvers WHERE id = ANY($1)
  `;
  const response = await client.query(SQL, [ids]);
  console.log(response.rows);
  return response.rows;
}

const fetchHand = async (hand_id) => {
  const SQL = `
    SELECT
      character_hand.maneuver_id,
      character_hand.position,
      maneuvers.*
    FROM
      character_hand
    JOIN
      maneuvers
    ON
      character_hand.maneuver_id = maneuvers.id
    WHERE
      character_hand.hand_id = $1
  `;
  const response = await client.query(SQL, [hand_id]);
  return response.rows; // Return all rows with maneuver, position data
};

// (async () => {
//   await fetchDeckManeuvers(await fetchDeck('161063af-ca6e-4701-a28c-4103753def14'));
// })();

const addToDeck = async({maneuver_id, deck_id})=> {
  const SQL = `
    INSERT INTO character_deck(maneuver_id, deck_id) VALUES ($1, $2) RETURNING maneuver_id
  `;
  const response = await client.query(SQL, [maneuver_id, deck_id]);
  return response.rows[0];
}

// addToDeck({maneuver_id: '7', deck_id: '1eea3a98-4345-4efc-9f35-6ffb888d95de'});
// addToDeck({maneuver_id: '9', deck_id: '161063af-ca6e-4701-a28c-4103753def14'});
// addToDeck({maneuver_id: '102', deck_id: '161063af-ca6e-4701-a28c-4103753def14'});

const removeFromDeck = async({maneuver_id, deck_id})=> {
  const SQL = `
    DELETE FROM character_deck WHERE maneuver_id = $1 AND deck_id = $2
  `;
  await client.query(SQL, [maneuver_id, deck_id]);
}

// removeFromDeck({deck_id: '56d47608-731f-41eb-b0e8-4bd0211595aa', maneuver_id: '5'});
// removeFromDeck({deck_id: '56d47608-731f-41eb-b0e8-4bd0211595aa', maneuver_id: '2'});
// removeFromDeck({deck_id: '56d47608-731f-41eb-b0e8-4bd0211595aa', maneuver_id: '3'});
// removeFromDeck({deck_id: '56d47608-731f-41eb-b0e8-4bd0211595aa', maneuver_id: '6'});
// removeFromDeck({deck_id: '56d47608-731f-41eb-b0e8-4bd0211595aa', maneuver_id: '7'});
// removeFromDeck({deck_id: '56d47608-731f-41eb-b0e8-4bd0211595aa', maneuver_id: '90'});
// removeFromDeck({deck_id: '161063af-ca6e-4701-a28c-4103753def14', maneuver_id: '90'});

const addToTechniques = async({tech_id, hand_id, deck_id, tech_name, discipline, inputs, tech_type, tech_description, tech_ability, toll, yield, weight, paradigm})=> {
  const SQL = `
    INSERT INTO techniques(tech_id, hand_id, deck_id, tech_name, discipline, inputs, tech_type, tech_description, tech_ability, toll, yield, weight, paradigm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
  `;
  const response = await client.query(SQL, [tech_id, hand_id, deck_id, tech_name, discipline, inputs, tech_type, tech_description, tech_ability, toll, yield, weight, paradigm]);
  return response.rows[0];
}

// addToTechniques({tech_id: '12345', hand_id: 'a051a751-e63c-43b3-9c50-8f301f0eb96f', deck_id: '1eea3a98-4345-4efc-9f35-6ffb888d95de', tech_name: 'Test', discipline: 'Technique', inputs: 2, tech_type: 'Attack', tech_description: 'A powerful attack using fire and water.', tech_ability: 'Burn and Freeze', toll: 2, yield: 3, weight: 'Light', paradigm: 'Honorable'});

const addToHand = async({maneuver_id, deck_id, hand_id, position})=> {
  try {
    // First check if the maneuver already exists in hand
    const checkSQL = `
      SELECT * FROM character_hand
      WHERE maneuver_id = $1 AND hand_id = $2
    `;
    const checkResult = await client.query(checkSQL, [maneuver_id, hand_id]);

    if (checkResult.rows.length > 0) {
      // Maneuver already exists in hand
      return checkResult.rows[0];
    }

    // If not exists, insert new record
    const SQL = `
      INSERT INTO character_hand(maneuver_id, deck_id, hand_id, position)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const response = await client.query(SQL, [
      maneuver_id,
      deck_id,
      hand_id,
      position || 0,  // Default to 0 if position not provided
    ]);

    return response.rows[0];
  } catch (error) {
    console.error('Error in addToHand:', error);
    throw error;
  }
}

const removeFromHand = async({maneuver_id, hand_id, deck_id})=> {
  try {
    // Begin transaction
    await client.query('BEGIN');

    // Remove from hand
    const SQL = `
      DELETE FROM character_hand
      WHERE maneuver_id = $1 AND hand_id = $2
      RETURNING *
    `;
    const handResult = await client.query(SQL, [maneuver_id, hand_id]);

    // Also remove from deck
    const deckSQL = `
      DELETE FROM character_deck
      WHERE maneuver_id = $1 AND deck_id = $2
      RETURNING *
    `;
    await client.query(deckSQL, [maneuver_id, deck_id]);

    // Commit transaction
    await client.query('COMMIT');

    return handResult.rows[0];
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    console.error('Error in removeFromHand:', error);
    throw error;
  }
}

const updateCardsInHand = async ({ hand_id, cards }) => {
  for (const card of cards) {
    console.log("Processing card:", card); // Debugging
    const SQL = `
      UPDATE character_hand
      SET position = $1
      WHERE hand_id = $2 AND maneuver_id = $3
      RETURNING maneuver_id;
    `;
    const response = await client.query(SQL, [card.position, hand_id, card.id]);
    console.log("Updated card:", response.rows[0]); // Debugging
  }
};

const createUser = async({ username, password })=> {
  try {
    const SQL = `
      INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password, 5)]);
    return response.rows[0];
  } catch (error) {
    if (error.code === '23505') { // PostgreSQL unique violation error code
      const customError = new Error('Username already exists. Please try again.');
      customError.status = 400;
      throw customError;
    }
    throw error;
  }
};

// createUser({ username: 'test', password: 'test' });

const createCharacter = async({ user_id, char_name })=> {

  // First check if name already exists for this user
  const checkSQL = `
    SELECT * FROM characters
    WHERE user_id = $1 AND char_name = $2
    `;
  const checkResult = await client.query(checkSQL, [user_id, char_name]);

  if (checkResult.rows.length > 0) {
    const error = new Error('Character name already exists.');
    error.status = 400;
    throw error;
  }

  const SQL = `
    INSERT INTO characters(id, user_id, deck_id, hand_id, char_name) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), user_id, uuid.v4(), uuid.v4(), char_name]);
  return response.rows[0];
};

// createCharacter({ user_id: '0127b82b-7603-493a-8ca1-f79cd9723b71' });
// createCharacter({ user_id: '0127b82b-7603-493a-8ca1-f79cd9723b71', char_name: "test2" });


const deleteCharacter = async({ id })=> {
  try {
    // First, get the deck_id and hand_id for this character
    const getIdsSQL = `
      SELECT deck_id, hand_id FROM characters WHERE id = $1
    `;
    const idsResult = await client.query(getIdsSQL, [id]);

    if (idsResult.rows.length > 0) {
      const { deck_id, hand_id } = idsResult.rows[0];

      // Delete records from character_deck if they exist
      if (deck_id) {
        const deleteDeckSQL = `
          DELETE FROM character_deck WHERE deck_id = $1
        `;
        await client.query(deleteDeckSQL, [deck_id]);
      }

      // Delete records from character_hand if they exist
      if (hand_id) {
        const deleteHandSQL = `
          DELETE FROM character_hand WHERE hand_id = $1
        `;
        await client.query(deleteHandSQL, [hand_id]);
      }
    }

    // Finally, delete the character
    const deleteCharSQL = `
      DELETE FROM characters WHERE id = $1
    `;
    await client.query(deleteCharSQL, [id]);
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
};

// deleteCharacter({id: '38d23ae9-9af6-4e2a-ad11-dbbfb9c46a9a'})

const editCharName = async({ id, char_name, user_id })=> {
  // First check if name already exists for this user
  const checkSQL = `
    SELECT * FROM characters
    WHERE user_id = $1 AND char_name = $2 AND id != $3
  `;
  const checkResult = await client.query(checkSQL, [user_id, char_name, id]);

  if (checkResult.rows.length > 0) {
    const error = new Error('Character name already exists.');
    error.status = 400;
    throw error;
  }

  const SQL = `
    UPDATE characters SET char_name = $1 WHERE id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [char_name, id]);
  return response.rows[0];
}

const authenticate = async({ username, password })=> {
  const SQL = `
    SELECT id, password FROM users WHERE username=$1;
  `;
  const response = await client.query(SQL, [username]);
  if(!response.rows.length || (await bcrypt.compare(password, response.rows[0].password))=== false){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id}, JWT);
  return {token};
};

const findUserWithToken = async(token)=> {
  let id;
  try {
    const payload = jwt.verify(token, JWT);
    id = payload.id;
  }
  catch(ex){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchUsers = async()=> {
  const SQL = `
    SELECT id, username FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchCharacters = async(id)=> {
  const SQL = `
    SELECT * FROM characters WHERE user_id = $1;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

module.exports = {
  client,
  fetchManeuvers,
  fetchDeck,
  fetchDeckManeuvers,
  authenticate,
  findUserWithToken,
  fetchUsers,
  fetchCharacters,
  addToDeck,
  removeFromDeck,
  addToHand,
  fetchHand,
  removeFromHand,
  updateCardsInHand,
  createUser,
  createCharacter,
  deleteCharacter,
  editCharName,
  addToTechniques
};