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

const fetchDeck = async(deck_id, user_id)=> {
  // First verify character ownership
  const ownershipSQL = `
    SELECT 1 FROM characters
    WHERE deck_id = $1 AND user_id = $2
  `;
  const ownerCheck = await client.query(ownershipSQL, [deck_id, user_id]);

  if (ownerCheck.rows.length === 0) {
    const error = new Error('Unauthorized access to deck');
    error.status = 403;
    throw error;
  }

  // If ownership verified, proceed with fetch
  const SQL = `
    SELECT maneuver_id, tech_id
    FROM character_deck
    WHERE deck_id = $1
  `;
  const response = await client.query(SQL, [deck_id]);
  return {
    maneuverIds: response.rows.filter(row => row.maneuver_id).map(row => row.maneuver_id),
    techIds: response.rows.filter(row => row.tech_id).map(row => row.tech_id)
  };
}

const fetchDeckManeuvers = async({maneuverIds = [], techIds = []})=> {
  let results = [];

  // Handle empty deck case
  if (!maneuverIds.length && !techIds.length) return [];

  // Fetch maneuvers if any exist
  if (maneuverIds && maneuverIds.length) {
    const maneuversSQL = `
      SELECT *, false as is_technique
      FROM maneuvers
      WHERE id = ANY($1)
    `;
    const maneuverResponse = await client.query(maneuversSQL, [maneuverIds]);
    results = [...results, ...maneuverResponse.rows];
  }

  // Fetch techniques if any exist
  if (techIds && techIds.length) {
    const techniquesSQL = `
      SELECT
        tech_id as id,
        tech_name as maneuver_name,
        discipline,
        tech_type as maneuver_type,
        tech_description as description,
        tech_ability as ability,
        toll,
        yield,
        weight,
        paradigm,
        inputs,
        og_disciplines as original_disciplines,
        true as is_technique
      FROM techniques
      WHERE tech_id = ANY($1)
    `;
    const techResponse = await client.query(techniquesSQL, [techIds]);
    results = [...results, ...techResponse.rows];
  }

  return results;
}

const fetchHand = async (hand_id) => {
  const SQL = `
    SELECT
      ch.position,
      CASE
        WHEN ch.maneuver_id IS NOT NULL THEN
          jsonb_build_object(
            'id', m.id,
            'maneuver_name', m.maneuver_name,
            'discipline', m.discipline,
            'maneuver_type', m.maneuver_type,
            'description', m.description,
            'ability', m.ability,
            'toll', m.toll,
            'yield', m.yield,
            'weight', m.weight,
            'paradigm', m.paradigm,
            'is_technique', false
          )
        ELSE
          jsonb_build_object(
            'id', t.tech_id,
            'maneuver_name', t.tech_name,
            'discipline', t.discipline,
            'maneuver_type', t.tech_type,
            'description', t.tech_description,
            'ability', t.tech_ability,
            'toll', t.toll,
            'yield', t.yield,
            'weight', t.weight,
            'paradigm', t.paradigm,
            'inputs', t.inputs,
            'original_disciplines', t.og_disciplines,
            'is_technique', true
          )
      END as card_data
    FROM character_hand ch
    LEFT JOIN maneuvers m ON ch.maneuver_id = m.id
    LEFT JOIN techniques t ON ch.tech_id = t.tech_id
    WHERE ch.hand_id = $1
    ORDER BY ch.position
  `;
  const response = await client.query(SQL, [hand_id]);
  return response.rows.map(row => ({
    ...row.card_data,
    position: row.position
  }));
};

// (async () => {
//   await fetchDeckManeuvers(await fetchDeck('161063af-ca6e-4701-a28c-4103753def14'));
// })();

