import React from 'react';
import { cn } from '../../../utils/cn';
import Icon from '../../../components/AppIcon';

const IdentitySection = ({ 
  formData, 
  errors, 
  onChange,
  className = "" 
}) => {
  const genderOptions = [
    { value: 'female', label: 'Female', icon: 'User' },
    { value: 'male', label: 'Male', icon: 'User' },
    { value: 'non-binary', label: 'Non-binary', icon: 'Users' },
    { value: 'other', label: 'Other', icon: 'Users' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="cosmic-card rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="User" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-white">Identity</h2>
        </div>
        
        <div className="space-y-4">
          {/* Gender Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              {genderOptions?.map((option) => (
                <button
                  key={option?.value}
                  type="button"
                  onClick={() => handleInputChange('gender', option?.value)}
                  className={cn(
                    "flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200",
                    formData?.gender === option?.value
                      ? "border-orange-500 bg-orange-500/20 text-white" :"border-gray-400 bg-gray-800/50 text-gray-300 hover:border-orange-400 hover:bg-orange-400/10"
                  )}
                >
                  <Icon name={option?.icon} size={16} />
                  <span className="text-sm font-medium">{option?.label}</span>
                </button>
              ))}
            </div>
            {errors?.gender && (
              <p className="text-sm text-red-400">{errors?.gender}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;