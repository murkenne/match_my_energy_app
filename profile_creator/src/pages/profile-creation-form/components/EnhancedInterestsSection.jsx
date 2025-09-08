import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EnhancedInterestsSection = ({ 
  interests, 
  onInterestsChange, 
  className = "" 
}) => {
  const [inputValue, setInputValue] = useState('');

  const defaultInterests = ['music', 'travel', 'zodiac memes', 'yoga'];
  const popularInterests = [
    'astrology', 'meditation', 'crystals', 'tarot', 'spirituality',
    'photography', 'art', 'reading', 'cooking', 'hiking', 'fitness',
    'dancing', 'gaming', 'movies', 'nature', 'writing'
  ];

  const addInterest = (interest) => {
    if (interest && !interests?.includes(interest) && interests?.length < 15) {
      onInterestsChange([...interests, interest]);
      setInputValue('');
    }
  };

  const removeInterest = (interestToRemove) => {
    onInterestsChange(interests?.filter(interest => interest !== interestToRemove));
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && inputValue?.trim()) {
      e?.preventDefault();
      addInterest(inputValue?.trim());
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="cosmic-card rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Heart" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-white">Interests (add tags)</h2>
        </div>
        
        <div className="space-y-4">
          {/* Selected Interests */}
          {interests?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {interests?.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm border border-blue-500"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="hover:text-blue-200 transition-colors"
                    aria-label={`Remove ${interest}`}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Interest Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Type to add a tag..."
              value={inputValue}
              onChange={(e) => setInputValue(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="cosmic-input"
            />
          </div>

          {/* Popular Interests */}
          {interests?.length < 15 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Suggested Tags</label>
              <div className="flex flex-wrap gap-2">
                {popularInterests?.filter(interest => !interests?.includes(interest))?.slice(0, 10)?.map((interest, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addInterest(interest)}
                    className="px-3 py-1 bg-gray-700 text-gray-300 border border-gray-600 rounded-full text-sm hover:bg-orange-500/20 hover:text-orange-200 hover:border-orange-500/40 transition-all duration-200"
                  >
                    + {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Limit Notice */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{interests?.length}/15 tags added</span>
            {interests?.length >= 15 && (
              <div className="flex items-center space-x-1 text-yellow-400">
                <Icon name="AlertTriangle" size={12} />
                <span>Maximum reached</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedInterestsSection;