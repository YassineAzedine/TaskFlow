// components/dashboard/TaskList.tsx
import Link from 'next/link';

interface Task {
  id: number;
  project: string;
  title: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
}

interface TaskListProps {
  tasks: Task[];
  showViewAll?: boolean;
}

export default function TaskList({ tasks, showViewAll = true }: TaskListProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
        {showViewAll && (
          <Link href="/dashboard/tasks" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
              task.priority === 'high' ? 'bg-red-500' : 
              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            } mr-3`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
              <p className="text-xs text-gray-500">{task.project}</p>
            </div>
            <div className="ml-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {task.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}