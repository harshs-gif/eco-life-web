// Global type definitions
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
  content: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  completedDates: string[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
  targetDate: string;
  category: string;
}

export interface SustainabilityTip {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: number;
  category: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  icon: string;
  change: string;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
}

export interface Challenge {
  id: string;
  name: string;
  participants: number;
  endDate: string;
}
