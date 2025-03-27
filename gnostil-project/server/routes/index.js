const {
  client
} = require('../db/db');
const express = require('express');
const router = express.Router();

client.connect();

router.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

module.exports = router;