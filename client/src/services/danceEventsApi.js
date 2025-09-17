import { getFirebaseDB, COLLECTIONS, API_ENDPOINTS } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { reverseGeocodeNominatim, getZipCodeFormat, validateZipCode, formatZipCode } from './locationServices';
import { proxyFetch, alternativeProxyFetch } from './proxyApi';

// Dance Events API Service for DanceLink Web
class DanceEventsApiService {
  constructor() {
    this.db = null; // Will be initialized later
    this.apiUrl = API_ENDPOINTS.DANCE_EVENTS;
    this.cache = new Map();
    this.lastFetchTime = 0;
    this.cacheDuration = 30 * 60 * 1000; // 30 minutes
  }

  // Initialize the service
  async initialize() {
    try {
      console.log('🧪 Initializing Dance Events API service...');
      
      // Initialize Firebase DB
      this.db = getFirebaseDB();
      
      console.log('🧪 Dance Events API service initialized successfully');
    } catch (error) {
      console.error('🧪 Dance Events API initialization error:', error);
      throw error;
    }
  }

  // Fetch events from the API
  async fetchEvents(options = {}) {
    try {
      console.log('🧪 Fetching dance events from API...');
      
      // Check cache first
      const cacheKey = this.generateCacheKey(options);
      const cachedData = await this.getFromCache(cacheKey);
      
      if (cachedData) {
        console.log('🧪 Returning cached dance events data');
        return cachedData;
      }

      // Fetch from API with multiple approaches
      console.log('🧪 Fetching from API URL:', this.apiUrl);
      
      let response;
      let data;
      
      // Try direct fetch first
      try {
        console.log('🧪 Attempt 1: Direct fetch...');
        response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log('🧪 Direct API Response status:', response.status);
        
        if (response.ok) {
          data = await response.json();
          console.log('🧪 Direct API data received:', data);
        } else {
          throw new Error(`Direct fetch failed: ${response.status}`);
        }
      } catch (directError) {
        console.log('🧪 Direct fetch failed:', directError.message);
        
        // Try proxy fetch
        try {
          console.log('🧪 Attempt 2: Proxy fetch...');
          response = await proxyFetch(this.apiUrl);
          data = await response.json();
          console.log('🧪 Proxy API data received:', data);
        } catch (proxyError) {
          console.log('🧪 Proxy fetch failed:', proxyError.message);
          
          // Try alternative proxy
          try {
            console.log('🧪 Attempt 3: Alternative proxy...');
            response = await alternativeProxyFetch(this.apiUrl);
            data = await response.json();
            console.log('🧪 Alternative proxy data received:', data);
          } catch (altProxyError) {
            console.log('🧪 Alternative proxy failed:', altProxyError.message);
            
            // Use sample data as fallback
            console.log('🧪 Using sample data as fallback...');
            data = this.getSampleData();
          }
        }
      }
      console.log('🧪 Raw API data received:', data);
      
      // Transform and process the data
      const processedData = await this.processEventsData(data, options);
      
      // Cache the result
      await this.cacheResult(cacheKey, processedData);
      
      console.log('🧪 Dance events fetched successfully:', processedData.events.length, 'events');
      return processedData;
      
    } catch (error) {
      console.error('🧪 Fetch events error:', error);
      throw error;
    }
  }

