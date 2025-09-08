import React, { useState, useEffect } from 'react';

import CosmicBackground from '../../components/CosmicBackground';
import Navigation from '../../components/ui/Navigation';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import ProfileCard from './components/ProfileCard';
import FilterPanel from './components/FilterPanel';

const DiscoverPageForFindingMatches = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filters, setFilters] = useState({
    ageRange: [22, 35],
    distance: 50,
    zodiacSigns: [],
    compatibility: 70
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  // Mock profile data
  const mockProfiles = [
    {
      id: 1,
      name: 'Luna',
      age: 28,
      distance: 12,
      bio: 'Seeking cosmic connections and meaningful conversations under the stars',
      sun: 'Leo',
      moon: 'Pisces',
      rising: 'Sagittarius',
      compatibility: 89,
      image: '/api/placeholder/300/400',
      interests: ['Astrology', 'Meditation', 'Yoga']
    },
    {
      id: 2,
      name: 'Orion',
      age: 32,
      distance: 8,
      bio: 'Explorer of both inner and outer worlds, always ready for adventure',
      sun: 'Gemini',
      moon: 'Aquarius',
      rising: 'Aries',
      compatibility: 92,
      image: '/api/placeholder/300/400',
      interests: ['Travel', 'Philosophy', 'Music']
    },
    {
      id: 3,
      name: 'Stella',
      age: 26,
      distance: 15,
      bio: 'Art lover with a passion for celestial mysteries and deep conversations',
      sun: 'Scorpio',
      moon: 'Cancer',
      rising: 'Virgo',
      compatibility: 76,
      image: '/api/placeholder/300/400',
      interests: ['Art', 'Reading', 'Spirituality']
    },
    {
      id: 4,
      name: 'Atlas',
      age: 30,
      distance: 22,
      bio: 'Fitness enthusiast who believes in the power of positive energy',
      sun: 'Taurus',
      moon: 'Leo',
      rising: 'Capricorn',
      compatibility: 83,
      image: '/api/placeholder/300/400',
      interests: ['Fitness', 'Cooking', 'Nature']
    },
    {
      id: 5,
      name: 'Nova',
      age: 25,
      distance: 18,
      bio: 'Creative soul seeking someone who appreciates life\'s beautiful mysteries',
      sun: 'Libra',
      moon: 'Gemini',
      rising: 'Pisces',
      compatibility: 87,
      image: '/api/placeholder/300/400',
      interests: ['Photography', 'Dance', 'Astrology']
    },
    {
      id: 6,
      name: 'Phoenix',
      age: 29,
      distance: 25,
      bio: 'Spiritual seeker passionate about personal growth and authentic connections',
      sun: 'Sagittarius',
      moon: 'Scorpio',
      rising: 'Gemini',
      compatibility: 79,
      image: '/api/placeholder/300/400',
      interests: ['Meditation', 'Hiking', 'Psychology']
    }
  ];

  useEffect(() => {
    // Simulate loading profiles
    const loadProfiles = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProfiles(mockProfiles);
      setFilteredProfiles(mockProfiles);
      setLoading(false);
    };

    loadProfiles();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = profiles?.filter(profile => {
      const ageInRange = profile?.age >= filters?.ageRange?.[0] && profile?.age <= filters?.ageRange?.[1];
      const distanceInRange = profile?.distance <= filters?.distance;
      const compatibilityMatch = profile?.compatibility >= filters?.compatibility;
      const zodiacMatch = filters?.zodiacSigns?.length === 0 || 
        filters?.zodiacSigns?.includes(profile?.sun) ||
        filters?.zodiacSigns?.includes(profile?.moon) ||
        filters?.zodiacSigns?.includes(profile?.rising);

      return ageInRange && distanceInRange && compatibilityMatch && zodiacMatch;
    });

    setFilteredProfiles(filtered);
  }, [filters, profiles]);

  const handleFavorite = (profileId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites?.has(profileId)) {
        newFavorites?.delete(profileId);
      } else {
        newFavorites?.add(profileId);
      }
      return newFavorites;
    });
  };

  const handleMessage = (profileId) => {
    console.log(`Starting conversation with profile ${profileId}`);
    // Implement messaging logic
  };

  const handleViewProfile = (profileId) => {
    console.log(`Viewing full profile ${profileId}`);
    // Navigate to full profile view
  };

  return (
    <>
      <Navigation />
      <CosmicBackground>
        <div className="min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Discover Your Cosmic Connections
              </h1>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                Find meaningful relationships guided by the stars and aligned with your energy
              </p>
            </div>

            {/* Filter Controls */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={20} className="text-white" />
                    <span className="text-white font-medium">
                      {filteredProfiles?.length} matches found
                    </span>
                  </div>
                  
                  <Select
                    value="compatibility"
                    onValueChange={() => {}}
                    className="bg-white/20 border-white/30 text-white"
                  >
                    <option value="compatibility">Sort by Compatibility</option>
                    <option value="distance">Sort by Distance</option>
                    <option value="age">Sort by Age</option>
                    <option value="recent">Recently Active</option>
                  </Select>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  >
                    <Icon name="Filter" size={16} className="mr-2" />
                    Advanced Filters
                  </Button>
                  
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                    <Icon name="Sparkles" size={16} className="mr-2" />
                    Cosmic Boost
                  </Button>
                </div>
              </div>

              {/* Advanced Filter Panel */}
              {showFilters && (
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClose={() => setShowFilters(false)}
                />
              )}
            </div>

            {/* Profile Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white/70">Discovering your cosmic matches...</p>
                </div>
              </div>
            ) : filteredProfiles?.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="Heart" size={48} className="text-white/50 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">No matches found</h3>
                <p className="text-blue-200 mb-6">
                  Try adjusting your filters to discover more cosmic connections
                </p>
                <Button
                  onClick={() => setFilters({
                    ageRange: [22, 35],
                    distance: 50,
                    zodiacSigns: [],
                    compatibility: 70
                  })}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles?.map((profile) => (
                  <ProfileCard
                    key={profile?.id}
                    profile={profile}
                    isFavorited={favorites?.has(profile?.id)}
                    onFavorite={() => handleFavorite(profile?.id)}
                    onMessage={() => handleMessage(profile?.id)}
                    onViewProfile={() => handleViewProfile(profile?.id)}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!loading && filteredProfiles?.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  onClick={() => console.log('Loading more profiles...')}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3"
                >
                  <Icon name="MoreHorizontal" size={16} className="mr-2" />
                  Discover More Matches
                </Button>
              </div>
            )}
          </div>

          {/* Floating Action Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-40"
          >
            <Icon name="Sliders" size={24} />
          </button>
        </div>
      </CosmicBackground>
    </>
  );
};

export default DiscoverPageForFindingMatches;