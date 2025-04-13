// frontend/lib/api.ts

/* Old Code
import { Day } from '../types';

export async function fetchDays(): Promise<Day[]>{
    const res = await fetch('http://localhost:5000/api/tasks/dummy');
    return res.json();
}
 Old Code */

export type Status = 'PENDING' | 'DONE';

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

// ✅ Fetch all daily logs
export async function fetchAllLogs(): Promise<DailyLog[]> {
  const res = await fetch('http://localhost:5000/api/logs');
  return res.json();
}

// ✅ Create a new daily log using date and dayNumber (auto-fills tasks from taskRules)
export async function createDailyLog({
  date,
  dayNumber
}: {
  date: string;
  dayNumber: number;
}): Promise<{ message?: string; error?: string }> {
  try{
    const res = await fetch('http://localhost:5000/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, dayNumber })
  });

  const data = await res.json();
  return data;
}
catch(error){
    console.error('Error creating daily log:', error);
    return { error: 'Request failed' };
}
}

// ✅ Fetch a specific daily log by ID (for detail view)
export async function fetchLogById(id: number): Promise<DailyLog> {
  //const res = await fetch(`http://localhost:5000/api/logs/${id}`);
  //return res.json();
    const res =await fetch(`http://localhost:5000/api/logs/`);
    const allLogs = await res.json();
    if(!allLogs) throw new Error(`Failed to Fetch daily logs`);
    const myLog = allLogs.find((log: DailyLog) => log.id === id);
    console.log(`Fetching daily log with id= ${myLog}`);
    return myLog;
}

// ✅ Update a single task's status
export async function updateLogTaskStatus( logId: number, taskId: number, status: 'DONE'|'PENDING')
 {
  const res = await fetch(`http://localhost:5000/api/logs/${logId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });

  if(!res.ok) throw new Error(`Failed to update the status of daily log of day ${logId} Task ${taskId}`);
  return res.ok ? await res.json() : null;

}

// ✅ Update a daily log's date
export async function updateLogDate({
  logId,
  date
}: {
  logId: number;
  date: string;
}): Promise<{ error?: string }> {
  console.log(`HERE ${logId}`);
  const res = await fetch(`http://localhost:5000/api/logs/${logId}/date`, 
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, 
        "id1": logId 
    })
  });
  
  console.log("Updated Date!")
  return res.json();
}

export async function deleteDailyLog(logId: number): Promise<{message?: string; error?: string}> {
    const res = await fetch(`http://localhost:5000/api/logs/${logId}`,
      {
        method: 'DELETE'
      });
      return res.json();
}