// app/dashboard/projects/components/ProjectsTable.tsx
import Link from 'next/link';
import { Project } from '../../types/project';
import { ListCheck, Plus, Trash2 } from 'lucide-react';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onNewProject: () => void;
  openProject: (project: Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onEdit,
  onDelete,
  onNewProject ,

}) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <div className="mt-6">
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onNewProject}
            aria-label="Create new project"
          >
            <svg 
              className="-ml-1 mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            New Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
  <thead className="bg-gray-50 sticky top-0 z-10">
    <tr>
      <th 
        scope="col" 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Project
      </th>
         <th 
        scope="col" 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Owner
      </th>
        <th 
        scope="col" 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Status
      </th>
      <th 
        scope="col" 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Created At
      </th>
      <th 
        scope="col" 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {projects.map((project) => (
      <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
        
        {/* Project Name & Color */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <span 
              className={`w-3 h-3 ${project.color} rounded-full mr-3`} 
              aria-hidden="true"
            ></span>
            <span className="text-sm font-medium text-gray-900">{project.name}</span>
          </div>
        </td>
        
   <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <span 
              className={`w-3 h-3 ${project.color} rounded-full mr-3`} 
              aria-hidden="true"
            ></span>
            <span className="text-sm font-medium text-gray-900">
  {`${project.owner.firstName} ${project.owner.lastName}`}
</span>
          </div>
        </td>
           <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <span 
              className={`w-3 h-3 ${project.color} rounded-full mr-3`} 
              aria-hidden="true"
            ></span>
            <span className="text-sm font-medium text-gray-900">
           active
</span>
          </div>
        </td>
        {/* Created Date */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(project.createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">

            {/* Edit Button */}
            <button
              className="flex items-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 px-3 py-1 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => onEdit(project)}
              aria-label={`Edit ${project.name}`}
            >
              <Plus size={14} />
              Edit
            </button>

            {/* Delete Button */}
            <button
              className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900 px-3 py-1 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => onDelete(project)}
              aria-label={`Delete ${project.name}`}
            >
              <Trash2 size={14} />
              Delete
            </button>

            {/* Access Tasks Button */}
            <Link href={`/dashboard/projects/${project.id}`} className="relative">
              <button
                className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-900 px-3 py-1 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`Tasks of ${project.name}`}
              >
                <ListCheck size={14} />
                Tasks
              </button>

              {/* Badge: nombre de tâches */}
              {project.taskCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                  {project.taskCount}
                </span>
              )}
            </Link>
          </div>
        </td>

      </tr>
    ))}
  </tbody>
</table>

  );
};

export default ProjectsTable;