const { PrismaClient } = require('@prisma/client');
const prisma =  new PrismaClient();

const getAllTasks = async (req, res) => {
    try{
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    }
    catch{
        console.error('Error fetching tasks: ', error);
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
};

const createTask = async (req, res)=>{
    const {title, completed} = req.body;
    try{
        const newTask = await prisma.task.create({
            data:{
                title,
                completed: completed || false,
            },
        });
        res.status(201).json(newTask);

    }
    catch (error){
        console.error('Error creating new task: ', error);
        res.status(500).json({ error: 'Failed to create new task'});

    }
};

module.exports = {
    getAllTasks,
    createTask,
};