import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MatchMyEnergyLandingPage = () => {
  const navigate = useNavigate();
  const [selectedSign, setSelectedSign] = useState(null);

  const handleGetStarted = () => {
    navigate('/age-verification-gate');
  };

  const handleLogin = () => {
    // This would typically navigate to login page or modal
    console.log('Login clicked');
  };

  const handleCreateProfile = () => {
    navigate('/age-verification-gate');
  };

  const zodiacSigns = [
    {
      name: 'Aries',
      dates: 'March 21 - April 19',
      description: 'Dynamic and energetic, Aries leads with courage and enthusiasm. Natural born leaders who thrive on challenges and new adventures.'
    },
    {
      name: 'Taurus',
      dates: 'April 20 - May 20',
      description: 'Grounded and reliable, Taurus values stability and beauty. They appreciate life\'s pleasures and build lasting foundations.'
    },
    {
      name: 'Gemini',
      dates: 'May 21 - June 20',
      description: 'Curious and adaptable, Gemini thrives on communication and variety. Quick-witted and social, they love learning and sharing ideas.'
    },
    {
      name: 'Cancer',
      dates: 'June 21 - July 22',
      description: 'Intuitive and nurturing, Cancer values home and family above all. They possess deep emotional intelligence and protective instincts.'
    },
    {
      name: 'Leo',
      dates: 'July 23 - August 22',
      description: 'Confident and charismatic, Leo shines with natural magnetism. They inspire others with their warmth and creative expression.'
    },
    {
      name: 'Virgo',
      dates: 'August 23 - September 22',
      description: 'Analytical and helpful, Virgo seeks perfection through service. They excel at organization and have keen attention to detail.'
    },
    {
      name: 'Libra',
      dates: 'September 23 - October 22',
      description: 'Harmonious and diplomatic, Libra seeks balance in all things. They value relationships, beauty, and fair partnerships.'
    },
    {
      name: 'Scorpio',
      dates: 'October 23 - November 21',
      description: 'Intense and transformative, Scorpio explores life\'s mysteries. They possess powerful intuition and emotional depth.'
    },
    {
      name: 'Sagittarius',
      dates: 'November 22 - December 21',
      description: 'Adventurous and philosophical, Sagittarius seeks wisdom through exploration. They inspire others with their optimism and freedom.'
    },
    {
      name: 'Capricorn',
      dates: 'December 22 - January 19',
      description: 'Ambitious and disciplined, Capricorn builds toward long-term success. They value tradition, responsibility, and achievement.'
    },
    {
      name: 'Aquarius',
      dates: 'January 20 - February 18',
      description: 'Innovative and humanitarian, Aquarius envisions a better future. They champion causes and think outside conventional boundaries.'
    },
    {
      name: 'Pisces',
      dates: 'February 19 - March 20',
      description: 'Compassionate and artistic, Pisces feels deeply and dreams big. They possess natural empathy and creative imagination.'
    }
  ];

  const handleViewSign = (sign) => {
    setSelectedSign(selectedSign?.name === sign?.name ? null : sign);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
      }}
    >
      {/* Floating particles and sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Lightning bolts decoration */}
        <motion.div
          className="absolute top-20 left-20 text-white opacity-60"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Icon name="Zap" size={24} />
        </motion.div>

        <motion.div
          className="absolute top-40 right-32 text-white opacity-40"
          animate={{
            rotate: [0, -5, 5, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        >
          <Icon name="Zap" size={16} />
        </motion.div>

        {/* Star and sparkle elements */}
        <motion.div
          className="absolute top-32 left-1/3 text-white opacity-70"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Icon name="Star" size={20} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-16 text-white opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            y: [-5, 5, -5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        >
          <Icon name="Sparkles" size={18} />
        </motion.div>

        <motion.div
          className="absolute top-60 right-20 text-white opacity-60"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Icon name="Sparkles" size={14} />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-1/4 text-white opacity-50"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, -180, -270, -360]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
        >
          <Icon name="Star" size={16} />
        </motion.div>
      </div>
      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2"
        >
          <Icon name="Zap" size={28} className="text-white" />
          <h1 className="text-2xl font-bold text-white">Match My Energy</h1>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center space-x-4"
        >
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 transition-smooth"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-600 transition-smooth"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            className="bg-white text-orange-600 hover:bg-white/90 transition-smooth font-semibold"
            onClick={handleCreateProfile}
          >
            Create Profile
          </Button>
        </motion.div>

        {/* Mobile menu button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Icon name="Menu" size={24} />
          </Button>
        </motion.div>
      </nav>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-12 min-h-[calc(100vh-120px)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Heading with Lightning Icons */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="mr-4"
            >
              <Icon name="Zap" size={36} className="text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-sm">
              Match My Energy
            </h1>
            
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
              className="ml-4"
            >
              <Icon name="Zap" size={36} className="text-white" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white mb-12 leading-relaxed"
          >
            Find connections where the stars align
          </motion.p>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={handleGetStarted}
              size="xl"
              className="bg-white text-orange-600 hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl font-bold px-12 py-4 text-lg"
              iconName="Heart"
              iconPosition="left"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Additional floating elements around the button */}
          <div className="relative">
            <motion.div
              className="absolute -top-8 -left-8 text-white opacity-60"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Icon name="Star" size={12} />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -right-6 text-white opacity-60"
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.3, 1],
                rotate: [0, 45, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            >
              <Icon name="Sparkles" size={14} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Mobile Navigation Menu (if needed) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 transition-smooth"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 transition-smooth"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            size="sm"
            className="bg-white text-orange-600 hover:bg-white/90 transition-smooth"
            onClick={handleCreateProfile}
          >
            Create Profile
          </Button>
        </div>
      </div>
      {/* Discover Your Sign Section */}
      <section className="min-h-screen py-16 px-6 lg:px-12"
        style={{
          background: 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #8E24AA 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Sign
            </h2>
            <div className="flex justify-center space-x-4 mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Icon name="Star" size={24} className="text-white opacity-70" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              >
                <Icon name="Sparkles" size={20} className="text-white opacity-70" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              >
                <Icon name="Star" size={24} className="text-white opacity-70" />
              </motion.div>
            </div>
          </motion.div>

          {/* Zodiac Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {zodiacSigns?.map((sign, index) => (
              <motion.div
                key={sign?.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Placeholder */}
                <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Star" size={32} className="text-purple-600 mb-2 mx-auto" />
                    <span className="text-sm text-purple-600 font-medium">
                      {sign?.name} Artwork
                    </span>
                  </div>
                </div>

                {/* Sign Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {sign?.name}
                </h3>

                {/* Date Range */}
                <p className="text-gray-600 text-sm mb-4">
                  {sign?.dates}
                </p>

                {/* View Button */}
                <Button
                  onClick={() => handleViewSign(sign)}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                >
                  View
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Selected Sign Description */}
          {selectedSign && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedSign?.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selectedSign?.dates}
                  </p>
                </div>
                <Button
                  onClick={() => setSelectedSign(null)}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <p className="text-white/90 leading-relaxed">
                {selectedSign?.description}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MatchMyEnergyLandingPage;