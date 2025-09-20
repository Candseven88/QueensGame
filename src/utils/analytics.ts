// Enhanced Analytics System for QueensGame
import { Game } from '../types/Game';

// Analytics Event Types
export interface AnalyticsEvent {
  event: string;
  category: 'page_view' | 'game_interaction' | 'user_engagement' | 'conversion' | 'error';
  action: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
  timestamp: string;
  session_id: string;
  user_id?: string;
}

// Game Performance Metrics
export interface GameMetrics {
  gameId: string;
  title: string;
  category: string;
  views: number;
  plays: number;
  completions: number;
  averagePlayTime: number;
  bounceRate: number;
  conversionRate: number;
  rating: number;
  shares: number;
  bookmarks: number;
  lastUpdated: string;
}

// User Behavior Analytics
export interface UserSession {
  sessionId: string;
  userId?: string;
  startTime: string;
  endTime?: string;
  pageViews: number;
  gamesViewed: string[];
  gamesPlayed: string[];
  timeSpent: number;
  referrer: string;
  userAgent: string;
  deviceInfo: {
    isMobile: boolean;
    isTablet: boolean;
    browser: string;
    os: string;
  };
}

// Ad Revenue Tracking
export interface AdMetrics {
  adUnitId: string;
  gameId?: string;
  impressions: number;
  clicks: number;
  revenue: number;
  ctr: number;
  cpm: number;
  viewability: number;
  date: string;
}

