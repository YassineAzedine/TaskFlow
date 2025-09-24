// app/dashboard/projects/page.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import DashboardLayout from '@/app/components/dashboard/Layout';
import StatsGrid from '@/app/components/dashboard/StatsGrid';
import ProjectsTable from '../components/ProjectsTable';
import ProjectsHeader from '../components/ProjectsHeader';
import ProjectModal from '../components/Modal';
import { Project } from '../../types/project';
import DeleteConfirmModal from "../components/confirmDelete";
import { projectStatsData, initialProjects } from '../data/mockData';
import { useProjects } from '../../hooks/useProjects';
import FullScreenProjectModal from '../components/FullScreenProjectModal';
import ProjectDetails from '../components/ProjectDetails';

export default function ProjectsPage() {
 
 const project  = { id: 2, name: 'Mobile App Development', progress: 60, numtasks: 20, completed: 12, color: 'bg-purple-500', status: 'In Progress', team: 5, deadline: '2023-08-20', tasks: [], description: undefined }

  // Calculate stats based on current projects

  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    plan: 'Pro',
    projects: 12,
    completedTasks: 84,
    productivityScore: 87
  };

  return (
    <DashboardLayout userData={userData}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project</h1>
        <p className="text-gray-600">Manage all your projects in one place</p>
      </div>

    
   
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
     
        
        <ProjectDetails project={project} onSaveProject={function (project: Project): void {
              throw new Error('Function not implemented.');
          } }/>

    
     
     
  
      </div>
    </DashboardLayout>
  );
}