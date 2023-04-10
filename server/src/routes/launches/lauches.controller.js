const { 
    getAllLaunches, 
    addLaunch 
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    // for (const value of launches.values()) { ... }

    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);

    addLaunch(launch);

    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}