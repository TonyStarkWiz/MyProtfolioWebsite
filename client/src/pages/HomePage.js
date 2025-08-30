import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaUsers, FaCrown, FaMobile, FaGlobe, FaRocket } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: FaSearch,
      title: 'AI-Powered Search',
      description: 'Discover dance events with intelligent search across multiple platforms',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location Services',
      description: 'GPS and postal code support for 80+ countries worldwide',
      color: 'from-green-500 to-blue-600'
    },
    {
      icon: FaUsers,
      title: 'Partner Matching',
      description: 'Find dance partners with bilateral matching algorithms',
      color: 'from-pink-500 to-red-600'
    },
    {
      icon: FaCrown,
      title: 'Premium Features',
      description: 'Unlimited searches, advanced filters, and priority matching',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: FaMobile,
      title: 'Cross-Platform',
      description: 'Available on Android, iOS, and Web with seamless sync',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Supporting 5 continents with multi-currency and timezone handling',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const stats = [
    { number: '50%', label: 'Conversion Improvement' },
    { number: '65%', label: 'Cost Reduction' },
    { number: '40%', label: 'Faster Matching' },
    { number: '80+', label: 'Countries Supported' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading DanceLink..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-bg"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Discover Dance
              <span className="block gradient-text">Like Never Before</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              AI-powered dance event discovery and partner matching platform. 
              Find events, classes, formal balls, and connect with dance partners worldwide.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for dance events, classes, or partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-dl-primary-500 focus:border-transparent"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300">
                  <FaSearch className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/events"
                className="glass-button text-lg px-8 py-4"
              >
                <FaRocket className="inline mr-2" />
                Explore Events
              </Link>
              <Link
                to="/register"
                className="glass-button-secondary text-lg px-8 py-4"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Built with cutting-edge AI, real-time location services, and intelligent matching algorithms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-white/70">
              Real metrics from DanceLink's success across platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Dancing?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of dancers discovering events and finding partners worldwide
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="glass-button text-lg px-8 py-4"
              >
                Start Free Trial
              </Link>
              <Link
                to="/events"
                className="glass-button-secondary text-lg px-8 py-4"
              >
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
