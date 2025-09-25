// app/dashboard/projects/types/index.ts
export interface Project {
  createdAt?: string | number | Date;
  _id?: string;
  description?: string;
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
  owner?: {
    firstName: string;
    lastName: string;
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  completed: boolean;
}
export type ProjectStatus = 
  | 'Not Started' 
  | 'Planning' 
  | 'In Progress' 
  | 'Almost Done' 
  | 'Completed';