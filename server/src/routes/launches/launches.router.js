const express = require('express');

const router = express.Router();

const { 
    httpGetAllLaunches, 
    httpAddNewLaunch 
} = require('./lauches.controller');

router.get('/', httpGetAllLaunches);
router.post('/', httpAddNewLaunch);

module.exports = router;