import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCrown, FaCog, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Profile & Settings
          </h1>
          <p className="text-xl text-white/70">
            Manage your account and preferences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <div className="text-center">
            <FaUser className="w-16 h-16 text-white/60 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              User Profile
            </h2>
            <p className="text-white/70 mb-6">
              Profile management coming soon
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="glass-button-secondary">
                <FaCog className="mr-2" />
                Settings
              </button>
              <button className="glass-button-secondary">
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
