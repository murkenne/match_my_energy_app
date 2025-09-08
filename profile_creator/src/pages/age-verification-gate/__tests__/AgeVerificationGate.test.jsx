import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AgeVerificationGate from '../index';
import { mockNavigate } from '../../../setupTests';

// Mock CosmicBackground component
jest.mock('../../../components/CosmicBackground', () => {
  return function MockCosmicBackground({ children, className }) {
    return <div data-testid="cosmic-background" className={className}>{children}</div>;
  };
});

const renderAgeVerificationGate = () => {
  return render(
    <MemoryRouter>
      <AgeVerificationGate />
    </MemoryRouter>
  );
};

describe('AgeVerificationGate', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Initial Render', () => {
    test('renders age verification form initially', () => {
      renderAgeVerificationGate();
      
      expect(screen.getByText('Match My Energy')).toBeInTheDocument();
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument();
      expect(screen.getByText(/To access our astrological dating platform/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /I am 18 or older/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /I am under 18/i })).toBeInTheDocument();
    });

    test('renders cosmic background', () => {
      renderAgeVerificationGate();
      expect(screen.getByTestId('cosmic-background')).toBeInTheDocument();
    });

    test('displays app logo and branding', () => {
      renderAgeVerificationGate();
      expect(screen.getByText('Match My Energy')).toBeInTheDocument();
    });
  });

  describe('Age Verification Flow', () => {
    test('redirects to profile creation when user confirms 18+', async () => {
      const user = userEvent.setup();
      renderAgeVerificationGate();

      const confirmButton = screen.getByRole('button', { name: /I am 18 or older/i });
      await user.click(confirmButton);

      expect(mockNavigate).toHaveBeenCalledWith('/profile-creation-form');
    });

    test('shows restriction message when user selects under 18', async () => {
      const user = userEvent.setup();
      renderAgeVerificationGate();

      const underAgeButton = screen.getByRole('button', { name: /I am under 18/i });
      await user.click(underAgeButton);

      await waitFor(() => {
        expect(screen.getByText('Access Restricted')).toBeInTheDocument();
        expect(screen.getByText(/you must be at least 18 years old/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Go Back/i })).toBeInTheDocument();
      });
    });

    test('can navigate back from restriction message', async () => {
      const user = userEvent.setup();
      renderAgeVerificationGate();

      // First select under 18
      const underAgeButton = screen.getByRole('button', { name: /I am under 18/i });
      await user.click(underAgeButton);

      await waitFor(() => {
        expect(screen.getByText('Access Restricted')).toBeInTheDocument();
      });

      // Then click go back
      const goBackButton = screen.getByRole('button', { name: /Go Back/i });
      await user.click(goBackButton);

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Accessibility', () => {
    test('buttons have proper ARIA roles', () => {
      renderAgeVerificationGate();
      
      const confirmButton = screen.getByRole('button', { name: /I am 18 or older/i });
      const denyButton = screen.getByRole('button', { name: /I am under 18/i });
      
      expect(confirmButton).toHaveAttribute('type', 'button');
      expect(denyButton).toHaveAttribute('type', 'button');
    });

    test('content is accessible with screen readers', () => {
      renderAgeVerificationGate();
      
      // Check for semantic content
      expect(screen.getByRole('button', { name: /I am 18 or older/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /I am under 18/i })).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    test('toggles between verification and restriction states', async () => {
      const user = userEvent.setup();
      renderAgeVerificationGate();

      // Initially shows verification form
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument();
      expect(screen.queryByText('Access Restricted')).not.toBeInTheDocument();

      // Click under 18
      await user.click(screen.getByRole('button', { name: /I am under 18/i }));

      // Now shows restriction message
      await waitFor(() => {
        expect(screen.getByText('Access Restricted')).toBeInTheDocument();
        expect(screen.queryByText('Age Verification Required')).not.toBeInTheDocument();
      });
    });
  });

  describe('UI Elements', () => {
    test('displays all required UI elements in verification state', () => {
      renderAgeVerificationGate();
      
      // Check for main content
      expect(screen.getByText('Match My Energy')).toBeInTheDocument();
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument();
      expect(screen.getByText(/By continuing, you confirm/)).toBeInTheDocument();
      
      // Check for buttons
      expect(screen.getByRole('button', { name: /I am 18 or older/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /I am under 18/i })).toBeInTheDocument();
    });

    test('displays all required UI elements in restriction state', async () => {
      const user = userEvent.setup();
      renderAgeVerificationGate();

      await user.click(screen.getByRole('button', { name: /I am under 18/i }));

      await waitFor(() => {
        expect(screen.getByText('Access Restricted')).toBeInTheDocument();
        expect(screen.getByText(/We're sorry, but you must be at least 18/)).toBeInTheDocument();
        expect(screen.getByText('Alternative Resources')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Go Back/i })).toBeInTheDocument();
      });
    });
  });
});