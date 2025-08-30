import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Implement login logic
    console.log('🧪 Login attempt:', email);
  };

  const register = async (name, email, password) => {
    // Implement register logic
    console.log('🧪 Register attempt:', email);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
