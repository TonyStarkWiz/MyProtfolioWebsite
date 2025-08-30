import { getFirebaseDB, COLLECTIONS, USAGE_LIMITS } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

// Usage Tracking Service for DanceLink Web
class UsageTracker {
  constructor() {
    this.db = getFirebaseDB();
    this.currentUser = null;
    this.usageData = null;
    this.isInitialized = false;
  }

  // Initialize usage tracker
  async initialize(user = null) {
    try {
      console.log('🧪 Initializing usage tracker...');
      
      this.currentUser = user;
      
      if (user) {
        await this.loadUsageData();
      }
      
      this.isInitialized = true;
      console.log('🧪 Usage tracker initialized successfully');
    } catch (error) {
      console.error('🧪 Usage tracker initialization error:', error);
      throw error;
    }
  }

  // Load usage data for current user
  async loadUsageData() {
    try {
      if (!this.currentUser) {
        console.warn('🧪 No user available for usage tracking');
        return;
      }

      const usageDoc = doc(this.db, COLLECTIONS.USAGE_TRACKING, this.currentUser.uid);
      const usageSnapshot = await getDoc(usageDoc);

      if (usageSnapshot.exists()) {
        this.usageData = usageSnapshot.data();
        console.log('🧪 Usage data loaded:', this.usageData);
      } else {
        // Initialize new usage data
        this.usageData = this.initializeUsageData();
        await this.saveUsageData();
        console.log('🧪 New usage data initialized');
      }
    } catch (error) {
      console.error('🧪 Load usage data error:', error);
      throw error;
    }
  }

