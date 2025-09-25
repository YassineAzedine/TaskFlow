"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Project } from "../types/project";

export const useProjects = (initialProjects: Project[]) => {
  console.log(initialProjects)
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const fetchProjects = async () => {
  setLoading(true);
  setError(null);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3030/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(response.data);
  } catch (err: unknown) {
    console.error("Error fetching projects:", err);

    let message = "Erreur lors de la récupération des projets";

    if (axios.isAxiosError(err)) {
      // Axios error: safe to access response.data.message
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
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "all" || project.status === filter;
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (project: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? project : p))
    );
  };

const deleteProject = async (id: string) => {
  try {
    console.log("Deleting project with id:", id);

    // Récupérer le token (depuis localStorage par exemple)
    const token = localStorage.getItem("token");

    // Appel API pour supprimer le projet avec le token dans les headers
    await axios.delete(`http://localhost:3030/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Mise à jour locale après suppression réussie
  setProjects((prev) => prev.filter((p) => p.id !== Number(id)));


    console.log("Project deleted successfully");
  } catch (error) {
    console.error("Failed to delete project:", error);
    // Optionnel : afficher un message à l'utilisateur
  }
};
  return {
    projects,
    filteredProjects,
    addProject,
    updateProject,
    deleteProject,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    loading,
    error ,
    fetchProjects
  };
};
