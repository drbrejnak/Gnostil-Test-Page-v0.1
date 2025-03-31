const {
  client,
  fetchManeuvers
} = require('../db/db');
const express = require('express');
const router = express.Router();

client.connect();

const path = require('path');
router.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
router.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

router.get('/maneuvers', async(req, res, next)=> {
  try {
    res.send(await fetchManeuvers());
  } catch(err) {
    next(err);
  }
});

router.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

module.exports = router;