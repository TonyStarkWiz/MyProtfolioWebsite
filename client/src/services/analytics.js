// Analytics Service for DanceLink Web
class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.analytics = null;
    this.userId = null;
    this.sessionId = this.generateSessionId();
  }

  // Initialize analytics
  async initialize() {
    try {
      console.log('🧪 Initializing analytics service...');
      
      // Initialize Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        this.analytics = window.gtag;
        console.log('🧪 Google Analytics initialized');
      }

      // Initialize Facebook Pixel if available
      if (typeof window !== 'undefined' && window.fbq) {
        this.facebookPixel = window.fbq;
        console.log('🧪 Facebook Pixel initialized');
      }

      this.isInitialized = true;
      console.log('🧪 Analytics service initialized successfully');
    } catch (error) {
      console.error('🧪 Analytics initialization error:', error);
      // Don't throw error, analytics is not critical
    }
  }

  // Generate session ID
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Set user ID
  setUserId(userId) {
    this.userId = userId;
    
    if (this.analytics) {
      this.analytics('config', 'GA_MEASUREMENT_ID', {
        user_id: userId
      });
    }
  }

  // Track page view
  trackPageView(page, title = null) {
    try {
      console.log('🧪 Tracking page view:', page);
      
      if (this.analytics) {
        this.analytics('config', 'GA_MEASUREMENT_ID', {
          page_title: title || page,
          page_location: window.location.href,
          page_path: page
        });
      }

      if (this.facebookPixel) {
        this.facebookPixel('track', 'PageView');
      }

      // Track custom event
      this.trackEvent('page_view', {
        page,
        title: title || page,
        url: window.location.href,
        session_id: this.sessionId,
        user_id: this.userId
      });
    } catch (error) {
      console.error('🧪 Page view tracking error:', error);
    }
  }

  // Track custom event
  trackEvent(eventName, parameters = {}) {
    try {
      console.log('🧪 Tracking event:', eventName, parameters);
      
      if (this.analytics) {
        this.analytics('event', eventName, {
          ...parameters,
          session_id: this.sessionId,
          user_id: this.userId,
          timestamp: Date.now()
        });
      }

      if (this.facebookPixel) {
        this.facebookPixel('track', eventName, parameters);
      }
    } catch (error) {
      console.error('🧪 Event tracking error:', error);
    }
  }

  // Track search events
  trackSearch(query, location, screen, resultsCount) {
    this.trackEvent('search_performed', {
      query,
      location: location ? JSON.stringify(location) : null,
      screen,
      results_count: resultsCount,
      search_type: 'google_custom_search'
    });
  }

  // Track location events
  trackLocationAccess(location, method) {
    this.trackEvent('location_accessed', {
      location: JSON.stringify(location),
      method, // 'gps', 'ip', 'postal_code'
      accuracy: location.accuracy || null
    });
  }

  // Track usage events
  trackUsage(action, screen, limitExceeded = false) {
    this.trackEvent('usage_tracked', {
      action,
      screen,
      limit_exceeded: limitExceeded,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track conversion events
  trackConversion(type, value = null) {
    this.trackEvent('conversion', {
      type, // 'premium_upgrade', 'event_booking', 'partner_match'
      value,
      currency: 'USD'
    });
  }

  // Track error events
  trackError(error, context) {
    this.trackEvent('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track performance events
  trackPerformance(metric, value, unit = 'ms') {
    this.trackEvent('performance_metric', {
      metric,
      value,
      unit,
      session_id: this.sessionId
    });
  }

  // Track user engagement
  trackEngagement(action, duration = null) {
    this.trackEvent('user_engagement', {
      action,
      duration,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track feature usage
  trackFeatureUsage(feature, success = true) {
    this.trackEvent('feature_used', {
      feature,
      success,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track A/B test events
  trackABTest(testName, variant, conversion = false) {
    this.trackEvent('ab_test', {
      test_name: testName,
      variant,
      conversion,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track e-commerce events
  trackPurchase(productId, value, currency = 'USD') {
    this.trackEvent('purchase', {
      product_id: productId,
      value,
      currency,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track social events
  trackSocialShare(platform, content) {
    this.trackEvent('social_share', {
      platform,
      content,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track form submissions
  trackFormSubmission(formName, success = true) {
    this.trackEvent('form_submission', {
      form_name: formName,
      success,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track video events
  trackVideoEvent(action, videoId, duration = null) {
    this.trackEvent('video_interaction', {
      action,
      video_id: videoId,
      duration,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track scroll depth
  trackScrollDepth(depth) {
    this.trackEvent('scroll_depth', {
      depth,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track time on page
  trackTimeOnPage(duration) {
    this.trackEvent('time_on_page', {
      duration,
      page: window.location.pathname,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track user journey
  trackUserJourney(step, data = {}) {
    this.trackEvent('user_journey', {
      step,
      ...data,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track API calls
  trackAPICall(endpoint, method, status, duration) {
    this.trackEvent('api_call', {
      endpoint,
      method,
      status,
      duration,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track cache hits/misses
  trackCacheEvent(type, key, hit = false) {
    this.trackEvent('cache_event', {
      type,
      key,
      hit,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track search suggestions
  trackSearchSuggestion(query, suggestion, selected = false) {
    this.trackEvent('search_suggestion', {
      query,
      suggestion,
      selected,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track partner matching
  trackPartnerMatch(matchId, compatibility, success = true) {
    this.trackEvent('partner_match', {
      match_id: matchId,
      compatibility,
      success,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track event interactions
  trackEventInteraction(eventId, action) {
    this.trackEvent('event_interaction', {
      event_id: eventId,
      action,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track notification events
  trackNotification(type, action, success = true) {
    this.trackEvent('notification', {
      type,
      action,
      success,
      session_id: this.sessionId,
      user_id: this.userId
    });
  }

  // Track device information
  trackDeviceInfo() {
    const deviceInfo = {
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      session_id: this.sessionId,
      user_id: this.userId
    };

    this.trackEvent('device_info', deviceInfo);
  }

  // Track session start
  trackSessionStart() {
    this.trackEvent('session_start', {
      session_id: this.sessionId,
      user_id: this.userId,
      timestamp: Date.now()
    });
  }

  // Track session end
  trackSessionEnd(duration) {
    this.trackEvent('session_end', {
      session_id: this.sessionId,
      user_id: this.userId,
      duration,
      timestamp: Date.now()
    });
  }

  // Get analytics status
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasAnalytics: !!this.analytics,
      hasFacebookPixel: !!this.facebookPixel,
      userId: this.userId,
      sessionId: this.sessionId
    };
  }

  // Reset session
  resetSession() {
    this.sessionId = this.generateSessionId();
    this.trackSessionStart();
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

// Initialize analytics
export const initializeAnalytics = () => {
  return analyticsService.initialize();
};

// Export methods
export const setUserId = (userId) => analyticsService.setUserId(userId);
export const trackPageView = (page, title) => analyticsService.trackPageView(page, title);
export const trackEvent = (eventName, parameters) => analyticsService.trackEvent(eventName, parameters);
export const trackSearch = (query, location, screen, resultsCount) => analyticsService.trackSearch(query, location, screen, resultsCount);
export const trackLocationAccess = (location, method) => analyticsService.trackLocationAccess(location, method);
export const trackUsage = (action, screen, limitExceeded) => analyticsService.trackUsage(action, screen, limitExceeded);
export const trackConversion = (type, value) => analyticsService.trackConversion(type, value);
export const trackError = (error, context) => analyticsService.trackError(error, context);
export const trackPerformance = (metric, value, unit) => analyticsService.trackPerformance(metric, value, unit);
export const trackEngagement = (action, duration) => analyticsService.trackEngagement(action, duration);
export const trackFeatureUsage = (feature, success) => analyticsService.trackFeatureUsage(feature, success);
export const trackABTest = (testName, variant, conversion) => analyticsService.trackABTest(testName, variant, conversion);
export const trackPurchase = (productId, value, currency) => analyticsService.trackPurchase(productId, value, currency);
export const trackSocialShare = (platform, content) => analyticsService.trackSocialShare(platform, content);
export const trackFormSubmission = (formName, success) => analyticsService.trackFormSubmission(formName, success);
export const trackVideoEvent = (action, videoId, duration) => analyticsService.trackVideoEvent(action, videoId, duration);
export const trackScrollDepth = (depth) => analyticsService.trackScrollDepth(depth);
export const trackTimeOnPage = (duration) => analyticsService.trackTimeOnPage(duration);
export const trackUserJourney = (step, data) => analyticsService.trackUserJourney(step, data);
export const trackAPICall = (endpoint, method, status, duration) => analyticsService.trackAPICall(endpoint, method, status, duration);
export const trackCacheEvent = (type, key, hit) => analyticsService.trackCacheEvent(type, key, hit);
export const trackSearchSuggestion = (query, suggestion, selected) => analyticsService.trackSearchSuggestion(query, suggestion, selected);
export const trackPartnerMatch = (matchId, compatibility, success) => analyticsService.trackPartnerMatch(matchId, compatibility, success);
export const trackEventInteraction = (eventId, action) => analyticsService.trackEventInteraction(eventId, action);
export const trackNotification = (type, action, success) => analyticsService.trackNotification(type, action, success);
export const trackDeviceInfo = () => analyticsService.trackDeviceInfo();
export const trackSessionStart = () => analyticsService.trackSessionStart();
export const trackSessionEnd = (duration) => analyticsService.trackSessionEnd(duration);
export const getAnalyticsStatus = () => analyticsService.getStatus();
export const resetSession = () => analyticsService.resetSession();

export default analyticsService;
