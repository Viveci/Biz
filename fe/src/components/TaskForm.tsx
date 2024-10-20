import React, { useState } from 'react';
import { createTask, updateTask } from '../services/taskService';

interface TaskFormProps {
  onSave: (task: any) => void;
  task?: any;  // If updating, pass in the task to edit
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [deadline, setDeadline] = useState(task?.deadline || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = { title, description, completed, deadline };
    onSave(updatedTask);  // Save the new or updated task
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task Title"
        className="border p-2 w-full"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full"
      ></textarea>
      <label className="block">
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
          className="mr-2"
        />
        Completed
      </label>
      <input
        type="datetime-local"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;

