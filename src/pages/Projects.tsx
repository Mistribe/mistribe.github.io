import { useState } from 'react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { CUSTOM_PROJECTS, CUSTOM_PROJECT_CONFIG, type CustomProject } from '../config/customProjects';

export default function Projects() {
  const { projects, loading, error } = useGitHubRepos();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Filter and prepare custom projects
  const getCustomProjects = (): CustomProject[] => {
    if (!CUSTOM_PROJECT_CONFIG.enabled) return [];
    
    let filtered = CUSTOM_PROJECTS;
    
    // Filter by categories to show
    if (CUSTOM_PROJECT_CONFIG.showCategories.length > 0) {
      filtered = filtered.filter(project => 
        CUSTOM_PROJECT_CONFIG.showCategories.includes(project.category)
      );
    }
    
    // Filter out categories to hide
    if (CUSTOM_PROJECT_CONFIG.hideCategories.length > 0) {
      filtered = filtered.filter(project => 
        !CUSTOM_PROJECT_CONFIG.hideCategories.includes(project.category)
      );
    }
    
    // Limit number of projects
    return filtered.slice(0, CUSTOM_PROJECT_CONFIG.maxProjects);
  };

  const customProjects = getCustomProjects();

  // Combine GitHub projects and custom projects
  const allProjects = [
    ...projects,
    ...customProjects
  ];

  if (loading) {
    return (
      <section className="py-10 px-10">
        <h2 className="page-header">Projects</h2>
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-10">
        <h2 className="page-header">Projects</h2>
        <div className="flex justify-center items-center py-20">
          <div className="text-red-600">Error loading projects: {error}</div>
        </div>
      </section>
    );
  }

  const handleProjectClick = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section className="py-10 px-10">
      <h2 className="page-header">Projects</h2>
      {allProjects.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="page-txt-black text-gray-600">No projects configured yet.</p>
          <p className="page-txt-black text-gray-500 text-sm mt-2">
            Configure GitHub repositories in SELECTED_REPOSITORIES or add custom projects in customProjects.ts
          </p>
        </div>
      )}
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project) => (
          <div 
            key={project.name || project.id} 
            className="bg-white/60 border border-black/10 rounded-xl p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="page-h3">{project.name}</h3>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedProject === project.id ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <p className="page-txt-black">
              {project.description || 'No description available'}
            </p>
          </div>
        ))}
      </div>

      {/* Expanded Project Details Section */}
      {expandedProject !== null && (
        <div className="mt-8 bg-white/40 border border-black/10 rounded-xl p-6">
          {(() => {
            const project = allProjects.find(p => p.id === expandedProject);
            if (!project) return null;
            
            return (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="page-h3 text-lg">{project.name}</h4>
                    {'category' in project && (
                      <span className="category-font text-sm text-gray-600">{project.category}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {'html_url' in project && (
                      <a 
                        href={project.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title="View on GitHub"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {'link' in project && project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors text-sm underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.linkText || 'View Project'}
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Detailed Description */}
                <div className="mb-6">
                  <h5 className="page-h3 text-base mb-3">About</h5>
                  <p className="page-txt-black">
                    {'detailedDescription' in project 
                      ? project.detailedDescription 
                      : project.description || 'No detailed description available.'}
                  </p>
                </div>

                {/* Tech Stack / Skills */}
                <div>
                  <h5 className="page-h3 text-base mb-3">
                    {'skills' in project ? 'Skills Used' : 'Technologies Used'}
                  </h5>
                  {/* Custom project skills */}
                  {'skills' in project && project.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-black/5 border border-black/10 rounded-lg px-3 py-1 text-sm page-txt-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : /* GitHub project tech stack */
                  'techStack' in project && project.techStack ? (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-black/5 border border-black/10 rounded-lg px-3 py-1 text-sm page-txt-black"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {'language' in project && project.language && (
                        <span className="bg-black/5 border border-black/10 rounded-lg px-3 py-1 text-sm page-txt-black">
                          {project.language}
                        </span>
                      )}
                      {'topics' in project && project.topics && project.topics.length > 0 && 
                        project.topics.slice(0, 5).map((topic: string, index: number) => (
                          <span 
                            key={index}
                            className="bg-black/5 border border-black/10 rounded-lg px-3 py-1 text-sm page-txt-black"
                          >
                            {topic}
                          </span>
                        ))
                      }
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </section>
  );
}
