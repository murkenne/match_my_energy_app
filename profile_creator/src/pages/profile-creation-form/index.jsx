import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CosmicBackground from '../../components/CosmicBackground';
import Button from '../../components/ui/Button';
import AutoSaveIndicator from '../../components/ui/AutoSaveIndicator';
import Icon from '../../components/AppIcon';

// Import all form section components
import PersonalInfoSection from './components/PersonalInfoSection';
import ProfilePictureUpload from './components/ProfilePictureUpload';
import BioSection from './components/BioSection';
import SocialLinksSection from './components/SocialLinksSection';
import LocationSection from './components/LocationSection';
import EnhancedInterestsSection from './components/EnhancedInterestsSection';
import PrivacySettingsSection from './components/PrivacySettingsSection';
import FormProgressIndicator from './components/FormProgressIndicator';
import ProfilePreviewModal from './components/ProfilePreviewModal';

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
const isPhone = (v) => /^\+?[\d\s\-\(\)]+$/.test(v || '');

const CompleteCosmicProfile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <— used to read the seed from navigate state

  // Complete form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',

    // Profile Details
    profilePicture: null,
    bio: '',

    // Location
    location: {
      city: '',
      state: '',
      country: '',
      postalCode: ''
    },

    // Social Links
    socialLinks: {},

    // Interests
    interests: [],

    // Privacy Settings
    privacySettings: {
      profileVisible: true,
      showEmail: false,
      showLocation: true,
      allowMessages: true,
      showSocialLinks: true,
      searchable: true
    }
  });

  // Form state management
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSection, setCurrentSection] = useState('personal');

  // Auto-save functionality
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Section configuration
  const sections = [
    { key: 'personal', label: 'Personal Info', icon: 'User', component: PersonalInfoSection },
    { key: 'picture', label: 'Profile Picture', icon: 'Camera', component: ProfilePictureUpload },
    { key: 'bio', label: 'Bio', icon: 'FileText', component: BioSection },
    { key: 'interests', label: 'Interests', icon: 'Heart', component: EnhancedInterestsSection },
    { key: 'social', label: 'Social Links', icon: 'Link', component: SocialLinksSection },
    { key: 'location', label: 'Location', icon: 'MapPin', component: LocationSection },
    { key: 'privacy', label: 'Privacy', icon: 'Shield', component: PrivacySettingsSection }
  ];

  // Auto-save implementation
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges) return;

    setAutoSaveStatus('saving');
    try {
      // Simulate auto-save to localStorage
      localStorage?.setItem('profile-form-data', JSON.stringify(formData));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAutoSaveStatus('saved');
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      setAutoSaveStatus('error');
    }
  }, [formData, hasUnsavedChanges]);

  // Auto-save timer
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(autoSave, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, autoSave]);

  // Load saved data + onboarding seed on mount
  useEffect(() => {
    try {
      // 1) Start from current defaults
      let merged = { ...formData };

      // 2) Merge any autosaved data first (highest fidelity)
      const savedStr = localStorage?.getItem('profile-form-data');
      if (savedStr) {
        const saved = JSON.parse(savedStr);
        merged = { ...merged, ...saved };
      }

      // 3) Pull seed from navigation state or localStorage
      const seedFromNav = location?.state?.seed;
      const seedStr = localStorage?.getItem('onboarding-seed');
      const seed = seedFromNav || (seedStr ? JSON.parse(seedStr) : null);

      if (seed) {
        // Map: first+last -> fullName
        const fullName = [seed.firstName, seed.lastName].filter(Boolean).join(' ').trim();
        if (fullName && !merged.fullName) merged.fullName = fullName;

        // Map: emailOrPhone -> email OR phone
        if (seed.emailOrPhone) {
          if (isEmail(seed.emailOrPhone) && !merged.email) {
            merged.email = seed.emailOrPhone;
          } else if (isPhone(seed.emailOrPhone) && !merged.phone) {
            merged.phone = seed.emailOrPhone;
          }
        }

        // Map: dateOfBirth
        if (seed.dateOfBirth && !merged.dateOfBirth) {
          merged.dateOfBirth = seed.dateOfBirth;
        }
      }

      setFormData(merged);
      setLastSaved(new Date());
      // do NOT set hasUnsavedChanges — this is just a prefill
    } catch (error) {
      console.error('Error loading saved/seed data:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generic field change handler
  const handleFieldChange = (field, value) => {
    if (field?.includes('.')) {
      // Handle nested objects like location.city
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    setHasUnsavedChanges(true);
    setAutoSaveStatus('idle');

    // Clear field error
    if (errors?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.[field];
        return newErrors;
      });
    }
  };

  // Profile picture handler
  const handleImageChange = (file, error) => {
    if (error) {
      setErrors(prev => ({ ...prev, profilePicture: error }));
    } else {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.profilePicture;
        return newErrors;
      });
    }
    setHasUnsavedChanges(true);
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    let completed = 0;
    const totalSections = sections?.length;

    // Personal Info
    if (formData?.fullName && formData?.email && formData?.dateOfBirth) completed++;
    // Profile Picture
    if (formData?.profilePicture) completed++;
    // Bio
    if (formData?.bio?.trim()) completed++;
    // Interests
    if (formData?.interests?.length > 0) completed++;
    // Social Links
    if (Object.values(formData?.socialLinks || {})?.some(link => link?.trim())) completed++;
    // Location
    if (formData?.location?.city || formData?.location?.country) completed++;
    // Privacy (always considered complete as it has defaults)
    completed++;

    return Math.round((completed / totalSections) * 100);
  };

  // Get completed sections
  const getCompletedSections = () => {
    let completed = [];
    if (formData?.fullName && formData?.email && formData?.dateOfBirth) completed?.push('personal');
    if (formData?.profilePicture) completed?.push('picture');
    if (formData?.bio?.trim()) completed?.push('bio');
    if (formData?.interests?.length > 0) completed?.push('interests');
    if (Object.values(formData?.socialLinks || {})?.some(link => link?.trim())) completed?.push('social');
    if (formData?.location?.city || formData?.location?.country) completed?.push('location');
    completed?.push('privacy'); // Always complete
    return completed;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData?.dateOfBirth);
      const today = new Date();
      const age = today?.getFullYear() - birthDate?.getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old';
      }
    }

    // Optional phone validation
    if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Bio length validation
    if (formData?.bio?.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // --- helpers to persist profile for the viewer ---
  const fileToDataURL = (file) =>
    new Promise((resolve) => {
      if (!file) return resolve(null);
      if (typeof file === "string") return resolve(file); // already a URL/DataURL
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  const saveProfileForViewer = async (data) => {
    // normalize into the shape your viewer expects
    const pictureDataURL = await fileToDataURL(data?.profilePicture);

    const personalInfo = {
      fullName: data?.fullName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      dateOfBirth: data?.dateOfBirth || "",
      gender: data?.gender || "",
    };

    const birthInfo = {
      birthdate: data?.dateOfBirth || "",
      birthTime: "",                // you can wire this later if you collect it
      birthLocation: "",            // you can wire this later if you collect it
    };

    const location = {
      city: data?.location?.city || "",
      state: data?.location?.state || "",
      country: data?.location?.country || "",
    };

    const userProfile = {
      id: personalInfo.email || `user_${Date.now()}`,
      fullName: personalInfo.fullName || "Your Name",
      bio: data?.bio || "",
      profilePicture: pictureDataURL,
      location,
      birthInfo,
      astrology: data?.astrology || { sunSign: "Unknown", moonSign: "Unknown", risingSign: "Unknown" },
      interests: Array.isArray(data?.interests) ? data.interests : [],
      privacySettings: {
        showBirthdate: !!birthInfo.birthdate,
        showBirthTime: !!birthInfo.birthTime,
        showBirthLocation: !!birthInfo.birthLocation,
        showAstrology: true,
        ...(data?.privacySettings || {}),
      },
      isOnline: true,
      lastSeen: "Now",
    };

    // keys your viewer already loads
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    localStorage.setItem("userInterests", JSON.stringify(userProfile.interests));
    localStorage.setItem("userBio", userProfile.bio || "");
    if (pictureDataURL) localStorage.setItem("profilePicture", pictureDataURL);
    localStorage.setItem("birthInfo", JSON.stringify(birthInfo));
    localStorage.setItem("userLocation", JSON.stringify(location));
    localStorage.setItem("astrologyInfo", JSON.stringify(userProfile.astrology));

    // also set these so other pages can find "the logged in me"
    localStorage.setItem("currentUser", JSON.stringify(userProfile));
    if (personalInfo.email) localStorage.setItem("authEmail", personalInfo.email);
    localStorage.setItem("isAuthenticated", "true");
  };


  // Form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save final data
      await autoSave();

      // Simulate API submission
      // Simulate API
      await new Promise((r) => setTimeout(r, 600));

      // Persist for the viewer and auth context
      await saveProfileForViewer(formData);

      // Clear temp autosave/seed
      localStorage.removeItem('profile-form-data');
      localStorage.removeItem('onboarding-seed');

      // Go straight to your card
      navigate('/profile-viewer');

    } catch (error) {
      setErrors({ submit: 'Failed to create profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current section
  const renderCurrentSection = () => {
    const section = sections?.find(s => s?.key === currentSection);
    if (!section) return null;

    const SectionComponent = section?.component;

    const commonProps = {
      formData,
      errors,
      onChange: handleFieldChange,
      className: "mb-8"
    };

    switch (currentSection) {
      case 'personal':
        return <SectionComponent {...commonProps} />;
      case 'picture':
        return (
          <SectionComponent
            profilePicture={formData?.profilePicture}
            onImageChange={handleImageChange}
            error={errors?.profilePicture}
            className="mb-8"
          />
        );
      case 'bio':
        return (
          <SectionComponent
            bio={formData?.bio}
            onBioChange={(value) => handleFieldChange('bio', value)}
            error={errors?.bio}
            className="mb-8"
          />
        );
      case 'interests':
        return (
          <SectionComponent
            interests={formData?.interests}
            onInterestsChange={(value) => handleFieldChange('interests', value)}
            className="mb-8"
          />
        );
      case 'social':
        return (
          <SectionComponent
            socialLinks={formData?.socialLinks}
            onSocialLinksChange={(value) => handleFieldChange('socialLinks', value)}
            errors={errors}
            className="mb-8"
          />
        );
      case 'location':
        return (
          <SectionComponent
            location={formData?.location}
            onLocationChange={(value) => handleFieldChange('location', value)}
            errors={errors}
            className="mb-8"
          />
        );
      case 'privacy':
        return (
          <SectionComponent
            privacySettings={formData?.privacySettings}
            onPrivacySettingsChange={(value) => handleFieldChange('privacySettings', value)}
            className="mb-8"
          />
        );
      default:
        return null;
    }
  };

  const completionPercentage = calculateCompletionPercentage();
  const completedSections = getCompletedSections();

  return (
    <CosmicBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Form Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                  <h1 className="text-4xl font-bold mb-2">
                    Complete Your Cosmic Profile
                  </h1>
                </div>
                <p className="text-lg text-gray-200 opacity-90 mb-4">
                  Create a comprehensive profile that showcases who you are
                </p>

                {/* Already have an account link */}
                <div className="mb-4">
                  <p className="text-gray-300 text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login-page-for-existing-members')}
                      className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">
                  {completionPercentage}% Complete
                </p>
              </div>

              {/* Section Navigation */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  {sections?.map((section) => {
                    const isCompleted = completedSections?.includes(section?.key);
                    const isCurrent = currentSection === section?.key;

                    return (
                      <button
                        key={section?.key}
                        onClick={() => setCurrentSection(section?.key)}
                        className={`
                          flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${isCurrent
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                            : isCompleted
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/20'
                          }
                        `}
                      >
                        <Icon
                          name={isCompleted ? 'Check' : section?.icon}
                          size={16}
                        />
                        <span>{section?.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit}>
                {renderCurrentSection()}

                {/* Navigation Buttons */}
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = sections?.findIndex(s => s?.key === currentSection);
                        if (currentIndex > 0) {
                          setCurrentSection(sections?.[currentIndex - 1]?.key);
                        }
                      }}
                      disabled={sections?.findIndex(s => s?.key === currentSection) === 0}
                      className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Icon name="ChevronLeft" size={16} />
                      <span>Previous</span>
                    </button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => { await saveProfileForViewer(formData); navigate('/profile-viewer'); }}
                      className="px-6 py-3"
                    >
                      <Icon name="Eye" size={16} className="mr-2" />
                      Save & View Card
                    </Button>

                    {sections?.findIndex(s => s?.key === currentSection) === sections?.length - 1 ? (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <Icon name="Loader2" size={16} className="animate-spin" />
                            <span>Creating Profile...</span>
                          </div>
                        ) : (
                          'Complete Profile'
                        )}
                      </Button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const currentIndex = sections?.findIndex(s => s?.key === currentSection);
                          if (currentIndex < sections?.length - 1) {
                            setCurrentSection(sections?.[currentIndex + 1]?.key);
                          }
                        }}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200"
                      >
                        <span>Next</span>
                        <Icon name="ChevronRight" size={16} />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/dating-preferences-questionnaire')}
                    className="w-full text-gray-400 hover:text-white transition-colors py-2"
                  >
                    Skip and continue later
                  </button>
                </div>

                {/* Submit Error */}
                {errors?.submit && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-300">
                      <Icon name="AlertCircle" size={16} />
                      <span>{errors?.submit}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FormProgressIndicator
                completionPercentage={completionPercentage}
                completedSections={completedSections}
                totalSections={sections?.length}
                className="mb-6"
              />

              {/* Quick Tips */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Lightbulb" size={20} className="text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Profile Tips</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-green-400 mt-0.5" />
                    <span>Complete all sections for better visibility</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-green-400 mt-0.5" />
                    <span>Add interests to connect with like-minded people</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-green-400 mt-0.5" />
                    <span>Upload a clear profile picture</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-green-400 mt-0.5" />
                    <span>Your data is automatically saved as you type</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-save Indicator */}
        <AutoSaveIndicator
          status={autoSaveStatus}
          lastSaved={lastSaved}
        />

        {/* Profile Preview Modal */}
        <ProfilePreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
        />
      </div >
    </CosmicBackground >
  );
};

export default CompleteCosmicProfile;
