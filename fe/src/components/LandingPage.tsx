import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>

        {/* Task Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add or Edit a Task</h2>
          <TaskForm onSave={(task) => console.log("Saved Task", task)} /> {/* Add your onSave logic */}
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

