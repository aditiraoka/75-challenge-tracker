// frontend\components\DayCard.tsx
import { useRouter } from 'next/navigation';
import { DailyLog } from '../types';
interface DayCardProps {
  log: DailyLog;
}

export default function DayCard({ log }: DayCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border">
      <h2 className="text-xl font-semibold">Day {log.dayNumber}</h2>
      <p className="text-gray-600">📅 {new Date(log.date+'T00:00:00').toLocaleDateString()}</p>

      <div className="mt-2 flex justify-between">
        <button
          onClick={() => router.push(`/log/${log.id}`)}
          className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          View Details
        </button>
        <button
          onClick={() => router.push(`/log/${log.id}?edit=true`)}
          className="text-sm bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
}