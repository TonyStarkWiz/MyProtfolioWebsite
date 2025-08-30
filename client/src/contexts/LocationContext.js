import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentLocation } from '../services/locationServices';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
    } catch (error) {
      console.error('🧪 Location initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = (location) => {
    setCurrentLocation(location);
  };

  const value = {
    currentLocation,
    loading,
    updateLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
