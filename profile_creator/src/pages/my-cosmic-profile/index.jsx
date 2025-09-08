import React, { useState } from 'react';
import CosmicBackground from '../../components/CosmicBackground';
import Navigation from '../../components/ui/Navigation';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';
import OverviewSection from './components/OverviewSection';
import PlanetCard from './components/PlanetCard';
import AspectsHousesSection from './components/AspectsHousesSection';
import PersonalNotesSection from './components/PersonalNotesSection';
import Icon from '../../components/AppIcon';
import { useNavigate } from 'react-router-dom';


const MyCosmicProfile = () => {
  const [autoSync, setAutoSync] = useState(true);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  // Mock astrological data
  const astrologyData = {
    overview: {
      sun: { sign: 'Leo', degree: '21°' },
      moon: { sign: 'Pisces', degree: '03°' },
      rising: { sign: 'Sagittarius', degree: '15°' }
    },
    planets: [
      { name: 'Mercury', sign: 'Virgo', degree: '02°', house: '10', symbol: '☿' },
      { name: 'Venus', sign: 'Cancer', degree: '18°', house: '8', symbol: '♀' },
      { name: 'Mars', sign: 'Aries', degree: '27°', house: '5', symbol: '♂' },
      { name: 'Jupiter', sign: 'Gemini', degree: '11°', house: '7', symbol: '♃' },
      { name: 'Saturn', sign: 'Pisces', degree: '05°', house: '4', symbol: '♄' },
      { name: 'Uranus', sign: 'Capricorn', degree: '13°', house: '2', symbol: '♅' }
    ],
    aspects: [
      'Sun ♃ Jupiter',
      'Moon □ Mars',
      'Venus ♀ Mercury'
    ],
    houses: [
      'Aries 15°',
      'Taurus 11°',
      'Gemini 02°',
      'Cancer 18°'
    ]
  };

  const handleAddNote = (planetName) => {
    // Handle adding notes for specific planets
    console.log(`Adding note for ${planetName}`);
  };

  const handleAddChart = () => {
    // Handle adding new chart
    console.log('Adding new chart');
  };

  const handlePlanetClick = (sign) => {
    // Navigate to cosmic alignments page with hash to specific zodiac sign
    navigate(`/cosmic-alignments-educational-hub#${sign?.toLowerCase()}`);
  };

  const handleGoBackToAlignments = () => {
    navigate('/cosmic-alignments-educational-hub');
  };

  return (
    <>
      <Navigation />
      <CosmicBackground>
        <div className="min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-t-lg p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">My Cosmic Profile</h1>
                  <p className="text-orange-100">Your personal astrological insights</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <span className="text-sm">Auto-sync:</span>
                  <Toggle
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                    className="data-[state=checked]:bg-white/20"
                  />
                  <span className="text-sm font-semibold">
                    {autoSync ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-b-lg shadow-lg">
              {/* Overview Section */}
              <div className="p-6 border-b border-gray-200">
                <OverviewSection overview={astrologyData?.overview} />
              </div>

              {/* Planet Cards */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {astrologyData?.planets?.map((planet, index) => (
                    <PlanetCard
                      key={index}
                      planet={planet}
                      onAddNote={() => handleAddNote(planet?.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Aspects & Houses Section */}
              <div className="p-6 border-b border-gray-200">
                <AspectsHousesSection
                  aspects={astrologyData?.aspects}
                  houses={astrologyData?.houses}
                />
              </div>

              {/* Personal Notes Section */}
              <div className="p-6 border-b border-gray-200">
                <PersonalNotesSection
                  notes={notes}
                  onNotesChange={setNotes}
                />
              </div>

              {/* Add New Chart Button */}
              <div className="p-6">
                <Button
                  onClick={handleAddChart}
                  className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add New Chart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CosmicBackground>
    </>
  );
};

export default MyCosmicProfile;