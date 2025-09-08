import React, { useState } from 'react';
import Navigation from '../../components/ui/Navigation';
import CosmicBackground from '../../components/CosmicBackground';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    accountPrivacy: {
      privateAccount: false,
      showOnlineStatus: true,
      allowDirectMessages: true
    },
    emailNotifications: {
      receiveUpdates: true,
      newMatches: true,
      messages: true,
      cosmicEvents: false
    },
    appearance: {
      darkMode: false,
      reducedMotion: false,
      fontSize: 'medium'
    },
    preferences: {
      matchDistance: 50,
      ageRange: [22, 35],
      showCompatibilityScore: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', settings);
      
      // Apply dark mode immediately
      if (settings?.appearance?.darkMode) {
        document.documentElement?.classList?.add('dark');
      } else {
        document.documentElement?.classList?.remove('dark');
      }
      
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const SettingSection = ({ title, description, children, icon }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-start space-x-3 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
          <Icon name={icon} size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {description && (
            <p className="text-white/70 text-sm">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ label, description, children }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <div className="text-white font-medium">{label}</div>
        {description && (
          <div className="text-white/60 text-sm">{description}</div>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Navigation />
      <CosmicBackground>
        <div className="min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
              <p className="text-blue-200 text-lg">
                Customize your cosmic journey and privacy preferences
              </p>
            </div>

            <div className="space-y-6">
              {/* Account Privacy */}
              <SettingSection
                title="Account Privacy"
                description="Control who can see your profile and interact with you"
                icon="Shield"
              >
                <SettingItem
                  label="Private Account"
                  description="Only approved connections can view your full profile"
                >
                  <Toggle
                    checked={settings?.accountPrivacy?.privateAccount}
                    onCheckedChange={(value) => 
                      handleSettingChange('accountPrivacy', 'privateAccount', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="Show Online Status"
                  description="Let others see when you're active on the platform"
                >
                  <Toggle
                    checked={settings?.accountPrivacy?.showOnlineStatus}
                    onCheckedChange={(value) => 
                      handleSettingChange('accountPrivacy', 'showOnlineStatus', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="Allow Direct Messages"
                  description="Let new matches send you messages"
                >
                  <Toggle
                    checked={settings?.accountPrivacy?.allowDirectMessages}
                    onCheckedChange={(value) => 
                      handleSettingChange('accountPrivacy', 'allowDirectMessages', value)
                    }
                  />
                </SettingItem>
              </SettingSection>

              {/* Email Notifications */}
              <SettingSection
                title="Email Notifications"
                description="Choose what updates you'd like to receive"
                icon="Mail"
              >
                <SettingItem
                  label="Receive Updates"
                  description="General platform updates and announcements"
                >
                  <Toggle
                    checked={settings?.emailNotifications?.receiveUpdates}
                    onCheckedChange={(value) => 
                      handleSettingChange('emailNotifications', 'receiveUpdates', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="New Matches"
                  description="Get notified when you have a new cosmic connection"
                >
                  <Toggle
                    checked={settings?.emailNotifications?.newMatches}
                    onCheckedChange={(value) => 
                      handleSettingChange('emailNotifications', 'newMatches', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="Messages"
                  description="Notifications for new messages from matches"
                >
                  <Toggle
                    checked={settings?.emailNotifications?.messages}
                    onCheckedChange={(value) => 
                      handleSettingChange('emailNotifications', 'messages', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="Cosmic Events"
                  description="Astrological events and personalized insights"
                >
                  <Toggle
                    checked={settings?.emailNotifications?.cosmicEvents}
                    onCheckedChange={(value) => 
                      handleSettingChange('emailNotifications', 'cosmicEvents', value)
                    }
                  />
                </SettingItem>
              </SettingSection>

              {/* Appearance */}
              <SettingSection
                title="Appearance"
                description="Customize how the app looks and feels"
                icon="Palette"
              >
                <SettingItem
                  label="Switch to Dark Mode"
                  description="Use darker colors throughout the app"
                >
                  <Toggle
                    checked={settings?.appearance?.darkMode}
                    onCheckedChange={(value) => 
                      handleSettingChange('appearance', 'darkMode', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="Reduced Motion"
                  description="Minimize animations and transitions"
                >
                  <Toggle
                    checked={settings?.appearance?.reducedMotion}
                    onCheckedChange={(value) => 
                      handleSettingChange('appearance', 'reducedMotion', value)
                    }
                  />
                </SettingItem>

                <SettingItem
                  label="Font Size"
                  description="Adjust text size for better readability"
                >
                  <Select
                    value={settings?.appearance?.fontSize}
                    onValueChange={(value) => 
                      handleSettingChange('appearance', 'fontSize', value)
                    }
                    className="bg-white/20 border-white/30 text-white min-w-[120px]"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Select>
                </SettingItem>
              </SettingSection>

              {/* Match Preferences */}
              <SettingSection
                title="Match Preferences"
                description="Fine-tune your matching algorithm"
                icon="Heart"
              >
                <SettingItem
                  label="Maximum Distance"
                  description={`Show matches within ${settings?.preferences?.matchDistance} miles`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={settings?.preferences?.matchDistance}
                      onChange={(e) => 
                        handleSettingChange('preferences', 'matchDistance', parseInt(e?.target?.value))
                      }
                      className="w-24 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-white text-sm w-12">{settings?.preferences?.matchDistance}mi</span>
                  </div>
                </SettingItem>

                <SettingItem
                  label="Show Compatibility Score"
                  description="Display astrological compatibility percentage on profiles"
                >
                  <Toggle
                    checked={settings?.preferences?.showCompatibilityScore}
                    onCheckedChange={(value) => 
                      handleSettingChange('preferences', 'showCompatibilityScore', value)
                    }
                  />
                </SettingItem>
              </SettingSection>

              {/* Data & Privacy */}
              <SettingSection
                title="Data & Privacy"
                description="Manage your personal information and account"
                icon="Database"
              >
                <div className="space-y-3">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 justify-start">
                    <Icon name="Download" size={16} className="mr-2" />
                    Export Your Data
                  </Button>
                  
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 justify-start">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Delete Account
                  </Button>
                  
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 justify-start">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Privacy Policy
                  </Button>
                </div>
              </SettingSection>
            </div>

            {/* Save Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSaving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving Settings...</span>
                  </div>
                ) : (
                  <>
                    <Icon name="Save" size={16} className="mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CosmicBackground>
    </>
  );
};

export default SettingsPage;