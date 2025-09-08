import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationSection = ({ 
  location, 
  onLocationChange, 
  errors,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' }
  ];

  const handleLocationChange = (field, value) => {
    const updatedLocation = {
      ...location,
      [field]: value
    };
    onLocationChange(updatedLocation);
  };

  const getLocationSummary = () => {
    const parts = [];
    if (location?.city) parts?.push(location?.city);
    if (location?.state) parts?.push(location?.state);
    if (location?.country) {
      const countryLabel = countryOptions?.find(opt => opt?.value === location?.country)?.label;
      if (countryLabel) parts?.push(countryLabel);
    }
    return parts?.length > 0 ? parts?.join(', ') : 'No location specified';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
        {/* Header */}
        <div 
          className="p-6 cursor-pointer hover:bg-muted/30 transition-smooth"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={20} className="text-accent" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Location
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getLocationSummary()}
                </p>
              </div>
            </div>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-border">
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  type="text"
                  placeholder="Enter your city"
                  value={location?.city || ''}
                  onChange={(e) => handleLocationChange('city', e?.target?.value)}
                  error={errors?.city}
                  className="w-full"
                />

                <Input
                  label="State/Province"
                  type="text"
                  placeholder="Enter your state or province"
                  value={location?.state || ''}
                  onChange={(e) => handleLocationChange('state', e?.target?.value)}
                  error={errors?.state}
                  className="w-full"
                />
              </div>

              <Select
                label="Country"
                options={countryOptions}
                value={location?.country || ''}
                onChange={(value) => handleLocationChange('country', value)}
                error={errors?.country}
                placeholder="Select your country"
                searchable
                className="w-full"
              />

              <Input
                label="Postal/Zip Code"
                type="text"
                placeholder="Enter your postal or zip code"
                value={location?.postalCode || ''}
                onChange={(e) => handleLocationChange('postalCode', e?.target?.value)}
                error={errors?.postalCode}
                className="w-full"
              />

              {/* Privacy Notice */}
              <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                <Icon name="Shield" size={16} className="text-accent mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Privacy Notice</p>
                  <p>Your exact address is never shared publicly. Only city and country may be visible to other users based on your privacy settings.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSection;