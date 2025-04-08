const express = require('express');
const router = express.Router();
const { getDummyTasks } = require('../controllers/taskController');

router.get('/dummy', getDummyTasks);
//router.post('/tasks', createTask);

module.exports = router;