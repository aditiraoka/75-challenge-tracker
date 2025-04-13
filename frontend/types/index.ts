// types/index.ts
/* Old Code
export type Task = {
    id: number;
    taskName: string;
    status: string;
};

export type Day = {
    id: number;
    date: string;
    tasks: Task[];
};
*/
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
