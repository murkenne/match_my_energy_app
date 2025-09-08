import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BioSection = ({ 
  bio, 
  onBioChange, 
  error,
  maxLength = 500,
  className = "" 
}) => {
  const [characterCount, setCharacterCount] = useState(bio?.length || 0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setCharacterCount(bio?.length || 0);
  }, [bio]);

  const handleBioChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxLength) {
      setCharacterCount(value?.length);
      onBioChange(value);
    }
  };

  const getCharacterCountColor = () => {
    const percentage = (characterCount / maxLength) * 100;
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Bio & Description
          </h3>
          <div className={`text-sm ${getCharacterCountColor()}`}>
            {characterCount}/{maxLength}
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={bio || ''}
            onChange={handleBioChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Tell us about yourself... Share your interests, experience, or what makes you unique."
            className={`
              w-full min-h-[120px] px-4 py-3 border rounded-lg resize-none transition-smooth
              bg-input text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
              ${error ? 'border-error' : isFocused ? 'border-ring' : 'border-border'}
            `}
            rows={5}
          />
          
          {/* Character limit warning */}
          {characterCount >= maxLength * 0.9 && (
            <div className="absolute bottom-2 right-2">
              <Icon 
                name="AlertTriangle" 
                size={16} 
                className={characterCount >= maxLength ? 'text-error' : 'text-warning'} 
              />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-error text-sm mt-2">
            <Icon name="AlertCircle" size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Bio Tips */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Tips for a great bio:</p>
              <ul className="space-y-1 text-xs">
                <li>• Share your professional background or interests</li>
                <li>• Mention what you're passionate about</li>
                <li>• Keep it friendly and authentic</li>
                <li>• Include what you hope to achieve on this platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSection;