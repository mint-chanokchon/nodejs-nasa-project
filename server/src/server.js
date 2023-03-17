const express = require('express');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();
app.use(express.json()); // แปรงข้อมูลใน body เป็น json ให้

// End point
app.use(planetsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening at: http://localhost:${PORT}`);
});