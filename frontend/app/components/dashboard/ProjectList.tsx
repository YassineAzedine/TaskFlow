// components/dashboard/ProjectList.tsx
import Link from 'next/link';
import {    useProjects
} from "../../dashboard/hooks/useProjects";
interface Project {
  id: number;
  name: string;
  progress: number;
  tasks: number;
  completed: number;
  color: string;
}

interface ProjectListProps {
  projects: Project[];
  showViewAll?: boolean;
}

export default function ProjectList({ projects, showViewAll = true }: ProjectListProps) {

         console.log("Projects in ProjectList:", useProjects);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
        {showViewAll && (
          <Link href="/dashboard/projects" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center">
            <div className={`w-3 h-3 ${project.color} rounded-full mr-3`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
              <p className="text-xs text-gray-500">{project.completed}/{project.tasks} tasks completed</p>
            </div>
            <div className="ml-4">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${project.color} rounded-full`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">{project.progress}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}