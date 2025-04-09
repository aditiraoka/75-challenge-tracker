'use client';
import { Task } from '../types';

export default function TaskCard({ task }: { task: Task }) {
    return (
        <li className="flex justify-between">
      <span><span>{task.taskName}</span></span>
      <span
        className={`px-2 py-1 rounded text-sm ml-6 ${
          task.status === 'Done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
        }`}
      >
        {task.status}
      </span>
    </li>
    );
}