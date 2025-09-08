import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  sections = [],
  className = "" 
}) => {
  const defaultSections = [
    { id: 1, label: 'Personal Info', completed: false },
    { id: 2, label: 'Customize Profile', completed: false },
    { id: 3, label: 'Privacy Settings', completed: false },
    { id: 4, label: 'Review & Complete', completed: false }
  ];

  const progressSections = sections?.length > 0 ? sections : defaultSections;
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-soft ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Profile Progress</h3>
        <span className="text-xs text-muted-foreground">{progressPercentage}% Complete</span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-smooth"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Desktop: Detailed Section List */}
      <div className="hidden lg:block space-y-2">
        {progressSections?.map((section, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = section?.completed || index + 1 < currentStep;
          
          return (
            <div 
              key={section?.id}
              className={`flex items-center space-x-3 p-2 rounded-md transition-smooth ${
                isActive ? 'bg-primary/10 border border-primary/20' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : isActive 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={12} />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm ${
                isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {section?.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Mobile: Compact Step Indicators */}
      <div className="lg:hidden flex items-center justify-center space-x-2">
        {progressSections?.map((section, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = section?.completed || index + 1 < currentStep;
          
          return (
            <div 
              key={section?.id}
              className={`w-3 h-3 rounded-full transition-smooth ${
                isCompleted 
                  ? 'bg-success' 
                  : isActive 
                    ? 'bg-primary' :'bg-muted'
              }`}
            />
          );
        })}
      </div>
      {/* Mobile: Current Step Label */}
      <div className="lg:hidden text-center mt-3">
        <span className="text-sm text-muted-foreground">
          Step {currentStep}: {progressSections?.[currentStep - 1]?.label}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;