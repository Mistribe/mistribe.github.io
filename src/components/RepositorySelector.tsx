import { useState, useEffect } from 'react';
import { githubService, type GitHubRepo } from '../services/github';
import { GITHUB_USERNAME } from '../config/projects';

// Development helper component to see all available repositories
// You can temporarily add this to your Projects page to see all repos
export function RepositorySelector() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const repositories = await githubService.fetchUserRepositories(GITHUB_USERNAME);
        setRepos(repositories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">
        📋 Available Repositories ({repos.length} total)
      </h3>
      <p className="text-gray-600 text-sm mb-3">
        Copy repository names to add to SELECTED_REPOSITORIES in src/config/projects.ts:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {repos.map((repo) => (
          <div 
            key={repo.id} 
            className="bg-white p-2 rounded border text-sm cursor-pointer hover:bg-blue-50"
            onClick={() => navigator.clipboard.writeText(`'${repo.name}',`)}
            title="Click to copy"
          >
            <div className="font-medium text-gray-800">{repo.name}</div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              {repo.language && <span>{repo.language}</span>}
              {repo.fork && <span className="text-orange-500">Fork</span>}
              {repo.archived && <span className="text-red-500">Archived</span>}
              <span>⭐ {repo.stargazers_count}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Click on any repository name to copy it to clipboard
      </p>
    </div>
  );
}