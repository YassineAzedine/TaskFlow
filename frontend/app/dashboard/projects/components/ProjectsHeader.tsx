// app/dashboard/projects/components/ProjectsHeader.tsx
;
import { Project } from "./Modal";

interface ProjectsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  onNewProject: () => void;
 filteredProjects: Project[];
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  onNewProject ,
  
 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search projects"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          aria-label="Filter projects by status"
        >
          <option value="all">All Projects</option>
          <option value="Not Started">Not Started</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Almost Done">Almost Done</option>
          <option value="Completed">Completed</option>
        </select>
        
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onNewProject}
          aria-label="Create new project"
        >
          <svg 
            className="w-5 h-5 mr-2" 
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
};

export default ProjectsHeader;