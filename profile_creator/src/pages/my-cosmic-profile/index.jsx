import React, { useState, useEffect } from 'react';
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

  const handleAddNote = (planetName, note) => {
    console.log(`Adding note for ${planetName}:`, note);
  };

  const handleAddChart = () => {
    console.log('Adding new chart');
  };

  const handleViewProfileCard = () => {
    navigate('/dating-profile-card-viewer');
  };

  return (
    <>
      <Navigation />
      <CosmicBackground>
        <div className="min-h-screen py-8 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Professional Header */}
            <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 rounded-2xl p-8 text-white mb-8 shadow-2xl relative overflow-hidden border border-slate-700">              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-6 lg:mb-0">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-white">
                      My Cosmic Profile
                    </h1>
                    <p className="text-lg text-slate-300 font-light">
                      Your personal astrological insights and analysis
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Button
                      onClick={handleViewProfileCard}
                      className="bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 hover:border-slate-500 font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                    >
                      <Icon name="Eye" size={18} className="mr-2" />
                      Preview Profile
                    </Button>
                    <div className="flex items-center space-x-3 bg-slate-700/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-600/50">
                      <Icon name="Zap" size={16} className="text-slate-300" />
                      <span className="text-sm font-medium text-slate-300">Auto-sync:</span>
                      <Toggle
                        checked={autoSync}
                        onCheckedChange={setAutoSync}
                        className="data-[state=checked]:bg-slate-600"
                      />
                      <span className={`text-sm font-bold ${autoSync ? 'text-slate-200' : 'text-slate-400'}`}>
                        {autoSync ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Professional */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Overview Section */}
              <div className="p-8 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
                <OverviewSection overview={astrologyData?.overview} />
              </div>

              {/* Planet Cards Grid */}
              <div className="p-8 bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                    <Icon name="Globe" size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Planetary Positions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {astrologyData?.planets?.map((planet, index) => (
                    <div
                      key={index}
                      className="transform hover:scale-105 transition-all duration-300"
                    >
                      <PlanetCard
                        planet={planet}
                        onAddNote={handleAddNote}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Aspects & Houses Section */}
              <div className="p-8 bg-slate-50/50 backdrop-blur-sm border-b border-slate-200">
                <AspectsHousesSection
                  aspects={astrologyData?.aspects}
                  houses={astrologyData?.houses}
                />
              </div>

              {/* Personal Notes Section */}
              <div className="p-8 bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <PersonalNotesSection
                  notes={notes}
                  onNotesChange={setNotes}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-8 bg-slate-50/30 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                  <Button
                    onClick={handleAddChart}
                    className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    <Icon name="Plus" size={18} className="mr-3" />
                    Create New Chart
                  </Button>
                  <Button
                    onClick={handleViewProfileCard}
                    className="flex-1 sm:flex-none bg-slate-600 hover:bg-slate-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    <Icon name="Eye" size={18} className="mr-3" />
                    View Profile Card
                  </Button>
                </div>
                <div className="text-center mt-6">
                  <p className="text-sm text-slate-500 italic">
                    Your cosmic journey continues to evolve with each celestial movement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CosmicBackground>
    </>
  );
};

export default MyCosmicProfile;