const addToDeck = async({maneuver_id, tech_id, deck_id})=> {
  const SQL = `
    INSERT INTO character_deck(maneuver_id, tech_id, deck_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const response = await client.query(SQL, [
    maneuver_id || null,
    tech_id || null,
    deck_id
  ]);
  return response.rows[0];
}

// addToDeck({maneuver_id: '7', deck_id: '1eea3a98-4345-4efc-9f35-6ffb888d95de'});
// addToDeck({maneuver_id: '9', deck_id: '161063af-ca6e-4701-a28c-4103753def14'});
// addToDeck({maneuver_id: '102', deck_id: '161063af-ca6e-4701-a28c-4103753def14'});

const removeFromDeck = async({maneuver_id, tech_id, deck_id, is_technique})=> {
  try {
    await client.query('BEGIN');

    // Remove from deck
    const SQL = `
      DELETE FROM character_deck
      WHERE (maneuver_id = $1 OR tech_id = $2) AND deck_id = $3
      RETURNING *
    `;
    const result = await client.query(SQL, [
      maneuver_id || null,
      tech_id || null,
      deck_id
    ]);

    // If it's a technique, also remove from techniques table
    if (is_technique && tech_id) {
      await removeFromTechniques({
        tech_id: tech_id,
        deck_id: deck_id
      });
    }

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in removeFromDeck:', error);
    throw error;
  }
}

const addToTechniques = async({
  hand_id,
  deck_id,
  tech_id,
  tech_name,
  discipline,
  inputs,
  tech_type,
  tech_description,
  tech_ability,
  toll,
  yield,
  weight,
  paradigm,
  og_disciplines
})=> {
  const SQL = `
    INSERT INTO techniques(
      hand_id,
      deck_id,
      tech_id,
      tech_name,
      discipline,
      inputs,
      tech_type,
      tech_description,
      tech_ability,
      toll,
      yield,
      weight,
      paradigm,
      og_disciplines
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `;
  const response = await client.query(SQL, [
    hand_id,
    deck_id,
    tech_id,
    tech_name,
    discipline,
    inputs,
    tech_type,
    tech_description,
    tech_ability,
    toll,
    yield,
    weight,
    paradigm,
    og_disciplines
  ]);
  return response.rows[0];
}

const removeFromTechniques = async({tech_id, deck_id})=> {
  const SQL = `
    DELETE FROM techniques
    WHERE tech_id = $1 AND deck_id = $2
    RETURNING *
  `;
  const response = await client.query(SQL, [tech_id, deck_id]);
  return response.rows[0];
}

const addToHand = async({maneuver_id, tech_id, deck_id, hand_id, position})=> {
  try {
    const checkSQL = `
      SELECT * FROM character_hand
      WHERE (
        (maneuver_id = $1 AND tech_id IS NULL) OR
        (tech_id = $2 AND maneuver_id IS NULL)
      ) AND hand_id = $3
    `;
    const checkResult = await client.query(checkSQL, [
      maneuver_id || null,
      tech_id || null,
      hand_id
    ]);

    if (checkResult.rows.length > 0) {
      return checkResult.rows[0];
    }

    const SQL = `
      INSERT INTO character_hand(maneuver_id, tech_id, deck_id, hand_id, position)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const response = await client.query(SQL, [
      maneuver_id || null,
      tech_id || null,
      deck_id,
      hand_id,
      position || 0
    ]);

    return response.rows[0];
  } catch (error) {
    console.error('Error in addToHand:', error);
    throw error;
  }
}

const removeFromHand = async({maneuver_id, tech_id, hand_id, deck_id, is_technique})=> {
  try {
    await client.query('BEGIN');

    const SQL = `
      DELETE FROM character_hand
      WHERE hand_id = $1
      AND (
        (maneuver_id = $2 AND tech_id IS NULL) OR
        (tech_id = $3 AND maneuver_id IS NULL)
      )
      RETURNING *
    `;
    const handResult = await client.query(SQL, [
      hand_id,
      maneuver_id || null,
      tech_id || null
    ]);

    await client.query('COMMIT');
    return handResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in removeFromHand:', error);
    throw error;
  }
}

const updateCardsInHand = async ({ hand_id, cards }) => {
  try {
    for (const card of cards) {
      console.log("Processing card:", card);

      // Different query based on card type
      const SQL = card.discipline === "Technique" ? `
        UPDATE character_hand
        SET position = $1
        WHERE hand_id = $2 AND tech_id = $3
        RETURNING maneuver_id, tech_id, position;
      ` : `
        UPDATE character_hand
        SET position = $1
        WHERE hand_id = $2 AND maneuver_id = $3
        RETURNING maneuver_id, tech_id, position;
      `;

      const response = await client.query(SQL, [
        card.position,
        hand_id,
        card.id
      ]);

      if (!response.rows[0]) {
        console.error(`Failed to update position for ${card.discipline} with ID ${card.id}`);
      } else {
        console.log(`Successfully updated position for ${card.discipline} with ID ${card.id} to ${card.position}`);
      }
    }
    return true;
  } catch (error) {
    console.error('Error in updateCardsInHand:', error);
    throw error;
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