import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CosmicBackground from '../../components/CosmicBackground';
import Button from '../../components/ui/Button';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Icon from '../../components/AppIcon';
import RelationshipPreferencesSection from './components/RelationshipPreferencesSection';
import LifestyleCompatibilitySection from './components/LifestyleCompatibilitySection';
import FamilyPlanningSection from './components/FamilyPlanningSection';
import SocialHabitsSection from './components/SocialHabitsSection';
import AstrologicalInterestsSection from './components/AstrologicalInterestsSection';

const DatingPreferencesQuestionnaire = () => {
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    // Relationship Preferences
    relationshipType: '',
    ageRange: [18, 65],
    distance: 50,
    dealBreakers: [],
    
    // Lifestyle Compatibility
    incomeRange: '',
    careerImportance: 5,
    livingArrangement: '',
    lifeStage: '',
    
    // Family Planning
    wantsChildren: '',
    hasChildren: '',
    childrenTimeline: '',
    petOwnership: '',
    
    // Social Habits
    nightlifeFrequency: '',
    travelEnthusiasm: 5,
    socialCircleSize: '',
    weekendPreference: '',
    
    // Astrological Interests
    astrologyBelief: 5,
    chartReadingExperience: '',
    cosmicEventAwareness: [],
    compatibilityImportance: 5
  });

  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');

  const sections = [
    {
      title: 'Relationship Preferences',
      description: 'What are you looking for in a relationship?',
      component: RelationshipPreferencesSection,
      icon: 'Heart'
    },
    {
      title: 'Lifestyle Compatibility',
      description: 'Tell us about your lifestyle and priorities',
      component: LifestyleCompatibilitySection,
      icon: 'Home'
    },
    {
      title: 'Family Planning',
      description: 'Share your thoughts on family and future',
      component: FamilyPlanningSection,
      icon: 'Users'
    },
    {
      title: 'Social Habits',
      description: 'How do you like to spend your time?',
      component: SocialHabitsSection,
      icon: 'Coffee'
    },
    {
      title: 'Astrological Interests',
      description: 'Your connection to the cosmic realm',
      component: AstrologicalInterestsSection,
      icon: 'Star'
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoSaveStatus === 'idle') {
        setAutoSaveStatus('saving');
        localStorage?.setItem('dating-preferences', JSON.stringify(formData));
        setTimeout(() => {
          setAutoSaveStatus('saved');
          setTimeout(() => setAutoSaveStatus('idle'), 2000);
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, autoSaveStatus]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage?.getItem('dating-preferences');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved preferences:', error);
      }
    }
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setAutoSaveStatus('idle');
  };

  const calculateProgress = () => {
    return Math.round(((currentSection + 1) / sections?.length) * 100);
  };

  const handleNext = () => {
    if (currentSection < sections?.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    // Save final preferences
    localStorage?.setItem('dating-preferences', JSON.stringify(formData));
    // Navigate to cosmic profile completion
    navigate('/my-cosmic-profile');
  };

  const handleCompleteLater = () => {
    // Save current progress
    localStorage?.setItem('dating-preferences', JSON.stringify(formData));
    // Navigate to profile with partial completion
    navigate('/my-cosmic-profile');
  };

  const CurrentSectionComponent = sections?.[currentSection]?.component;

  return (
    <CosmicBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Dating Preferences
            </h1>
            <p className="text-lg text-gray-200 opacity-90 mb-6">
              Help us find your perfect cosmic match
            </p>
            
            {/* Progress Indicator */}
            <div className="max-w-md mx-auto mb-8">
              <ProgressIndicator 
                progress={calculateProgress()}
                className="mb-2"
              />
              <p className="text-sm text-gray-300">
                Section {currentSection + 1} of {sections?.length} • {calculateProgress()}% Complete
              </p>
            </div>
          </motion.div>

          {/* Section Navigation Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {sections?.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${index === currentSection
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                    : index < currentSection
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                  }
                `}
              >
                <Icon 
                  name={index < currentSection ? 'Check' : section?.icon} 
                  size={16} 
                />
                <span className="hidden md:inline">{section?.title}</span>
              </button>
            ))}
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl"
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
                <Icon name={sections?.[currentSection]?.icon} size={28} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {sections?.[currentSection]?.title}
              </h2>
              <p className="text-gray-300 text-lg">
                {sections?.[currentSection]?.description}
              </p>
            </div>

            {/* Section Content */}
            <div className="mb-8">
              {CurrentSectionComponent && (
                <CurrentSectionComponent
                  formData={formData}
                  onChange={handleFieldChange}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  variant="outline"
                  className="flex items-center space-x-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="ChevronLeft" size={16} />
                  <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-4">
                  {/* Auto-save indicator */}
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    {autoSaveStatus === 'saving' && (
                      <>
                        <Icon name="Loader2" size={14} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    )}
                    {autoSaveStatus === 'saved' && (
                      <>
                        <Icon name="Check" size={14} className="text-green-400" />
                        <span className="text-green-400">Saved</span>
                      </>
                    )}
                  </div>

                  {currentSection === sections?.length - 1 ? (
                    <Button
                      onClick={handleComplete}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Icon name="Sparkles" size={16} className="mr-2" />
                      Complete
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  )}
                </div>
              </div>

              {/* Complete Later Option */}
              <div className="text-center">
                <button
                  onClick={handleCompleteLater}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm underline"
                >
                  Complete this later - Continue to profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* Constellation Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center items-center space-x-4 my-12"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
                className="text-purple-400"
              >
                <Icon name="Star" size={8} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default DatingPreferencesQuestionnaire;