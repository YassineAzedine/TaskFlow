'use client';

import { useState, useEffect } from "react";

interface Task {
  status: string;
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
}

interface FullScreenProjectModalProps { 
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSaveProject: (project: Project) => void; // Save updated project
}

export default function FullScreenProjectModal({ isOpen, onClose, project, onSaveProject ,  }: FullScreenProjectModalProps) {

    
  const [localProject, setLocalProject] = useState<Project | undefined>(project);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    setLocalProject(project);
  }, [project]);

  if (!isOpen || !localProject) return null;

  const addTask = () => {
    if (!newTaskTitle) return;
    const newTask: Task = {
      id: Date.now().toString(), title: newTaskTitle, completed: false,
      status: ""
    };
    setLocalProject(prev => prev ? { ...prev, tasks: [...prev.tasks, newTask] } : prev);
    setNewTaskTitle("");
  };

  // const toggleTask = (id: string) => {
  //   setLocalProject(prev => prev ? {
  //     ...prev,
  //     tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  //   } : prev);
  // };

  const deleteTask = (id: string) => {
    setLocalProject(prev => prev ? {
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    } : prev);
  };

  const handleSaveProject = () => {
    if (localProject) onSaveProject(localProject);
    onClose();
  };

 const progress = Math.round(
  (localProject.tasks.filter(t => t.status === 'done').length / (localProject.tasks.length || 1)) * 100
);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Modal Full-Screen */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-4xl h-full rounded-lg shadow-lg overflow-y-auto relative p-6 transform transition-all duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl font-bold"
          >
            &#10005;
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{localProject.name}</h2>
            {localProject.description && <p className="text-gray-600">{localProject.description}</p>}
            <p className="mt-2 text-sm text-gray-500">Progress: {progress}%</p>
          </div>

          {/* Tasks */}
          <div className="mb-4">
            <div className="flex mb-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 p-2 border rounded-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {/* {localProject.tasks.map(task => (
                <li key={task.id} className="flex justify-between items-center border p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))} */}
            </ul>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveProject}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
