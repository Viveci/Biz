import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const LandingPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  // onSave function no longer expects a 'task' parameter
  const handleSaveTask = () => {
    setRefresh(!refresh);  // Trigger a refresh when a new task is saved
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>

        {/* Task Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add or Edit a Task</h2>
          <TaskForm onSave={handleSaveTask} />  {/* Pass the handleSaveTask prop */}
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
          <TaskList refresh={refresh} />  {/* Pass refresh as a prop to reload task list */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

