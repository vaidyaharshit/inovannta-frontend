export type EventStatus = 'open' | 'closed' | 'coming-soon' | 'completed';

export type EventCategory = 
  | 'AI & Tech'
  | 'Innovation & Hackathons'
  | 'Research & Papers'
  | 'Entrepreneurship'
  | 'Workshop & Hands-on'
  | 'Community & Keynote';

export interface EventSpeaker {
  name: string;
  role: string;
  org: string;
  topic?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: EventCategory;
  status: EventStatus;
  date: string;
  time: string;
  venue: string;
  locationType: 'in-person' | 'online' | 'hybrid';
  description: string;
  fullDescription: string;
  agenda: AgendaItem[];
  speakers?: EventSpeaker[];
  registrationDeadline?: string;
  registrationUrl?: string; // Configurable link
  posterGradient: string;
  highlights?: string[];
  prerequisites?: string[];
  takeaways?: string[];
  isFeatured?: boolean;
  isDemo: boolean;
}

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'Cpu' | 'Sparkles' | 'BookOpen' | 'Rocket' | 'Users' | 'Network';
  accent: 'purple' | 'orange' | 'gradient';
  keywords: string[];
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  taglineParts: {
    manifest: string;
    build: string;
    impact: string;
  };
  headline: {
    line1: string;
    line2: string;
  };
  introText: string;
  officialEmail: string;
  instagramHandle: string;
  instagramUrl: string;
  communityJoinUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
  copyrightYear: number;
}
