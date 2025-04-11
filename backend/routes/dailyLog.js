const express = require('express');
const router = express.Router();

const { getAllDailyLogs, createLogForToday, updateLogTask, } = require('../controllers/dailyLogContollers');

//GET - all daily log
router.get('/', getAllDailyLogs);

//POST - create Log for today
router.post('/', createLogForToday);

//PUT - update task status (DONE or PENDING)
router.put('/:dailyLogId/tasks/:taskId', updateLogTask);

module.exports = router;