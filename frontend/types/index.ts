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