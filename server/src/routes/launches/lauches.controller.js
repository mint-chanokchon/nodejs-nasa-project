const { 
    getAllLaunches, 
    addLaunch,
    exitsLaunchWithId,
    abortLaunchById
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    // for (const value of launches.values()) { ... }

    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    // ถ้าเป็น null หรือ undefind จะเป็น false
    const condition = (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target);
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

function httpAbortLaunch(req, res) {
    const id = Number(req.params.id);

    // if launch doesn't exits
    if (!exitsLaunchWithId(id)) return res.status(404).json({
        error: 'Launch not found'
    });

    const aborted = abortLaunchById(id);

    // if launch does exist
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}