const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET statistics. */
router.get('/statistics', async (req, res) => {
  const added_todos = await redis.get('added_todos')
  res.send({
    added_todos: Number(added_todos) || 0
  })
});

module.exports = router;
