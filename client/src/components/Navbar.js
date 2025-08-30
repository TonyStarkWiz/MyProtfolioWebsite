import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaUser, FaCrown } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/events', label: 'Events', icon: '🎉' },
    { path: '/balls', label: 'Balls', icon: '👑' },
    { path: '/classes', label: 'Classes', icon: '📚' },
    { path: '/partners', label: 'Partners', icon: '💃' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-dl-primary-500 to-dl-accent-500 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white font-bold text-lg">D</span>
            </motion.div>
            <span className="text-white font-bold text-xl gradient-text">
              DanceLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link flex items-center space-x-2 ${
                  isActive(item.path) ? 'active' : ''
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <motion.button
              className="text-white/80 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch className="w-5 h-5" />
            </motion.button>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                {user.isPremium && (
                  <FaCrown className="w-4 h-4 text-yellow-400" />
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="hidden sm:block">{user.email}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="glass-button-secondary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile user actions */}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      <FaUser className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    {user.isPremium && (
                      <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-yellow-400/20 text-yellow-400">
                        <FaCrown className="w-5 h-5" />
                        <span>Premium Member</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-4 py-3 rounded-lg glass-button-secondary"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
