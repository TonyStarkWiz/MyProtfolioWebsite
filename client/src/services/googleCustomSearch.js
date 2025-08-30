import { getFirebaseDB, COLLECTIONS, CACHE_SETTINGS, RATE_LIMITS, API_ENDPOINTS } from './firebase';
import { doc, getDoc, setDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

// Google Custom Search Service for DanceLink Web
class GoogleCustomSearchService {
  constructor() {
    this.db = getFirebaseDB();
    this.apiKey = process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_API_KEY;
    this.searchEngineId = process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
    this.baseUrl = API_ENDPOINTS.GOOGLE_CUSTOM_SEARCH;
    this.cache = new Map();
    this.lastRequestTime = 0;
    this.requestCount = 0;
    this.requestResetTime = Date.now();
  }

  // Initialize the service
  async initialize() {
    try {
      console.log('🧪 Initializing Google Custom Search service...');
      
      if (!this.apiKey || !this.searchEngineId) {
        console.error('🧪 Google Custom Search API key or search engine ID not configured');
        throw new Error('Google Custom Search not configured');
      }

      console.log('🧪 Google Custom Search service initialized successfully');
    } catch (error) {
      console.error('🧪 Google Custom Search initialization error:', error);
      throw error;
    }
  }

  // Build search queries for different screen types
  buildSearchQueries(location, screenType = 'events') {
    const queries = [];
    const locationString = this.createLocationString(location);

    switch (screenType) {
      case 'events':
        queries.push(`dance events near ${locationString}`);
        queries.push(`dance social events ${locationString}`);
        queries.push(`dance parties ${locationString}`);
        queries.push(`dance meetups ${locationString}`);
        queries.push(`dance community events ${locationString}`);
        break;
      
      case 'balls':
        queries.push(`formal ball gala dance events elegant ${locationString}`);
        queries.push(`black tie dance events ${locationString}`);
        queries.push(`formal dance balls ${locationString}`);
        queries.push(`elegant dance events ${locationString}`);
        queries.push(`formal dance galas ${locationString}`);
        break;
      
      case 'classes':
        queries.push(`dance classes lessons workshops instruction ${locationString}`);
        queries.push(`dance instruction ${locationString}`);
        queries.push(`dance workshops ${locationString}`);
        queries.push(`dance training ${locationString}`);
        queries.push(`dance education ${locationString}`);
        break;
      
      default:
        queries.push(`dance events near ${locationString}`);
        queries.push(`dance classes ${locationString}`);
        queries.push(`dance social ${locationString}`);
    }

    return queries;
  }

  // Create location string from coordinates or address
  createLocationString(location) {
    if (!location) {
      return 'Orlando, FL';
    }

    if (location.city && location.state) {
      return `${location.city}, ${location.state}`;
    }

    if (location.latitude && location.longitude) {
      return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
    }

    if (typeof location === 'string') {
      return location;
    }

    return 'Orlando, FL';
  }

  // Perform search with rate limiting and caching
  async search(query, options = {}) {
    try {
      console.log('🧪 Performing Google Custom Search:', query);
      
      // Check rate limiting
      await this.checkRateLimit();
      
      // Check cache first
      const cacheKey = this.generateCacheKey(query, options);
      const cachedResult = await this.getFromCache(cacheKey);
      if (cachedResult) {
        console.log('🧪 Returning cached result for:', query);
        return cachedResult;
      }

      // Perform search
      const searchResult = await this.performSearch(query, options);
      
      // Cache result
      await this.cacheResult(cacheKey, searchResult);
      
      // Update rate limiting
      this.updateRateLimit();
      
      console.log('🧪 Search completed:', query);
      return searchResult;
    } catch (error) {
      console.error('🧪 Search error:', error);
      throw error;
    }
  }

  // Check rate limiting
  async checkRateLimit() {
    const now = Date.now();
    
    // Reset counter if 1 minute has passed
    if (now - this.requestResetTime > 60000) {
      this.requestCount = 0;
      this.requestResetTime = now;
    }

    // Check if we've exceeded the limit
    if (this.requestCount >= RATE_LIMITS.MAX_REQUESTS_PER_MINUTE) {
      const waitTime = 60000 - (now - this.requestResetTime);
      console.log(`🧪 Rate limit exceeded. Waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestCount = 0;
      this.requestResetTime = Date.now();
    }

    // Ensure minimum delay between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < RATE_LIMITS.SEARCH_DELAY_MS) {
      const delay = RATE_LIMITS.SEARCH_DELAY_MS - timeSinceLastRequest;
      console.log(`🧪 Rate limiting delay: ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Update rate limiting counters
  updateRateLimit() {
    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  // Generate cache key
  generateCacheKey(query, options) {
    const key = JSON.stringify({ query, options });
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Get result from cache
  async getFromCache(cacheKey) {
    try {
      // Check memory cache first
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_SETTINGS.SEARCH_CACHE_DURATION) {
          return cached.data;
        } else {
          this.cache.delete(cacheKey);
        }
      }

      // Check Firestore cache
      const cacheDoc = doc(this.db, COLLECTIONS.GOOGLE_SEARCH_CACHE, cacheKey);
      const cacheSnapshot = await getDoc(cacheDoc);
      
      if (cacheSnapshot.exists()) {
        const cacheData = cacheSnapshot.data();
        const age = Date.now() - cacheData.timestamp;
        
        if (age < CACHE_SETTINGS.SEARCH_CACHE_DURATION) {
          // Update memory cache
          this.cache.set(cacheKey, {
            data: cacheData.data,
            timestamp: cacheData.timestamp
          });
          return cacheData.data;
        } else {
          // Remove expired cache
          await this.removeFromCache(cacheKey);
        }
      }

      return null;
    } catch (error) {
      console.error('🧪 Cache retrieval error:', error);
      return null;
    }
  }

  // Cache result
  async cacheResult(cacheKey, data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        query: data.query
      };

      // Update memory cache
      this.cache.set(cacheKey, cacheData);

      // Update Firestore cache
      const cacheDoc = doc(this.db, COLLECTIONS.GOOGLE_SEARCH_CACHE, cacheKey);
      await setDoc(cacheDoc, cacheData);

      console.log('🧪 Result cached:', cacheKey);
    } catch (error) {
      console.error('🧪 Cache storage error:', error);
    }
  }

  // Remove from cache
  async removeFromCache(cacheKey) {
    try {
      this.cache.delete(cacheKey);
      // Note: Firestore cache cleanup would be done by a background job
    } catch (error) {
      console.error('🧪 Cache removal error:', error);
    }
  }

  // Perform actual search
  async performSearch(query, options = {}) {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        cx: this.searchEngineId,
        q: query,
        num: options.num || 10,
        start: options.start || 1,
        safe: 'active',
        dateRestrict: options.dateRestrict || 'm6', // Last 6 months
        sort: options.sort || 'date', // Sort by date
        filter: options.filter || '1', // No duplicate content
        gl: options.gl || 'us', // Geographic location
        cr: options.cr || 'countryUS', // Country restrict
        rights: options.rights || 'cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived'
      });

      const url = `${this.baseUrl}?${params.toString()}`;
      
      console.log('🧪 Making search request to:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Search request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform results to DanceLink format
      const transformedResults = this.transformSearchResults(data, query);
      
      return {
        query,
        results: transformedResults,
        totalResults: data.searchInformation?.totalResults || 0,
        searchTime: data.searchInformation?.searchTime || 0,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('🧪 Search request error:', error);
      throw error;
    }
  }

  // Transform Google search results to DanceLink format
  transformSearchResults(data, query) {
    try {
      if (!data.items || !Array.isArray(data.items)) {
        return [];
      }

      return data.items.map((item, index) => ({
        id: `google_${index}_${Date.now()}`,
        title: item.title || 'Untitled Event',
        description: item.snippet || '',
        url: item.link || '',
        source: 'google_search',
        query: query,
        relevance: this.calculateRelevance(item, query),
        metadata: {
          displayLink: item.displayLink || '',
          formattedUrl: item.formattedUrl || '',
          image: item.pagemap?.cse_image?.[0]?.src || null,
          date: item.pagemap?.metatags?.[0]?.['article:published_time'] || null,
          location: this.extractLocation(item.snippet || ''),
          price: this.extractPrice(item.snippet || ''),
          type: this.determineEventType(item.title || '', item.snippet || '')
        }
      }));
    } catch (error) {
      console.error('🧪 Result transformation error:', error);
      return [];
    }
  }

  // Calculate relevance score
  calculateRelevance(item, query) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const titleLower = (item.title || '').toLowerCase();
    const snippetLower = (item.snippet || '').toLowerCase();

    // Title relevance
    if (titleLower.includes('dance')) score += 10;
    if (titleLower.includes('event')) score += 5;
    if (titleLower.includes('class')) score += 5;
    if (titleLower.includes('social')) score += 5;
    if (titleLower.includes('ball')) score += 8;
    if (titleLower.includes('workshop')) score += 5;

    // Snippet relevance
    if (snippetLower.includes('dance')) score += 5;
    if (snippetLower.includes('event')) score += 3;
    if (snippetLower.includes('class')) score += 3;
    if (snippetLower.includes('social')) score += 3;
    if (snippetLower.includes('ball')) score += 4;
    if (snippetLower.includes('workshop')) score += 3;

    // Date relevance (prefer recent events)
    const date = item.pagemap?.metatags?.[0]?.['article:published_time'];
    if (date) {
      const eventDate = new Date(date);
      const now = new Date();
      const daysDiff = (now - eventDate) / (1000 * 60 * 60 * 24);
      if (daysDiff < 30) score += 5;
      else if (daysDiff < 90) score += 3;
      else if (daysDiff < 180) score += 1;
    }

    return Math.min(score, 100);
  }

  // Extract location from text
  extractLocation(text) {
    // Simple location extraction - in production this would be more sophisticated
    const locationPatterns = [
      /in ([A-Za-z\s,]+)/i,
      /at ([A-Za-z\s,]+)/i,
      /near ([A-Za-z\s,]+)/i
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  }

  // Extract price from text
  extractPrice(text) {
    const pricePattern = /\$(\d+(?:\.\d{2})?)/;
    const match = text.match(pricePattern);
    return match ? parseFloat(match[1]) : null;
  }

  // Determine event type
  determineEventType(title, snippet) {
    const text = `${title} ${snippet}`.toLowerCase();
    
    if (text.includes('ball') || text.includes('gala') || text.includes('formal')) {
      return 'ball';
    } else if (text.includes('class') || text.includes('lesson') || text.includes('workshop')) {
      return 'class';
    } else if (text.includes('social') || text.includes('party') || text.includes('meetup')) {
      return 'social';
    } else {
      return 'event';
    }
  }

  // Search multiple queries with intelligent fallback
  async searchMultiple(queries, options = {}) {
    try {
      console.log('🧪 Performing multiple searches:', queries.length, 'queries');
      
      const results = [];
      const maxQueries = Math.min(queries.length, RATE_LIMITS.SEARCH_QUERIES_PER_REQUEST);

      for (let i = 0; i < maxQueries; i++) {
        try {
          const query = queries[i];
          const result = await this.search(query, options);
          
          if (result && result.results && result.results.length > 0) {
            results.push(...result.results);
          }

          // Add delay between queries
          if (i < maxQueries - 1) {
            await new Promise(resolve => setTimeout(resolve, RATE_LIMITS.SEARCH_DELAY_MS));
          }
        } catch (error) {
          console.error(`🧪 Query ${i + 1} failed:`, error);
          continue;
        }
      }

      // Remove duplicates and sort by relevance
      const uniqueResults = this.removeDuplicates(results);
      const sortedResults = uniqueResults.sort((a, b) => b.relevance - a.relevance);

      console.log('🧪 Multiple search completed:', sortedResults.length, 'unique results');
      return sortedResults;
    } catch (error) {
      console.error('🧪 Multiple search error:', error);
      throw error;
    }
  }

  // Remove duplicate results
  removeDuplicates(results) {
    const seen = new Set();
    return results.filter(result => {
      const key = `${result.title}_${result.url}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Get search statistics
  getSearchStats() {
    return {
      cacheSize: this.cache.size,
      requestCount: this.requestCount,
      lastRequestTime: this.lastRequestTime,
      requestResetTime: this.requestResetTime
    };
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log('🧪 Search cache cleared');
  }
}

// Create singleton instance
const googleCustomSearchService = new GoogleCustomSearchService();

// Initialize service
export const initializeGoogleCustomSearch = () => {
  return googleCustomSearchService.initialize();
};

// Export methods
export const search = (query, options) => googleCustomSearchService.search(query, options);
export const searchMultiple = (queries, options) => googleCustomSearchService.searchMultiple(queries, options);
export const buildSearchQueries = (location, screenType) => googleCustomSearchService.buildSearchQueries(location, screenType);
export const getSearchStats = () => googleCustomSearchService.getSearchStats();
export const clearSearchCache = () => googleCustomSearchService.clearCache();

export default googleCustomSearchService;
