import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';
import { getAppCheck, initializeAppCheck } from 'firebase/app-check';

// Firebase configuration for DanceLink
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "dancelink-xxxxx.firebaseapp.com",
  projectId: "dancelink-xxxxx",
  storageBucket: "dancelink-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
let app;
let analytics;

export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase services
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const functions = getFunctions(app);
    
    // Initialize Analytics in production
    if (process.env.NODE_ENV === 'production') {
      analytics = getAnalytics(app);
    }
    
    // Initialize App Check for security
    if (typeof window !== 'undefined') {
      initializeAppCheck(app, {
        provider: window.recaptchaVerifier,
        isTokenAutoRefreshEnabled: true
      });
    }
    
    console.log('🧪 Firebase initialized successfully');
    
    return {
      app,
      auth,
      db,
      storage,
      functions,
      analytics
    };
  } catch (error) {
    console.error('🧪 Firebase initialization error:', error);
    throw error;
  }
};

// Export Firebase instances
export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => getAuth(app);
export const getFirebaseDB = () => getFirestore(app);
export const getFirebaseStorage = () => getStorage(app);
export const getFirebaseFunctions = () => getFunctions(app);
export const getFirebaseAnalytics = () => analytics;

// Firestore collections
export const COLLECTIONS = {
  USERS: 'users',
  EVENTS: 'events',
  PARTNERS: 'partners',
  USAGE_TRACKING: 'phase1_usage_tracking',
  GOOGLE_SEARCH_CACHE: 'google_search_cache',
  USER_PREFERENCES: 'user_preferences',
  LOCATION_HISTORY: 'location_history',
  CHAT_ROOMS: 'chat_rooms',
  MESSAGES: 'messages',
  SUBSCRIPTIONS: 'subscriptions',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
  FEEDBACK: 'feedback',
  SUPPORT: 'support'
};

// Default location (Orlando, FL)
export const DEFAULT_LOCATION = {
  latitude: 27.6648,
  longitude: -81.5158,
  city: 'Orlando',
  state: 'FL',
  country: 'US'
};

// API endpoints
export const API_ENDPOINTS = {
  DANCE_EVENTS: 'https://www.dance-events.info/api/v1/events.json?token=55493fc73a27d20a9ac3402e8b5eff61',
  EVENTBRITE: 'https://www.eventbriteapi.com/v3/users/me/?token=S7K32K3AIW2OVXQZLUHE',
  GOOGLE_CUSTOM_SEARCH: 'https://www.googleapis.com/customsearch/v1'
};

// Usage limits
export const USAGE_LIMITS = {
  FREE_SEARCHES_PER_DAY: 5,
  TRIAL_DAYS: 7,
  PREMIUM_SEARCHES_PER_DAY: 1000
};

// Cache settings
export const CACHE_SETTINGS = {
  SEARCH_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  LOCATION_CACHE_DURATION: 60 * 60 * 1000, // 1 hour
  USER_PREFERENCES_CACHE_DURATION: 30 * 60 * 1000 // 30 minutes
};

// Rate limiting
export const RATE_LIMITS = {
  SEARCH_QUERIES_PER_REQUEST: 5,
  SEARCH_DELAY_MS: 1000,
  MAX_REQUESTS_PER_MINUTE: 60
};

export default {
  initializeFirebase,
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseDB,
  getFirebaseStorage,
  getFirebaseFunctions,
  getFirebaseAnalytics,
  COLLECTIONS,
  DEFAULT_LOCATION,
  API_ENDPOINTS,
  USAGE_LIMITS,
  CACHE_SETTINGS,
  RATE_LIMITS
};
