import { useState, useEffect, useMemo } from "react";
import axios from "axios";

// Types
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: "backlog" | "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  dueDate?: string;
  projectId: string;
}

interface UseTasksProps {
  projectId: string;
}

export const useTasks = ({ projectId }: UseTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch tasks
const fetchTasks = async () => {
  if (!projectId) return;
  setLoading(true);
  setError(null);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:3030/projects/${projectId}/tasks`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(res.data);
  } catch (err: unknown) {
    console.error("Error fetching tasks:", err);

    let message = "Erreur lors de la récupération des tâches";

    if (axios.isAxiosError(err)) {
      // Safe to access response for Axios errors
      message = err.response?.data?.message || message;
    } else if (err instanceof Error) {
      // Generic JS error
      message = err.message;
    }

    setError(message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  // 🔹 Memoized tasks by status (optionnel)
  const tasksByStatus = useMemo(() => {
    return tasks.reduce<Record<string, Task[]>>((acc, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    }, {});
  }, [tasks]);

  // 🔹 Add task
  const addTask = async (task: Omit<Task, "_id">) => {
    if (!projectId) return;
    const tempId = Date.now().toString();
    setTasks((prev) => [...prev, { ...task, _id: tempId }]); // Optimistic UI
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`http://localhost:3030/projects/${projectId}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const savedTask = res.data;
      setTasks((prev) => prev.map((t) => (t._id === tempId ? savedTask : t)));
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t._id !== tempId)); // rollback
      console.error(err);
    }
  };

  // 🔹 Update task
  const updateTask = async (task: Task) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3030/projects/${projectId}/tasks/${task._id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (taskId: string) => {
    const oldTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== taskId)); // Optimistic UI
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3030/projects/${projectId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      setTasks(oldTasks); // rollback
      console.error("Failed to delete task:", err);
    }
  };

  return {
    tasks,
    tasksByStatus,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
};
