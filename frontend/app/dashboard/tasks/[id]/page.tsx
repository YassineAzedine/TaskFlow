// app/dashboard/projects/page.tsx
'use client';


import DashboardLayout from '@/app/components/dashboard/Layout';



import { Project } from '../../types/project';




import SprintDetails from '../../sprints/components/SprintDetail';

import { useParams } from 'next/navigation';
export default function TasksPage() {

  const params = useParams();
  const sprintId = params.sprintId as string; // récupère l'ID du sprint depuis l'URL

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ProjectS</h1>
        <p className="text-gray-600">Manage all your projects in one place</p>
      </div>

    
   
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
     
        
        <SprintDetails sprintId={sprintId} onSaveProject={function (): void {
              throw new Error('Function not implemented.');
          } }/>

    
     
     
  
      </div>
    </DashboardLayout>
  );
}