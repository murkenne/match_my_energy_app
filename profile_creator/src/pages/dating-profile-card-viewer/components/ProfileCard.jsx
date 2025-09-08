import React from 'react';
import Icon from '../../../components/AppIcon';
import Toggle from '../../../components/ui/Toggle';
import { cn } from '../../../utils/cn';

const ProfileCard = ({ userProfile, onPrivacyToggle, viewerMode = false, className }) => {
  // Calculate age from birthdate
  const calculateAge = (birthdate) => {
    if (!birthdate) return null;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    return age;
  };

  // Zodiac symbols mapping
  const zodiacSymbols = {
    Aries: '♈',
    Taurus: '♉',
    Gemini: '♊',
    Cancer: '♋',
    Leo: '♌',
    Virgo: '♍',
    Libra: '♎',
    Scorpio: '♏',
    Sagittarius: '♐',
    Capricorn: '♑',
    Aquarius: '♒',
    Pisces: '♓'
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'Not provided';
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  let age = calculateAge(userProfile?.birthInfo?.birthdate);

  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden",
      className
    )}>
      {/* Header with Profile Photo */}
      <div className="relative p-8 pb-4">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-white/10">
              {userProfile?.profilePicture ? (
                <img
                  src={userProfile?.profilePicture}
                  alt={`${userProfile?.fullName}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60">
                  <Icon name="User" size={48} />
                </div>
              )}
            </div>
            {/* Online Status */}
            {userProfile?.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          {/* Name and Age */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-white mb-1">
              {userProfile?.fullName}
              {age && <span className="text-2xl font-normal text-gray-300 ml-2">({age})</span>}
            </h2>
            {userProfile?.location?.city && (
              <p className="text-gray-400 flex items-center justify-center">
                <Icon name="MapPin" size={16} className="mr-1" />
                {userProfile?.location?.city}, {userProfile?.location?.state}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="px-8 py-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Icon name="FileText" size={18} className="text-orange-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">About Me</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            {userProfile?.bio || 'No bio available'}
          </p>
        </div>
      </div>

      {/* Personal Information Section with Privacy Controls */}
      <div className="px-8 py-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Icon name="Calendar" size={18} className="text-pink-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          </div>

          <div className="space-y-4">
            {/* Birthdate */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-gray-400" />
                <div>
                  <span className="text-white font-medium">Birthdate</span>
                  <p className="text-sm text-gray-400">
                    {userProfile?.privacySettings?.showBirthdate 
                      ? formatDate(userProfile?.birthInfo?.birthdate)
                      : 'Hidden for privacy'
                    }
                  </p>
                </div>
              </div>
              {!viewerMode && (
                <Toggle
                  checked={userProfile?.privacySettings?.showBirthdate}
                  onChange={() => onPrivacyToggle('showBirthdate')}
                  size="sm"
                />
              )}
            </div>

            {/* Birth Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-gray-400" />
                <div>
                  <span className="text-white font-medium">Birth Time</span>
                  <p className="text-sm text-gray-400">
                    {userProfile?.privacySettings?.showBirthTime 
                      ? formatTime(userProfile?.birthInfo?.birthTime)
                      : 'Hidden for privacy'
                    }
                  </p>
                </div>
              </div>
              {!viewerMode && (
                <Toggle
                  checked={userProfile?.privacySettings?.showBirthTime}
                  onChange={() => onPrivacyToggle('showBirthTime')}
                  size="sm"
                />
              )}
            </div>

            {/* Birth Location */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-gray-400" />
                <div>
                  <span className="text-white font-medium">Birth Location</span>
                  <p className="text-sm text-gray-400">
                    {userProfile?.privacySettings?.showBirthLocation 
                      ? (userProfile?.birthInfo?.birthLocation || 'Not provided')
                      : 'Hidden for privacy'
                    }
                  </p>
                </div>
              </div>
              {!viewerMode && (
                <Toggle
                  checked={userProfile?.privacySettings?.showBirthLocation}
                  onChange={() => onPrivacyToggle('showBirthLocation')}
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Astrological Information */}
      <div className="px-8 py-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Icon name="Star" size={18} className="text-yellow-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Astrological Trinity</h3>
            </div>
            {!viewerMode && (
              <Toggle
                checked={userProfile?.privacySettings?.showAstrology}
                onChange={() => onPrivacyToggle('showAstrology')}
                size="sm"
              />
            )}
          </div>

          {userProfile?.privacySettings?.showAstrology ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sun Sign */}
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl mb-2">
                  {zodiacSymbols?.[userProfile?.astrology?.sunSign] || '☀️'}
                </div>
                <div className="text-white font-medium">Sun Sign</div>
                <div className="text-orange-300">{userProfile?.astrology?.sunSign || 'Unknown'}</div>
              </div>

              {/* Moon Sign */}
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl mb-2">
                  {zodiacSymbols?.[userProfile?.astrology?.moonSign] || '🌙'}
                </div>
                <div className="text-white font-medium">Moon Sign</div>
                <div className="text-blue-300">{userProfile?.astrology?.moonSign || 'Unknown'}</div>
              </div>

              {/* Rising Sign */}
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl mb-2">
                  {zodiacSymbols?.[userProfile?.astrology?.risingSign] || '⬆️'}
                </div>
                <div className="text-white font-medium">Rising Sign</div>
                <div className="text-purple-300">{userProfile?.astrology?.risingSign || 'Unknown'}</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="Eye" size={24} className="text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Astrological information hidden for privacy</p>
            </div>
          )}
        </div>
      </div>

      {/* Interests */}
      {userProfile?.interests?.length > 0 && (
        <div className="px-8 py-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Icon name="Heart" size={18} className="text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile?.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-200 rounded-full text-sm border border-orange-500/30"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-8 py-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {userProfile?.isOnline 
              ? '🟢 Online now'
              : `Last seen ${userProfile?.lastSeen || 'recently'}`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;