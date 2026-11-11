export type TopicId = 'me' | 'projects' | 'skills' | 'fun' | 'contact';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  topicId?: TopicId;
  timestamp: string;
}

export interface TopicOption {
  id: TopicId;
  label: string;
  queryText: string;
  userEmoji: string;
  icon: string;
  badgeClass: string;
}

export interface ExperienceItem {
  badge: string;
  isCurrent?: boolean;
  period: string;
  role: string;
  companyAndLocation: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  badge: string;
  isAccentBadge?: boolean;
  techFocus: string;
  title: string;
  description: string;
  highlights: { label: string; detail: string }[];
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  repoUrl: string;
  liveUrl?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  badge: string;
  imageUrl: string;
}

export interface FunFactItem {
  emoji: string;
  title: string;
  description: string;
}

export interface ContactChannel {
  label: string;
  isAccentLabel?: boolean;
  value: string;
  sublabel: string;
  href: string;
  external?: boolean;
}
