'use client';
import { useEffect, useState } from 'react';
import { Day } from '../../types';
import { fetchDays } from '../../lib/api';
import DayCard from '../../components/DayCard';

export default function Home() {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    fetchDays().then(setDays);
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">🧠{'\t'} 75 Day Challenge App</h1>
      <div className="flex flex-col gap-4 items-center"> 
      {days.map((day, idx) => (
        <DayCard key={day.id} day={day} index={idx} />
      ))}
      </div>
    </main>
  );
}