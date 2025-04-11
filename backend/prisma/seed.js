const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient();

async function seed() {
  ///* 
  // Create initial task rules
  const taskRulesData = [
    { taskName: 'Follow 80-20 Diet' },
    { taskName: 'Exercise for 45 minutes' },
    { taskName: 'Drink 3l of water' },
    { taskName: 'Read 10+ Pages' },
    { taskName: 'Take a Progress Picture' },
  ];

  for (const taskData of taskRulesData) {
    await prisma.taskRules.create({
      data: taskData,
    });
  }

  console.log('✅ Task rules seeded');
  //*/

  ///* 
  // Create initial DailyLog
  //const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const today = "2025-04-07";
  const dayNumber = 1;

  // Check if today's log already exists
  const existing = await prisma.dailyLog.findFirst({
    where: { date: new Date(today) },
  });

  if (existing) {
    console.log("🔁 Daily log already exists for today.");
    return;
  }

  const dailyLogData = {
    dayNumber: dayNumber,
    date: new Date(today),
  };

  const dailyLog = await prisma.DailyLog.create({
    data: dailyLogData,
  });

  console.log('✅ DailyLog seeded');
  //*/

  ///* 
  //taskRules
  // Fetch task rules for log tasks
  const taskRules = await prisma.taskRules.findMany();

  // Create initial log tasks
  const logTasksData = taskRules.map((rule) => ({
    taskName: rule.taskName,
    dailyLogId: dailyLog.id,
  }));

  for (const logTaskData of logTasksData) {
    await prisma.LogTask.create({
      data: logTaskData,
    });
  }

  console.log('✅ Log tasks seeded');
  //*/
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());


/* Adding Daily Logs
async function main() {
  //const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const today = "2025-04-07";
  console.log(`Today is: ${today}`);

  // Check if today's log already exists
  const existing = await prisma.dailyLog.findFirst({
    where: { date: new Date(today) },
  });

  if (existing) {
    console.log("🔁 Daily log already exists for today.");
    return;
  }

  // Get all rules
  const rules = await prisma.rule.findMany();

  // Create new DailyLog
  const newLog = await prisma.dailyLog.create({
    data: {
      date: new Date(today),
      dayNumber: 1,
      logTasks: {
        create: rules.map((rule) => ({
          taskName: rule.taskName,
          status: "DONE",
        })),
      },
    },
    include: { logTasks: true },
  });

  console.log("✅ Today's log created:", newLog);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
*/ 


/* Adding Habits 
async function main() {
  const habits = [
    "45 min workout",
    "ollow 80/20 Diet",
    "Drink 3L Water",
    "Read 10+ pages",
    "Click Progress Picture",
  ];

  for (const taskName of habits) {
    await prisma.taskRules.create({
      data: {}
      where: { taskName },
      update: {},
      create: { taskName },
    });
  }

  console.log("✅ Habits seeded!");
}
*/

