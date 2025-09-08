import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const handleAgeChange = (index, value) => {
    const newAgeRange = [...localFilters?.ageRange];
    newAgeRange[index] = parseInt(value);
    setLocalFilters(prev => ({ ...prev, ageRange: newAgeRange }));
  };

  const handleDistanceChange = (value) => {
    setLocalFilters(prev => ({ ...prev, distance: parseInt(value) }));
  };

  const handleCompatibilityChange = (value) => {
    setLocalFilters(prev => ({ ...prev, compatibility: parseInt(value) }));
  };

  const handleZodiacToggle = (sign) => {
    const newZodiacSigns = localFilters?.zodiacSigns?.includes(sign)
      ? localFilters?.zodiacSigns?.filter(s => s !== sign)
      : [...localFilters?.zodiacSigns, sign];
    
    setLocalFilters(prev => ({ ...prev, zodiacSigns: newZodiacSigns }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      ageRange: [22, 35],
      distance: 50,
      zodiacSigns: [],
      compatibility: 70
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getZodiacIcon = (sign) => {
    const iconMap = {
      'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
      'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    };
    return iconMap?.[sign] || '✨';
  };

  return (
    <div className="mt-6 bg-white/5 rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Icon name="Sliders" size={20} className="mr-2" />
          Advanced Filters
        </h3>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors duration-200"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Range */}
        <div>
          <label className="block text-white font-medium mb-3">
            Age Range: {localFilters?.ageRange?.[0]} - {localFilters?.ageRange?.[1]} years
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm w-8">Min:</span>
              <input
                type="range"
                min="18"
                max="50"
                value={localFilters?.ageRange?.[0]}
                onChange={(e) => handleAgeChange(0, e?.target?.value)}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white text-sm w-8">{localFilters?.ageRange?.[0]}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm w-8">Max:</span>
              <input
                type="range"
                min="18"
                max="50"
                value={localFilters?.ageRange?.[1]}
                onChange={(e) => handleAgeChange(1, e?.target?.value)}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white text-sm w-8">{localFilters?.ageRange?.[1]}</span>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-white font-medium mb-3">
            Distance: Within {localFilters?.distance} miles
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={localFilters?.distance}
              onChange={(e) => handleDistanceChange(e?.target?.value)}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-white text-sm w-12">{localFilters?.distance}mi</span>
          </div>
        </div>

        {/* Compatibility */}
        <div>
          <label className="block text-white font-medium mb-3">
            Minimum Compatibility: {localFilters?.compatibility}%
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={localFilters?.compatibility}
              onChange={(e) => handleCompatibilityChange(e?.target?.value)}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-white text-sm w-12">{localFilters?.compatibility}%</span>
          </div>
        </div>

        {/* Zodiac Signs */}
        <div>
          <label className="block text-white font-medium mb-3">
            Zodiac Signs ({localFilters?.zodiacSigns?.length} selected)
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
            {zodiacSigns?.map((sign) => (
              <button
                key={sign}
                onClick={() => handleZodiacToggle(sign)}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  localFilters?.zodiacSigns?.includes(sign)
                    ? 'bg-blue-500/80 text-white border-2 border-blue-400' :'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="text-lg">{getZodiacIcon(sign)}</span>
                <span className="truncate">{sign}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Filter Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Icon name="Info" size={16} />
          <span>Filters help you find more compatible matches</span>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={handleResetFilters}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
          >
            Reset
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;