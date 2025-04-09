'use client';
import { Day } from '../types';
import TaskCard from './TaskCard';

export default function DayCard({ day, index }: { day: Day; index: number }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">Day {index + 1}</h2>
      <ul className="space-y-2">
        {day.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
