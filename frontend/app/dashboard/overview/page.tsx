// app/dashboard/overview/page.tsx
import DashboardLayout from '@/app/components/dashboard/Layout';
import WelcomeBanner from '@/app/components/dashboard/WelcomeBanner';
import StatsGrid from '@/app/components/dashboard/StatsGrid';
import ProjectList from '@/app/components/dashboard/ProjectList';
import TaskList from '@/app/components/dashboard/TaskList';
import ActivityFeed from '@/app/components/dashboard/ActivityFeed';
type StatItem = {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
};
type Task = {
  id: number;
  project: string;
  title: string;
  due: string;
  priority: "high" | "medium" | "low";
};

// Mock data (would come from API in real app)
const statsData: StatItem[] = [
  { name: 'Total Projects', value: '12', change: '+2', changeType: 'positive' },
  { name: 'Completed Tasks', value: '84', change: '+12', changeType: 'positive' },
  { name: 'Overdue Tasks', value: '3', change: '-1', changeType: 'negative' },
  { name: 'Team Members', value: '5', change: '+2', changeType: 'positive' },
];
const recentProjects = [
  { id: 1, name: 'Website Redesign', progress: 85, tasks: 12, completed: 10, color: 'bg-indigo-500' },
  { id: 2, name: 'Mobile App Development', progress: 60, tasks: 20, completed: 12, color: 'bg-purple-500' },
  { id: 3, name: 'Marketing Campaign', progress: 45, tasks: 15, completed: 7, color: 'bg-pink-500' },
  { id: 4, name: 'Client Portal', progress: 90, tasks: 8, completed: 7, color: 'bg-blue-500' },
];

const upcomingTasks: Task[] = [
  { id: 1, project: "Website Redesign", title: "Fix navbar", due: "2025-09-30", priority: "high" },
  { id: 2, project: "Mobile App", title: "Push notification bug", due: "2025-10-05", priority: "medium" },
  { id: 3, project: "Dashboard", title: "Update charts", due: "2025-10-10", priority: "low" },
];


const activities = [
  { id: 1, user: 'You', action: 'created', item: 'new task', project: 'Website Redesign', time: '2 hours ago' },
  { id: 2, user: 'Sarah M.', action: 'completed', item: 'a task', project: 'Mobile App Development', time: '5 hours ago' },
  { id: 3, user: 'Mike T.', action: 'commented on', item: 'your task', project: 'Marketing Campaign', time: 'Yesterday' },
  { id: 4, user: 'You', action: 'updated', item: 'project timeline', project: 'Client Portal', time: '2 days ago' },
];

export default function OverviewPage() {
  // In a real app, you would fetch userData from a parent component or context
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
      <WelcomeBanner userData={userData} />
      
      <StatsGrid stats={statsData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProjectList projects={recentProjects} />
        <TaskList tasks={upcomingTasks} />
      </div>
      
      <ActivityFeed activities={activities} />
    </DashboardLayout>
  );
}