  // Process and transform the API data
  async processEventsData(data, options = {}) {
    try {
      console.log('🧪 Processing events data:', data);
      const events = Array.isArray(data) ? data : (data.events || data.data || []);
      console.log('🧪 Extracted events array:', events);
      
      const processedEvents = await Promise.all(events.map(async (event, index) => {
        // Extract dance styles from the dances object
        const danceStyles = event.dances ? Object.values(event.dances) : [];
        
        // Build full image URL if it's a relative path
        const imageUrl = event.image ? 
          (event.image.startsWith('http') ? event.image : `https://www.dance-events.info${event.image}`) : null;
        
        // Build full thumbnail URL if it's a relative path
        const thumbnailUrl = event.thumbnail ? 
          (event.thumbnail.startsWith('http') ? event.thumbnail : `https://www.dance-events.info${event.thumbnail}`) : null;
        
        // Get location data with zip code
        let locationData = {
          venue: event.location?.name || '',
          address: event.location?.address || '',
          city: event.location?.city || '',
          state: event.location?.state || '',
          country: event.location?.country || 'US',
          countryCode: event.location?.countryCode || 'US',
          coordinates: event.location?.lat && event.location?.lng ? 
            { lat: event.location.lat, lng: event.location.lng } : null,
          zipCode: null,
          zipCodeFormat: null
        };
        
        // Reverse geocode to get zip code if coordinates are available
        if (locationData.coordinates) {
          try {
            console.log('🧪 Reverse geocoding for event:', event.name);
                         const geocodeResult = await reverseGeocodeNominatim(locationData.coordinates.lat, locationData.coordinates.lng);
            
            // Update location data with geocoded information
            locationData = {
              ...locationData,
              zipCode: geocodeResult.zipCode,
              country: geocodeResult.country || locationData.country,
              countryCode: geocodeResult.countryCode || locationData.countryCode,
              city: geocodeResult.city || locationData.city,
              state: geocodeResult.state || locationData.state,
              address: geocodeResult.address || locationData.address
            };
            
            // Get zip code format for the country
            const zipFormat = getZipCodeFormat(locationData.countryCode);
            locationData.zipCodeFormat = zipFormat;
            
            // Format the zip code according to country format
            if (locationData.zipCode) {
              locationData.zipCode = formatZipCode(locationData.zipCode, locationData.countryCode);
            }
            
            console.log('🧪 Location data processed:', {
              event: event.name,
              zipCode: locationData.zipCode,
              country: locationData.country,
              countryCode: locationData.countryCode,
              format: zipFormat
            });
            
          } catch (error) {
            console.error('🧪 Reverse geocoding failed for event:', event.name, error);
          }
        }
        
        return {
          id: event.id || `dance_event_${index}_${Date.now()}`,
          title: event.name || event.title || 'Untitled Event',
          description: event.description || '',
          date: event.startDate || event.date || null,
          endDate: event.endDate || event.end_date || null,
          time: null, // API doesn't provide separate time field
          eventType: event.type || 'event',
          eventStatus: event.eventStatus || 'active',
          attendanceMode: event.eventAttendanceMode || 'offline',
          location: locationData,
          organizer: event.organizer || '',
          contact: {
            phone: '', // API doesn't provide phone
            email: '', // API doesn't provide email
            website: event.website_url || event.url || ''
          },
          pricing: {
            price: null, // API doesn't provide pricing
            currency: 'USD',
            ticketUrl: event.url || ''
          },
          categories: [event.type] || [],
          danceStyles: danceStyles,
          skillLevel: 'All Levels', // API doesn't provide skill level
          image: imageUrl,
          thumbnail: thumbnailUrl,
          source: 'dance_events_api',
          metadata: {
            originalData: event,
            processedAt: new Date().toISOString(),
            relevance: this.calculateRelevance(event, options),
            eventId: event.id,
            dateOnly: event.dateOnly || false,
            statusReason: event.statusReason,
            geocoded: !!locationData.zipCode
          }
        };
      }));

      // Filter events based on options
      const filteredEvents = this.filterEvents(processedEvents, options);
      
      // Sort events by date
      const sortedEvents = filteredEvents.sort((a, b) => {
        const dateA = new Date(a.date || '9999-12-31');
        const dateB = new Date(b.date || '9999-12-31');
        return dateA - dateB;
      });

      return {
        events: sortedEvents,
        totalCount: sortedEvents.length,
        originalCount: events.length,
        fetchedAt: new Date().toISOString(),
        source: 'dance_events_api',
        metadata: {
          apiUrl: this.apiUrl,
          processingOptions: options
        }
      };
      
    } catch (error) {
      console.error('🧪 Process events data error:', error);
      return {
        events: [],
        totalCount: 0,
        originalCount: 0,
        error: error.message,
        fetchedAt: new Date().toISOString()
      };
    }
  }

