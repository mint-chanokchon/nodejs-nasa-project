const { getAllLaunches, addLaunch } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    // for (const value of launches.values()) { ... }

    return res.status(200).json(getAllLaunches());
}

function httpAddLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);

    addLaunch();

    return res.status(201).send();
}

module.exports = {
    httpGetAllLaunches
}