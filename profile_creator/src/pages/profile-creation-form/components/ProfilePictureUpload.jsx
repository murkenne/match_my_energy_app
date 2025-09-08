import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePictureUpload = ({ 
  profilePicture, 
  onImageChange, 
  error,
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profilePicture || null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes?.includes(file?.type)) {
      onImageChange(null, "Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file?.size > maxSize) {
      onImageChange(null, "Image size must be less than 5MB");
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e?.target?.result);
      onImageChange(file, null);
    };
    reader?.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelect(files?.[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null, null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Profile Picture
        </h3>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture Preview */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={48} className="text-muted-foreground" />
              )}
            </div>
            
            {previewUrl && (
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-error/90 transition-smooth shadow-soft"
                aria-label="Remove profile picture"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Upload Area */}
          <div
            className={`
              w-full max-w-sm border-2 border-dashed rounded-lg p-6 text-center transition-smooth cursor-pointer
              ${isDragging 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <Icon 
              name="Upload" 
              size={32} 
              className={`mx-auto mb-2 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} 
            />
            <p className="text-sm text-foreground font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={triggerFileInput}
            >
              Choose File
            </Button>
            
            {previewUrl && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={handleRemoveImage}
                className="text-error hover:text-error hover:bg-error/10"
              >
                Remove
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-error text-sm">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfilePictureUpload;