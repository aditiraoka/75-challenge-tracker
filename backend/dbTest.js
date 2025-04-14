const { PrismaClient } = require('@prisma/client');
const prisma =  new PrismaClient();

async function main() {
    const newTask = await prisma.task.create({
        data: {
            title: 'First task from Prisma',
        },
    });

    console.log('Task created: ', newTask);

    const allTasks = await prisma.task.findMany();
    console.log('All tasks: ', allTasks);
    
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });