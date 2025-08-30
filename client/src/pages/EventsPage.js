import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSearch, FaFilter, FaLocationArrow, FaGlobe } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

// Import services
import { getCurrentLocation, getLocationFromIP } from '../services/locationServices';
import { validatePostalCode, getAvailableCountries, formatPostalCode } from '../services/postalCodeValidator';
import { searchMultiple, buildSearchQueries } from '../services/googleCustomSearch';
import { trackUsage, canPerformAction } from '../services/usageTracker';
import { trackSearch, trackLocationAccess } from '../services/analytics';

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [validationResult, setValidationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [usageStats, setUsageStats] = useState(null);

  const countries = getAvailableCountries();

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    try {
      setIsLoading(true);
      
      // Get current location
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      // Track location access
      trackLocationAccess(location, 'gps');
      
      // Check usage limits
      const canSearch = canPerformAction('search', 'events');
      if (!canSearch.allowed) {
        setError(canSearch.message);
      }
      
      // Load usage stats
      // setUsageStats(getUsageStats());
      
    } catch (error) {
      console.error('🧪 Page initialization error:', error);
      setError('Failed to initialize location services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    try {
      setIsSearching(true);
      setError(null);

      // Check usage limits
      const usageCheck = await trackUsage('search', 'events');
      if (!usageCheck.success) {
        setError(usageCheck.message);
        return;
      }

      // Get location
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      // Track location access
      trackLocationAccess(location, 'gps');

      // Perform search
      await performSearch(location);

    } catch (error) {
      console.error('🧪 Location search error:', error);
      setError('Failed to get location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePostalCodeSearch = async () => {
    try {
      setIsSearching(true);
      setError(null);

      // Validate postal code
      const validation = validatePostalCode(postalCode, selectedCountry);
      setValidationResult(validation);

      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      // Check usage limits
      const usageCheck = await trackUsage('search', 'events');
      if (!usageCheck.success) {
        setError(usageCheck.message);
        return;
      }

      // Create location object from postal code
      const location = {
        postalCode: validation.postalCode,
        country: selectedCountry,
        countryName: validation.countryName,
        source: 'postal_code'
      };

      // Perform search
      await performSearch(location);

    } catch (error) {
      console.error('🧪 Postal code search error:', error);
      setError('Failed to search with postal code. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const performSearch = async (location) => {
    try {
      // Build search queries for events
      const queries = buildSearchQueries(location, 'events');
      
      // Perform multiple searches
      const results = await searchMultiple(queries, {
        num: 10,
        dateRestrict: 'm6'
      });

      setEvents(results);
      
      // Track search
      trackSearch(queries[0], location, 'events', results.length);

    } catch (error) {
      console.error('🧪 Search error:', error);
      setError('Failed to search events. Please try again.');
    }
  };

  const handlePostalCodeChange = (value) => {
    setPostalCode(value);
    
    // Real-time validation
    if (value.length > 0) {
      const validation = validatePostalCode(value, selectedCountry);
      setValidationResult(validation);
    } else {
      setValidationResult(null);
    }
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setPostalCode('');
    setValidationResult(null);
  };

  const formatPostalCodeInput = (value) => {
    return formatPostalCode(value, selectedCountry);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading Events..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Dance Events
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Find dance events, socials, and parties near you with AI-powered search
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GPS Location Search */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaLocationArrow className="mr-2" />
                Use My Location
              </h3>
              <p className="text-white/70 mb-4">
                Automatically find events near your current location using GPS
              </p>
              <button
                onClick={handleLocationSearch}
                disabled={isSearching}
                className="glass-button w-full"
              >
                {isSearching ? (
                  <LoadingSpinner size="small" text="Searching..." />
                ) : (
                  <>
                    <FaMapMarkerAlt className="mr-2" />
                    Search by GPS Location
                  </>
                )}
              </button>
              {currentLocation && (
                <p className="text-white/60 text-sm mt-2">
                  Current location: {currentLocation.latitude?.toFixed(4)}, {currentLocation.longitude?.toFixed(4)}
                </p>
              )}
            </div>

            {/* Postal Code Search */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaGlobe className="mr-2" />
                Search by Postal Code
              </h3>
              <p className="text-white/70 mb-4">
                Enter a postal code to find events in a specific area
              </p>
              
              <div className="space-y-4">
                {/* Country Select */}
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="country-select"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.format})
                    </option>
                  ))}
                </select>

                {/* Postal Code Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    placeholder={`Enter postal code (e.g., ${countries.find(c => c.code === selectedCountry)?.example})`}
                    className="postal-code-input"
                  />
                  {validationResult && (
                    <div className={`text-sm mt-2 ${
                      validationResult.isValid ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {validationResult.isValid ? '✓' : '✗'} {validationResult.error || 'Valid postal code'}
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePostalCodeSearch}
                  disabled={isSearching || !validationResult?.isValid}
                  className="glass-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <LoadingSpinner size="small" text="Searching..." />
                  ) : (
                    <>
                      <FaSearch className="mr-2" />
                      Search by Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 mb-8 border border-red-400/30 bg-red-400/10"
          >
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Usage Stats */}
        {usageStats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 mb-8"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">
                Searches today: {usageStats.dailyUsage.searches}/{usageStats.limits.freeSearchesPerDay}
              </span>
              {!usageStats.isPremium && (
                <span className="text-yellow-400">
                  {usageStats.remainingSearches} searches remaining
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Events Results */}
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Found {events.length} Events
              </h2>
              <button className="glass-button-secondary">
                <FaFilter className="mr-2" />
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="event-card"
                >
                  {event.metadata?.image && (
                    <img
                      src={event.metadata.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-3 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">
                      {event.metadata?.location || 'Location TBD'}
                    </span>
                    <span className="text-white/60">
                      {event.metadata?.type || 'Event'}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-white/40">
                      Relevance: {event.relevance}%
                    </span>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dl-primary-400 hover:text-dl-primary-300 text-sm"
                    >
                      View Details →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {events.length === 0 && !isSearching && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-white/60 text-lg mb-4">
              No events found yet. Try searching with a different location or postal code.
            </div>
            <p className="text-white/40">
              DanceLink searches across multiple platforms including Facebook Events, 
              Eventbrite, and local dance studio websites.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
