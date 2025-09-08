import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgressIndicator = ({ 
  completionPercentage = 0,
  completedSections = [],
  totalSections = 6,
  className = "" 
}) => {
  const sections = [
    { key: 'personal', label: 'Personal Info', icon: 'User' },
    { key: 'picture', label: 'Profile Picture', icon: 'Camera' },
    { key: 'bio', label: 'Bio', icon: 'FileText' },
    { key: 'social', label: 'Social Links', icon: 'Link' },
    { key: 'location', label: 'Location', icon: 'MapPin' },
    { key: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  const getProgressColor = () => {
    if (completionPercentage >= 80) return 'bg-success';
    if (completionPercentage >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const getProgressText = () => {
    if (completionPercentage >= 100) return 'Profile Complete!';
    if (completionPercentage >= 80) return 'Almost Done';
    if (completionPercentage >= 50) return 'Good Progress';
    return 'Getting Started';
  };

  return (
    <div className={`sticky top-20 ${className}`}>
      <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Profile Progress</h3>
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(completionPercentage)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Progress Status */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon 
            name={completionPercentage >= 100 ? "CheckCircle" : "Clock"} 
            size={16} 
            className={completionPercentage >= 100 ? "text-success" : "text-muted-foreground"} 
          />
          <span className="text-sm font-medium text-foreground">
            {getProgressText()}
          </span>
        </div>

        {/* Section Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Sections
          </h4>
          <div className="space-y-1">
            {sections?.map((section) => {
              const isCompleted = completedSections?.includes(section?.key);
              return (
                <div 
                  key={section?.key}
                  className="flex items-center space-x-2 text-sm"
                >
                  <div className={`
                    w-4 h-4 rounded-full flex items-center justify-center transition-smooth
                    ${isCompleted 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={10} />
                    ) : (
                      <Icon name={section?.icon} size={10} />
                    )}
                  </div>
                  <span className={`
                    transition-smooth
                    ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {section?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Reward */}
        {completionPercentage >= 100 && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Congratulations! Profile completed.
              </span>
            </div>
          </div>
        )}

        {/* Next Steps */}
        {completionPercentage < 100 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Next Steps:</p>
                <p>Complete all sections to unlock your full profile and start connecting with others.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormProgressIndicator;