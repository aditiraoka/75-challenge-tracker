'use client';
import { useRouter } from 'next/navigation';

function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
        >
          🔙 Return to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;