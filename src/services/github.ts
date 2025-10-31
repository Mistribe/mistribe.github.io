export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubReadme {
  content: string;
  encoding: string;
}

class GitHubService {
  private baseUrl = 'https://api.github.com';

  async fetchRepository(owner: string, repo: string): Promise<GitHubRepo> {
    const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repository: ${response.statusText}`);
    }
    
    return response.json();
  }

  async fetchUserRepositories(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories for ${username}: ${response.statusText}`);
    }
    
    return response.json();
  }

  async fetchReadme(owner: string, repo: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/readme`);
      
      if (!response.ok) {
        return '';
      }
      
      const readme: GitHubReadme = await response.json();
      
      // Decode base64 content
      const decodedContent = atob(readme.content);
      return decodedContent;
    } catch (error) {
      console.warn(`Failed to fetch README for ${owner}/${repo}:`, error);
      return '';
    }
  }

  async fetchRepositoryWithReadme(owner: string, repo: string) {
    const [repository, readme] = await Promise.all([
      this.fetchRepository(owner, repo),
      this.fetchReadme(owner, repo)
    ]);

    return {
      ...repository,
      readme
    };
  }

  // Parse GitHub URL to extract owner and repo
  parseGitHubUrl(url: string): { owner: string; repo: string } | null {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return null;
    
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, '') // Remove .git suffix if present
    };
  }
}

export const githubService = new GitHubService();