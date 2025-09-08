import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePreviewModal = ({ 
  isOpen, 
  onClose, 
  formData,
  className = "" 
}) => {
  if (!isOpen) return null;

  const formatSocialLinks = () => {
    if (!formData?.socialLinks) return [];
    return Object.entries(formData?.socialLinks)?.filter(([key, value]) => value && value?.trim())?.map(([key, value]) => ({ platform: key, url: value }));
  };

  const formatLocation = () => {
    if (!formData?.location) return '';
    const parts = [];
    if (formData?.location?.city) parts?.push(formData?.location?.city);
    if (formData?.location?.state) parts?.push(formData?.location?.state);
    if (formData?.location?.country) parts?.push(formData?.location?.country);
    return parts?.join(', ');
  };

  const getSocialIcon = (platform) => {
    const iconMap = {
      linkedin: 'Linkedin',
      twitter: 'Twitter',
      github: 'Github',
      instagram: 'Instagram',
      facebook: 'Facebook',
      website: 'Globe'
    };
    return iconMap?.[platform] || 'Link';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`
        bg-card border border-border rounded-lg shadow-soft max-w-2xl w-full max-h-[90vh] overflow-y-auto
        ${className}
      `}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Profile Preview</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center flex-shrink-0">
              {formData?.profilePicture ? (
                <Image
                  src={typeof formData?.profilePicture === 'string' ? formData?.profilePicture : URL.createObjectURL(formData?.profilePicture)}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} className="text-muted-foreground" />
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {formData?.fullName || 'Your Name'}
              </h3>
              <p className="text-muted-foreground mb-2">
                {formData?.email || 'your.email@example.com'}
              </p>
              {formatLocation() && (
                <div className="flex items-center justify-center sm:justify-start space-x-1 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span>{formatLocation()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio Section */}
          {formData?.bio && (
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">About</h4>
              <p className="text-muted-foreground leading-relaxed">
                {formData?.bio}
              </p>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData?.phone && (
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-accent" />
                <span className="text-sm text-foreground">{formData?.phone}</span>
              </div>
            )}
            {formData?.dateOfBirth && (
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-accent" />
                <span className="text-sm text-foreground">
                  Born {new Date(formData.dateOfBirth)?.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Interests */}
          {formData?.interests && formData?.interests?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Interests & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {formData?.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {formatSocialLinks()?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Connect With Me</h4>
              <div className="flex flex-wrap gap-3">
                {formatSocialLinks()?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-smooth text-sm text-foreground"
                  >
                    <Icon name={getSocialIcon(link?.platform)} size={16} />
                    <span className="capitalize">{link?.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-accent mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Privacy Settings Applied</p>
                <p className="text-muted-foreground text-xs">
                  This preview shows how your profile will appear to other users based on your current privacy settings. 
                  Some information may be hidden from public view.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close Preview
          </Button>
          <Button
            variant="default"
            iconName="Edit"
            iconPosition="left"
            onClick={onClose}
          >
            Continue Editing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreviewModal;