// app/dashboard/projects/data/mockData.ts
import { Project, ProjectStatus } from '../../types/project';

export const initialProjects: Project[] = [
  {
      id: 1, name: 'Website Redesign', progress: 85, numtasks: 12, completed: 10, color: 'bg-indigo-500', status: 'In Progress', team: 4, deadline: '2023-07-15', tasks: [],
      description: undefined
  },
  { id: 2, name: 'Mobile App Development', progress: 60, numtasks: 20, completed: 12, color: 'bg-purple-500', status: 'In Progress', team: 5, deadline: '2023-08-20', tasks: [], description: undefined },
  { id: 3, name: 'Marketing Campaign', progress: 45, numtasks: 15, completed: 7, color: 'bg-pink-500', status: 'Planning', team: 3, deadline: '2023-09-10', tasks: [], description: undefined },
  { id: 4, name: 'Client Portal', progress: 90, numtasks: 8, completed: 7, color: 'bg-blue-500', status: 'Almost Done', team: 2, deadline: '2023-06-30', tasks: [], description: undefined },
  { id: 5, name: 'Database Migration', progress: 30, numtasks: 18, completed: 5, color: 'bg-green-500', status: 'Not Started', team: 3, deadline: '2023-08-05', tasks: [], description: undefined },
  { id: 6, name: 'API Integration', progress: 75, numtasks: 10, completed: 8, color: 'bg-yellow-500', status: 'In Progress', team: 2, deadline: '2023-07-25', tasks: [], description: undefined },
];

export const projectStatsData = (projects: Project[]) => [
  { 
    name: 'Total Projects', 
    value: projects.length.toString(), 
    change: '+2', 
    changeType: 'positive' 
  },
  { 
    name: 'Completed', 
    value: projects.filter(p => p.status === 'Completed').length.toString(), 
    change: '+1', 
    changeType: 'positive' 
  },
  { 
    name: 'In Progress', 
    value: projects.filter(p => p.status === 'In Progress').length.toString(), 
    change: '+0', 
    changeType: 'positive' 
  },
  { 
    name: 'Behind Schedule', 
    value: '1', 
    change: '-1', 
    changeType: 'negative' 
  },
];