import React, { useState } from 'react';
import { createTask } from '../services/taskService';

interface TaskFormProps {
  onSave: () => void;  // Ensure the onSave prop is correctly defined
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      completed,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
    };

    try {
      await createTask(newTask);  // API call to create a new task
      onSave();  // Trigger parent action after save (like refreshing task list)
      setTitle('');  // Reset form fields after successful save
      setDescription('');
      setCompleted(false);
      setDeadline('');
    } catch (error) {
      console.error('Failed to save task:', error);
    }
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
      />
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

