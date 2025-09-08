import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ 
  formData, 
  errors, 
  onChange,
  className = "" 
}) => {
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="cosmic-card rounded-lg p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          Personal Information
          <span className="text-red-400 ml-1">*</span>
        </h2>
        
        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
            className="cosmic-input"
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            description="We'll use this for account notifications"
            required
            className="cosmic-input"
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData?.phone || ''}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            description="Include country code (e.g., +1 555-123-4567)"
            className="cosmic-input"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              value={formData?.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
              error={errors?.dateOfBirth}
              max="2006-01-01"
              className="cosmic-input"
            />

            <Select
              label="Gender"
              options={genderOptions}
              value={formData?.gender || ''}
              onChange={(value) => handleInputChange('gender', value)}
              error={errors?.gender}
              placeholder="Select your gender"
              className="cosmic-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;