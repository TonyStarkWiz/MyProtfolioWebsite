import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaSearch, FaHeart } from 'react-icons/fa';

const PartnersPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Dance Partners
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect with dance partners using intelligent matching algorithms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <div className="text-center">
            <FaUsers className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Partner Matching
            </h2>
            <p className="text-white/70 mb-6">
              Find compatible dance partners based on skill level, dance styles, and availability
            </p>
            
            <button className="glass-button">
              <FaHeart className="mr-2" />
              Start Matching
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12"
        >
          <div className="text-white/60 text-lg mb-4">
            Partner Matching Coming Soon
          </div>
          <p className="text-white/40">
            We're working on intelligent partner matching with bilateral algorithms. 
            This will include compatibility scoring, real-time notifications, and chat features.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersPage;
