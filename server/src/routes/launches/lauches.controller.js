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

    // ถ้าเป็น null หรือ undefind จะเป็น false
    const condition = (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination);
    if (condition) return res.status(400).json({
        error: 'Messing require launch property.',
    });

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }

    addLaunch(launch);

    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}