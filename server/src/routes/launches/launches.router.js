const express = require('express');

const router = express.Router();

const launchesController = require('./lauches.controller');

router.get('/launches', launchesController.getAllLaunches);

module.exports = router;