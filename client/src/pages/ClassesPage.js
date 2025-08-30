import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaSearch, FaLocationArrow, FaGlobe } from 'react-icons/fa';

const ClassesPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dance Classes & Workshops
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Find dance instruction, workshops, and training sessions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <div className="text-center">
            <FaGraduationCap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Find Dance Classes
            </h2>
            <p className="text-white/70 mb-6">
              Search for dance classes, workshops, and training sessions in your area
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="glass-button">
                <FaLocationArrow className="mr-2" />
                Use My Location
              </button>
              <button className="glass-button-secondary">
                <FaGlobe className="mr-2" />
                Search by Postal Code
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12"
        >
          <div className="text-white/60 text-lg mb-4">
            Dance Class Search Coming Soon
          </div>
          <p className="text-white/40">
            We're working on specialized search for dance classes and workshops. 
            This will include filtering by dance style, skill level, and instructor ratings.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassesPage;
