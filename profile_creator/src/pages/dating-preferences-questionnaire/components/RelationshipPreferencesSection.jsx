import React from 'react';

import Icon from '../../../components/AppIcon';

const RelationshipPreferencesSection = ({ formData, onChange }) => {
  const relationshipTypes = [
    { value: 'serious', label: 'Serious Dating', icon: 'Heart', description: 'Looking for a committed long-term relationship' },
    { value: 'casual', label: 'Casual Dating', icon: 'Coffee', description: 'Open to seeing where things go naturally' },
    { value: 'friendship', label: 'Friendship', icon: 'Users', description: 'Seeking meaningful friendships first' },
    { value: 'open', label: 'Open to All', icon: 'Globe', description: 'Flexible about relationship progression' }
  ];

  const dealBreakers = [
    { value: 'smoking', label: 'Smoking', icon: 'X' },
    { value: 'drinking', label: 'Excessive Drinking', icon: 'X' },
    { value: 'dishonesty', label: 'Dishonesty', icon: 'X' },
    { value: 'no-ambition', label: 'Lack of Ambition', icon: 'X' },
    { value: 'incompatible-beliefs', label: 'Incompatible Beliefs', icon: 'X' },
    { value: 'poor-communication', label: 'Poor Communication', icon: 'X' }
  ];

  const handleDealBreakerToggle = (value) => {
    const currentDealBreakers = formData?.dealBreakers || [];
    const isSelected = currentDealBreakers?.includes(value);
    
    if (isSelected) {
      onChange('dealBreakers', currentDealBreakers?.filter(item => item !== value));
    } else {
      onChange('dealBreakers', [...currentDealBreakers, value]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Relationship Type */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Heart" size={20} className="mr-2 text-pink-400" />
          What type of relationship are you seeking?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relationshipTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => onChange('relationshipType', type?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.relationshipType === type?.value
                  ? 'border-pink-400 bg-pink-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={type?.icon} size={20} className="text-pink-400" />
                <span className="font-semibold">{type?.label}</span>
              </div>
              <p className="text-sm opacity-80">{type?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Age Range */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-purple-400" />
          Age Range Preference
        </h3>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Age Range:</span>
            <span className="text-white font-semibold">
              {formData?.ageRange?.[0] || 18} - {formData?.ageRange?.[1] || 65} years
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Minimum Age</label>
              <input
                type="range"
                min="18"
                max="80"
                value={formData?.ageRange?.[0] || 18}
                onChange={(e) => onChange('ageRange', [parseInt(e?.target?.value), formData?.ageRange?.[1] || 65])}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Maximum Age</label>
              <input
                type="range"
                min="18"
                max="80"
                value={formData?.ageRange?.[1] || 65}
                onChange={(e) => onChange('ageRange', [formData?.ageRange?.[0] || 18, parseInt(e?.target?.value)])}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Distance Preference */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2 text-blue-400" />
          Distance Preference
        </h3>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Maximum Distance:</span>
            <span className="text-white font-semibold">
              {formData?.distance || 50} miles
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="500"
            value={formData?.distance || 50}
            onChange={(e) => onChange('distance', parseInt(e?.target?.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>5 miles</span>
            <span>500+ miles</span>
          </div>
        </div>
      </div>
      {/* Deal Breakers */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="X" size={20} className="mr-2 text-red-400" />
          Deal Breakers (Select all that apply)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {dealBreakers?.map((dealBreaker) => {
            const isSelected = formData?.dealBreakers?.includes(dealBreaker?.value);
            return (
              <button
                key={dealBreaker?.value}
                onClick={() => handleDealBreakerToggle(dealBreaker?.value)}
                className={`
                  p-3 rounded-lg border transition-all duration-200 text-sm
                  ${isSelected
                    ? 'border-red-400 bg-red-400/10 text-red-300' :'border-white/20 bg-white/5 text-gray-300 hover:border-red-400/50 hover:bg-red-400/5'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name={dealBreaker?.icon} size={16} />
                  <span>{dealBreaker?.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          * Optional: Select traits that are important deal breakers for you
        </p>
      </div>
    </div>
  );
};

export default RelationshipPreferencesSection;