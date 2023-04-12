const launches = new Map();

let lastedFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    lauchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);
// launches.get(100) === launch;

function getAllLaunches() {
    return Array.from(launches.values());
}

function addLaunch(launch) {
    lastedFlightNumber++;
    launches.set(lastedFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['A'],
        flightNumber: lastedFlightNumber
    }));
}

function exitsLaunchWithId(id) {
    console.log(launch);
    console.log(launches.has(id));
    return launches.has(id);
}

function abortLaunchById(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    getAllLaunches,
    addLaunch,
    exitsLaunchWithId,
    abortLaunchById
}