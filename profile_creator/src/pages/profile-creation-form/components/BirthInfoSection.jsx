import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BirthInfoSection = ({ 
  formData, 
  errors, 
  onChange,
  className = "" 
}) => {
  const [timeUnknown, setTimeUnknown] = useState(false);

  const timezones = [
    { value: 'PDT', label: 'PDT (UTC-07:00)' },
    { value: 'PST', label: 'PST (UTC-08:00)' },
    { value: 'MST', label: 'MST (UTC-07:00)' },
    { value: 'CST', label: 'CST (UTC-06:00)' },
    { value: 'EST', label: 'EST (UTC-05:00)' },
    { value: 'GMT', label: 'GMT (UTC+00:00)' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleTimeUnknownChange = (checked) => {
    setTimeUnknown(checked);
    if (checked) {
      handleInputChange('birthTime', '');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="cosmic-card rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Calendar" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-white">Birth Information</h2>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Birth Date"
            type="date"
            value={formData?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            error={errors?.dateOfBirth}
            max="2006-01-01"
            className="cosmic-input"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Birth Time"
              type="time"
              value={formData?.birthTime || ''}
              onChange={(e) => handleInputChange('birthTime', e?.target?.value)}
              error={errors?.birthTime}
              disabled={timeUnknown}
              className="cosmic-input"
            />

            <Select
              label="Timezone"
              options={timezones}
              value={formData?.timezone || ''}
              onChange={(value) => handleInputChange('timezone', value)}
              error={errors?.timezone}
              placeholder="Select timezone"
              className="cosmic-input"
            />
          </div>

          <Input
            label="Birth Location"
            type="text"
            placeholder="Los Angeles, USA"
            value={formData?.birthLocation || ''}
            onChange={(e) => handleInputChange('birthLocation', e?.target?.value)}
            error={errors?.birthLocation}
            className="cosmic-input"
          />

          <Checkbox
            id="time-unknown"
            checked={timeUnknown}
            onCheckedChange={handleTimeUnknownChange}
            label="Exact time unknown"
            description="Check this if you don't know your exact birth time"
          />
        </div>

        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-sm text-orange-200 flex items-start space-x-2">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
            <span>We use your birth details to compute accurate placements. You control what is shared.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthInfoSection;