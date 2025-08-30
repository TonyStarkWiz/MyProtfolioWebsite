import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const RegisterPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-4">
            Join DanceLink
          </h1>
          <p className="text-white/70">
            Create your account to start discovering dance events
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <form className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  className="form-input pl-10"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="email"
                  className="form-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="password"
                  className="form-input pl-10"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="glass-button w-full"
            >
              <FaUserPlus className="mr-2" />
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-dl-primary-400 hover:text-dl-primary-300">
                Sign in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
