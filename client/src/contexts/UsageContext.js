import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsageStats } from '../services/usageTracker';

const UsageContext = createContext();

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('useUsage must be used within a UsageProvider');
  }
  return context;
};

export const UsageProvider = ({ children }) => {
  const [usageStats, setUsageStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeUsage();
  }, []);

  const initializeUsage = async () => {
    try {
      const stats = getUsageStats();
      setUsageStats(stats);
    } catch (error) {
      console.error('🧪 Usage initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUsageStats = (stats) => {
    setUsageStats(stats);
  };

  const value = {
    usageStats,
    loading,
    updateUsageStats
  };

  return (
    <UsageContext.Provider value={value}>
      {children}
    </UsageContext.Provider>
  );
};
