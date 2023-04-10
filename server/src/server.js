const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Routers
const planetsRouter = require('./routes/planets/planets.router');
const lauchesRouter = require('./routes/launches/launches.router');

const { loadPlanetsData } = require('./models/planets.model');

const app = express();
const whitelist = ['http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false)
        }
    },
}));
app.use(morgan('combined')); // log request
app.use(express.json()); // แปรงข้อมูลใน body เป็น json ให้
app.use(express.static(path.join(__dirname, '..', 'public')));

// End point api
app.use('/planets', planetsRouter);
app.use('/launches', lauchesRouter);

// End point front-end
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

async function startServer() {
    await loadPlanetsData();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server listening at: http://localhost:${PORT}`);
    });
}

// ไม่ต้องใส่ await เพื่อรอฟังชันก์ทำงานเสร็จ เพราะไม่มีอะไรรอทำงานต่อแล้วหลังจากเซิฟเวอร์
startServer();