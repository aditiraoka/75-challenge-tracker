const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

const getDummyTasks = async (req, res) => {
    try{
        const days = await prisma.day.findMany({
            include: {tasks: true},
            orderBy: {date: 'asc'}
    });
    res.json(days)
    }
    catch{
        console.error('Error fetching tasks: ', error);
        res.status(500).json({error: 'Failed to fetch tasks'}); 
    }
};

module.exports = {
    getDummyTasks
};