# GitHub Repository Integration

This project automatically fetches and displays repositories from the **mistribe** GitHub account.

## Configuration

Edit `src/config/projects.ts` to customize which repositories are displayed:

### Show Specific Repositories Only
```typescript
export const SELECTED_REPOSITORIES: string[] = [
  'my-awesome-project',
  'portfolio-website',
  'cool-app',
];
```

### Exclude Specific Repositories
```typescript
export const EXCLUDED_REPOSITORIES: string[] = [
  'private-notes',
  'test-repo',
  'old-project',
];
```

### Display Options
```typescript
export const PROJECT_CONFIG = {
  maxRepos: 12,              // Maximum number to display
  sortBy: 'updated',         // 'updated', 'created', 'name', 'stars'
  showForks: false,          // Include forked repositories
  showArchived: false,       // Include archived repositories
};
```

## How It Works

1. **Automatic Fetching**: The app fetches all public repositories from the mistribe GitHub account
2. **Smart Filtering**: Repositories are filtered based on your configuration
3. **README Integration**: Each repository's README is automatically fetched and available
4. **Real-time Data**: Shows current stars, language, and other GitHub metadata

## Development Helper

To see all available repositories, temporarily add the `RepositorySelector` component to your Projects page:

```typescript
import { RepositorySelector } from '../components/RepositorySelector';

// Add this inside your Projects component JSX
<RepositorySelector />
```

This will show all repositories with click-to-copy functionality for easy configuration.

## Features Displayed

- Repository name (from GitHub)
- Description (from GitHub)
- Primary language with color indicator
- Star count
- Direct link to GitHub repository
- Hover effects and responsive design

## API Limits

The GitHub API allows 60 requests per hour for unauthenticated requests, which is sufficient for typical usage. The app fetches:
- User repositories (1 request)
- README for each displayed repository (1 request per repo)

## Customization

You can modify the display by editing:
- `src/pages/Projects.tsx` - Main component layout
- `src/hooks/useGitHubRepos.ts` - Data fetching logic
- `src/services/github.ts` - GitHub API integration
- `src/config/projects.ts` - Repository selection and display options