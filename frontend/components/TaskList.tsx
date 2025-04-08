'use client';

import {useEffect, useState } from 'react';
import { fetchTasks } from '../lib/api';

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export default function Taskist() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks()
        .then((data) => {
            setTasks(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading tasks...</p>;
    if (!tasks.length) return <p>No tasks found!</p>;

    return(
        <ul className="p-4 space-y-2">
            {tasks.map((task) => (
                <li key={task.id} className="border p-2 rounded shadow-sm">
                    {task.title} {task.completed ? '✅' : '❌'}
                </li>
            ))}
        </ul>
    );
}