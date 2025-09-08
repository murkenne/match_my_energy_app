import React, { useEffect, useState } from 'react';
import Icon from '../AppIcon';

const AutoSaveIndicator = ({ 
  status = 'idle', // 'idle', 'saving', 'saved', 'error'
  lastSaved = null,
  className = "" 
}) => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (status === 'saving' || status === 'saved' || status === 'error') {
      setShowIndicator(true);
      
      if (status === 'saved') {
        const timer = setTimeout(() => {
          setShowIndicator(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [status]);

  const getStatusConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          className: 'text-muted-foreground',
          iconClassName: 'animate-spin'
        };
      case 'saved':
        return {
          icon: 'Check',
          text: 'Saved',
          className: 'text-success',
          iconClassName: 'animate-scale-gentle'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          text: 'Save failed',
          className: 'text-error',
          iconClassName: ''
        };
      default:
        return {
          icon: 'Save',
          text: 'Auto-save enabled',
          className: 'text-muted-foreground',
          iconClassName: ''
        };
    }
  };

  const statusConfig = getStatusConfig();

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInMinutes = Math.floor((now - saved) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return saved?.toLocaleDateString();
  };

  if (!showIndicator && status === 'idle') {
    return null;
  }

  return (
    <div className={`
      flex items-center space-x-2 px-3 py-2 rounded-md bg-muted/50 border border-border/50
      transition-smooth ${statusConfig?.className} ${className}
    `}>
      <Icon 
        name={statusConfig?.icon} 
        size={14} 
        className={statusConfig?.iconClassName}
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium">
          {statusConfig?.text}
        </span>
        {lastSaved && status === 'saved' && (
          <span className="text-xs opacity-75">
            Last saved {formatLastSaved(lastSaved)}
          </span>
        )}
      </div>
    </div>
  );
};

export default AutoSaveIndicator;