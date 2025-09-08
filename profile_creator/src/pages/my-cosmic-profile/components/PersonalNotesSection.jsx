import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalNotesSection = ({ notes, onNotesChange }) => {
  const [localNotes, setLocalNotes] = useState(notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setLocalNotes(notes || '');
    setHasChanges(false);
  }, [notes]);

  // Track changes
  useEffect(() => {
    setHasChanges(localNotes !== (notes || ''));
  }, [localNotes, notes]);

  const handleNotesChange = (value) => {
    setLocalNotes(value);
    // Optional: Auto-save parent state for live updates
    if (onNotesChange) {
      onNotesChange(value);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API save call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the last saved timestamp
      setLastSaved(new Date());
      setHasChanges(false);
      
      // Show success message
      console.log('Notes saved successfully');
      
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      setLocalNotes('');
      if (onNotesChange) {
        onNotesChange('');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Personal Notes</h2>
        
        <div className="flex items-center space-x-3">
          {lastSaved && (
            <span className="text-xs text-gray-500">
              Last saved: {lastSaved?.toLocaleTimeString()}
            </span>
          )}
          
          {hasChanges && (
            <span className="flex items-center text-xs text-orange-600">
              <Icon name="Circle" size={8} className="mr-1 fill-current" />
              Unsaved changes
            </span>
          )}
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <textarea
          value={localNotes}
          onChange={(e) => handleNotesChange(e?.target?.value)}
          placeholder="Add your personal reflections, transit observations, insights, and interpretations here. These notes are private and only visible to you."
          className="w-full h-40 p-4 bg-transparent border-none outline-none resize-none text-gray-700 placeholder-gray-500 rounded-lg"
        />
        
        <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50/50 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-600 hover:text-red-700 transition-colors"
              disabled={!localNotes?.trim()}
            >
              Clear all
            </button>
            
            <span className="text-xs text-gray-400">
              {localNotes?.length} characters
            </span>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="flex items-center space-x-1">
                <Icon name="Loader2" size={14} className="animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Icon name="Save" size={14} />
                <span>Save Notes</span>
              </div>
            )}
          </Button>
        </div>
      </div>
      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700 flex items-start space-x-2">
          <Icon name="Info" size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            Your notes are automatically synced and saved securely. Use this space to track your astrological journey, note meaningful transits, and record personal insights about your cosmic profile.
          </span>
        </p>
      </div>
    </div>
  );
};

export default PersonalNotesSection;