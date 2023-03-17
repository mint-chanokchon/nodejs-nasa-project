const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanet = [];

const readCSV = fs.createReadStream('./kepler_data.csv');
readCSV.pipe(parse({
    comment: '#',   // บอกว่าบรรทัดที่ขึ้นด้วยด้วย # เป็น comment
    columns: true   //สั่งให้ return ออกมาเป็น JavaScript Object (Key: value) แทนที่จะออกมาเป็น array เฉย ๆ
})).on('data', (planet) => {
    if (isHabitablePlanet(planet)) {
        habitablePlanet.push(planet);
    }
});
readCSV.on('end', () => {
    console.log(habitablePlanet.map((planet) => {
        return planet['kepler_name'];
    }));
    console.log(`${habitablePlanet.length} habitable planets found!`);
});
readCSV.on('error', (err) => console.log(err));

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

module.exports = {
    planets: habitablePlanet
}