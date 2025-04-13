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
const createNewLog = async (req, res) => {
    const { dayNumber, date } = req.body;
    try{
        console.log(`dayNumber: ${dayNumber} and date: ${date}`);
        if(!dayNumber || !date){
            return res.status(400).json({ error: "Day Number is required" });
        }
        // Check if a log already exists for this day number
        const existingLog = await prisma.dailyLog.findFirst({
            where: {
                OR: [
                  { dayNumber: Number(dayNumber) },
                  { date } // ensure unique date
                ]
              }
        });

        if(existingLog){
            return res.status(400).json({ error: `A log already exits for this day ${dayNumber}` });
        }
        
        //Get all task rules
        const allTaskRules = await prisma.taskRules.findMany();

        const newLog = await prisma.dailyLog.create({
            data: {
                dayNumber: Number(dayNumber),
                date,
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

//Update the date of the log
const updateLogDate = async (req, res) => {
    const { logId } = req.params;
    const id = logId;
    const { date } = req.body;

    if (!logId) {
        return res.status(400).json({ error: 'logId param is missing' });
    }
  
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }
  
    try {
        console.log(`logId: ${logId} and date: ${date}`);

        // Check if this date already exists for any other log
        const existing = await prisma.dailyLog.findFirst({
            where: {
                date,
                NOT: { id: { equals: Number(logId) } },
            },
        });
        //console.log("1");

        //console.log(`existing date ${date} for log ${logId}`);
        if (existing) {
            return res.status(400).json({ error: 'Date already exists' });
        }

        //console.log("2");

        const updated = await prisma.dailyLog.update({
        where: { id: Number(logId) },
        data: { date },
      });
      //console.log("3");
      //console.log(`Updated log: ${updated}`);
      res.json(updated);

    } catch (err) {
      console.error('Error updating log date:', err);
      res.status(500).json({ error: 'Failed to update log date', details: err.message });
    }
  };

module.exports = { getAllDailyLogs, 
    createNewLog, 
    updateLogTask, 
    updateLogDate 
}