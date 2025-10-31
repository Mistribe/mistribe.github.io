import { useState, useEffect } from 'react';
import { githubService, type GitHubRepo } from '../services/github';
import { GITHUB_USERNAME, SELECTED_REPOSITORIES, EXCLUDED_REPOSITORIES, GIT_PROJECT_CONFIG } from '../config/gitprojects';

export interface ProjectData extends GitHubRepo {
  readme: string;
  techStack?: string[];
  detailedDescription?: string;
}

export function useGitHubRepos() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all repositories for the user
        const repositories = await githubService.fetchUserRepositories(GITHUB_USERNAME);
        setAllRepos(repositories);

        // Filter repositories based on configuration
        let filteredRepos = repositories.filter(repo => {
          // Exclude forks if configured
          if (!GIT_PROJECT_CONFIG.showForks && repo.fork) return false;
          
          // Exclude archived repos if configured
          if (!GIT_PROJECT_CONFIG.showArchived && repo.archived) return false;
          
          // Exclude specifically listed repositories
          if (EXCLUDED_REPOSITORIES.includes(repo.name)) return false;
          
          // If specific repositories are selected, only include those
          if (SELECTED_REPOSITORIES.length > 0) {
            return SELECTED_REPOSITORIES.includes(repo.name);
          }
          
          return true;
        });

        // Sort repositories
        filteredRepos.sort((a, b) => {
          switch (GIT_PROJECT_CONFIG.sortBy) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'stars':
              return b.stargazers_count - a.stargazers_count;
            case 'created':
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case 'updated':
            default:
              return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          }
        });

        // Limit number of repositories
        filteredRepos = filteredRepos.slice(0, GIT_PROJECT_CONFIG.maxRepos);

        // Fetch README and extract tech stack for each repository
        const projectPromises = filteredRepos.map(async (repo) => {
          const readme = await githubService.fetchReadme(GITHUB_USERNAME, repo.name);
          
          // Extract tech stack from topics and language
          const techStack = [];
          if (repo.language) techStack.push(repo.language);
          if (repo.topics && repo.topics.length > 0) {
            // Add topics as tech stack, capitalize first letter
            const formattedTopics = repo.topics
              .slice(0, 8) // Limit to 8 topics
              .map(topic => topic.charAt(0).toUpperCase() + topic.slice(1));
            techStack.push(...formattedTopics);
          }
          
          // Extract detailed description from README (first paragraph after title)
          let detailedDescription = repo.description || undefined;
          if (readme) {
            const lines = readme.split('\n');
            let foundTitle = false;
            for (const line of lines) {
              if (line.startsWith('# ')) {
                foundTitle = true;
                continue;
              }
              if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('##')) {
                detailedDescription = line.trim();
                break;
              }
            }
          }
          
          return {
            ...repo,
            readme,
            techStack: techStack.length > 0 ? [...new Set(techStack)] : undefined, // Remove duplicates
            detailedDescription
          };
        });

        const results = await Promise.all(projectPromises);
        setProjects(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  return { projects, allRepos, loading, error };
}