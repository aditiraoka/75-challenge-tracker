// frontend\components\AddDailyLogForm.tsx
'use client';
import { useState, FormEvent } from 'react';
import { createDailyLog } from '../lib/api';

interface Props {
  onSuccess?: () => void;
}

export default function AddDailyLogForm({ onSuccess }: Props) {
  const [dayNumber, setDayNumber] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createDailyLog({ dayNumber: Number(dayNumber), date });
    if (res.error) {
      alert('❌ A log already exists for this date!');
    } else {
      onSuccess?.();
      setDayNumber('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-lg font-semibold">➕ Add New Daily Log</h3>
      <input
        type="number"
        placeholder="Day Number"
        value={dayNumber}
        onChange={(e) => setDayNumber(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Create Log
      </button>
    </form>
  );
}



/*'use client';
import { useState } from 'react';
import { createDailyLog } from '../lib/api';

export default function AddDailyLogForm({ onSuccess }) {
  const [dayNumber, setDayNumber] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await createDailyLog({ dayNumber: Number(dayNumber), date });
    if (res.error === 'Date already exists') {
      alert('❌ A log already exists for this date!');
    } else {
      onSuccess?.();
      setDayNumber('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-lg font-semibold">➕ Add New Daily Log</h3>
      <input
        type="number"
        placeholder="Day Number"
        value={dayNumber}
        onChange={(e) => setDayNumber(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" onClick={() => setShowForm(true)}>
        Create Log
      </button>
    </form>
  );
}
*/