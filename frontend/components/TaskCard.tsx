import React from 'react';

interface TaskCardProps {
    title: string;
    status: 'Pending' | 'Completed';
    createdAt?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, status, createdAt }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold text-gray-800"> {title} </h2>
            <p className={`text-sm font-medium mt-1 ${status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                {status}
            </p>
            {createdAt && (
                <p className='text-xs text-gray-500 mt-2'>Created: {new Date(createdAt).toLocaleDateString()}</p>
            )}
        </div>
    );
};

export default TaskCard;