  // Filter events based on options
  filterEvents(events, options = {}) {
    let filtered = events;

    // Filter by date range
    if (options.startDate) {
      const startDate = new Date(options.startDate);
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date || '9999-12-31');
        return eventDate >= startDate;
      });
    }

    if (options.endDate) {
      const endDate = new Date(options.endDate);
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date || '9999-12-31');
        return eventDate <= endDate;
      });
    }

    // Filter by location
    if (options.location) {
      const locationLower = options.location.toLowerCase();
      filtered = filtered.filter(event => {
        const venue = (event.location?.venue || '').toLowerCase();
        const city = (event.location?.city || '').toLowerCase();
        const state = (event.location?.state || '').toLowerCase();
        const address = (event.location?.address || '').toLowerCase();
        const country = (event.location?.country || '').toLowerCase();
        
        return venue.includes(locationLower) || 
               city.includes(locationLower) || 
               state.includes(locationLower) || 
               address.includes(locationLower) ||
               country.includes(locationLower);
      });
    }

    // Filter by dance style
    if (options.danceStyle) {
      const styleLower = options.danceStyle.toLowerCase();
      filtered = filtered.filter(event => {
        return event.danceStyles.some(style => 
          style.toLowerCase().includes(styleLower)
        );
      });
    }

    // Filter by event type
    if (options.eventType) {
      const typeLower = options.eventType.toLowerCase();
      filtered = filtered.filter(event => {
        return event.eventType.toLowerCase().includes(typeLower);
      });
    }

    // Filter by skill level (API doesn't provide this, so we'll skip it)
    // if (options.skillLevel) {
    //   const levelLower = options.skillLevel.toLowerCase();
    //   filtered = filtered.filter(event => {
    //     return event.skillLevel.toLowerCase().includes(levelLower);
    //   });
    // }

    return filtered;
  }

  // Calculate relevance score for events
  calculateRelevance(event, options = {}) {
    let score = 0;
    
    // Date relevance (prefer upcoming events)
    if (event.startDate) {
      const eventDate = new Date(event.startDate);
      const now = new Date();
      const daysDiff = (eventDate - now) / (1000 * 60 * 60 * 24);
      
      if (daysDiff >= 0 && daysDiff <= 30) score += 10; // Upcoming events
      else if (daysDiff > 30 && daysDiff <= 90) score += 5; // Future events
      else if (daysDiff < 0 && daysDiff >= -7) score += 2; // Recent events
    }

    // Location relevance
    if (options.location && event.location) {
      const locationLower = options.location.toLowerCase();
      const venue = (event.location.venue || '').toLowerCase();
      const city = (event.location.city || '').toLowerCase();
      const country = (event.location.country || '').toLowerCase();
      
      if (venue.includes(locationLower)) score += 8;
      if (city.includes(locationLower)) score += 6;
      if (country.includes(locationLower)) score += 4;
    }

    // Dance style relevance
    if (options.danceStyle && event.danceStyles) {
      const styleLower = options.danceStyle.toLowerCase();
      const hasMatchingStyle = event.danceStyles.some(style => 
        style.toLowerCase().includes(styleLower)
      );
      if (hasMatchingStyle) score += 7;
    }

    // Event type relevance
    if (options.eventType && event.eventType) {
      const typeLower = options.eventType.toLowerCase();
      const eventType = event.eventType.toLowerCase();
      if (eventType.includes(typeLower)) score += 5;
    }

    return Math.min(score, 100);
  }

  // Generate cache key
  generateCacheKey(options) {
    const key = JSON.stringify({ 
      endpoint: 'dance_events',
      options: options || {},
      timestamp: Math.floor(Date.now() / (this.cacheDuration / 2)) // Cache for half the duration
    });
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Get data from cache
  async getFromCache(cacheKey) {
    try {
      // Check memory cache first
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < this.cacheDuration) {
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
        
        if (age < this.cacheDuration) {
          // Update memory cache
          this.cache.set(cacheKey, {
            data: cacheData.data,
            timestamp: cacheData.timestamp
          });
          
          // Show success alert for successful Firestore read
          if (typeof window !== 'undefined') {
            alert(`🧪 Dance Events Cache Read Success!\n\nCollection: ${COLLECTIONS.GOOGLE_SEARCH_CACHE}\nDocument ID: ${cacheKey}\n\nEvents Count: ${cacheData.data.events?.length || 0}\n\nPayload:\n${JSON.stringify(cacheData.data, null, 2)}`);
          }
          
          return cacheData.data;
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
        source: 'dance_events_api'
      };

      // Update memory cache
      this.cache.set(cacheKey, cacheData);

      // Update Firestore cache
      const cacheDoc = doc(this.db, COLLECTIONS.GOOGLE_SEARCH_CACHE, cacheKey);
      await setDoc(cacheDoc, cacheData);

      console.log('🧪 Dance events cached:', cacheKey);
      
      // Show success alert for successful Firestore write
      if (typeof window !== 'undefined') {
        alert(`🧪 Dance Events Cache Write Success!\n\nCollection: ${COLLECTIONS.GOOGLE_SEARCH_CACHE}\nDocument ID: ${cacheKey}\n\nEvents Count: ${data.events?.length || 0}\n\nPayload:\n${JSON.stringify(cacheData.data, null, 2)}`);
      }
    } catch (error) {
      console.error('🧪 Cache storage error:', error);
    }
  }

  // Get events by location
  async getEventsByLocation(location, options = {}) {
    return this.fetchEvents({
      ...options,
      location: location
    });
  }

  // Get upcoming events
  async getUpcomingEvents(days = 30, options = {}) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    
    return this.fetchEvents({
      ...options,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
  }

  // Get events by dance style
  async getEventsByStyle(danceStyle, options = {}) {
    return this.fetchEvents({
      ...options,
      danceStyle: danceStyle
    });
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log('🧪 Dance events cache cleared');
  }

  // Get sample data for testing
  getSampleData() {
    return [
      {
        id: 'sample_1',
        name: 'Salsa Night at Latin Quarter',
        description: 'Join us for an amazing night of salsa dancing with live music and professional instructors.',
        startDate: '2024-01-15',
        endDate: '2024-01-15',
        type: 'party',
        location: {
          name: 'Latin Quarter',
          address: '123 Dance Street',
          city: 'Miami',
          state: 'FL',
          country: 'United States',
          countryCode: 'US',
          lat: 25.7617,
          lng: -80.1918
        },
        dances: {
          salsa: 'Salsa',
          bachata: 'Bachata'
        },
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        website_url: 'https://example.com'
      },
      {
        id: 'sample_2',
        name: 'Tango Workshop Weekend',
        description: 'Intensive tango workshop for all levels. Learn from world-class instructors.',
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        type: 'workshop',
        location: {
          name: 'Dance Studio Pro',
          address: '456 Tango Avenue',
          city: 'New York',
          state: 'NY',
          country: 'United States',
          countryCode: 'US',
          lat: 40.7128,
          lng: -74.0060
        },
        dances: {
          tango: 'Tango'
        },
        image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400',
        website_url: 'https://example.com'
      },
      {
        id: 'sample_3',
        name: 'Bachata Festival 2024',
        description: 'The biggest bachata festival in the region with international artists.',
        startDate: '2024-02-10',
        endDate: '2024-02-12',
        type: 'festival',
        location: {
          name: 'Convention Center',
          address: '789 Festival Blvd',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          countryCode: 'US',
          lat: 34.0522,
          lng: -118.2437
        },
        dances: {
          bachata: 'Bachata',
          salsa: 'Salsa',
          merengue: 'Merengue'
        },
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        website_url: 'https://example.com'
      }
    ];
  }

  // Get service statistics
  getStats() {
    return {
      cacheSize: this.cache.size,
      lastFetchTime: this.lastFetchTime,
      cacheDuration: this.cacheDuration,
      apiUrl: this.apiUrl
    };
  }
}

// Create singleton instance
const danceEventsApiService = new DanceEventsApiService();

// Initialize service
export const initializeDanceEventsApi = () => {
  return danceEventsApiService.initialize();
};

// Export methods
export const fetchEvents = (options) => danceEventsApiService.fetchEvents(options);
export const getEventsByLocation = (location, options) => danceEventsApiService.getEventsByLocation(location, options);
export const getUpcomingEvents = (days, options) => danceEventsApiService.getUpcomingEvents(days, options);
export const getEventsByStyle = (danceStyle, options) => danceEventsApiService.getEventsByStyle(danceStyle, options);
export const clearDanceEventsCache = () => danceEventsApiService.clearCache();
export const getDanceEventsStats = () => danceEventsApiService.getStats();

export default danceEventsApiService;
