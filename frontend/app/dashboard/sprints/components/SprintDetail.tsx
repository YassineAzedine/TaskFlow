'use client';

import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, Calendar, User, Clock, Archive, AlertCircle, X } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Project } from '../../types/project';

// Types
interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedUserId?: string;
  dueDate?: string;
  projectId: string;
  sprintId?: string;
}

interface Column {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  limit?: number;
}
type ProjectDetailsProps = {
  project: Project;
  onSaveProject: (project: Project) => void;
};

const TrelloBoard = ({  }: ProjectDetailsProps) => {
  console.log("Rendering TrelloBoard with project:",  process.env.NEXT_PUBLIC_API_URL);

  //edit Task 
 const [openModalEdit, setOpenModalEdit] = useState(false);
const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { id } = useParams();
  console.log("Project ID from params:", id);


const [ownerId, setOwnerId] = useState<string | null>(null);

useEffect(() => {
  const storedUserId = localStorage.getItem("userId");
  setOwnerId(storedUserId);
}, []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Task['status']>('todo');
    const [projectId, setProjectId] = useState<string>('');
//edit task 
function updateTask() {
  if (!selectedTask) return;

  // Sélectionne uniquement les champs modifiables
  const { _id, title, description, priority, dueDate, assignedUserId } = selectedTask;
  const taskData = { title, description, priority, dueDate, assignedUserId };

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${_id}`, taskData)
    .then((res) => {
      console.log("Tâche mise à jour :", res.data);

      // Met à jour le state local sans recharger la page
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === _id ? { ...task, ...taskData } : task
        )
      );

      setOpenModalEdit(false); // ferme la popup
    })
    .catch((err) => {
      console.error("Erreur lors de la mise à jour :", err);
    });
}



  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    assignee: '',
    dueDate: '',
    tags: ''
  });

  const columns: Column[] = [
    { id: 'backlog', title: '🎯 Backlog', status: 'backlog', color: 'bg-slate-100', limit: 10 },
    { id: 'todo', title: '📋 À Faire', status: 'todo', color: 'bg-blue-50' },
    { id: 'progress', title: '🚀 En Cours', status: 'in-progress', color: 'bg-yellow-50', limit: 3 },
    // { id: 'review', title: '👀 Review', status: 'review', color: 'bg-orange-50', limit: 2 },
    { id: 'done', title: '✅ Terminé', status: 'done', color: 'bg-green-50' }
  ];

  const priorityColors = {
    low: 'bg-gray-200 text-gray-700',
    medium: 'bg-blue-200 text-blue-800',
    high: 'bg-orange-200 text-orange-800',
    urgent: 'bg-red-200 text-red-800'
  };

  const priorityIcons = {
    low: '⬇️',
    medium: '➡️',
    high: '⬆️',
    urgent: '🚨'
  };
  const [openMenu, setOpenMenu] = useState(false);
  // --- Load tasks on mount ---

  useEffect(() => {
    const fetchTasks = async () => {
      if (!id) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/sprint/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched tasks:", res.data);

        setTasks(res.data); // store tasks
        if (res.data.length > 0 && res.data[0].projectId) {
          setProjectId(res.data[0].projectId); // store projectId from first task
        }
      } catch (err) {
        console.error("Erreur lors du chargement des tâches :", err);
      }
    };

    fetchTasks();
  }, [id]);
console.log("projectId loaded:", projectId);
  // --- Optimistic Add Task ---
const addTask = async () => {
  if (!newTask.title.trim() || !id) return;
  const sprintId = Array.isArray(id) ? id[0] : id;


  const tempId = Date.now().toString(); // ID temporaire uniquement pour le frontend

  // Tâche côté frontend
  const tempTask: Task = {
    _id: tempId, // juste pour React (⚠️ ne sera pas envoyé au backend)
    title: newTask.title,
    description: newTask.description || '',
    status: selectedColumn,
    priority: newTask.priority,
    assignedUserId: ownerId || 'unknown',
    dueDate: newTask.dueDate || undefined,
    projectId,
    sprintId ,
  };

  // Ajout optimiste dans le state
  setTasks(prev => [...prev, tempTask]);

  // Reset form
  setNewTask({ title: '', description: '', priority: 'medium', assignee: '', dueDate: '', tags: '' });
  setShowPopup(false);

  try {
    // On envoie la tâche SANS _id
    const { _id, ...taskData } = tempTask;
    const res = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/tasks`, taskData);
    const savedTask: Task = res.data;

    // Remplace la tâche temporaire par la vraie
    setTasks(prev => prev.map(t => t._id === tempId ? savedTask : t));
  } catch (err) {
    // En cas d'erreur, supprime la tâche temporaire
    setTasks(prev => prev.filter(t => t._id !== tempId));
    console.error(err);
  }
};



  // --- Optimistic Move Task ---
  const moveTask = async (taskId: string, newStatus: Task['status']) => {

    console.log(`Moving task ${taskId} to ${newStatus}`);
    
    const column = columns.find(c => c.status === newStatus);
    const tasksInColumn = tasks.filter(t => t.status === newStatus);

    if (column?.limit && tasksInColumn.length >= column.limit && !tasksInColumn.some(t => t._id === taskId)) {
      alert(`La colonne "${column.title}" est limitée à ${column.limit} tâches`);
      return;
    }

    const oldTasks = [...tasks];
    setTasks(prev =>
      prev.map(task =>
        task._id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } : task
      )
    );

    try {
    const taskMove =   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      console.log("Task moved:", taskMove);
      
    } catch (err) {
      console.error("Erreur lors du déplacement de la tâche :", err);
      setTasks(oldTasks);
      alert('Impossible de déplacer la tâche !');
    }
  };

  // --- Optimistic Delete Task ---
  const deleteTask = async (taskId: string) => {
    const oldTasks = [...tasks];

    // Optimistically remove the task from UI
    setTasks(prev => prev.filter(t => t._id !== taskId));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Network error');

      // Simple success message
      console.log('Task deleted successfully');
    } catch (error) {
      // Revert UI changes if deletion fails
      setTasks(oldTasks);

      // Show error
      alert('Impossible de supprimer la tâche !');
      console.error('Delete task error:', error);
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask) {
      moveTask(draggedTask._id!, status);
      setDraggedTask(null);
    }
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-purple-600 to-blue-700 p-5">
      <div className="max-w-14xl mx-auto">
        {/* Board */}
        <div className="flex gap-12 overflow-x-auto pb-4">
          {columns.map(column => {
            const columnTasks = tasks.filter(task => task.status === column.status);
            const isOverLimit = column.limit && columnTasks.length > column.limit;

        

            return (
              <div
                key={column.id}
                className="min-w-81 bg-white rounded-xl shadow-lg"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                {/* Column Header */}
                <div className={`${column.color} p-4 rounded-t-xl border-b`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{column.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isOverLimit ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {columnTasks.length}{column.limit ? `/${column.limit}` : ''}
                      </span>
                      <button
                        onClick={() => { setSelectedColumn(column.status); setShowPopup(true); }}
                        className="p-1 hover:bg-white/50 rounded-full transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {isOverLimit && (
                    <div className="flex items-center gap-1 text-red-600 text-xs">
                      <AlertCircle size={12} />
                      Limite dépassée
                    </div>
                  )}
                </div>

                {/* Tasks */}
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {columnTasks.map(task => (
                     <div
      key={task._id}
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      className="relative bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-all duration-200 group"
    >
      {/* Priority & Menu */}
      <div className="flex items-start justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
        >
          {priorityIcons[task.priority]} {task.priority}
        </span>

        {/* Button MoreVertical */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 hover:bg-gray-100 rounded transition-all"
          >
            <MoreVertical size={14} />
          </button>

          {/* Dropdown menu */}
          {openMenu && (
            <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-md z-20">
              <button
                onClick={() => {
    setOpenMenu(false);
    setSelectedTask(task);
    setOpenModalEdit(true);
  }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
              >
                Edit Task
              </button>
           
            </div>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-3">
          {task.assignedUserId && (
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{task.assignedUserId}</span>
            </div>
          )}
          {task.dueDate && (
            <div
              className={`flex items-center gap-1 ${
                isOverdue(task.dueDate) ? "text-red-500" : ""
              }`}
            >
              <Calendar size={12} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
        <button
      onClick={() => task._id && deleteTask(task._id)}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 p-1 rounded transition-all"
        >
          <Archive size={12} />
        </button>
      </div>

      {/* Status */}
      {task.status === "in-progress" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-blue-600">
          <Clock size={12} className="animate-pulse" />
          <span>En cours...</span>
        </div>
      )}
    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-sm">Aucune tâche</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      {/*Poup Edit Task */}
      {openModalEdit && selectedTask && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
      <button
        onClick={() => setOpenModalEdit(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        <X size={20} />
      </button>
      <h2 className="text-lg font-bold mb-4">Modifier la tâche</h2>

      <input
        type="text"
        placeholder="Titre de la tâche..."
        value={selectedTask.title}
        onChange={(e) => setSelectedTask(prev => prev ? { ...prev, title: e.target.value } : prev)}
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />

      <textarea
        placeholder="Description (optionnel)..."
        value={selectedTask.description || ""}
        onChange={(e) => setSelectedTask(prev => prev ? { ...prev, description: e.target.value } : prev)}
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        rows={2}
      />

      <div className="grid grid-cols-2 gap-2 mb-3">
        <select
          value={selectedTask.priority}
          onChange={(e) => setSelectedTask(prev => prev ? { ...prev, priority: e.target.value as Task['priority'] } : prev)}
          className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">🔽 Faible</option>
          <option value="medium">➡️ Moyenne</option>
          <option value="high">🔼 Haute</option>
          <option value="urgent">🚨 Urgente</option>
        </select>

        <input
          type="date"
          value={selectedTask.dueDate || ""}
          onChange={(e) => setSelectedTask(prev => prev ? { ...prev, dueDate: e.target.value } : prev)}
          className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <input
        type="text"
        placeholder="Assigné à..."
        value={selectedTask.assignedUserId || ""}
        onChange={(e) => setSelectedTask(prev => prev ? { ...prev, assignee: e.target.value } : prev)}
        className="w-full p-2 mb-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <button
          onClick={updateTask}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          Sauvegarder
        </button>
        <button
          onClick={() => setOpenModalEdit(false)}
          className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}

        {/* Popup Add Task */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
              <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X size={20} /></button>
              <h2 className="text-lg font-bold mb-4">Ajouter une tâche</h2>

              <input type="text" placeholder="Titre de la tâche..." value={newTask.title} onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))} className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus />
              <textarea placeholder="Description (optionnel)..." value={newTask.description} onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" rows={2} />
              <div className="grid grid-cols-2 gap-2 mb-3">
                <select value={newTask.priority} onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))} className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">🔽 Faible</option>
                  <option value="medium">➡️ Moyenne</option>
                  <option value="high">🔼 Haute</option>
                  <option value="urgent">🚨 Urgente</option>
                </select>
                <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))} className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input type="text" placeholder="Assigné à..." value={newTask.assignee} onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))} className="w-full p-2 mb-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <div className="flex gap-2">
                <button onClick={addTask} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">Ajouter</button>
                <button onClick={() => setShowPopup(false)} className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm">Annuler</button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <div className="text-sm opacity-80">Total Tâches</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'done').length}</div>
              <div className="text-sm opacity-80">Terminées</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</div>
              <div className="text-sm opacity-80">En Cours</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{tasks.filter(t => t.dueDate && isOverdue(t.dueDate)).length}</div>
              <div className="text-sm opacity-80">En Retard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrelloBoard;
  