import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query, location, screenType) => {
    setIsSearching(true);
    try {
      // Search logic will be implemented here
      console.log('🧪 Performing search:', query, location, screenType);
    } catch (error) {
      console.error('🧪 Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const value = {
    searchResults,
    searchQuery,
    isSearching,
    performSearch,
    clearResults,
    setSearchQuery
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
