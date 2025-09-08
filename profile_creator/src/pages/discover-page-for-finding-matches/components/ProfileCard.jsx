import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileCard = ({ profile, isFavorited, onFavorite, onMessage, onViewProfile }) => {
  const getZodiacIcon = (sign) => {
    const iconMap = {
      'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
      'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    };
    return iconMap?.[sign] || '✨';
  };

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/15 group">
      {/* Profile Image */}
      <div className="relative">
        <div className="w-full h-80 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
          <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
            <Icon name="User" size={64} className="text-white/70" />
          </div>
        </div>
        
        {/* Compatibility Badge */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
          <span className={getCompatibilityColor(profile?.compatibility)}>
            {profile?.compatibility}%
          </span> match
        </div>

        {/* Favorite Button */}
        <button
          onClick={onFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorited 
              ? 'bg-red-500/80 text-white' :'bg-black/30 text-white/70 hover:bg-black/50 hover:text-white'
          }`}
        >
          <Icon name="Heart" size={20} className={isFavorited ? 'fill-current' : ''} />
        </button>

        {/* Distance */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
          {profile?.distance} miles away
        </div>
      </div>
      {/* Profile Info */}
      <div className="p-6">
        {/* Name and Age */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{profile?.name}</h3>
          <span className="text-white/70 text-sm">{profile?.age} years old</span>
        </div>

        {/* Astrological Trinity */}
        <div className="flex items-center justify-center space-x-6 mb-4 bg-white/5 rounded-lg py-3">
          <div className="text-center">
            <div className="text-2xl mb-1">{getZodiacIcon(profile?.sun)}</div>
            <div className="text-xs text-white/70">Sun</div>
            <div className="text-sm text-white font-medium">{profile?.sun}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">{getZodiacIcon(profile?.moon)}</div>
            <div className="text-xs text-white/70">Moon</div>
            <div className="text-sm text-white font-medium">{profile?.moon}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">{getZodiacIcon(profile?.rising)}</div>
            <div className="text-xs text-white/70">Rising</div>
            <div className="text-sm text-white font-medium">{profile?.rising}</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
          {profile?.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-4">
          {profile?.interests?.slice(0, 3)?.map((interest, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
            >
              {interest}
            </span>
          ))}
          {profile?.interests?.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60 border border-white/20">
              +{profile?.interests?.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={onMessage}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 text-sm"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Message
          </Button>
          <Button
            onClick={onViewProfile}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 py-2 text-sm"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;