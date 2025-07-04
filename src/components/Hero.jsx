import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Hero Section Component
 * Displays the main hero section with title, subtitle, CTA, and search functionality
 * Supports dynamic content from the API and various animation effects
 */
const Hero = ({ 
  heroData, 
  isLoading = false, 
  error = null, 
  onSearch = null 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Default hero data for loading state
  const defaultHero = {
    title: 'Enhancing Mathematics and Science Education in Secondary Schools in Tanzania',
    subtitle: 'A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children\'s Fund (UNICEF)',
    background_image: '',
    background_gradient: 'from-[#0066CC] to-[#FD9148]',
    cta_text: 'Learn More',
    cta_link: '/about',
    search_placeholder: 'Search for programs...',
    search_enabled: true,
    animations: {
      floating_elements: true,
      gradient_overlay: true
    }
  };

  const hero = heroData || defaultHero;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Error Loading Hero Section</h1>
          <p className="text-xl opacity-90">{error.message || 'Unable to load hero content'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        {hero.background_image && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${hero.background_image})`
            }}
          />
        )}
        
        {/* Gradient Overlay */}
        {hero.animations?.gradient_overlay && (
          <div className={`absolute inset-0 bg-gradient-to-br ${hero.background_gradient} opacity-90`} />
        )}
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Floating Elements */}
      {hero.animations?.floating_elements && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            variants={floatingVariants}
            animate="floating"
            className="absolute top-1/4 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full blur-sm"
          />
          <motion.div
            variants={floatingVariants}
            animate="floating"
            className="absolute top-1/3 right-1/3 w-8 h-8 bg-white bg-opacity-15 rounded-full blur-sm"
            style={{ animationDelay: '1s' }}
          />
          <motion.div
            variants={floatingVariants}
            animate="floating"
            className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-white bg-opacity-10 rounded-full blur-sm"
            style={{ animationDelay: '2s' }}
          />
        </div>
      )}

      {/* Content Layer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${
            isLoading ? 'animate-pulse bg-white bg-opacity-20 rounded-lg' : ''
          }`}
        >
          {isLoading ? 'Loading...' : hero.title}
        </motion.h1>

        {/* Subtitle */}
        {hero.subtitle && (
          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl lg:text-3xl text-white text-opacity-90 mb-12 font-light leading-relaxed ${
              isLoading ? 'animate-pulse bg-white bg-opacity-20 rounded-lg' : ''
            }`}
          >
            {isLoading ? 'Loading subtitle...' : hero.subtitle}
          </motion.p>
        )}

        {/* Search Bar */}
        {hero.search_enabled && (
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={hero.search_placeholder}
                  disabled={isLoading}
                  className="w-full px-6 py-4 text-lg rounded-full border-2 border-white border-opacity-30 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-md"
                />
                <button
                  type="submit"
                  disabled={isLoading || !searchQuery.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* CTA Button */}
        {hero.cta_text && hero.cta_link && (
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <a
              href={hero.cta_link}
              className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-blue-600 hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              {isLoading ? 'Loading...' : hero.cta_text}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        )}

        {/* Scroll Down Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
