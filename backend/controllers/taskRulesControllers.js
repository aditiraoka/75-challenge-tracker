const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTaskRules = async (req, res) => {
    try{
        const tasks = await prisma.taskRules.findMany();
        res.json(tasks);
    }
    catch{
        console.error('Error fetching tasks: ', error);
        res.status(500).json({error: 'Failed to fetch tasks'}); 
    }
}

const createTaskRule = async (req, res) => {
    const { taskName } = req.body;

    try{
        const habit = await prisma.taskRules.create({data: { taskName }});
        res.status(201).json(habit);
    }
    catch (err) {
        res.status(400).json({ error: 'Habit already exits or invalid'});
    }
}

const updateTaskRule = async (req, res) => {
    const { id } = req.params;
    const { taskName } = req.body;
    try{
        const updated = await prisma.taskRules.update({
            where: { id: parseInt(id) },
            data: { taskName },
        });
        res.json(updated);
    }
    catch (err){
        res.json(400).json({error: 'Error in updating Habit'});
    }
}

const deleteTaskRule = async (req, res) => {
    const { id } = req.params;
    try{
        await prisma.taskRules.delete({ where: { id: parseInt(id) }});
        res.status(204).send();

    }
    catch(err){
        res.json(400).json({error: 'Error in deleting Habit'});
    }
}

module.exports = {
    getAllTaskRules,
    createTaskRule,
    updateTaskRule,
    deleteTaskRule,
}