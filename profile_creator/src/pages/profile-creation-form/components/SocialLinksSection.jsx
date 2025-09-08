import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SocialLinksSection = ({ 
  socialLinks, 
  onSocialLinksChange, 
  errors,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialPlatforms = [
    { key: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', placeholder: 'https://linkedin.com/in/username' },
    { key: 'twitter', label: 'Twitter/X', icon: 'Twitter', placeholder: 'https://twitter.com/username' },
    { key: 'github', label: 'GitHub', icon: 'Github', placeholder: 'https://github.com/username' },
    { key: 'instagram', label: 'Instagram', icon: 'Instagram', placeholder: 'https://instagram.com/username' },
    { key: 'facebook', label: 'Facebook', icon: 'Facebook', placeholder: 'https://facebook.com/username' },
    { key: 'website', label: 'Personal Website', icon: 'Globe', placeholder: 'https://yourwebsite.com' }
  ];

  const handleSocialLinkChange = (platform, value) => {
    const updatedLinks = {
      ...socialLinks,
      [platform]: value
    };
    onSocialLinksChange(updatedLinks);
  };

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getFilledLinksCount = () => {
    return Object.values(socialLinks || {})?.filter(link => link && link?.trim())?.length;
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
              <Icon name="Link" size={20} className="text-accent" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Social Media Links
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getFilledLinksCount() > 0 
                    ? `${getFilledLinksCount()} link${getFilledLinksCount() > 1 ? 's' : ''} added`
                    : 'Connect your social profiles'
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
              {socialPlatforms?.map((platform) => (
                <div key={platform?.key} className="space-y-2">
                  <Input
                    label={platform?.label}
                    type="url"
                    placeholder={platform?.placeholder}
                    value={socialLinks?.[platform?.key] || ''}
                    onChange={(e) => handleSocialLinkChange(platform?.key, e?.target?.value)}
                    error={errors?.[platform?.key]}
                    className="w-full"
                  />
                  
                  {socialLinks?.[platform?.key] && !validateUrl(socialLinks?.[platform?.key]) && (
                    <div className="flex items-center space-x-2 text-error text-sm">
                      <Icon name="AlertCircle" size={14} />
                      <span>Please enter a valid URL</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Info" size={14} />
                  <span>All links are optional and will be displayed on your profile</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onSocialLinksChange({})}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLinksSection;