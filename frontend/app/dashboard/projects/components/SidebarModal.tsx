'use client';

import { useState } from "react";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "Todo" | "In Progress" | "Done";
  progress: number;
  tasks: number;
  completed: number;
  team: number;
  deadline?: string;
  priority: "Low" | "Medium" | "High";
  tags?: string[];
  color: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: string;
}

interface SidebarProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSave: (project: Project) => void;
}

export default function SidebarProjectForm({ isOpen, onClose, project, onSave }: SidebarProjectFormProps) {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState<Project["status"]>(project?.status || "Todo");
  const [progress, setProgress] = useState(project?.progress || 0);
  const [tasks, setTasks] = useState(project?.tasks || 0);
  const [completed, setCompleted] = useState(project?.completed || 0);
  const [team, setTeam] = useState(project?.team || 1);
  const [deadline, setDeadline] = useState(project?.deadline || "");
  const [priority, setPriority] = useState<Project["priority"]>(project?.priority || "Medium");
  const [tags, setTags] = useState(project?.tags?.join(", ") || "");
  const [color, setColor] = useState(project?.color || "bg-indigo-500");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: project?.id || Date.now().toString(),
      name,
      description,
      status,
      progress,
      tasks,
      completed,
      team,
      deadline,
      priority,
      tags: tags.split(",").map(tag => tag.trim()),
      color,
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: "user_123",
    };
    onSave(newProject);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/30 z-40" />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{project ? "Edit Project" : "Create Project"}</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none"
          >
            &#10005;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Project Name"
            required
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <select
              value={status}
              onChange={e => setStatus(e.target.value as Project["status"])}
              className="w-1/2 p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as Project["priority"])}
              className="w-1/2 p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              min={0} max={100}
              placeholder="Progress %"
              className="w-1/3 p-2 border rounded"
            />
            <input
              type="number"
              value={tasks}
              onChange={e => setTasks(Number(e.target.value))}
              min={0}
              placeholder="Total Tasks"
              className="w-1/3 p-2 border rounded"
            />
            <input
              type="number"
              value={completed}
              onChange={e => setCompleted(Number(e.target.value))}
              min={0} max={tasks}
              placeholder="Completed"
              className="w-1/3 p-2 border rounded"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={team}
              onChange={e => setTeam(Number(e.target.value))}
              min={1}
              placeholder="Team Size"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bg-indigo-500">Indigo</option>
            <option value="bg-green-500">Green</option>
            <option value="bg-red-500">Red</option>
            <option value="bg-yellow-500">Yellow</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {project ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>
    </>
  );
}
