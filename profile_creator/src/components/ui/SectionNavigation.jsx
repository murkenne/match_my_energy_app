import React from 'react';
import Icon from '../AppIcon';

const SectionNavigation = ({ 
  sections = [],
  currentSection = 1,
  onSectionChange,
  className = "" 
}) => {
  const defaultSections = [
    { 
      id: 1, 
      title: 'Personal Information', 
      description: 'Basic details and contact info',
      icon: 'User',
      completed: false,
      hasErrors: false
    },
    { 
      id: 2, 
      title: 'Customize Profile', 
      description: 'Avatar, bio, and preferences',
      icon: 'Palette',
      completed: false,
      hasErrors: false
    },
    { 
      id: 3, 
      title: 'Privacy Settings', 
      description: 'Control your data and visibility',
      icon: 'Shield',
      completed: false,
      hasErrors: false
    },
    { 
      id: 4, 
      title: 'Review & Complete', 
      description: 'Final review and submission',
      icon: 'CheckCircle',
      completed: false,
      hasErrors: false
    }
  ];

  const navigationSections = sections?.length > 0 ? sections : defaultSections;

  const handleSectionClick = (sectionId) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {navigationSections?.map((section, index) => {
        const isActive = section?.id === currentSection;
        const isClickable = onSectionChange && typeof onSectionChange === 'function';
        
        return (
          <div key={section?.id} className="relative">
            {/* Section Header */}
            <div 
              className={`
                group relative p-4 rounded-lg border transition-smooth cursor-pointer
                ${isActive 
                  ? 'bg-primary/5 border-primary/20 shadow-soft' 
                  : 'bg-card border-border hover:border-primary/30 hover:bg-muted/50'
                }
                ${!isClickable ? 'cursor-default' : ''}
              `}
              onClick={() => isClickable && handleSectionClick(section?.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Section Icon */}
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-smooth
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : section?.completed 
                      ? 'bg-success text-success-foreground'
                      : section?.hasErrors
                        ? 'bg-error text-error-foreground'
                        : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  }
                `}>
                  {section?.completed && !isActive ? (
                    <Icon name="Check" size={20} />
                  ) : section?.hasErrors ? (
                    <Icon name="AlertCircle" size={20} />
                  ) : (
                    <Icon name={section?.icon} size={20} />
                  )}
                </div>

                {/* Section Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`
                      text-base font-medium transition-smooth
                      ${isActive ? 'text-foreground' : 'text-foreground group-hover:text-foreground'}
                    `}>
                      {section?.title}
                    </h3>
                    
                    {/* Status Indicators */}
                    <div className="flex items-center space-x-2">
                      {section?.completed && (
                        <div className="w-2 h-2 bg-success rounded-full" />
                      )}
                      {section?.hasErrors && (
                        <div className="w-2 h-2 bg-error rounded-full" />
                      )}
                      {isClickable && (
                        <Icon 
                          name="ChevronRight" 
                          size={16} 
                          className={`
                            transition-smooth
                            ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                          `}
                        />
                      )}
                    </div>
                  </div>
                  
                  <p className={`
                    text-sm mt-1 transition-smooth
                    ${isActive ? 'text-muted-foreground' : 'text-muted-foreground'}
                  `}>
                    {section?.description}
                  </p>
                </div>
              </div>

              {/* Active Section Indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
            </div>
            {/* Connection Line (except for last item) */}
            {index < navigationSections?.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-px h-4 bg-border" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionNavigation;