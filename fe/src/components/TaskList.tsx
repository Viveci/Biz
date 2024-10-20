// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
import TaskForm from './TaskForm';
import { Task } from '../types/Task';  // Import the Task interface

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);  // Explicitly type tasks as an array of Task objects

  useEffect(() => {
    const loadTasks = async () => {
      const data: Task[] = await getTasks();  // Ensure getTasks returns Task[]
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));  // Now TypeScript knows task has an id
  };

  const handleToggleCompleted = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(task.id, updatedTask);
    setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
  };

  const handleSaveTask = async (updatedTask: Task) => {
    await updateTask(updatedTask.id, updatedTask);
    const data: Task[] = await getTasks();  // Reload tasks after saving
    setTasks(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border p-4 mb-2 rounded shadow-md flex justify-between">
            <div>
              <h3 className="text-xl">{task.title}</h3>
              <p>{task.description}</p>
              <p>
                Completed:{" "}
                <span className={task.completed ? "text-green-500" : "text-red-500"}>
                  {task.completed ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Deadline: {task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline set"}
              </p>

            </div>
            <div>
              <button
                onClick={() => handleToggleCompleted(task)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-4">Add/Edit Task</h2>
      <TaskForm onSave={handleSaveTask} />
    </div>
  );
};

export default TaskList;

