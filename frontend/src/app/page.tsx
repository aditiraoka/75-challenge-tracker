// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchAllLogs } from '../../lib/api';
import DayCard from '../../components/DayCard';
import AddDailyLogForm from '../../components/AddDailyLogForm';
import { DailyLog } from '../../types';

export default function Home() {
  const [logs, setLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    fetchAllLogs().then(setLogs);
  }, []);

  // To calculate streak
  const completedDays = logs.filter(log => log.logTasks.every(task => task.status === 'DONE'));
  const streak = completedDays.length;

  return (
    <main className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 drop-shadow-sm">🧠 75-Day Challenge Tracker</h1>

      <div className='text-center mb-8'>
        <span className='inline-flex items-center gap-2 px-4 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm shadow'>
          🔥 Current Streak: <strong> {streak} day{streak !== 1 ? 's':''}</strong>
        </span>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {logs.map((log) => (
          <DayCard key={log.id} log={log} />
        ))}
      </div>

      <div className="mt-12 max-w-md mx-auto">
        <AddDailyLogForm onSuccess={() => fetchAllLogs().then(setLogs)} />
      </div>
    </main>
  );
}