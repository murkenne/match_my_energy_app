import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CosmicBackground from '../../components/CosmicBackground';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import ProfileCard from './components/ProfileCard';
import UserActions from './components/UserActions';

const DatingProfileCardViewer = () => {
  const navigate = useNavigate();
  
  // Mock user data - in real app, this would come from props/API
  const [userProfile, setUserProfile] = useState({
    id: 'user123',
    fullName: 'Sarah Mitchell',
    age: 28,
    bio: 'Passionate about yoga, sustainable living, and exploring new cultures. Looking for someone who shares my love for adventure and meaningful conversations. Always up for hiking trails or trying new vegetarian restaurants!',
    profilePicture: null,
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    },
    birthInfo: {
      birthdate: '1996-03-15',
      birthTime: '14:30',
      birthLocation: 'Portland, OR',
    },
    astrology: {
      sunSign: 'Pisces',
      moonSign: 'Cancer',
      risingSign: 'Leo'
    },
    interests: ['Yoga', 'Travel', 'Photography', 'Cooking', 'Hiking'],
    privacySettings: {
      showBirthdate: false,
      showBirthTime: true,
      showBirthLocation: true,
      showAstrology: true
    },
    isOnline: true,
    lastSeen: '2 hours ago'
  });

  // Privacy toggle handlers
  const handlePrivacyToggle = (field) => {
    setUserProfile(prev => ({
      ...prev,
      privacySettings: {
        ...prev?.privacySettings,
        [field]: !prev?.privacySettings?.[field]
      }
    }));
  };

  return (
    <CosmicBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
              <h1 className="text-4xl font-bold mb-2">
                Profile Viewer
              </h1>
            </div>
            <p className="text-lg text-gray-200 opacity-90 mb-6">
              Discover your cosmic connection
            </p>
            
            {/* Navigation */}
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                variant="outline" 
                onClick={() => navigate(-1)}
                className="text-gray-300 border-white/20 hover:bg-white/10"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/profile-creation-form')}
                className="text-gray-300 border-white/20 hover:bg-white/10"
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Profile Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <ProfileCard
                userProfile={userProfile}
                onPrivacyToggle={handlePrivacyToggle}
                viewerMode={true}
                className=""
              />
            </div>

            {/* Actions Sidebar */}
            <div className="lg:col-span-1">
              <UserActions
                userId={userProfile?.id}
                userName={userProfile?.fullName}
                isOnline={userProfile?.isOnline}
                lastSeen={userProfile?.lastSeen}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default DatingProfileCardViewer;