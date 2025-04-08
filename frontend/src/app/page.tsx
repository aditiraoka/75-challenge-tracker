'use client';

import React from 'react';
import { useEffect, useState } from 'react';

type Task = {
  id: number;
  taskName: string;
  status: string;
};

type Day = {
  id: number;
  date: string;
  tasks: Task[];  
}

export default function HomePage() {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks/dummy')
    .then(res => res.json())
    .then(data => setDays(data));
  }, []);

  return(
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">🧠{'\t'} 75 Day Challenge App</h1>
      <div className="flex flex-col gap-4 items-center"> 
      {days.map((day, idx) => (
        <div key={day.id} className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Day {idx + 1}</h2>
          <ul className="space-y-2">
            {day.tasks.map(task => (
              <li key={task.id} className="flex justify-between">
                <span><span>{task.taskName}</span></span>
                <span
                  className={`px-2 py-1 rounded text-sm ml-6 ${
                    task.status === 'Done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </main>
  );
}

/*
import TaskList from '../../components/TaskList';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Tasks from DB</h1>
      <TaskList />
    </main>
  );
}
*/