-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dayNumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DailyLog" ("createdAt", "date", "dayNumber", "id") SELECT "createdAt", "date", "dayNumber", "id" FROM "DailyLog";
DROP TABLE "DailyLog";
ALTER TABLE "new_DailyLog" RENAME TO "DailyLog";
CREATE UNIQUE INDEX "DailyLog_dayNumber_key" ON "DailyLog"("dayNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
