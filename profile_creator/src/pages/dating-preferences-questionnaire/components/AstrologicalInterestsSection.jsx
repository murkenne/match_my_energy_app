import React from 'react';
import Icon from '../../../components/AppIcon';

const AstrologicalInterestsSection = ({ formData, onChange }) => {
  const chartExperience = [
    { value: 'expert', label: 'Expert', icon: 'Award', description: 'I can read charts professionally' },
    { value: 'experienced', label: 'Experienced', icon: 'BookOpen', description: 'I understand most astrological concepts' },
    { value: 'beginner', label: 'Beginner', icon: 'Compass', description: 'I know the basics and want to learn more' },
    { value: 'curious', label: 'Curious', icon: 'Eye', description: 'Interested but new to astrology' },
    { value: 'skeptical', label: 'Skeptical', icon: 'HelpCircle', description: 'Not sure if I believe in it yet' }
  ];

  const cosmicEvents = [
    { value: 'full-moon', label: 'Full Moon Rituals', icon: 'Moon' },
    { value: 'mercury-retrograde', label: 'Mercury Retrograde', icon: 'RotateCcw' },
    { value: 'eclipses', label: 'Solar/Lunar Eclipses', icon: 'Sun' },
    { value: 'planetary-alignments', label: 'Planetary Alignments', icon: 'Orbit' },
    { value: 'zodiac-seasons', label: 'Zodiac Season Changes', icon: 'Calendar' },
    { value: 'venus-retrograde', label: 'Venus Retrograde', icon: 'Heart' }
  ];

  const handleCosmicEventToggle = (value) => {
    const currentEvents = formData?.cosmicEventAwareness || [];
    const isSelected = currentEvents?.includes(value);
    
    if (isSelected) {
      onChange('cosmicEventAwareness', currentEvents?.filter(item => item !== value));
    } else {
      onChange('cosmicEventAwareness', [...currentEvents, value]);
    }
  };

  const getSliderColor = (value, type) => {
    if (type === 'belief') {
      if (value <= 3) return 'from-gray-400 to-gray-500';
      if (value <= 7) return 'from-purple-400 to-blue-400';
      return 'from-blue-400 to-indigo-500';
    } else {
      if (value <= 3) return 'from-yellow-400 to-orange-400';
      if (value <= 7) return 'from-orange-400 to-pink-400';
      return 'from-pink-400 to-purple-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Astrology Belief Level */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-purple-400" />
          How much do you believe in astrology?
        </h3>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Belief Level:</span>
            <span className="text-white font-semibold">
              {formData?.astrologyBelief || 5}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={formData?.astrologyBelief || 5}
            onChange={(e) => onChange('astrologyBelief', parseInt(e?.target?.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r ${getSliderColor(formData?.astrologyBelief || 5, 'belief')}`}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Complete skeptic</span>
            <span>True believer</span>
          </div>
        </div>
      </div>
      {/* Chart Reading Experience */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-blue-400" />
          What's your experience with birth chart reading?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {chartExperience?.map((experience) => (
            <button
              key={experience?.value}
              onClick={() => onChange('chartReadingExperience', experience?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.chartReadingExperience === experience?.value
                  ? 'border-blue-400 bg-blue-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={experience?.icon} size={20} className="text-blue-400" />
                <span className="font-semibold">{experience?.label}</span>
              </div>
              <p className="text-sm opacity-80">{experience?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Cosmic Event Awareness */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Sparkles" size={20} className="mr-2 text-pink-400" />
          Which cosmic events do you follow? (Select all that apply)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cosmicEvents?.map((event) => {
            const isSelected = formData?.cosmicEventAwareness?.includes(event?.value);
            return (
              <button
                key={event?.value}
                onClick={() => handleCosmicEventToggle(event?.value)}
                className={`
                  p-3 rounded-lg border transition-all duration-200 text-sm
                  ${isSelected
                    ? 'border-pink-400 bg-pink-400/10 text-pink-300' :'border-white/20 bg-white/5 text-gray-300 hover:border-pink-400/50 hover:bg-pink-400/5'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={event?.icon} size={20} />
                  <span className="text-center leading-tight">{event?.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          * Optional: This helps us understand your cosmic interests and engagement level
        </p>
      </div>
      {/* Compatibility Importance */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Heart" size={20} className="mr-2 text-pink-400" />
          How important is astrological compatibility in relationships?
        </h3>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Compatibility Importance:</span>
            <span className="text-white font-semibold">
              {formData?.compatibilityImportance || 5}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={formData?.compatibilityImportance || 5}
            onChange={(e) => onChange('compatibilityImportance', parseInt(e?.target?.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r ${getSliderColor(formData?.compatibilityImportance || 5, 'compatibility')}`}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Not important</span>
            <span>Essential factor</span>
          </div>
        </div>
      </div>
      {/* Cosmic Insights */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Sparkles" size={20} className="text-purple-400" />
          <h4 className="text-lg font-semibold text-white">Cosmic Connection Matching</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Your astrological interests and beliefs help us connect you with like-minded individuals who share your cosmic perspective. Whether you're a seasoned astrologer or cosmic-curious, we'll find your perfect match.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={12} className="text-purple-400" />
            <span>Match with similar belief levels</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={12} className="text-pink-400" />
            <span>Find cosmic compatibility</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Moon" size={12} className="text-blue-400" />
            <span>Share celestial experiences</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={12} className="text-purple-400" />
            <span>Discover chart synergy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologicalInterestsSection;