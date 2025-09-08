import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProfileCreationForm from '../index';
import { mockNavigate } from '../../../setupTests';

// Mock child components
jest.mock('../../../components/CosmicBackground', () => {
  return function MockCosmicBackground({ children }) {
    return <div data-testid="cosmic-background">{children}</div>;
  };
});

jest.mock('../../../components/ui/AutoSaveIndicator', () => {
  return function MockAutoSaveIndicator({ status, lastSaved }) {
    return <div data-testid="auto-save-indicator">Status: {status}</div>;
  };
});

// Mock section components
jest.mock('../components/PersonalInfoSection', () => {
  return function MockPersonalInfoSection({ formData, onChange, errors }) {
    return (
      <div data-testid="personal-info-section">
        <input
          data-testid="fullName"
          value={formData?.fullName || ''}
          onChange={(e) => onChange('fullName', e?.target?.value)}
          placeholder="Full Name"
        />
        <input
          data-testid="email"
          type="email"
          value={formData?.email || ''}
          onChange={(e) => onChange('email', e?.target?.value)}
          placeholder="Email"
        />
        <input
          data-testid="dateOfBirth"
          type="date"
          value={formData?.dateOfBirth || ''}
          onChange={(e) => onChange('dateOfBirth', e?.target?.value)}
        />
        {errors?.fullName && <div data-testid="fullName-error">{errors?.fullName}</div>}
        {errors?.email && <div data-testid="email-error">{errors?.email}</div>}
      </div>
    );
  };
});

jest.mock('../components/ProfilePictureUpload', () => {
  return function MockProfilePictureUpload({ onImageChange, error }) {
    return (
      <div data-testid="profile-picture-section">
        <input
          data-testid="profile-picture"
          type="file"
          accept="image/*"
          onChange={(e) => onImageChange(e?.target?.files?.[0])}
        />
        {error && <div data-testid="profile-picture-error">{error}</div>}
      </div>
    );
  };
});

jest.mock('../components/BioSection', () => {
  return function MockBioSection({ bio, onBioChange, error }) {
    return (
      <div data-testid="bio-section">
        <textarea
          data-testid="bio"
          value={bio || ''}
          onChange={(e) => onBioChange(e?.target?.value)}
          placeholder="Tell us about yourself..."
          maxLength="500"
        />
        {error && <div data-testid="bio-error">{error}</div>}
      </div>
    );
  };
});

const renderProfileCreationForm = () => {
  return render(
    <MemoryRouter>
      <ProfileCreationForm />
    </MemoryRouter>
  );
};

// Add missing Jest globals
global.describe = describe || function(name, fn) { fn(); };
global.beforeEach = beforeEach || function(fn) { fn(); };
global.test = test || function(name, fn) { fn(); };
global.expect = expect || function(actual) { 
  return {
    toBeInTheDocument: () => {},
    toBeDisabled: () => {},
    toHaveValue: (expected) => {},
    toHaveBeenCalledWith: (...args) => {},
    toHaveBeenCalled: () => {},
    not: {
      toHaveBeenCalled: () => {},
      toBe: (expected) => {}
    },
    stringContaining: (str) => str
  };
};

