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

  // Load user profile data from localStorage
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- loader with STEP 2 fallback to autosaved draft ---
  const loadUserProfile = () => {
    try {
      // Try to get saved profile data from localStorage
      const savedProfile = localStorage.getItem('userProfile');
      // STEP 2: fallback to the autosaved draft if userProfile doesn't exist yet
      const autoSaved = localStorage.getItem('profile-form-data');

      const savedPersonalInfo = localStorage.getItem('personalInfo');
      const savedInterests = localStorage.getItem('userInterests');
      const savedBio = localStorage.getItem('userBio');
      const savedProfilePicture = localStorage.getItem('profilePicture');
      const savedBirthInfo = localStorage.getItem('birthInfo');
      const savedLocation = localStorage.getItem('userLocation');
      const savedAstrology = localStorage.getItem('astrologyInfo');

      // Create profile object from various localStorage items
      let profile = {};

      if (savedProfile) {
        profile = JSON.parse(savedProfile);
      } else if (autoSaved) {
        // merge in the draft so the viewer shows what you just typed
        const draft = JSON.parse(autoSaved);
        profile = { ...profile, ...draft };
      }

      // Merge additional profile data from different localStorage keys
      if (savedPersonalInfo) {
        const personalInfo = JSON.parse(savedPersonalInfo);
        profile = {
          ...profile,
          fullName: personalInfo?.fullName || profile?.fullName,
          email: personalInfo?.email || profile?.email,
          phone: personalInfo?.phone || profile?.phone,
          dateOfBirth: personalInfo?.dateOfBirth || profile?.dateOfBirth,
          gender: personalInfo?.gender || profile?.gender,
        };
      }

      if (savedInterests) {
        const interests = JSON.parse(savedInterests);
        profile.interests = Array.isArray(interests) ? interests : [];
      }

      if (savedBio) {
        profile.bio = savedBio;
      }

      if (savedProfilePicture) {
        profile.profilePicture = savedProfilePicture;
      }

      if (savedBirthInfo) {
        const birthInfo = JSON.parse(savedBirthInfo);
        profile.birthInfo = birthInfo;
      }

      if (savedLocation) {
        const location = JSON.parse(savedLocation);
        profile.location = location;
      }

      if (savedAstrology) {
        const astrology = JSON.parse(savedAstrology);
        profile.astrology = astrology;
      }

      // Calculate age from date of birth if available
      if (profile?.dateOfBirth || profile?.birthInfo?.birthdate) {
        const birthDate = new Date(profile?.dateOfBirth || profile?.birthInfo?.birthdate);
        const today = new Date();
        const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        profile.age = age;
      }

      // Set default values for missing data
      const completeProfile = {
        id: profile?.id || 'user_' + Date.now(),
        fullName: profile?.fullName || 'Your Name',
        age: profile?.age || 25,
        bio: profile?.bio || 'No bio added yet. Edit your profile to add information about yourself.',
        profilePicture: profile?.profilePicture || null,
        location: profile?.location || {
          city: 'Your City',
          state: 'State',
          country: 'Country'
        },
        birthInfo: profile?.birthInfo || {
          birthdate: profile?.dateOfBirth || '',
          birthTime: '',
          birthLocation: '',
        },
        astrology: profile?.astrology || {
          sunSign: 'Unknown',
          moonSign: 'Unknown',
          risingSign: 'Unknown'
        },
        interests: profile?.interests || [],
        privacySettings: profile?.privacySettings || {
          showBirthdate: false,
          showBirthTime: true,
          showBirthLocation: true,
          showAstrology: true
        },
        isOnline: true,
        lastSeen: 'Now'
      };

      setUserProfile(completeProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);

      // Fallback to basic profile if error occurs
      setUserProfile({
        id: 'user_default',
        fullName: 'Your Name',
        age: 25,
        bio: 'Complete your profile to see your information here.',
        profilePicture: null,
        location: {
          city: 'Your City',
          state: 'State',
          country: 'Country'
        },
        birthInfo: {
          birthdate: '',
          birthTime: '',
          birthLocation: '',
        },
        astrology: {
          sunSign: 'Unknown',
          moonSign: 'Unknown',
          risingSign: 'Unknown'
        },
        interests: [],
        privacySettings: {
          showBirthdate: false,
          showBirthTime: true,
          showBirthLocation: true,
          showAstrology: true
        },
        isOnline: true,
        lastSeen: 'Now'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();

    // Live-refresh the viewer if another tab/page updates saved profile or draft
    const watchedKeys = new Set([
      'userProfile',
      'profile-form-data',
      'personalInfo',
      'userInterests',
      'userBio',
      'profilePicture',
      'birthInfo',
      'userLocation',
      'astrologyInfo',
    ]);
    const onStorage = (e) => {
      if (watchedKeys.has(e.key)) {
        loadUserProfile();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Privacy toggle handlers
  const handlePrivacyToggle = (field) => {
    setUserProfile(prev => {
      const updatedProfile = {
        ...prev,
        privacySettings: {
          ...prev?.privacySettings,
          [field]: !prev?.privacySettings?.[field]
        }
      };

      // Save updated privacy settings to localStorage
      try {
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      } catch (error) {
        console.error('Error saving privacy settings:', error);
      }

      return updatedProfile;
    });
  };

  if (loading) {
    return (
      <CosmicBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="mx-auto animate-spin text-white mb-4" />
            <p className="text-lg text-gray-200">Loading your profile...</p>
          </div>
        </div>
      </CosmicBackground>
    );
  }

  return (
    <CosmicBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
              <h1 className="text-4xl font-bold mb-2">
                My Profile Card
              </h1>
            </div>
            <p className="text-lg text-gray-200 opacity-90 mb-6">
              This is how others will see your profile
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

          {/* Profile Completion Notice */}
          {(!userProfile?.bio ||
            userProfile?.bio === 'No bio added yet. Edit your profile to add information about yourself.' ||
            !userProfile?.interests?.length ||
            userProfile?.fullName === 'Your Name') && (
            <div className="mb-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
              <div className="flex items-center space-x-2 text-orange-300">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm">
                  Complete your profile to show your real information instead of placeholders.
                </span>
              </div>
            </div>
          )}

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
