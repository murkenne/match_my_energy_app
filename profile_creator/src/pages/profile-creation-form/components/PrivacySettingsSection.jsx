import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySettingsSection = ({ 
  privacySettings, 
  onPrivacySettingsChange,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const privacyOptions = [
    {
      key: 'profileVisible',
      label: 'Make my profile visible to other users',
      description: 'Allow other users to find and view your profile',
      defaultValue: true
    },
    {
      key: 'showEmail',
      label: 'Show my email address on profile',
      description: 'Display your email address publicly on your profile',
      defaultValue: false
    },
    {
      key: 'showLocation',
      label: 'Show my location',
      description: 'Display your city and country on your profile',
      defaultValue: true
    },
    {
      key: 'allowMessages',
      label: 'Allow other users to message me',
      description: 'Enable direct messaging from other platform users',
      defaultValue: true
    },
    {
      key: 'showSocialLinks',
      label: 'Show my social media links',
      description: 'Display your connected social media profiles',
      defaultValue: true
    },
    {
      key: 'searchable',
      label: 'Make my profile searchable',
      description: 'Allow your profile to appear in search results',
      defaultValue: true
    }
  ];

  const handlePrivacyChange = (key, value) => {
    const updatedSettings = {
      ...privacySettings,
      [key]: value
    };
    onPrivacySettingsChange(updatedSettings);
  };

  const getPrivacyLevel = () => {
    const enabledCount = privacyOptions?.filter(option => 
      privacySettings?.[option?.key] !== false
    )?.length;
    
    if (enabledCount >= 5) return { level: 'Open', color: 'text-success' };
    if (enabledCount >= 3) return { level: 'Balanced', color: 'text-warning' };
    return { level: 'Private', color: 'text-error' };
  };

  const privacyLevel = getPrivacyLevel();

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
              <Icon name="Shield" size={20} className="text-accent" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Privacy Settings
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Privacy Level:</span>
                  <span className={`text-sm font-medium ${privacyLevel?.color}`}>
                    {privacyLevel?.level}
                  </span>
                </div>
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
              {/* Privacy Options */}
              <div className="space-y-4">
                {privacyOptions?.map((option) => (
                  <div key={option?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
                    <Checkbox
                      checked={privacySettings?.[option?.key] !== false}
                      onChange={(e) => handlePrivacyChange(option?.key, e?.target?.checked)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label className="text-sm font-medium text-foreground cursor-pointer">
                        {option?.label}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {option?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Privacy Level Indicator */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Current Privacy Level: <span className={privacyLevel?.color}>{privacyLevel?.level}</span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {privacyLevel?.level === 'Open' && 'Your profile is highly visible and discoverable by other users.'}
                  {privacyLevel?.level === 'Balanced' && 'Your profile has moderate visibility with some information kept private.'}
                  {privacyLevel?.level === 'Private' && 'Your profile has limited visibility and most information is kept private.'}
                </p>
              </div>

              {/* Data Usage Notice */}
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Shield" size={16} className="text-accent mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Data Protection</p>
                    <p className="text-muted-foreground text-xs">
                      We respect your privacy and will never share your personal information with third parties without your consent. 
                      You can change these settings at any time from your account preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacySettingsSection;