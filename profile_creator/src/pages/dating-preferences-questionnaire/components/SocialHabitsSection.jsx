import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialHabitsSection = ({ formData, onChange }) => {
  const nightlifeOptions = [
    { value: 'every-weekend', label: 'Every Weekend', icon: 'Music', description: 'Love the nightlife scene regularly' },
    { value: 'few-times-month', label: 'Few Times a Month', icon: 'Calendar', description: 'Enjoy going out occasionally' },
    { value: 'rarely', label: 'Rarely', icon: 'Home', description: 'Prefer staying in most nights' },
    { value: 'never', label: 'Never', icon: 'Moon', description: 'Not interested in nightlife' }
  ];

  const socialCircleOptions = [
    { value: 'large', label: 'Large Circle', icon: 'Users', description: 'Many friends and acquaintances' },
    { value: 'medium', label: 'Medium Circle', icon: 'UserCheck', description: 'Moderate-sized friend group' },
    { value: 'small', label: 'Small Circle', icon: 'User', description: 'Close-knit group of friends' },
    { value: 'prefer-small', label: 'Prefer Intimate', icon: 'Heart', description: 'Value deep, meaningful connections' }
  ];

  const weekendOptions = [
    { value: 'adventure', label: 'Adventure & Exploration', icon: 'Mountain', description: 'Hiking, traveling, trying new things' },
    { value: 'social', label: 'Social Activities', icon: 'Users', description: 'Parties, events, meeting people' },
    { value: 'relaxation', label: 'Relaxation & Self-Care', icon: 'Coffee', description: 'Reading, spa days, peaceful activities' },
    { value: 'hobbies', label: 'Hobbies & Interests', icon: 'Puzzle', description: 'Creative projects, learning, personal interests' },
    { value: 'mixed', label: 'Mix of Everything', icon: 'Shuffle', description: 'Variety depending on mood' }
  ];

  const getSliderColor = (value) => {
    if (value <= 3) return 'from-blue-400 to-purple-400';
    if (value <= 7) return 'from-purple-400 to-pink-400';
    return 'from-pink-400 to-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Nightlife Frequency */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Moon" size={20} className="mr-2 text-purple-400" />
          How often do you enjoy nightlife activities?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nightlifeOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onChange('nightlifeFrequency', option?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.nightlifeFrequency === option?.value
                  ? 'border-purple-400 bg-purple-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={option?.icon} size={20} className="text-purple-400" />
                <span className="font-semibold">{option?.label}</span>
              </div>
              <p className="text-sm opacity-80">{option?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Travel Enthusiasm */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Plane" size={20} className="mr-2 text-blue-400" />
          How much do you love to travel?
        </h3>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Travel Enthusiasm:</span>
            <span className="text-white font-semibold">
              {formData?.travelEnthusiasm || 5}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={formData?.travelEnthusiasm || 5}
            onChange={(e) => onChange('travelEnthusiasm', parseInt(e?.target?.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r ${getSliderColor(formData?.travelEnthusiasm || 5)}`}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Homebody</span>
            <span>Digital nomad</span>
          </div>
        </div>
      </div>
      {/* Social Circle Size */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-green-400" />
          What's your social circle like?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialCircleOptions?.map((circle) => (
            <button
              key={circle?.value}
              onClick={() => onChange('socialCircleSize', circle?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.socialCircleSize === circle?.value
                  ? 'border-green-400 bg-green-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={circle?.icon} size={20} className="text-green-400" />
                <span className="font-semibold">{circle?.label}</span>
              </div>
              <p className="text-sm opacity-80">{circle?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Weekend Preference */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-orange-400" />
          How do you prefer to spend your weekends?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {weekendOptions?.map((weekend) => (
            <button
              key={weekend?.value}
              onClick={() => onChange('weekendPreference', weekend?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.weekendPreference === weekend?.value
                  ? 'border-orange-400 bg-orange-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={weekend?.icon} size={20} className="text-orange-400" />
                <span className="font-semibold">{weekend?.label}</span>
              </div>
              <p className="text-sm opacity-80">{weekend?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Social Compatibility Insights */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Users" size={20} className="text-green-400" />
          <h4 className="text-lg font-semibold text-white">Social Compatibility</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Your social habits and lifestyle preferences help us match you with people who enjoy similar activities and have compatible energy levels.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400 mt-4">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-green-400" />
            <span>Find people with similar activity levels</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-green-400" />
            <span>Match weekend lifestyle preferences</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHabitsSection;