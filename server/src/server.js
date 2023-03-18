const express = require('express');
const cors = require('cors');

// Routers
const planetsRouter = require('./routes/planets/planets.router');

const { loadPlanetsData } = require('./models/planets.model');

const app = express();
const whitelist = ['http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}));
app.use(express.json()); // แปรงข้อมูลใน body เป็น json ให้

// End point
app.use(planetsRouter);

async function startServer() {
    await loadPlanetsData();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server listening at: http://localhost:${PORT}`);
    });
}

// ไม่ต้องใส่ await เพื่อรอฟังชันก์ทำงานเสร็จ เพราะไม่มีอะไรรอทำงานต่อแล้วหลังจากเซิฟเวอร์
startServer();