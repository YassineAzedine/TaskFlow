// app/components/TaskCard.tsx
'use client';

import React, { useState } from 'react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onUpdate?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSave = () => {
    onUpdate?.({
      ...task,
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate?.({
      ...task,
      completed: !task.completed
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-3 border border-gray-200">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Task description"
            rows={3}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleComplete}
              className="h-5 w-5 text-blue-600"
            />
          </div>
          
          {task.description && (
            <p className="text-gray-600">{task.description}</p>
          )}
          
          <div className="flex space-x-2 pt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}   