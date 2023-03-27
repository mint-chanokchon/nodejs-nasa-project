const express = require('express');

const router = express.Router();

const { httpGetAllLaunches, add } = require('./lauches.controller');

router.get('/launches', httpGetAllLaunches);

module.exports = router;