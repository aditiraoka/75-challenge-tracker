// app/day/[id]/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {LogTask} from '../../../../types/index';
import {
  fetchLogById,
  updateLogTaskStatus,
  updateLogDate,
  DailyLog
} from '../../../../lib/api';

export default function DayDetailPage() {
  //
  const { id } = useParams();
  //
  //const params = useParams(); //Use if the above throws error
  //const id = Number(params.logId); //Use if the above throws error
  console.log('logId to send:', id);
  const [log, setLog] = useState<DailyLog | null>(null);
  const [dateInput, setDateInput] = useState('');
  const [tasks, setTasks] = useState<LogTask[]>([]);
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';

  useEffect(() => {
    console.log(`1. Id is ${id}`)
    if (id) {
      fetchLogById(Number(id)).then((data) => {
        setLog(data);
        setDateInput(data.date.split('T')[0]); // format YYYY-MM-DD
        setTasks(data.logTasks);
      });
    }
  }, [id]);

  const toggleStatus = async (task: LogTask) => {
    const newStatus = task.status === 'DONE' ? 'PENDING' : 'DONE';
    const updated = await updateLogTaskStatus(Number(id), task.id, newStatus);

    if (updated) {
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    }
  };

  const handleDateUpdate = async () => {
    
    const result = await updateLogDate({ logId: Number(id), date: dateInput });
    if (result.error) {
      alert('❌ Date already exists for another log! ');
    } else {
      fetchLogById(Number(id)).then(setLog);
    }
  };

  if (!log){
    const router = useRouter();
    console.log('Log not found');
    return (
    <div className='items-center justify-center'>
      <p className="p-6 text-center">Loading... {id} </p>
      <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
        >
          🔙 Return to Home
        </button>
    </div>
  );
}
  const router = useRouter();
  return (
    <main className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Day {log.dayNumber} Details</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">📅 Date:</label>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="ml-2 p-2 border rounded"
          />
          <button
            onClick={handleDateUpdate}
            className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Update Date
          </button>
        </div>

        <div>
        <ul className="space-y-3">
          {tasks.map(task => (
            <li 
                key={task.id} className={`flex items-center justify-between p-3 border rounded ${task.status === 'DONE' ? 'bg-green-100' : 'bg-yellow-100' }`}
                >
                  {task.taskName}
              {isEditMode ? (
                <input
                  type="checkbox"
                  checked={task.status === 'DONE'}
                  onChange={() => toggleStatus(task)}
                  className="h-4 w-4"
                />
              ) : (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    task.status === 'DONE'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {task.status}
                </span>
              )}
            </li>
          ))}
        </ul>
        </div>

        <div className='flex items-center'>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          Back to All Logs
        </button>
        </div>
      </div>
    </main>
  );
}