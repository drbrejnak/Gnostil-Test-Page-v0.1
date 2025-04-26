const {
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
  addToTechniques,
  fetchCharHand
} = require('../db/db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

client.connect();

router.use(cors());

const path = require('path');
router.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../dist/index.html')));
router.use('/assets', express.static(path.join(__dirname, '../dist/assets')));

const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

router.post('/register', async(req, res, next)=> {
  try {
    const user = await createUser(req.body);
    if (!user) {
      return res.status(400).json({
        error: 'Username already exists. Please try again.'
      });
    }
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

router.post('/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.get('/me', async(req, res, next)=> {
  try {
    res.send(await findUserWithToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});

router.get('/users', async(req, res, next)=> {
  try {
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/maneuvers', async(req, res, next)=> {
  try {
    res.send(await fetchManeuvers());
  } catch(err) {
    next(err);
  }
});

router.get('/users/:userId/characters', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchCharacters(req.params.userId));
  } catch(err) {
    next(err);
  }
});

router.post('/users/:userId/characters', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    const newCharacter = await createCharacter({
      user_id: req.params.userId,
      char_name: req.body.newCharacter
    });
    const characters = await fetchCharacters(req.params.userId);
    res.json({ characters, newCharacter });
  } catch(err) {
    next(err);
  }
});

router.put('/users/:userId/characters/:charId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await editCharName({
      id: req.params.charId,
      char_name: req.body.char_name,
      user_id: req.params.userId
    });
    const characters = await fetchCharacters(req.params.userId);
    res.json(characters);
  } catch(err) {
    next(err);
  }
});

router.delete('/users/:userId/characters/:charId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteCharacter({ id: req.params.charId });
    const characters = await fetchCharacters(req.params.userId);
    res.json(characters);
  } catch(err) {
    next(err);
  }
});

router.get('/users/:userId/characters/:charId/deck/:deckId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchDeckManeuvers(await fetchDeck(req.params.deckId, req.params.userId)))
  } catch(err) {
    next(err);
  }
});

router.post('/users/:userId/characters/:charId/deck/:deckId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    const result = await addToDeck({
      maneuver_id: req.body.maneuver_id,
      tech_id: req.body.tech_id,
      deck_id: req.params.deckId
    });
    res.json(result);
  } catch(err) {
    next(err);
  }
});

router.delete('/users/:userId/characters/:charId/deck/:deckId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }

    const result = await removeFromDeck({
      maneuver_id: req.body.maneuver_id,
      tech_id: req.body.tech_id,
      deck_id: req.params.deckId,
      is_technique: req.body.is_technique
    });

    res.json(result);
  } catch(err) {
    next(err);
  }
});

router.get('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchHand(req.params.handId))
  } catch(err) {
    next(err);
  }
});

router.post('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }

    const result = await addToHand({
      maneuver_id: req.body.is_technique ? null : req.body.id,
      tech_id: req.body.is_technique ? req.body.id : null,
      deck_id: req.params.deckId,
      hand_id: req.params.handId,
      position: req.body.position
    });

    res.json(result);
  } catch(err) {
    console.error('Route error:', err);
    next(err);
  }
});

router.put('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await updateCardsInHand({hand_id: req.params.handId, cards: req.body}));
  } catch(err) {
    next(err);
  }
});

router.delete('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }

    const result = await removeFromHand({
      maneuver_id: req.body.maneuver_id,
      tech_id: req.body.tech_id,
      hand_id: req.params.handId,
      deck_id: req.params.deckId,
      is_technique: req.body.is_technique
    });

    res.json(result);
  } catch(err) {
    next(err);
  }
});

router.post('/users/:userId/characters/:charId/deck/:deckId/hand/:handId/techniques', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }

    const technique = await addToTechniques({
      hand_id: req.params.handId,
      deck_id: req.params.deckId,
      tech_id: req.body.id,
      tech_name: req.body.maneuver_name,
      discipline: req.body.discipline,
      tech_type: req.body.maneuver_type,
      inputs: req.body.inputs,
      tech_description: req.body.description,
      tech_ability: req.body.ability,
      toll: req.body.toll,
      yield: req.body.yield,
      weight: req.body.weight,
      paradigm: req.body.paradigm,
      og_disciplines: req.body.original_disciplines
    });

    await addToDeck({
      tech_id: technique.tech_id,
      deck_id: req.params.deckId
    });

    res.json(technique);
  } catch(err) {
    next(err);
  }
});

router.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

module.exports = router;