  // Initialize new usage data
  initializeUsageData() {
    const now = new Date();
    const trialStartDate = new Date(now.getTime() - (USAGE_LIMITS.TRIAL_DAYS * 24 * 60 * 60 * 1000));
    
    return {
      userId: this.currentUser.uid,
      email: this.currentUser.email,
      isPremium: false,
      trialStartDate: trialStartDate.toISOString(),
      trialEndDate: now.toISOString(),
      subscriptionType: 'free',
      subscriptionExpiry: null,
      dailyUsage: {
        [this.getCurrentDateKey()]: {
          searches: 0,
          events: 0,
          balls: 0,
          classes: 0,
          partners: 0
        }
      },
      totalUsage: {
        searches: 0,
        events: 0,
        balls: 0,
        classes: 0,
        partners: 0
      },
      lastResetDate: this.getCurrentDateKey(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
  }

  // Save usage data to Firestore
  async saveUsageData() {
    try {
      if (!this.usageData) {
        console.warn('🧪 No usage data to save');
        return;
      }

      const usageDoc = doc(this.db, COLLECTIONS.USAGE_TRACKING, this.currentUser.uid);
      this.usageData.updatedAt = new Date().toISOString();
      
      await setDoc(usageDoc, this.usageData);
      console.log('🧪 Usage data saved');
    } catch (error) {
      console.error('🧪 Save usage data error:', error);
      throw error;
    }
  }

  // Track usage for a specific action
  async trackUsage(action, screen = 'events') {
    try {
      console.log('🧪 Tracking usage:', action, 'on screen:', screen);
      
      if (!this.isInitialized || !this.currentUser) {
        console.warn('🧪 Usage tracker not initialized or no user');
        return { success: false, error: 'Not initialized' };
      }

      // Check if we need to reset daily usage
      await this.checkAndResetDailyUsage();

      // Check if user has exceeded limits
      const limitCheck = await this.checkUsageLimits(action, screen);
      if (!limitCheck.allowed) {
        console.log('🧪 Usage limit exceeded:', limitCheck);
        return {
          success: false,
          limitExceeded: true,
          message: limitCheck.message,
          upgradeRequired: limitCheck.upgradeRequired
        };
      }

      // Update usage counts
      await this.updateUsageCounts(action, screen);

      console.log('🧪 Usage tracked successfully');
      return { success: true };
    } catch (error) {
      console.error('🧪 Track usage error:', error);
      return { success: false, error: error.message };
    }
  }

  // Check and reset daily usage if needed
  async checkAndResetDailyUsage() {
    try {
      const currentDateKey = this.getCurrentDateKey();
      
      if (this.usageData.lastResetDate !== currentDateKey) {
        console.log('🧪 Resetting daily usage for new date');
        
        this.usageData.dailyUsage = {
          [currentDateKey]: {
            searches: 0,
            events: 0,
            balls: 0,
            classes: 0,
            partners: 0
          }
        };
        this.usageData.lastResetDate = currentDateKey;
        
        await this.saveUsageData();
      }
    } catch (error) {
      console.error('🧪 Check and reset daily usage error:', error);
    }
  }

  // Check usage limits
  async checkUsageLimits(action, screen) {
    try {
      const currentDateKey = this.getCurrentDateKey();
      const dailyUsage = this.usageData.dailyUsage[currentDateKey] || {
        searches: 0,
        events: 0,
        balls: 0,
        classes: 0,
        partners: 0
      };

      // Check if user is premium
      if (this.usageData.isPremium) {
        return { allowed: true, premium: true };
      }

      // Check trial status
      const trialEndDate = new Date(this.usageData.trialEndDate);
      const now = new Date();
      const isTrialExpired = now > trialEndDate;

      if (isTrialExpired) {
        // Trial expired, check daily limits
        const dailySearches = dailyUsage.searches;
        
        if (dailySearches >= USAGE_LIMITS.FREE_SEARCHES_PER_DAY) {
          return {
            allowed: false,
            upgradeRequired: true,
            message: `You've reached your daily limit of ${USAGE_LIMITS.FREE_SEARCHES_PER_DAY} searches. Upgrade to Premium for unlimited access.`,
            limit: USAGE_LIMITS.FREE_SEARCHES_PER_DAY,
            used: dailySearches
          };
        }
      } else {
        // Still in trial period
        const trialDaysLeft = Math.ceil((trialEndDate - now) / (1000 * 60 * 60 * 24));
        return {
          allowed: true,
          trial: true,
          trialDaysLeft,
          message: `You have ${trialDaysLeft} days left in your trial.`
        };
      }

      return { allowed: true };
    } catch (error) {
      console.error('🧪 Check usage limits error:', error);
      return { allowed: false, error: error.message };
    }
  }

  // Update usage counts
  async updateUsageCounts(action, screen) {
    try {
      const currentDateKey = this.getCurrentDateKey();
      
      // Initialize daily usage if it doesn't exist
      if (!this.usageData.dailyUsage[currentDateKey]) {
        this.usageData.dailyUsage[currentDateKey] = {
          searches: 0,
          events: 0,
          balls: 0,
          classes: 0,
          partners: 0
        };
      }

      // Update daily usage
      if (action === 'search') {
        this.usageData.dailyUsage[currentDateKey].searches++;
        this.usageData.totalUsage.searches++;
      } else if (action === 'view') {
        this.usageData.dailyUsage[currentDateKey][screen]++;
        this.usageData.totalUsage[screen]++;
      }

      // Save to Firestore
      await this.saveUsageData();
    } catch (error) {
      console.error('🧪 Update usage counts error:', error);
      throw error;
    }
  }

  // Get current usage statistics
  getUsageStats() {
    try {
      if (!this.usageData) {
        return null;
      }

      const currentDateKey = this.getCurrentDateKey();
      const dailyUsage = this.usageData.dailyUsage[currentDateKey] || {
        searches: 0,
        events: 0,
        balls: 0,
        classes: 0,
        partners: 0
      };

      const trialEndDate = new Date(this.usageData.trialEndDate);
      const now = new Date();
      const isTrialExpired = now > trialEndDate;
      const trialDaysLeft = isTrialExpired ? 0 : Math.ceil((trialEndDate - now) / (1000 * 60 * 60 * 24));

      return {
        isPremium: this.usageData.isPremium,
        isTrialExpired,
        trialDaysLeft,
        subscriptionType: this.usageData.subscriptionType,
        dailyUsage,
        totalUsage: this.usageData.totalUsage,
        limits: {
          freeSearchesPerDay: USAGE_LIMITS.FREE_SEARCHES_PER_DAY,
          trialDays: USAGE_LIMITS.TRIAL_DAYS
        },
        remainingSearches: this.usageData.isPremium ? 
          'Unlimited' : 
          Math.max(0, USAGE_LIMITS.FREE_SEARCHES_PER_DAY - dailyUsage.searches)
      };
    } catch (error) {
      console.error('🧪 Get usage stats error:', error);
      return null;
    }
  }

  // Check if user can perform action
  canPerformAction(action, screen = 'events') {
    try {
      const stats = this.getUsageStats();
      
      if (!stats) {
        return { allowed: false, error: 'No usage data' };
      }

      if (stats.isPremium) {
        return { allowed: true, premium: true };
      }

      if (!stats.isTrialExpired) {
        return { allowed: true, trial: true, trialDaysLeft: stats.trialDaysLeft };
      }

      // Check daily search limit
      if (action === 'search') {
        const remainingSearches = stats.remainingSearches;
        if (remainingSearches === 0) {
          return {
            allowed: false,
            upgradeRequired: true,
            message: `You've reached your daily limit of ${USAGE_LIMITS.FREE_SEARCHES_PER_DAY} searches. Upgrade to Premium for unlimited access.`
          };
        }
      }

      return { allowed: true };
    } catch (error) {
      console.error('🧪 Can perform action error:', error);
      return { allowed: false, error: error.message };
    }
  }

  // Upgrade user to premium
  async upgradeToPremium(subscriptionType = 'monthly', expiryDate = null) {
    try {
      console.log('🧪 Upgrading user to premium:', subscriptionType);
      
      if (!this.usageData) {
        throw new Error('No usage data available');
      }

      this.usageData.isPremium = true;
      this.usageData.subscriptionType = subscriptionType;
      this.usageData.subscriptionExpiry = expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      await this.saveUsageData();
      
      console.log('🧪 User upgraded to premium successfully');
      return { success: true };
    } catch (error) {
      console.error('🧪 Upgrade to premium error:', error);
      return { success: false, error: error.message };
    }
  }

  // Downgrade user to free
  async downgradeToFree() {
    try {
      console.log('🧪 Downgrading user to free');
      
      if (!this.usageData) {
        throw new Error('No usage data available');
      }

      this.usageData.isPremium = false;
      this.usageData.subscriptionType = 'free';
      this.usageData.subscriptionExpiry = null;

      await this.saveUsageData();
      
      console.log('🧪 User downgraded to free successfully');
      return { success: true };
    } catch (error) {
      console.error('🧪 Downgrade to free error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current date key (YYYY-MM-DD format)
  getCurrentDateKey() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  // Update user
  async updateUser(user) {
    try {
      console.log('🧪 Updating user in usage tracker');
      
      this.currentUser = user;
      
      if (user) {
        await this.loadUsageData();
      } else {
        this.usageData = null;
      }
    } catch (error) {
      console.error('🧪 Update user error:', error);
      throw error;
    }
  }

  // Get usage history
  async getUsageHistory(days = 7) {
    try {
      if (!this.currentUser) {
        return [];
      }

      const history = [];
      const now = new Date();
      
      for (let i = 0; i < days; i++) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dateKey = date.toISOString().split('T')[0];
        const dailyUsage = this.usageData.dailyUsage[dateKey] || {
          searches: 0,
          events: 0,
          balls: 0,
          classes: 0,
          partners: 0
        };

        history.unshift({
          date: dateKey,
          ...dailyUsage
        });
      }

      return history;
    } catch (error) {
      console.error('🧪 Get usage history error:', error);
      return [];
    }
  }

  // Reset usage data (for testing)
  async resetUsageData() {
    try {
      if (!this.currentUser) {
        throw new Error('No user available');
      }

      this.usageData = this.initializeUsageData();
      await this.saveUsageData();
      
      console.log('🧪 Usage data reset successfully');
      return { success: true };
    } catch (error) {
      console.error('🧪 Reset usage data error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get usage tracker status
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasUser: !!this.currentUser,
      hasUsageData: !!this.usageData
    };
  }
}

// Create singleton instance
const usageTracker = new UsageTracker();

// Initialize usage tracker
export const initializeUsageTracker = (user) => {
  return usageTracker.initialize(user);
};

// Export methods
export const trackUsage = (action, screen) => usageTracker.trackUsage(action, screen);
export const getUsageStats = () => usageTracker.getUsageStats();
export const canPerformAction = (action, screen) => usageTracker.canPerformAction(action, screen);
export const upgradeToPremium = (subscriptionType, expiryDate) => usageTracker.upgradeToPremium(subscriptionType, expiryDate);
export const downgradeToFree = () => usageTracker.downgradeToFree();
export const updateUser = (user) => usageTracker.updateUser(user);
export const getUsageHistory = (days) => usageTracker.getUsageHistory(days);
export const resetUsageData = () => usageTracker.resetUsageData();
export const getUsageTrackerStatus = () => usageTracker.getStatus();

export default usageTracker;
