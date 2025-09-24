'use client';

import { useState, useMemo, useCallback } from 'react';
import DashboardLayout from '@/app/components/dashboard/Layout';
import StatsGrid from '@/app/components/dashboard/StatsGrid';
import ProjectsTable from './components/ProjectsTable';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectModal from './components/Modal';
import DeleteConfirmModal from "./components/confirmDelete";
import FullScreenProjectModal from './components/FullScreenProjectModal';
import { Project } from '../types/project';
import { projectStatsData, initialProjects } from './data/mockData';
import { useProjects } from '../hooks/useProjects';
import { log } from 'console';

export default function ProjectsPage() {
  const {
    projects,
    filteredProjects,
    addProject,
    updateProject,
    deleteProject,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery ,
    fetchProjects
  } = useProjects(initialProjects);

  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectStats = useMemo(() => projectStatsData(projects), [projects]);

  // 🔹 Sauvegarder projet (add ou update)
  const handleSave = useCallback((savedProject: Project) => {
    
    if (savedProject.id) updateProject(savedProject);
    else addProject(savedProject);

    setIsModalOpen(false);
    setEditingProject(undefined);
  }, [addProject, updateProject]);

  const handleEdit = useCallback((project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  }, []);

const handleDelete = useCallback(() => {
  if (projectToDelete) {
    deleteProject(projectToDelete.id);
    setProjectToDelete(null);
    setIsDeleteModalOpen(false);
  }
}, [projectToDelete, deleteProject]);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProject(undefined);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  }, []);

  const handleNewProject = useCallback(() => {
    setEditingProject(undefined);
    setIsModalOpen(true);
  }, []);

  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    plan: 'Pro',
    projects: projects.length,
    completedTasks: 84,
    productivityScore: 87
  };

  return (
    <DashboardLayout userData={userData}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-600">Manage all your projects in one place</p>
      </div>

      <StatsGrid stats={projectStats} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <ProjectsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filter={filter}
          onFilterChange={setFilter}
          onNewProject={handleNewProject}
          filteredProjects = {filteredProjects}
        />

        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={editingProject}
          onSave={handleSave}
          fetchProjects={fetchProjects}
          
          
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
          title="Delete Project"
          message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        />

      <ProjectsTable
  projects={filteredProjects}
  onEdit={handleEdit}
  onDelete={(project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  }}
  onNewProject={handleNewProject}
  openProject={openProject}
/>


        {selectedProject && (
          <FullScreenProjectModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
