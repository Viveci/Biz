// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
import { Task } from '../types/Task';  // Import the Task interface

interface TaskListProps {
  refresh: boolean;  // Add the refresh prop
}

const TaskList: React.FC<TaskListProps> = ({ refresh }) => {
  const [tasks, setTasks] = useState<Task[]>([]);  // Explicitly type tasks as an array of Task objects

  // Fetch tasks whenever the component mounts or the refresh prop changes
  useEffect(() => {
    const loadTasks = async () => {
      const data: Task[] = await getTasks();
      setTasks(data);
    };
    loadTasks();
  }, [refresh]);  // Reload tasks when the refresh prop changes

const handleDelete = async (id: number | undefined) => {
  if (id === undefined) {
    console.error("Task ID is undefined");
    return;  // Exit early if there's no ID
  }

    await deleteTask(id);  // Call API to delete the task
    setTasks(tasks.filter(task => task.id !== id));  // Update state to remove the task
  };

  const handleToggleCompleted = async (task: Task) => {
    if (task.id === undefined) {
        console.error("Task ID is undefined");
        return;
    }

    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(task.id, updatedTask);
    setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));  // Update state after update
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description || "No description"}</p>
              <p className={`text-sm mt-2 ${task.completed ? "text-green-600" : "text-red-600"}`}>
                {task.completed ? "Completed" : "Incomplete"}
              </p>
              {task.deadline && (
                <p className="text-gray-500 text-xs mt-1">
                  Deadline: {new Date(task.deadline).toLocaleString()}
                </p>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleToggleCompleted(task)}
                className={`px-4 py-2 rounded text-white ${task.completed ? "bg-yellow-500" : "bg-green-500"}`}
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

