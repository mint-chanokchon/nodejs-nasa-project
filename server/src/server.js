const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening at: http://localhost:${PORT}`);
});