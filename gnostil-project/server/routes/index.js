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
  removeFromHand
} = require('../db/db');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

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
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchCharacters(req.params.userId));
  } catch(err) {
    next(err);
  }
});

router.get('/users/:userId/characters/:charId/deck/:deckId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchDeckManeuvers(await fetchDeck(req.params.deckId)))
  } catch(err) {
    next(err);
  }
});

router.post('/users/:userId/characters/:charId/deck/:deckId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await addToDeck(req.body));
  } catch(err) {
    next(err);
  }
});

router.delete('/users/:userId/characters/:charId/deck/:deckId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await removeFromDeck(req.body));
  } catch(err) {
    next(err);
  }
});

router.get('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchDeckManeuvers(await fetchHand(req.params.handId)))
  } catch(err) {
    next(err);
  }
});

router.post('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await addToHand(req.body));
  } catch(err) {
    next(err);
  }
});

router.delete('/users/:userId/characters/:charId/deck/:deckId/hand/:handId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      console.log(`params ${req.params.id}`, `user ${req.user.id}`);
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await removeFromHand(req.body));
  } catch(err) {
    next(err);
  }
});

router.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

module.exports = router;