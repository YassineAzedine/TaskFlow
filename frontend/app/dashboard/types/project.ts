// app/dashboard/projects/types/index.ts
export interface Project {
  createdAt: string | number | Date;
  _id: any;
  description: any;
  id: number;
  name: string;
  progress: number;
  numtasks: number;
  completed: number;
  color: string;
  status: ProjectStatus;
  team: number;
  deadline: string;
  tasks: Task[];
}
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
}
export type ProjectStatus = 
  | 'Not Started' 
  | 'Planning' 
  | 'In Progress' 
  | 'Almost Done' 
  | 'Completed';