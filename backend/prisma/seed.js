const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // 🌱 1. Create initial task rules
  const taskRulesData = [
    { taskName: 'Follow 80-20 Diet' },
    { taskName: 'Exercise for 45 minutes' },
    { taskName: 'Drink 3l of water' },
    { taskName: 'Read 10+ Pages' },
    { taskName: 'Take a Progress Picture' },
  ];

  for (const taskData of taskRulesData) {
    await prisma.taskRules.upsert({
      where: { taskName: taskData.taskName },
      update: {},
      create: taskData
    });
  }

  console.log('✅ Task rules seeded');

  // 📅 2. Set today's date in YYYY-MM-DD format (local time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`; // 👈 final value

  const dayNumber = 1;

  // 🔍 3. Check if today's log already exists
  const existing = await prisma.dailyLog.findFirst({
    where: { date: formattedDate },
  });

  if (existing) {
    console.log('🔁 Daily log already exists for today.');
    return;
  }

  // 📝 4. Create daily log
  const dailyLog = await prisma.dailyLog.create({
    data: {
      dayNumber,
      date: formattedDate,
    },
  });

  console.log('✅ DailyLog seeded');

  // ✅ 5. Add log tasks from rules
  const taskRules = await prisma.taskRules.findMany();

  const logTasksData = taskRules.map((rule) => ({
    taskName: rule.taskName,
    dailyLogId: dailyLog.id,
  }));

  for (const logTaskData of logTasksData) {
    await prisma.logTask.create({
      data: logTaskData,
    });
  }

  console.log('✅ Log tasks seeded');
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();