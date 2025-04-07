const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/api/ping', (req, res) => {
    res.json({ message:'pong'});
});

//Start server
app.listen(PORT, ()=> {
    console.log(`Backend server running at http://localhost:${PORT}`);
});