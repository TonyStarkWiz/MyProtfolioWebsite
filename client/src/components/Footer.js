import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/TonyStarkWiz',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/anthony-espinoza-engineer/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/anthonyespinosa8/',
      color: 'hover:text-pink-400'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/EarthsTonyStark',
      color: 'hover:text-blue-400'
    }
  ];

  const footerLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Balls', path: '/balls' },
    { name: 'Classes', path: '/classes' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
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
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              The ultimate platform for dance event discovery and partner matching. 
              Find dance events, classes, formal balls, and connect with dance partners 
              in your area. Built with AI-powered search and real-time matching.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/60 ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-white/60">
              <p>Founder & Lead Software Engineer</p>
              <p>Anthony Espinoza</p>
              <p>DanceLink Platform</p>
              <p className="text-white/40 text-xs mt-4">
                Available on Android, iOS & Web
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} DanceLink. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-white/60 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="w-4 h-4 text-red-400" />
            </motion.div>
            <span>by Anthony Espinoza</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
