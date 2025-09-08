import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const UserActions = ({ userId, userName, isOnline, lastSeen, className }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleMessage = () => {
    // In real app, navigate to messaging or open chat modal
    console.log(`Opening message to ${userName}`);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log(`${isFavorited ? 'Unfavorited' : 'Favorited'} ${userName}`);
  };

  const handleCompatibility = () => {
    // In real app, navigate to compatibility analysis
    console.log(`Viewing compatibility with ${userName}`);
  };

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
    console.log(`${isBlocked ? 'Unblocked' : 'Blocked'} ${userName}`);
  };

  const handleReport = () => {
    // In real app, open report modal
    console.log(`Reporting ${userName}`);
  };

  if (isBlocked) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
          <div className="text-center">
            <Icon name="UserX" size={32} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">User Blocked</h3>
            <p className="text-gray-400 text-sm mb-4">
              You have blocked this user. They will not be able to contact you.
            </p>
            <Button
              onClick={handleBlock}
              variant="outline"
              className="text-gray-300 border-white/20 hover:bg-white/10"
            >
              Unblock User
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Status Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
        <div className="text-center">
          <div className="mb-4">
            {isOnline ? (
              <div className="flex items-center justify-center text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Online now</span>
              </div>
            ) : (
              <div className="flex items-center justify-center text-gray-400">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                <span className="text-sm">Last seen {lastSeen}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
        <div className="space-y-3">
          {/* Message Button */}
          <Button
            onClick={handleMessage}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 
                     hover:from-orange-600 hover:to-pink-600 text-white font-semibold
                     transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Send Message
          </Button>

          {/* Favorite Button */}
          <Button
            onClick={handleFavorite}
            variant={isFavorited ? "default" : "outline"}
            className={cn(
              "w-full transition-all duration-200",
              isFavorited 
                ? "bg-red-500 hover:bg-red-600 text-white" :"text-gray-300 border-white/20 hover:bg-white/10"
            )}
          >
            <Icon 
              name={isFavorited ? "Heart" : "Heart"} 
              size={16} 
              className={cn("mr-2", isFavorited && "fill-current")} 
            />
            {isFavorited ? 'Favorited' : 'Add to Favorites'}
          </Button>

          {/* Compatibility Button */}
          <Button
            onClick={handleCompatibility}
            variant="outline"
            className="w-full text-gray-300 border-white/20 hover:bg-white/10"
          >
            <Icon name="Star" size={16} className="mr-2" />
            View Compatibility
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Profile Views</span>
            <span className="text-white font-medium">127</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Response Rate</span>
            <span className="text-green-400 font-medium">94%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Compatibility</span>
            <span className="text-orange-400 font-medium">87%</span>
          </div>
        </div>
      </div>

      {/* Safety Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Safety</h3>
        <div className="space-y-3">
          <Button
            onClick={handleBlock}
            variant="outline"
            className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10"
          >
            <Icon name="UserX" size={16} className="mr-2" />
            Block User
          </Button>
          
          <Button
            onClick={handleReport}
            variant="outline"
            className="w-full text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10"
          >
            <Icon name="Flag" size={16} className="mr-2" />
            Report User
          </Button>
        </div>
      </div>

      {/* Profile Tips */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
        <div className="text-center">
          <Icon name="Lightbulb" size={24} className="text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Connection Tip</h3>
          <p className="text-gray-400 text-sm">
            Start with a genuine compliment about their interests or ask about their astrological compatibility!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserActions;