const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

// ROUTES

//Testing server
const ping = require('./routes/test');
app.use('/api/ping', ping);

//Habit Routes
const taskRulesRoutes = require('./routes/taskRules')
app.use('/api/habits', taskRulesRoutes);

//Daily Logs Routes
const dailyLgRoutes = require('./routes/dailyLog');
app.use('/api/logs', dailyLgRoutes);


//Start server
app.listen(PORT, ()=> {
    console.log(`Backend server running at http://localhost:${PORT}`);
});