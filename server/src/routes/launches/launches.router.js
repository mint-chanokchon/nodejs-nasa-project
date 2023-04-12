const express = require('express');

const router = express.Router();

const { 
    httpGetAllLaunches, 
    httpAddNewLaunch,
    httpAbortLaunch
} = require('./lauches.controller');

router.get('/', httpGetAllLaunches);
router.post('/', httpAddNewLaunch);
router.delete('/:id', httpAbortLaunch);

module.exports = router;