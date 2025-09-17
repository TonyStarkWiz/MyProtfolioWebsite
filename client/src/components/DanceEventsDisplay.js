import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaGlobe, FaTicketAlt, FaFilter, FaSearch, FaRedo } from 'react-icons/fa';
import { fetchEvents, getEventsByLocation, getUpcomingEvents, getEventsByStyle } from '../services/danceEventsApi';
import { getAllCountries } from '../services/locationServices';
import ApiTest from './ApiTest';

// Add CSS for blob animations
const blobAnimation = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

// Inject the CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = blobAnimation;
  document.head.appendChild(style);
}

const DanceEventsDisplay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    danceStyle: '',
    eventType: '',
    dateRange: 'all',
    zipCode: '',
    country: ''
  });
  
  const [countries] = useState(() => {
    const allCountries = getAllCountries();
    console.log('🧪 Countries loaded:', allCountries.length, 'countries');
    console.log('🧪 First few countries:', allCountries.slice(0, 5));
    console.log('🧪 Sample country object:', allCountries[0]);
    return allCountries;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalEvents: 0,
    filteredEvents: 0,
    lastFetched: null
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🧪 Loading dance events...');
      const data = await fetchEvents();
      
      setEvents(data.events || []);
      setStats({
        totalEvents: data.totalCount || 0,
        filteredEvents: data.totalCount || 0,
        lastFetched: data.fetchedAt || new Date().toISOString()
      });
      
      console.log('🧪 Events loaded successfully:', data.events?.length || 0, 'events');
      
      // Show success alert
      if (typeof window !== 'undefined' && data.events?.length > 0) {
        alert(`🧪 Dance Events Loaded Successfully!\n\nTotal Events: ${data.events.length}\n\nEvents:\n${data.events.slice(0, 3).map(event => `• ${event.title}`).join('\n')}${data.events.length > 3 ? '\n... and more!' : ''}`);
      }
      
    } catch (err) {
      console.error('🧪 Error loading events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      
      if (filters.location) {
        data = await getEventsByLocation(filters.location);
      } else if (filters.danceStyle) {
        data = await getEventsByStyle(filters.danceStyle);
      } else if (filters.eventType) {
        data = await fetchEvents({ eventType: filters.eventType });
      } else if (filters.dateRange !== 'all') {
        const days = filters.dateRange === 'week' ? 7 : 30;
        data = await getUpcomingEvents(days);
      } else {
        data = await fetchEvents();
      }
      
      setEvents(data.events || []);
      setStats({
        totalEvents: data.totalCount || 0,
        filteredEvents: data.totalCount || 0,
        lastFetched: data.fetchedAt || new Date().toISOString()
      });
      
    } catch (err) {
      console.error('🧪 Error applying filters:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      danceStyle: '',
      eventType: '',
      dateRange: 'all',
      zipCode: '',
      country: ''
    });
    setSearchTerm('');
    loadEvents();
  };

  const filteredEvents = events.filter(event => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const title = (event.title || '').toLowerCase();
      const description = (event.description || '').toLowerCase();
      const venue = (event.location?.venue || '').toLowerCase();
      const organizer = (event.organizer || '').toLowerCase();
      
      if (!title.includes(searchLower) && 
          !description.includes(searchLower) && 
          !venue.includes(searchLower) && 
          !organizer.includes(searchLower)) {
        return false;
      }
    }
    
    if (filters.eventType && event.eventType) {
      const eventType = event.eventType.toLowerCase();
      const filterType = filters.eventType.toLowerCase();
      if (!eventType.includes(filterType)) {
        return false;
      }
    }
    
    if (filters.zipCode && event.location?.zipCode) {
      const eventZip = event.location.zipCode.toLowerCase();
      const filterZip = filters.zipCode.toLowerCase();
      if (!eventZip.includes(filterZip)) {
        return false;
      }
    }
    
    if (filters.country && event.location?.countryCode) {
      const eventCountry = event.location.countryCode.toLowerCase();
      const filterCountry = filters.country.toLowerCase();
      if (eventCountry !== filterCountry) {
        return false;
      }
    }
    
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return 'Date TBD';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (!end || start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return `${start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })} - ${end.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Time TBD';
    return timeString;
  };

    const EventCard = ({ event }) => (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
    >
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background Image */}
        {event.image && (
          <div className="absolute inset-0">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}
        
        {/* Glassmorphism Content */}
        <div className="relative p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
          {/* Event Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 drop-shadow-lg">
            {event.title}
          </h3>
          
          {/* Location */}
          {event.location?.venue && (
            <div className="flex items-center text-white/90 mb-3 drop-shadow-md">
              <FaMapMarkerAlt className="w-4 h-4 mr-2 text-blue-300" />
              <span className="line-clamp-1 font-medium">{event.location.venue}</span>
            </div>
          )}
          
          {/* City/State/Country */}
          {event.location?.city && (
            <div className="text-sm text-white/80 ml-6 mb-3 drop-shadow-md">
              {event.location.city}
              {event.location.state && `, ${event.location.state}`}
              {event.location.country && `, ${event.location.country}`}
              {event.location.zipCode && (
                <div className="text-xs text-blue-200 mt-1">
                  📮 {event.location.zipCode} ({event.location.countryCode})
                </div>
              )}
            </div>
          )}
          
          {/* Date */}
          <div className="flex items-center text-white/90 mb-4 drop-shadow-md">
            <FaCalendar className="w-4 h-4 mr-2 text-blue-300" />
            <span className="font-medium">{formatDateRange(event.date, event.endDate)}</span>
          </div>
          
          {/* Dance Styles */}
          {event.danceStyles && event.danceStyles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {event.danceStyles.slice(0, 3).map((style, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm border border-white/30"
                >
                  {style}
                </span>
              ))}
              {event.danceStyles.length > 3 && (
                <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm border border-white/30">
                  +{event.danceStyles.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* I'm Interested Button */}
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20">
              I'm Interested
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">🎭 Dance Events</h1>
        <p className="text-white/80 text-lg">Discover amazing dance events from around the world</p>
      </div>

                   {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl text-white">
          <h3 className="text-lg font-semibold text-white/90">Total Events</h3>
          <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl text-white">
          <h3 className="text-lg font-semibold text-white/90">Filtered Events</h3>
          <p className="text-2xl font-bold text-white">{filteredEvents.length}</p>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl text-white">
          <h3 className="text-lg font-semibold text-white/90">Last Updated</h3>
          <p className="text-sm text-white/80">
            {stats.lastFetched ? new Date(stats.lastFetched).toLocaleString() : 'Never'}
          </p>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl text-white">
          <h3 className="text-lg font-semibold text-white/90">Geocoded Events</h3>
          <p className="text-2xl font-bold text-white">
            {events.filter(event => event.location?.zipCode).length}
          </p>
          <p className="text-xs text-white/80">
            of {events.length} total events
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FaFilter className="w-5 h-5 mr-2 text-blue-300" />
          Filters & Search
        </h2>
        
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter city or venue"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
            />
          </div>
          
                    <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Dance Style</label>
            <input
              type="text"
              placeholder="e.g., Salsa, Tango"
              value={filters.danceStyle}
              onChange={(e) => handleFilterChange('danceStyle', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Event Type</label>
            <select
              value={filters.eventType}
              onChange={(e) => handleFilterChange('eventType', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
            >
              <option value="">All Types</option>
              <option value="festival">Festival</option>
              <option value="party">Party</option>
              <option value="weekender">Weekender</option>
              <option value="workshop">Workshop</option>
              <option value="social">Social</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
            >
              <option value="all">All Events</option>
              <option value="week">Next 7 Days</option>
              <option value="month">Next 30 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Zip Code</label>
            <input
              type="text"
              placeholder="Enter zip code"
              value={filters.zipCode}
              onChange={(e) => handleFilterChange('zipCode', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Country ({countries.length})</label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
              style={{ color: 'white' }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>All Countries</option>
              {countries.map(country => (
                <option 
                  key={country.code} 
                  value={country.code}
                  style={{ color: 'black', backgroundColor: 'white' }}
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
                <div className="flex gap-4">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20 transform hover:scale-105"
          >
            <FaSearch className="w-4 h-4 mr-2" />
            {loading ? 'Searching...' : 'Apply Filters'}
          </button>
          
          <button
            onClick={clearFilters}
            className="flex items-center px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 transform hover:scale-105"
          >
            Clear Filters
          </button>
          
          <button
            onClick={loadEvents}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full hover:from-green-600 hover:to-teal-700 disabled:bg-gray-400 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20 transform hover:scale-105"
          >
            <FaRedo className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events by title, description, venue, or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="backdrop-blur-md bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6">
          <h3 className="text-red-200 font-semibold">Error Loading Events</h3>
          <p className="text-red-100">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Events Grid */}
      {!loading && (
        <div>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white/80 mb-2">No events found</h3>
              <p className="text-white/60">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id || index} event={event} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}



      {/* API Test Component */}
      <div className="mt-8">
        <ApiTest />
      </div>

      {/* Raw Data Display */}
      {events.length > 0 && (
        <div className="mt-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Raw API Data</h2>
          <div className="bg-white/20 rounded-lg p-4 overflow-auto max-h-96 backdrop-blur-sm">
            <pre className="text-sm text-white">
              {JSON.stringify(events, null, 2)}
            </pre>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DanceEventsDisplay;
