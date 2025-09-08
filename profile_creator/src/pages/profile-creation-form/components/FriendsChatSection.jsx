import React from 'react';
import Input from '../../../components/ui/Input';
import Toggle from '../../../components/ui/Toggle';
import Icon from '../../../components/AppIcon';

const FriendsChatSection = ({ 
  formData, 
  errors, 
  onChange,
  className = "" 
}) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleToggleChange = (field, checked) => {
    const updatedSettings = {
      ...formData?.privacySettings,
      [field]: checked
    };
    onChange('privacySettings', updatedSettings);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="cosmic-card rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="MessageCircle" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-white">Friends & Chat</h2>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Display Name"
            type="text"
            placeholder="Nova Seeker"
            value={formData?.displayName || ''}
            onChange={(e) => handleInputChange('displayName', e?.target?.value)}
            error={errors?.displayName}
            className="cosmic-input"
          />

          <Input
            label="Username"
            type="text"
            placeholder="@novaseeker"
            value={formData?.username || ''}
            onChange={(e) => handleInputChange('username', e?.target?.value)}
            error={errors?.username}
            description="Your unique handle for easy discovery"
            className="cosmic-input"
          />

          <div className="space-y-3 pt-2">
            <Toggle
              id="enable-dm"
              checked={formData?.privacySettings?.allowMessages || false}
              onChange={(e) => handleToggleChange('allowMessages', e?.target?.checked)}
              label="Enable Direct Messages"
              description="Allow other users to send you private messages"
            />

            <Toggle
              id="allow-friend-requests"
              checked={formData?.privacySettings?.allowFriendRequests || false}
              onChange={(e) => handleToggleChange('allowFriendRequests', e?.target?.checked)}
              label="Allow Friend Requests"
              description="Let others send you friend requests"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsChatSection;