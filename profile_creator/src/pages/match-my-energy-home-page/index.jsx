import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MatchMyEnergyHomePage = () => {
  const navigate = useNavigate();
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const handleGetStarted = () => {
    navigate('/age-verification-gate');
  };

  const handleLogin = () => {
    navigate('/login-page-for-existing-members');
  };

  const handleLearnMore = () => {
    // Scroll to features section
    document?.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Sarah & Mark",
      story: "We found each other through our Leo-Aquarius connection. The cosmic compatibility was undeniable!",
      stars: "Leo ♌ + Aquarius ♒"
    },
    {
      name: "Jessica & Ryan", 
      story: "Both Virgos, we connected over our shared perfectionist tendencies and love for details.",
      stars: "Virgo ♍ + Virgo ♍"
    },
    {
      name: "Maya & David",
      story: "Fire and water - Aries and Cancer shouldn't work, but our charts showed perfect harmony.",
      stars: "Aries ♈ + Cancer ♋"
    }
  ];

  const features = [
    {
      icon: "Star",
      title: "Astrological Matching",
      description: "Connect with people whose cosmic energy aligns with yours through detailed birth chart analysis."
    },
    {
      icon: "Heart",
      title: "Energy Compatibility",
      description: "Go beyond surface level - find matches based on planetary positions and zodiac harmony."
    },
    {
      icon: "Zap",
      title: "Cosmic Insights",
      description: "Get personalized compatibility readings and discover the celestial reasons behind your connections."
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Cosmic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        {/* Stars and cosmic elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating star particles */}
          {[...Array(20)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white opacity-60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2
              }}
            >
              <Icon name="Star" size={Math.random() * 8 + 8} />
            </motion.div>
          ))}

          {/* Lightning bolt accents */}
          <motion.div
            className="absolute top-20 left-20 text-orange-400 opacity-40"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Icon name="Zap" size={32} />
          </motion.div>

          <motion.div
            className="absolute top-40 right-32 text-pink-400 opacity-30"
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            <Icon name="Zap" size={24} />
          </motion.div>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          <Icon name="Zap" size={32} className="text-orange-400" />
          <h1 className="text-2xl font-bold text-white">Match My Energy</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center space-x-4"
        >
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 transition-smooth"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-900 transition-smooth"
            onClick={handleLogin}
          >
            Login
          </Button>
        </motion.div>

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
          <div className="flex items-center justify-center mb-8">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="mr-4"
            >
              <Icon name="Zap" size={40} className="text-orange-400" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Match My Energy
            </h1>
            
            <motion.div
              animate={{
                rotate: [0, -15, 15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
              className="ml-4"
            >
              <Icon name="Zap" size={40} className="text-pink-400" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-white mb-4 leading-relaxed"
          >
            Find connections where the stars align
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Go beyond the surface level. Discover meaningful relationships through cosmic compatibility and astrological harmony.
          </motion.p>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              onClick={handleGetStarted}
              size="xl"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 shadow-2xl font-bold px-16 py-5 text-xl rounded-full"
            >
              <Icon name="Heart" size={24} className="mr-3" />
              Get Started
            </Button>
            
            <Button
              onClick={handleLearnMore}
              variant="outline"
              size="xl"
              className="border-2 border-white/50 text-white hover:bg-white hover:text-purple-900 transition-all duration-300 px-8 py-5 text-lg rounded-full"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Floating cosmic elements around buttons */}
          <div className="relative mt-8">
            <motion.div
              className="absolute -top-12 -left-16 text-yellow-400 opacity-70"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Icon name="Star" size={20} />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-8 -right-12 text-blue-400 opacity-60"
              animate={{
                y: [0, 15, 0],
                scale: [1, 1.4, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
            >
              <Icon name="Sparkles" size={18} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Features Section */}
      <section id="features-section" className="relative z-10 py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Cosmic Connections?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience dating guided by the wisdom of the stars and the power of cosmic energy alignment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features?.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-6 mx-auto">
                  <Icon name={feature?.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  {feature?.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6 lg:px-12 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cosmic Success Stories
            </h2>
            <p className="text-xl text-gray-300">
              Real connections written in the stars
            </p>
          </motion.div>

          <div className="space-y-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Icon name="Heart" size={20} className="text-pink-400" />
                    <span className="text-orange-400 font-semibold text-lg">
                      {testimonial?.stars}
                    </span>
                    <Icon name="Heart" size={20} className="text-pink-400" />
                  </div>
                  <p className="text-white text-lg mb-4 italic">
                    "{testimonial?.story}"
                  </p>
                  <p className="text-gray-300 font-semibold">
                    - {testimonial?.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Your Cosmic Connection Awaits
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands who have found meaningful relationships through the power of astrological compatibility. Your perfect match might be written in the stars.
            </p>
            <Button
              onClick={handleGetStarted}
              size="xl"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 shadow-2xl font-bold px-16 py-5 text-xl rounded-full"
            >
              <Icon name="Sparkles" size={24} className="mr-3" />
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Mobile Navigation Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md p-4 z-20">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 transition-smooth"
            onClick={handleLearnMore}
          >
            Learn More
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
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-smooth"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchMyEnergyHomePage;