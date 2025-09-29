'use client';
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Sprint } from "../../types/sprint";

export const useSprintsByProject = (projectId: string, initialSprints: Sprint[] = []) => {
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSprints = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sprints/project/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSprints(response.data);
    } catch (err: unknown) {
      console.error("Error fetching sprints:", err);
      let message = "Erreur lors de la récupération des sprints";
      if (axios.isAxiosError(err)) message = err.response?.data?.message || message;
      else if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchSprints();
  }, [projectId]);

  const filteredSprints = useMemo(() => {
    return sprints.filter((sprint) => {
      const matchesFilter = filter === "all" || sprint.status === filter;
      const matchesSearch = sprint.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [sprints, filter, searchQuery]);

  // ===============================
  // Add sprint via API
  // ===============================
  const addSprint = async (sprint: Partial<Sprint>) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sprints`,
        { ...sprint, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSprints((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding sprint:", err);
    }
  };

  // ===============================
  // Update sprint via API
  // ===============================
  const updateSprint = async (sprint: Sprint) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/sprints/${sprint.id}`,
        sprint,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSprints((prev) => prev.map((p) => (p.id === sprint.id ? response.data : p)));
    } catch (err) {
      console.error("Error updating sprint:", err);
    }
  };
  // find sprint by id

 const getSprintById = async (id: string): Promise<Sprint> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sprints/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
  // ===============================
  // Delete sprint via API
  // ===============================
  const deleteSprint = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/sprints/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSprints((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting sprint:", err);
    }
  };

  return {
    sprints,
    getSprintById,
    filteredSprints,
    addSprint,
    updateSprint,
    deleteSprint,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    fetchSprints,
   
  };
};