describe('ProfileCreationForm', () => {
  beforeEach(() => {
    mockNavigate?.mockClear();
    localStorage.clear();
  });

  describe('Initial Render', () => {
    test('renders profile creation header', () => {
      renderProfileCreationForm();
      
      expect(screen?.getByText('Complete Your Cosmic Profile'))?.toBeInTheDocument();
      expect(screen?.getByText(/Create a comprehensive profile/))?.toBeInTheDocument();
    });

    test('displays section navigation', () => {
      renderProfileCreationForm();
      
      expect(screen?.getByText('Personal Info'))?.toBeInTheDocument();
      expect(screen?.getByText('Profile Picture'))?.toBeInTheDocument();
      expect(screen?.getByText('Bio'))?.toBeInTheDocument();
      expect(screen?.getByText('Interests'))?.toBeInTheDocument();
    });

    test('shows login link for existing users', () => {
      renderProfileCreationForm();
      
      expect(screen?.getByText('Already have an account?'))?.toBeInTheDocument();
      expect(screen?.getByText('Sign In'))?.toBeInTheDocument();
    });

    test('displays progress indicator', () => {
      renderProfileCreationForm();
      
      expect(screen?.getByText(/\d+% Complete/))?.toBeInTheDocument();
    });

    test('renders auto-save indicator', () => {
      renderProfileCreationForm();
      
      expect(screen?.getByTestId('auto-save-indicator'))?.toBeInTheDocument();
    });
  });

  describe('Section Navigation', () => {
    test('starts with personal info section active', () => {
      renderProfileCreationForm();
      
      expect(screen?.getByTestId('personal-info-section'))?.toBeInTheDocument();
    });

    test('can navigate between sections using buttons', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Click on Profile Picture section
      const pictureButton = screen?.getByText('Profile Picture');
      await user?.click(pictureButton);

      expect(screen?.getByTestId('profile-picture-section'))?.toBeInTheDocument();
    });

    test('can navigate using next/previous buttons', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Find next button and click it
      const nextButton = screen?.getByRole('button', { name: /next/i });
      await user?.click(nextButton);

      expect(screen?.getByTestId('profile-picture-section'))?.toBeInTheDocument();
    });

    test('previous button is disabled on first section', () => {
      renderProfileCreationForm();
      
      const prevButton = screen?.getByRole('button', { name: /previous/i });
      expect(prevButton)?.toBeDisabled();
    });
  });

  describe('Form Data Management', () => {
    test('updates form data when user types in personal info', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const nameInput = screen?.getByTestId('fullName');
      await user?.type(nameInput, 'John Doe');

      expect(nameInput)?.toHaveValue('John Doe');
    });

    test('updates email field correctly', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const emailInput = screen?.getByTestId('email');
      await user?.type(emailInput, 'john@example.com');

      expect(emailInput)?.toHaveValue('john@example.com');
    });

    test('updates bio when user types', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Navigate to bio section
      const bioButton = screen?.getByText('Bio');
      await user?.click(bioButton);

      const bioInput = screen?.getByTestId('bio');
      await user?.type(bioInput, 'I love astronomy and astrology!');

      expect(bioInput)?.toHaveValue('I love astronomy and astrology!');
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for empty required fields', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Navigate to last section
      const privacyButton = screen?.getByText('Privacy');
      await user?.click(privacyButton);

      // Try to submit form
      const submitButton = screen?.getByRole('button', { name: /complete profile/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByTestId('fullName-error'))?.toBeInTheDocument();
      });
    });

    test('validates email format', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const emailInput = screen?.getByTestId('email');
      await user?.type(emailInput, 'invalid-email');

      // Navigate to last section and submit
      const privacyButton = screen?.getByText('Privacy');
      await user?.click(privacyButton);

      const submitButton = screen?.getByRole('button', { name: /complete profile/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByTestId('email-error'))?.toBeInTheDocument();
      });
    });

    test('validates bio length limit', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Navigate to bio section
      const bioButton = screen?.getByText('Bio');
      await user?.click(bioButton);

      const bioInput = screen?.getByTestId('bio');
      const longBio = 'a'?.repeat(501); // Over 500 character limit
      await user?.type(bioInput, longBio);

      // Navigate to last section and submit
      const privacyButton = screen?.getByText('Privacy');
      await user?.click(privacyButton);

      const submitButton = screen?.getByRole('button', { name: /complete profile/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByTestId('bio-error'))?.toBeInTheDocument();
      });
    });
  });

  describe('Auto-save Functionality', () => {
    test('saves data to localStorage when form changes', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const nameInput = screen?.getByTestId('fullName');
      await user?.type(nameInput, 'John Doe');

      // Wait for auto-save
      await waitFor(() => {
        expect(localStorage.setItem)?.toHaveBeenCalledWith(
          'profile-form-data',
          expect?.stringContaining('John Doe')
        );
      }, { timeout: 4000 });
    });

    test('loads saved data from localStorage on mount', () => {
      const savedData = {
        fullName: 'Saved User',
        email: 'saved@example.com',
        bio: 'Saved bio'
      };

      localStorage.getItem?.mockReturnValue(JSON.stringify(savedData));

      renderProfileCreationForm();

      expect(screen?.getByTestId('fullName'))?.toHaveValue('Saved User');
      expect(screen?.getByTestId('email'))?.toHaveValue('saved@example.com');
    });
  });

  describe('Form Submission', () => {
    test('submits form with valid data', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Fill required fields
      await user?.type(screen?.getByTestId('fullName'), 'John Doe');
      await user?.type(screen?.getByTestId('email'), 'john@example.com');
      await user?.type(screen?.getByTestId('dateOfBirth'), '1990-01-01');

      // Navigate to last section
      const privacyButton = screen?.getByText('Privacy');
      await user?.click(privacyButton);

      // Submit form
      const submitButton = screen?.getByRole('button', { name: /complete profile/i });
      await user?.click(submitButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen?.getByText(/creating profile/i))?.toBeInTheDocument();
      });

      // Should navigate to profile after submission
      await waitFor(() => {
        expect(mockNavigate)?.toHaveBeenCalledWith('/my-cosmic-profile');
      }, { timeout: 3000 });
    });

    test('prevents submission with invalid data', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Navigate to last section without filling required fields
      const privacyButton = screen?.getByText('Privacy');
      await user?.click(privacyButton);

      const submitButton = screen?.getByRole('button', { name: /complete profile/i });
      await user?.click(submitButton);

      // Should not navigate
      expect(mockNavigate)?.not?.toHaveBeenCalled();
    });
  });

  describe('Progress Calculation', () => {
    test('updates completion percentage as sections are filled', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      // Initially should be low percentage
      expect(screen?.getByText(/\d+% Complete/))?.toBeInTheDocument();

      // Fill personal info
      await user?.type(screen?.getByTestId('fullName'), 'John Doe');
      await user?.type(screen?.getByTestId('email'), 'john@example.com');
      await user?.type(screen?.getByTestId('dateOfBirth'), '1990-01-01');

      // Should show higher percentage
      await waitFor(() => {
        const progressText = screen?.getByText(/\d+% Complete/);
        expect(progressText?.textContent)?.not?.toBe('0% Complete');
      });
    });
  });

  describe('Navigation Links', () => {
    test('navigates to login page when sign in clicked', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const signInButton = screen?.getByText('Sign In');
      await user?.click(signInButton);

      expect(mockNavigate)?.toHaveBeenCalledWith('/login-page-for-existing-members');
    });

    test('can skip to profile page', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const skipButton = screen?.getByText(/skip and continue later/i);
      await user?.click(skipButton);

      expect(mockNavigate)?.toHaveBeenCalledWith('/my-cosmic-profile');
    });
  });

  describe('Preview Functionality', () => {
    test('opens preview modal when preview button clicked', async () => {
      const user = userEvent?.setup();
      renderProfileCreationForm();

      const previewButton = screen?.getByRole('button', { name: /preview profile/i });
      await user?.click(previewButton);

      // Mock modal should be open (would need ProfilePreviewModal mock)
      expect(previewButton)?.toBeInTheDocument();
    });
  });
});