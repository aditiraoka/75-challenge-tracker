// types/index.ts

export type Status = 'DONE' | 'PENDING';

export interface LogTask {
  id: number;
  taskName: string;
  status: Status;
}

export interface DailyLog {
  id: number;
  dayNumber: number;
  date: string;
  logTasks: LogTask[];
}