class AnalyticsManager {
  private sessionId: string;
  private userId?: string;
  private sessionStart: number;
  private isEnabled: boolean;
  private queue: AnalyticsEvent[] = [];
  private gameMetricsCache: Map<string, GameMetrics> = new Map();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStart = Date.now();
    this.isEnabled = this.checkAnalyticsConsent();
    this.initializeSession();
    this.setupPageUnloadHandler();
  }

  // Initialize analytics session
  private initializeSession(): void {
    if (!this.isEnabled) return;

    const session: UserSession = {
      sessionId: this.sessionId,
      userId: this.getUserId(),
      startTime: new Date().toISOString(),
      pageViews: 0,
      gamesViewed: [],
      gamesPlayed: [],
      timeSpent: 0,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      deviceInfo: this.getDeviceInfo()
    };

    this.storeSession(session);
    this.sendEvent('session_start', 'user_engagement', 'session_started');
  }

  // Generate unique session ID
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Check if user has consented to analytics
  private checkAnalyticsConsent(): boolean {
    const consent = localStorage.getItem('analyticsConsent');
    return consent === 'accepted';
  }

  // Get or generate user ID
  private getUserId(): string | undefined {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  // Get device information
  private getDeviceInfo() {
    const userAgent = navigator.userAgent;
    return {
      isMobile: /Mobile|Android|iPhone|iPad/.test(userAgent),
      isTablet: /iPad|Tablet/.test(userAgent),
      browser: this.getBrowserName(userAgent),
      os: this.getOSName(userAgent)
    };
  }

  private getBrowserName(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getOSName(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  // Store session data
  private storeSession(session: UserSession): void {
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
    sessions.push(session);
    
    // Keep only last 10 sessions
    if (sessions.length > 10) {
      sessions.splice(0, sessions.length - 10);
    }
    
    localStorage.setItem('userSessions', JSON.stringify(sessions));
  }

  // Setup page unload handler
  private setupPageUnloadHandler(): void {
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.sendEvent('page_hidden', 'user_engagement', 'page_visibility_changed');
      } else {
        this.sendEvent('page_visible', 'user_engagement', 'page_visibility_changed');
      }
    });
  }

  // End current session
  private endSession(): void {
    const timeSpent = Date.now() - this.sessionStart;
    this.sendEvent('session_end', 'user_engagement', 'session_ended', timeSpent);
    
    // Flush remaining events
    this.flushEvents();
  }

  // Send analytics event
  public sendEvent(
    event: string,
    category: AnalyticsEvent['category'],
    action: string,
    value?: number,
    label?: string,
    customParams?: Record<string, any>
  ): void {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      custom_parameters: customParams,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId
    };

    this.queue.push(analyticsEvent);

    // Send to Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        custom_map: customParams,
        session_id: this.sessionId
      });
    }

    // Send to Microsoft Clarity
    if (typeof (window as any).clarity !== 'undefined') {
      (window as any).clarity('event', event);
    }

    // Batch send events every 10 events or 30 seconds
    if (this.queue.length >= 10) {
      this.flushEvents();
    } else {
      setTimeout(() => this.flushEvents(), 30000);
    }
  }

  // Page view tracking
  public trackPageView(path: string, title: string): void {
    this.sendEvent('page_view', 'page_view', 'page_viewed', undefined, path, {
      page_title: title,
      page_path: path
    });

    // Update session page views
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
    const currentSession = sessions.find((s: UserSession) => s.sessionId === this.sessionId);
    if (currentSession) {
      currentSession.pageViews++;
      localStorage.setItem('userSessions', JSON.stringify(sessions));
    }
  }

  // Game interaction tracking
  public trackGameView(game: Game): void {
    this.sendEvent('game_view', 'game_interaction', 'game_viewed', undefined, game.id, {
      game_title: game.title,
      game_category: game.category,
      game_tags: game.tags.join(','),
      game_rating: game.rating,
      game_provider: game.provider
    });

    this.updateGameMetrics(game.id, 'views');
  }

  public trackGamePlay(game: Game): void {
    this.sendEvent('game_play', 'game_interaction', 'game_played', undefined, game.id, {
      game_title: game.title,
      game_category: game.category,
      play_source: 'game_detail_page'
    });

    this.updateGameMetrics(game.id, 'plays');
  }

  public trackGameCompletion(game: Game, playTime: number): void {
    this.sendEvent('game_completion', 'game_interaction', 'game_completed', playTime, game.id, {
      game_title: game.title,
      play_time_seconds: playTime,
      completion_rate: 100
    });

    this.updateGameMetrics(game.id, 'completions');
    this.updateGamePlayTime(game.id, playTime);
  }

  public trackGameShare(game: Game, platform: string): void {
    this.sendEvent('game_share', 'user_engagement', 'game_shared', undefined, game.id, {
      game_title: game.title,
      share_platform: platform
    });

    this.updateGameMetrics(game.id, 'shares');
  }

  public trackGameBookmark(game: Game, action: 'add' | 'remove'): void {
    this.sendEvent('game_bookmark', 'user_engagement', `game_${action}_bookmark`, undefined, game.id, {
      game_title: game.title,
      bookmark_action: action
    });

    if (action === 'add') {
      this.updateGameMetrics(game.id, 'bookmarks');
    }
  }

  // Search and filter tracking
  public trackSearch(query: string, resultsCount: number): void {
    this.sendEvent('search', 'user_engagement', 'search_performed', resultsCount, query, {
      search_query: query,
      results_count: resultsCount
    });
  }

  public trackFilter(filterType: string, filterValue: string, resultsCount: number): void {
    this.sendEvent('filter', 'user_engagement', 'filter_applied', resultsCount, filterValue, {
      filter_type: filterType,
      filter_value: filterValue,
      results_count: resultsCount
    });
  }

  // Topic page tracking
  public trackTopicView(topicSlug: string, gamesCount: number): void {
    this.sendEvent('topic_view', 'page_view', 'topic_page_viewed', gamesCount, topicSlug, {
      topic_slug: topicSlug,
      games_count: gamesCount
    });
  }

  // Error tracking
  public trackError(error: Error, context?: string): void {
    this.sendEvent('error', 'error', 'javascript_error', undefined, error.name, {
      error_message: error.message,
      error_stack: error.stack,
      error_context: context
    });
  }

  // Performance tracking
  public trackPerformance(metric: string, value: number): void {
    this.sendEvent('performance', 'page_view', metric, value, undefined, {
      performance_metric: metric,
      performance_value: value
    });
  }

  // Update game metrics
  private updateGameMetrics(gameId: string, metric: keyof Pick<GameMetrics, 'views' | 'plays' | 'completions' | 'shares' | 'bookmarks'>): void {
    const existing = this.gameMetricsCache.get(gameId) || this.getStoredGameMetrics(gameId);
    existing[metric]++;
    existing.lastUpdated = new Date().toISOString();
    
    this.gameMetricsCache.set(gameId, existing);
    this.saveGameMetrics(gameId, existing);
  }

  private updateGamePlayTime(gameId: string, playTime: number): void {
    const existing = this.gameMetricsCache.get(gameId) || this.getStoredGameMetrics(gameId);
    const totalPlayTime = existing.averagePlayTime * existing.plays + playTime;
    existing.averagePlayTime = totalPlayTime / (existing.plays + 1);
    
    this.gameMetricsCache.set(gameId, existing);
    this.saveGameMetrics(gameId, existing);
  }

  private getStoredGameMetrics(gameId: string): GameMetrics {
    const stored = localStorage.getItem(`gameMetrics_${gameId}`);
    if (stored) {
      return JSON.parse(stored);
    }

    // Return default metrics
    return {
      gameId,
      title: '',
      category: '',
      views: 0,
      plays: 0,
      completions: 0,
      averagePlayTime: 0,
      bounceRate: 0,
      conversionRate: 0,
      rating: 0,
      shares: 0,
      bookmarks: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  private saveGameMetrics(gameId: string, metrics: GameMetrics): void {
    localStorage.setItem(`gameMetrics_${gameId}`, JSON.stringify(metrics));
  }

  // Flush events to server
  private async flushEvents(): Promise<void> {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      // Send to custom analytics endpoint
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
        keepalive: true
      });
    } catch (error) {
      console.warn('Failed to send analytics events:', error);
      // Re-queue failed events
      this.queue.unshift(...events);
    }
  }

  // Get analytics reports
  public getGamePerformanceReport(gameId: string): GameMetrics | null {
    return this.gameMetricsCache.get(gameId) || this.getStoredGameMetrics(gameId);
  }

  public getTopGames(metric: keyof GameMetrics = 'plays', limit: number = 10): GameMetrics[] {
    const allMetrics: GameMetrics[] = [];
    
    // Load all stored metrics
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('gameMetrics_')) {
        const metrics = JSON.parse(localStorage.getItem(key) || '{}');
        allMetrics.push(metrics);
      }
    }

    return allMetrics
      .sort((a, b) => (b[metric] as number) - (a[metric] as number))
      .slice(0, limit);
  }

  public getUserEngagementStats(): {
    totalSessions: number;
    averageSessionDuration: number;
    totalPageViews: number;
    averageGamesPerSession: number;
  } {
    const sessions: UserSession[] = JSON.parse(localStorage.getItem('userSessions') || '[]');
    
    const totalSessions = sessions.length;
    const averageSessionDuration = sessions.reduce((sum, s) => {
      const duration = s.endTime ? 
        new Date(s.endTime).getTime() - new Date(s.startTime).getTime() : 
        0;
      return sum + duration;
    }, 0) / totalSessions;
    
    const totalPageViews = sessions.reduce((sum, s) => sum + s.pageViews, 0);
    const averageGamesPerSession = sessions.reduce((sum, s) => sum + s.gamesPlayed.length, 0) / totalSessions;

    return {
      totalSessions,
      averageSessionDuration,
      totalPageViews,
      averageGamesPerSession
    };
  }

  // Privacy controls
  public enableAnalytics(): void {
    localStorage.setItem('analyticsConsent', 'accepted');
    this.isEnabled = true;
    this.initializeSession();
  }

  public disableAnalytics(): void {
    localStorage.setItem('analyticsConsent', 'declined');
    this.isEnabled = false;
    this.clearAnalyticsData();
  }

  private clearAnalyticsData(): void {
    // Clear analytics data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('gameMetrics_') || key === 'userSessions' || key === 'userId') {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}

// Create global analytics instance
export const analytics = new AnalyticsManager();

// Export utility functions
export const trackPageView = (path: string, title: string) => analytics.trackPageView(path, title);
export const trackGameView = (game: Game) => analytics.trackGameView(game);
export const trackGamePlay = (game: Game) => analytics.trackGamePlay(game);
export const trackGameCompletion = (game: Game, playTime: number) => analytics.trackGameCompletion(game, playTime);
export const trackGameShare = (game: Game, platform: string) => analytics.trackGameShare(game, platform);
export const trackGameBookmark = (game: Game, action: 'add' | 'remove') => analytics.trackGameBookmark(game, action);
export const trackSearch = (query: string, resultsCount: number) => analytics.trackSearch(query, resultsCount);
export const trackFilter = (filterType: string, filterValue: string, resultsCount: number) => analytics.trackFilter(filterType, filterValue, resultsCount);
export const trackTopicView = (topicSlug: string, gamesCount: number) => analytics.trackTopicView(topicSlug, gamesCount);
export const trackError = (error: Error, context?: string) => analytics.trackError(error, context);
export const trackPerformance = (metric: string, value: number) => analytics.trackPerformance(metric, value);

// Setup global error handler
window.addEventListener('error', (event) => {
  trackError(new Error(event.message), `${event.filename}:${event.lineno}:${event.colno}`);
});

window.addEventListener('unhandledrejection', (event) => {
  trackError(new Error(event.reason), 'unhandled_promise_rejection');
});

// Performance monitoring
if ('PerformanceObserver' in window) {
  // Track Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    trackPerformance('largest_contentful_paint', Math.round(lastEntry.startTime));
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // Track First Input Delay
  const fidObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      trackPerformance('first_input_delay', Math.round(entry.processingStart - entry.startTime));
    });
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Track Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    trackPerformance('cumulative_layout_shift', Math.round(clsValue * 1000) / 1000);
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });
} 