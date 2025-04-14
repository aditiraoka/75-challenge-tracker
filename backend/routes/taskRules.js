const express = require('express');
const router = express.Router();

const { getAllTaskRules, createTaskRule, updateTaskRule, deleteTaskRule, } = require("../controllers/taskRulesControllers");

//GET - All the habits
router.get('/', getAllTaskRules);

//POST - Add New Habit
router.post('/', createTaskRule);

//PUT - Update existing Habit
router.put('/:id', updateTaskRule);

//DELETE - Delete existing Habit
router.delete('/:id', deleteTaskRule);

module.exports = router;