import React from 'react';
import Icon from '../../../components/AppIcon';

const LifestyleCompatibilitySection = ({ formData, onChange }) => {
  const incomeRanges = [
    { value: 'under-30k', label: 'Under $30k', icon: 'DollarSign' },
    { value: '30k-50k', label: '$30k - $50k', icon: 'DollarSign' },
    { value: '50k-75k', label: '$50k - $75k', icon: 'DollarSign' },
    { value: '75k-100k', label: '$75k - $100k', icon: 'DollarSign' },
    { value: '100k-150k', label: '$100k - $150k', icon: 'DollarSign' },
    { value: 'over-150k', label: 'Over $150k', icon: 'DollarSign' },
    { value: 'prefer-not-say', label: 'Prefer not to say', icon: 'Lock' }
  ];

  const livingArrangements = [
    { value: 'own-house', label: 'Own House/Condo', icon: 'Home' },
    { value: 'rent-apartment', label: 'Rent Apartment/House', icon: 'Building' },
    { value: 'live-with-family', label: 'Live with Family', icon: 'Users' },
    { value: 'roommates', label: 'Have Roommates', icon: 'UserCheck' },
    { value: 'other', label: 'Other Living Situation', icon: 'MapPin' }
  ];

  const lifeStages = [
    { value: 'student', label: 'Student', icon: 'BookOpen' },
    { value: 'starting-career', label: 'Starting Career', icon: 'Briefcase' },
    { value: 'established-career', label: 'Established Career', icon: 'Award' },
    { value: 'career-change', label: 'Career Change', icon: 'RefreshCw' },
    { value: 'entrepreneur', label: 'Entrepreneur', icon: 'TrendingUp' },
    { value: 'retired', label: 'Retired', icon: 'Sunset' }
  ];

  const getSliderColor = (value) => {
    if (value <= 3) return 'from-red-400 to-orange-400';
    if (value <= 7) return 'from-yellow-400 to-blue-400';
    return 'from-green-400 to-emerald-400';
  };

  return (
    <div className="space-y-8">
      {/* Income Range */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="DollarSign" size={20} className="mr-2 text-green-400" />
          Annual Income Range
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {incomeRanges?.map((income) => (
            <button
              key={income?.value}
              onClick={() => onChange('incomeRange', income?.value)}
              className={`
                p-4 rounded-xl border transition-all duration-200 text-left
                ${formData?.incomeRange === income?.value
                  ? 'border-green-400 bg-green-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={income?.icon} size={18} className="text-green-400" />
                <span className="font-medium">{income?.label}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          * This helps with lifestyle compatibility matching
        </p>
      </div>
      {/* Career Importance */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Briefcase" size={20} className="mr-2 text-blue-400" />
          How important is career success to you?
        </h3>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Career Importance:</span>
            <span className="text-white font-semibold">
              {formData?.careerImportance || 5}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={formData?.careerImportance || 5}
            onChange={(e) => onChange('careerImportance', parseInt(e?.target?.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r ${getSliderColor(formData?.careerImportance || 5)}`}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Not important</span>
            <span>Extremely important</span>
          </div>
        </div>
      </div>
      {/* Living Arrangement */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Home" size={20} className="mr-2 text-purple-400" />
          Current Living Arrangement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {livingArrangements?.map((arrangement) => (
            <button
              key={arrangement?.value}
              onClick={() => onChange('livingArrangement', arrangement?.value)}
              className={`
                p-4 rounded-xl border transition-all duration-200 text-left
                ${formData?.livingArrangement === arrangement?.value
                  ? 'border-purple-400 bg-purple-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={arrangement?.icon} size={18} className="text-purple-400" />
                <span className="font-medium">{arrangement?.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Life Stage */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-orange-400" />
          Current Life Stage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {lifeStages?.map((stage) => (
            <button
              key={stage?.value}
              onClick={() => onChange('lifeStage', stage?.value)}
              className={`
                p-4 rounded-xl border transition-all duration-200 text-center
                ${formData?.lifeStage === stage?.value
                  ? 'border-orange-400 bg-orange-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={stage?.icon} size={24} className="text-orange-400" />
                <span className="font-medium text-sm">{stage?.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Additional Insights */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Lightbulb" size={20} className="text-blue-400" />
          <h4 className="text-lg font-semibold text-white">Lifestyle Matching</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          These preferences help us match you with people who share similar life circumstances and priorities. 
          Compatible lifestyles often lead to stronger, more understanding relationships.
        </p>
      </div>
    </div>
  );
};

export default LifestyleCompatibilitySection;