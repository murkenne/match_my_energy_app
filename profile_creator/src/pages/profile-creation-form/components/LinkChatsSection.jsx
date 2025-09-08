import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Add this utility function or import
const cn = (...classes) => classes.filter(Boolean).join(' ');

const LinkChatsSection = ({ 
  formData, 
  errors, 
  onChange,
  className = "" 
}) => {
  const chatPlatforms = [
    { key: 'discord', label: 'Discord', icon: 'MessageSquare', color: 'bg-indigo-600 hover:bg-indigo-700' },
    { key: 'whatsapp', label: 'WhatsApp', icon: 'Phone', color: 'bg-green-600 hover:bg-green-700' },
    { key: 'telegram', label: 'Telegram', icon: 'Send', color: 'bg-blue-600 hover:bg-blue-700' },
    { key: 'imessage', label: 'iMessage', icon: 'MessageCircle', color: 'bg-gray-600 hover:bg-gray-700' }
  ];

  const handlePlatformToggle = (platform) => {
    const currentLinks = formData?.chatLinks || {};
    const isLinked = currentLinks?.[platform];
    
    const updatedLinks = {
      ...currentLinks,
      [platform]: !isLinked
    };
    
    onChange('chatLinks', updatedLinks);
  };

  const getLinkedCount = () => {
    const links = formData?.chatLinks || {};
    return Object.values(links)?.filter(Boolean)?.length;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="cosmic-card rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Link" size={20} className="text-accent" />
            <h2 className="text-lg font-semibold text-white">Link Chats</h2>
          </div>
          {getLinkedCount() > 0 && (
            <span className="text-sm text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
              {getLinkedCount()} linked
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {chatPlatforms?.map((platform) => {
            const isLinked = formData?.chatLinks?.[platform?.key];
            return (
              <Button
                key={platform?.key}
                type="button"
                variant={isLinked ? "default" : "outline"}
                onClick={() => handlePlatformToggle(platform?.key)}
                className={cn(
                  "flex items-center justify-center space-x-2 p-4 h-auto transition-all duration-200",
                  isLinked
                    ? `${platform?.color} text-white border-2 border-transparent`
                    : "border-2 border-gray-400 bg-gray-800/50 text-gray-300 hover:border-orange-400 hover:bg-orange-400/10"
                )}
              >
                <Icon name={platform?.icon} size={18} />
                <span className="font-medium">{platform?.label}</span>
                {isLinked && <Icon name="Check" size={14} className="ml-auto" />}
              </Button>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-200 flex items-start space-x-2">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Link your preferred chat platforms to help others connect with you easily.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkChatsSection;