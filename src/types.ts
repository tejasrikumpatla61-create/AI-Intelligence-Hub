export interface OnboardingProfile {
  name: string;
  email: string;
  profession: string;
  industry: string;
  skills: string[];
  interests: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  learningGoals: string[];
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  pricing: 'Free' | 'Paid' | 'Open Source' | 'Freemium';
  pricingBadge: string;
  popularityScore: number;
  rating: number;
  logo: string; // Name of Lucide icon
  visitUrl: string;
  bestFor: string;
  features: string[];
  platforms: string[];
  apiAvailable: boolean;
  pros: string[];
  cons: string[];
  launchDate: string;
  trendingScore: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
  image: string;
  category: string;
  summary: string;
}

export interface Notification {
  id: string;
  type: 'launch' | 'trending' | 'digest' | 'news' | 'recommendation';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export type BookmarkCollection = 'Work' | 'Learning' | 'Favorites' | 'Productivity';

export interface SavedTool {
  toolId: string;
  collection: BookmarkCollection;
  savedAt: string;
}

export interface GeminiInsights {
  headline: string;
  summary: string;
  insights: string[];
  recommendedTools: {
    name: string;
    description: string;
    useCase: string;
    whyIdeal: string;
  }[];
  actionPlan: {
    step: string;
    description: string;
  }[];
}
