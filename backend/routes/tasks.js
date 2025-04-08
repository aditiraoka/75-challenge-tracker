const express = require('express');
const router = express.Router();
const {getAllTasks, createTask} = require('../controllers/taskController');

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);

module.exports = router;