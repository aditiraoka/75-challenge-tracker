const express = require('express');
const router = express.Router(); 

const { ping }= require("../controllers/test");

router.get("/", ping);

module.exports = router;