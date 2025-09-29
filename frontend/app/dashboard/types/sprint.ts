export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  projectId: string
}
    