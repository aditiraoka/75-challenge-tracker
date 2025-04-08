const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes

//Testing server
const ping = require('./routes/test');
app.use('/api/ping', ping);

//Task Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

//Start server
app.listen(PORT, ()=> {
    console.log(`Backend server running at http://localhost:${PORT}`);
});