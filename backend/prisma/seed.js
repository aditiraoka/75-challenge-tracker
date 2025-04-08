const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.day.deleteMany();

  for (let i = 1; i <= 3; i++) {
    const day = await prisma.day.create({
      data: {
        date: new Date(2025, 3, i), // April 1, 2, 3
        tasks: {
          create: [
            { taskName: '45 min workout', status: i === 1 ? 'Done' : 'Pending' },
            { taskName: 'Diet', status: i === 1 ? 'Done' : 'Pending' },
            { taskName: '3L Water', status: i === 1 ? 'Done' : 'Pending' },
            { taskName: 'Read 10 pages', status: i === 1 ? 'Done' : 'Pending' },
            { taskName: 'Progress Picture', status: i === 1 ? 'Done' : 'Pending' },
          ],
        },
      },
    });

    console.log(`Day ${i} created`);
  }
}

main().finally(() => prisma.$disconnect());