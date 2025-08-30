import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Main Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import BallsPage from './pages/BallsPage';
import ClassesPage from './pages/ClassesPage';
import PartnersPage from './pages/PartnersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Context and Stores
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { UsageProvider } from './contexts/UsageContext';
import { SearchProvider } from './contexts/SearchContext';

// Services
import { initializeFirebase } from './services/firebase';
import { initializeAnalytics } from './services/analytics';
import { initializeLocationServices } from './services/locationServices';

// Styles
import './index.css';

// Initialize Firebase
initializeFirebase();

// Initialize Analytics
initializeAnalytics();

// Initialize Location Services
initializeLocationServices();

// Create React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Preload critical resources
        await Promise.all([
          // Preload fonts
          document.fonts.ready,
          // Preload critical images
          new Promise(resolve => {
            const img = new Image();
            img.onload = resolve;
            img.src = '/logo.png';
          }),
        ]);

        // Simulate initialization delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsInitialized(true); // Continue anyway
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <UsageProvider>
            <SearchProvider>
              <Router>
                <div className="min-h-screen gradient-bg">
                  <Navbar />
                  
                  <main className="pt-16">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route 
                          path="/" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <HomePage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/events" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <EventsPage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/balls" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <BallsPage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/classes" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ClassesPage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/partners" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <PartnersPage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/profile" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ProfilePage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/login" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <LoginPage />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/register" 
                          element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <RegisterPage />
                            </motion.div>
                          } 
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </AnimatePresence>
                  </main>

                  <Footer />
                </div>
              </Router>
            </SearchProvider>
          </UsageProvider>
        </LocationProvider>
      </AuthProvider>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;