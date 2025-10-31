// Configuration for custom projects (non-GitHub projects)
export interface CustomProject {
  id: number;
  name: string;
  description: string;
  category: string; // e.g., 'Design', 'Photography', 'Writing', 'Business', etc.
  detailedDescription: string;
  skills?: string[]; // Skills used instead of tech stack
  link?: string; // Optional external link
  linkText?: string; // Text for the link (e.g., 'View Portfolio', 'Read Article')
}

// Add your custom projects here
export const CUSTOM_PROJECTS: CustomProject[] = [
  // Example projects - replace with your actual projects
  {
    id: 101,
    name: 'Brand Identity Design',
    description: 'Complete visual identity system for a sustainable fashion startup.',
    category: 'Design',
    detailedDescription: 'Developed a comprehensive brand identity including logo design, color palette, typography system, and brand guidelines for an eco-friendly fashion startup. The design emphasizes sustainability and modern aesthetics while maintaining accessibility across all touchpoints.',
    skills: ['Adobe Illustrator', 'Brand Strategy', 'Typography', 'Color Theory'],
    link: 'https://example.com/portfolio',
    linkText: 'View Portfolio'
  },
  {
    id: 102,
    name: 'Photography Exhibition',
    description: 'Urban landscape photography series showcasing city architecture.',
    category: 'Photography',
    detailedDescription: 'A collection of 25 photographs capturing the interplay between natural light and urban architecture. The series explores how modern buildings create unexpected geometric patterns and shadows throughout different times of day.',
    skills: ['Digital Photography', 'Adobe Lightroom', 'Composition', 'Urban Planning'],
    link: 'https://example.com/gallery',
    linkText: 'View Gallery'
  },
  {
    id: 103,
    name: 'Content Strategy Consulting',
    description: 'Helped 3 startups develop their content marketing strategies.',
    category: 'Business',
    detailedDescription: 'Provided strategic consulting for early-stage startups to develop comprehensive content marketing strategies. Worked on audience research, content planning, editorial calendars, and performance metrics that resulted in 150% average increase in organic engagement.',
    skills: ['Content Strategy', 'Market Research', 'Analytics', 'Project Management']
  }
];

// Display configuration for custom projects
export const CUSTOM_PROJECT_CONFIG = {
  // Show custom projects alongside GitHub repos
  enabled: true,
  
  // Categories to display (empty array shows all)
  showCategories: [] as string[], // e.g., ['Design', 'Photography']
  
  // Categories to hide
  hideCategories: [] as string[], // e.g., ['Business']
  
  // Maximum number of custom projects to show
  maxProjects: 10,
};