import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';


const InterestsSection = ({ 
  interests, 
  onInterestsChange, 
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const popularInterests = [
    'Technology', 'Programming', 'Design', 'Photography', 'Travel', 'Music',
    'Reading', 'Writing', 'Cooking', 'Fitness', 'Gaming', 'Art',
    'Business', 'Marketing', 'Education', 'Science', 'Sports', 'Movies',
    'Fashion', 'Food', 'Nature', 'History', 'Languages', 'Volunteering'
  ];

  const handleInputChange = (value) => {
    setInputValue(value);
    
    if (value?.length > 0) {
      const filtered = popularInterests?.filter(interest => 
        interest?.toLowerCase()?.includes(value?.toLowerCase()) &&
        !interests?.includes(interest)
      );
      setSuggestions(filtered?.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const addInterest = (interest) => {
    if (interest && !interests?.includes(interest) && interests?.length < 10) {
      onInterestsChange([...interests, interest]);
      setInputValue('');
      setSuggestions([]);
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

  const addPopularInterest = (interest) => {
    addInterest(interest);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
        {/* Header */}
        <div 
          className="p-6 cursor-pointer hover:bg-muted/30 transition-smooth"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Heart" size={20} className="text-accent" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Interests & Skills
                </h3>
                <p className="text-sm text-muted-foreground">
                  {interests?.length > 0 
                    ? `${interests?.length} interest${interests?.length > 1 ? 's' : ''} selected`
                    : 'Add your interests and skills'
                  }
                </p>
              </div>
            </div>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-border">
            <div className="space-y-4 mt-4">
              {/* Add Interest Input */}
              <div className="relative">
                <Input
                  label="Add Interest or Skill"
                  type="text"
                  placeholder="Type an interest or skill..."
                  value={inputValue}
                  onChange={(e) => handleInputChange(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  description={`${interests?.length}/10 interests added`}
                  className="w-full"
                />
                
                {/* Suggestions Dropdown */}
                {suggestions?.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-soft z-10">
                    {suggestions?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => addInterest(suggestion)}
                        className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth first:rounded-t-md last:rounded-b-md"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Interests */}
              {interests?.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Selected Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interests?.map((interest, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm"
                      >
                        <span>{interest}</span>
                        <button
                          onClick={() => removeInterest(interest)}
                          className="hover:text-error transition-smooth"
                          aria-label={`Remove ${interest}`}
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Interests */}
              {interests?.length < 10 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Popular Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {popularInterests?.filter(interest => !interests?.includes(interest))?.slice(0, 12)?.map((interest, index) => (
                        <button
                          key={index}
                          onClick={() => addPopularInterest(interest)}
                          className="px-3 py-1 bg-muted text-muted-foreground border border-border rounded-full text-sm hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-smooth"
                        >
                          + {interest}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Limit Notice */}
              {interests?.length >= 10 && (
                <div className="flex items-center space-x-2 text-warning text-sm">
                  <Icon name="AlertTriangle" size={14} />
                  <span>Maximum of 10 interests reached</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestsSection;