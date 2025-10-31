// Configuration for which GitHub repositories to display
export const GITHUB_USERNAME = 'mistribe';

// List of repository names you want to display on your projects page
// Leave empty to show all repositories, or add specific repo names to filter
export const SELECTED_REPOSITORIES: string[] = [
    // Add the names of repositories you want to display
    'SubTracker'
];

// Repositories to exclude from display (even if SELECTED_REPOSITORIES is empty)
export const EXCLUDED_REPOSITORIES: string[] = [
  // Example: 'private-notes',
  // Example: 'test-repo',
  // Add repository names you want to hide
];

// Additional display options
export const GIT_PROJECT_CONFIG = {
  // Maximum number of repositories to display
  maxRepos: 12,
  
  // Sort order: 'updated', 'created', 'name', 'stars'
  sortBy: 'updated' as 'updated' | 'created' | 'name' | 'stars',
  
  // Show fork repositories
  showForks: false,
  
  // Show archived repositories
  showArchived: false,
};