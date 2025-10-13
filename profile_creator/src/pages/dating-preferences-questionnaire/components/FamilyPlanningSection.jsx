import React from 'react';
import Icon from '../../../components/AppIcon';

const FamilyPlanningSection = ({ formData, onChange }) => {
  const childrenOptions = [
    { value: 'want-children', label: 'Want Children', icon: 'Heart', description: 'Definitely want kids in the future' },
    { value: 'maybe-children', label: 'Maybe Children', icon: 'HelpCircle', description: 'Open to the possibility' },
    { value: 'no-children', label: 'No Children', icon: 'X', description: 'Do not want children' },
    { value: 'undecided', label: 'Undecided', icon: 'Clock', description: 'Still figuring it out' }
  ];

  const hasChildrenOptions = [
    { value: 'no-kids', label: 'No Kids', icon: 'Users' },
    { value: 'has-kids-home', label: 'Have Kids (Living at Home)', icon: 'Home' },
    { value: 'has-kids-away', label: 'Have Kids (Not at Home)', icon: 'MapPin' },
    { value: 'shared-custody', label: 'Shared Custody', icon: 'Repeat' }
  ];

  const timelineOptions = [
    { value: '1-2-years', label: '1-2 Years', icon: 'Clock' },
    { value: '3-5-years', label: '3-5 Years', icon: 'Calendar' },
    { value: '5-plus-years', label: '5+ Years', icon: 'Timer' },
    { value: 'no-timeline', label: 'No Specific Timeline', icon: 'Infinity' }
  ];

  const petOptions = [
    { value: 'love-pets', label: 'Love Pets', icon: 'Heart', description: 'Have pets or love being around them' },
    { value: 'like-pets', label: 'Like Pets', icon: 'Smile', description: 'Enjoy pets but don\'t necessarily have them' },
    { value: 'neutral-pets', label: 'Neutral on Pets', icon: 'Minus', description: 'Don\'t mind pets either way' },
    { value: 'no-pets', label: 'Prefer No Pets', icon: 'X', description: 'Would prefer not to have pets around' }
  ];

  return (
    <div className="space-y-8">
      {/* Want Children */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Heart" size={20} className="mr-2 text-pink-400" />
          Do you want children in the future?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childrenOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onChange('wantsChildren', option?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.wantsChildren === option?.value
                  ? 'border-pink-400 bg-pink-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={option?.icon} size={20} className="text-pink-400" />
                <span className="font-semibold">{option?.label}</span>
              </div>
              <p className="text-sm opacity-80">{option?.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Has Children Currently */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-blue-400" />
          Do you currently have children?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {hasChildrenOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onChange('hasChildren', option?.value)}
              className={`
                p-4 rounded-xl border transition-all duration-200 text-center
                ${formData?.hasChildren === option?.value
                  ? 'border-blue-400 bg-blue-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center justify-center space-x-3">
                <Icon name={option?.icon} size={18} className="text-blue-400" />
                <span className="font-medium">{option?.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Children Timeline (only show if wants children) */}
      {(formData?.wantsChildren === 'want-children' || formData?.wantsChildren === 'maybe-children') && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Icon name="Clock" size={20} className="mr-2 text-purple-400" />
            Timeline for having children
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timelineOptions?.map((timeline) => (
              <button
                key={timeline?.value}
                onClick={() => onChange('childrenTimeline', timeline?.value)}
                className={`
                  p-4 rounded-xl border transition-all duration-200 text-center
                  ${formData?.childrenTimeline === timeline?.value
                    ? 'border-purple-400 bg-purple-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Icon name={timeline?.icon} size={18} className="text-purple-400" />
                  <span className="font-medium">{timeline?.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pet Ownership */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Heart" size={20} className="mr-2 text-green-400" />
          How do you feel about pets?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {petOptions?.map((pet) => (
            <button
              key={pet?.value}
              onClick={() => onChange('petOwnership', pet?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${formData?.petOwnership === pet?.value
                  ? 'border-green-400 bg-green-400/10 text-white' :'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={pet?.icon} size={20} className="text-green-400" />
                <span className="font-semibold">{pet?.label}</span>
              </div>
              <p className="text-sm opacity-80">{pet?.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Family Planning Insights */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Heart" size={20} className="text-pink-400" />
          <h4 className="text-lg font-semibold text-white">Family Compatibility</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Family planning preferences are crucial for long-term compatibility. Being honest about your goals helps us match you with people who share similar family visions.
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Icon name="Lock" size={14} />
          <span>Your family planning preferences are kept private and only used for compatibility matching.</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyPlanningSection;