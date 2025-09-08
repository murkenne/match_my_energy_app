import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const ActionBar = ({ 
  onSave,
  onPreview,
  onSubmit,
  onBack,
  canSave = true,
  canPreview = true,
  canSubmit = false,
  canGoBack = false,
  isSaving = false,
  isSubmitting = false,
  hasUnsavedChanges = false,
  className = ""
}) => {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-soft
      ${className}
    `}>
      <div className="max-w-form mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Actions */}
          <div className="flex items-center space-x-3">
            {canGoBack && onBack && (
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground"
              >
                Back
              </Button>
            )}
            
            {/* Unsaved Changes Indicator */}
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm">Unsaved changes</span>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Save Draft */}
            {canSave && onSave && (
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                iconPosition="left"
                onClick={onSave}
                disabled={isSaving || isSubmitting}
                loading={isSaving}
                className="hidden sm:flex"
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
            )}

            {/* Preview */}
            {canPreview && onPreview && (
              <Button
                variant="secondary"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={onPreview}
                disabled={isSaving || isSubmitting}
                className="hidden md:flex"
              >
                Preview
              </Button>
            )}

            {/* Submit/Complete */}
            {canSubmit && onSubmit && (
              <Button
                variant="default"
                size="sm"
                iconName="Check"
                iconPosition="left"
                onClick={onSubmit}
                disabled={isSaving || isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Completing...' : 'Complete Profile'}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Compact Actions */}
        <div className="sm:hidden pb-2">
          <div className="flex items-center space-x-2">
            {canSave && onSave && (
              <Button
                variant="outline"
                size="xs"
                iconName="Save"
                onClick={onSave}
                disabled={isSaving || isSubmitting}
                loading={isSaving}
                fullWidth
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            )}
            
            {canPreview && onPreview && (
              <Button
                variant="secondary"
                size="xs"
                iconName="Eye"
                onClick={onPreview}
                disabled={isSaving || isSubmitting}
                fullWidth
              >
                Preview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;