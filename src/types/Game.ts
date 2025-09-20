export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  instructions?: string[];
  thumbnail: string;
  category: string;
  tags: string[];
  url: string;
  embedUrl?: string;
  fallbackUrls?: string[];
  width?: number;
  height?: number;
  provider: 'gamemonetize' | 'crazygames' | 'gamedistribution' | 'poki' | 'gameflare' | 'custom' | 'external';
  rating?: number;
  plays?: number;
  featured?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  exclusive?: boolean;
  weeklyPick?: boolean;
  hotGame?: boolean;
  bestGame?: boolean;
  mostPlayed?: boolean;
  seasonal?: string; // 'Christmas', 'Halloween', 'Easter', 'Holidays'
  createdAt: string;
  lastModified?: string;
  author?: string;
  releaseDate?: string;
  language?: string;
  seoKeywords?: string;
  external?: boolean;
  invitationCodes?: string[];
}

export interface GameCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  gameCount: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface TopicPage {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  filterCriteria: (game: Game) => boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  priority: number;
  color: string;
  gradient: string;
}

export interface GameProvider {
  id: string;
  name: string;
  apiEndpoint?: string;
  apiKey?: string;
  embedTemplate: string;
  isActive: boolean;
}