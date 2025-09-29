// app/dashboard/projects/page.tsx
'use client';


import DashboardLayout from '@/app/components/dashboard/Layout';



import { Project } from '../../types/project';




import ProjectDetails from '../components/ProjectDetails';

export default function ProjectsPage() {
 
const project: Project = {
  _id: "1",
  createdAt: new Date(),
  id: 2,
  name: "Mobile App Development",
  progress: 60,
  numtasks: 20,
  completed: 12,
  color: "bg-purple-500",
  status: "In Progress", // ✅ doit correspondre exactement à ProjectStatus
  team: 5,
  deadline: "2025-09-30",
  tasks: [
    {
      id: "t1",
      title: "Design UI",
      status: "todo",
      completed: false
    },
    {
      id: "t2",
      title: "Setup Backend",
      status: "in-progress",
        completed: false
    }
  ],
  description: "Develop the mobile app MVP"
};

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
     
        
        <ProjectDetails project={project} onSaveProject={function (): void {
              throw new Error('Function not implemented.');
          } }/>

    
     
     
  
      </div>
    </DashboardLayout>
  );
}