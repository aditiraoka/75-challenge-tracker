const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//Fetch All Daily Logs
const getAllDailyLogs = async (req, res) =>{
    try{
        const logs = await prisma.dailyLog.findMany({
            include: { logTasks: true },
            orderBy: { dayNumber: 'asc' }
        });
        res.json(logs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Create a new log for today
const createLogForToday = async (req, res) => {
    const { dayNumber, date } = req.body;
    try{
        if(!dayNumber){
            return res.status(400).json({ error: "Day Number is required" });
        }
        const today = new Date().toISOString().split('T')[0];
        const logDate = date ? new Date(date) : new Date(today);
        /*if(!date){
            const today = new Date().toISOString().split('T')[0];
            const date = new Date(today);
        }*/
        const existingLog = await prisma.dailyLog.findFirst({
            where: { dayNumber }
        });
        if(existingLog){
            return res.status(400).json({ error: `A log already exits for this day ${dayNumber}` });
        }
        //Get all task rules
        const allTaskRules = await prisma.taskRules.findMany();

        const newLog = await prisma.dailyLog.create({
            data: {
                dayNumber,
                date: logDate,
                logTasks: {
                    create: allTaskRules.map(task => ({
                        taskName: task.taskName,
                        status: 'PENDING'
                    }))
                }
            },
            include: { logTasks: true }
        });
        res.status(201).json({message: "Daily log created",
            log: newLog});
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}


//Update log for a given day
const updateLogTask = async (req, res) => {
    const { dailyLogId, taskId } = req.params;
    const { status } = req.body;

    try{
        const task = await prisma.logTask.findFirst({
            where: {id: Number(taskId),
                dailyLogId: Number(dailyLogId)
            }
        });
        if(!task){
            return res.status(404).json({ error: "Task not found for this day" });
        }
        console.log(task);
        const updated = await prisma.logTask.update({
            where: { id: Number(taskId) },
            data: { 
                taskName: task.taskName,
                status: status ?? task.status
             }
        });
        res.json(updated);
    }
    catch (err) {
        console.error("Error creating daily log:", err);
        res.status(500).json({ 
            error: "Failed to create daily log",
            details: err.message 
        });
    }
}
/*
//Fetching daily log by date (yyy-mm-dd)
const getDailyLogs = async (req, res) => {
    const { date } = req.params;
    try{
        const log = await prisma.dailyLog.findFirst({
            where: { date: new Date(date) },
            include: { logTasks: true }
        });
        res.json(log);
    }
    catch(err){
        res.status(404).json({ error: 'Log not found' });
    }
}

//Update the task status (Done or Pending)
const updateDailyTaskProgress = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    try{
        const updated = await prisma.logTask.update({
            where: { id: taskId },
            data: { status }
        });
        res.json(updated);
    }
    catch{
        res.status(400).json({ error: 'Failed to update task status' });
    }
}
*/

module.exports = {
    getAllDailyLogs,
    createLogForToday,
    updateLogTask,
}