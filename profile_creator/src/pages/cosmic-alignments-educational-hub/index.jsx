import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CosmicBackground from '../../components/CosmicBackground';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PlanetaryCards from './components/PlanetaryCards';
import AspectsSection from './components/AspectsSection';
import DegreesSection from './components/DegreesSection';
import ZodiacSignsSection from './components/ZodiacSignsSection';

const CosmicAlignmentsEducationalHub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGenerateChart = () => {
    navigate('/profile-creation-form');
  };

  const handleGoBackToChart = () => {
    navigate('/my-cosmic-profile');
  };

  // Handle hash navigation to specific zodiac signs
  useEffect(() => {
    if (location?.hash) {
      const targetElement = document.getElementById(location?.hash?.substring(1));
      if (targetElement) {
        targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location?.hash]);

  return (
    <CosmicBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Button
                onClick={handleGoBackToChart}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 py-2 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>My Cosmic Chart</span>
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-sm">
              Cosmic Alignments
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Understand the significance of planetary roles and positions in your birth chart
            </p>
          </div>

          {/* Zodiac Signs Educational Section */}
          <div className="mb-16">
            <ZodiacSignsSection />
          </div>

          {/* Planetary Cards Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Planetary Energies & Roles
            </h2>
            <PlanetaryCards />
          </div>

          {/* Aspects Section */}
          <div className="mb-16">
            <AspectsSection />
          </div>

          {/* Degrees Section */}
          <div className="mb-16">
            <DegreesSection />
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              onClick={handleGenerateChart}
              className="cosmic-button-primary text-white font-semibold py-4 px-12 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              size="xl"
            >
              Generate My Chart
            </Button>
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default CosmicAlignmentsEducationalHub;