// backend\routes\dailyLog.js
const express = require('express');
const router = express.Router();

const { getAllDailyLogs, createNewLog, updateLogTask, updateLogDate, } = require('../controllers/dailyLogContollers');

//PUT - update the date of the log
router.put('/:logId/date', updateLogDate);

//GET - all daily log
router.get('/', getAllDailyLogs);

//POST - create Log for today
router.post('/', createNewLog);

//PUT - update task status (DONE or PENDING)
router.put('/:dailyLogId/tasks/:taskId', updateLogTask);

module.exports = router;