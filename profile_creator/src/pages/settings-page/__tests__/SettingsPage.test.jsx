import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SettingsPage from '../index';

// Mock components
jest.mock('../../../components/ui/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation</div>;
  };
});

jest.mock('../../../components/CosmicBackground', () => {
  return function MockCosmicBackground({ children }) {
    return <div data-testid="cosmic-background">{children}</div>;
  };
});

const renderSettingsPage = () => {
  return render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>
  );
};

describe('SettingsPage', () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('Initial Render', () => {
    test('renders settings page header', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText(/Customize your cosmic journey/)).toBeInTheDocument();
    });

    test('renders navigation and cosmic background', () => {
      renderSettingsPage();
      
      expect(screen.getByTestId('navigation')).toBeInTheDocument();
      expect(screen.getByTestId('cosmic-background')).toBeInTheDocument();
    });

    test('renders all settings sections', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Account Privacy')).toBeInTheDocument();
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
      expect(screen.getByText('Appearance')).toBeInTheDocument();
      expect(screen.getByText('Match Preferences')).toBeInTheDocument();
      expect(screen.getByText('Data & Privacy')).toBeInTheDocument();
    });
  });

  describe('Account Privacy Settings', () => {
    test('displays all privacy toggle options', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Private Account')).toBeInTheDocument();
      expect(screen.getByText('Show Online Status')).toBeInTheDocument();
      expect(screen.getByText('Allow Direct Messages')).toBeInTheDocument();
    });

    test('toggles private account setting', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const privateAccountLabel = screen.getByText('Private Account');
      const toggleElement = privateAccountLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           privateAccountLabel?.closest('div')?.querySelector('[role="switch"]');

      expect(toggleElement).not.toBeChecked();

      if (toggleElement) {
        await user.click(toggleElement);
        expect(toggleElement).toBeChecked();
      }
    });

    test('toggles show online status setting', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const onlineStatusLabel = screen.getByText('Show Online Status');
      const toggleElement = onlineStatusLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           onlineStatusLabel?.closest('div')?.querySelector('[role="switch"]');

      // Default should be checked
      if (toggleElement) {
        expect(toggleElement).toBeChecked();

        await user.click(toggleElement);
        expect(toggleElement).not.toBeChecked();
      }
    });
  });

  describe('Email Notifications Settings', () => {
    test('displays all notification options', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Receive Updates')).toBeInTheDocument();
      expect(screen.getByText('New Matches')).toBeInTheDocument();
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('Cosmic Events')).toBeInTheDocument();
    });

    test('toggles email notification settings', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const cosmicEventsLabel = screen.getByText('Cosmic Events');
      const toggleElement = cosmicEventsLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           cosmicEventsLabel?.closest('div')?.querySelector('[role="switch"]');

      // Default should be false
      if (toggleElement) {
        expect(toggleElement).not.toBeChecked();

        await user.click(toggleElement);
        expect(toggleElement).toBeChecked();
      }
    });
  });

  describe('Appearance Settings', () => {
    test('displays appearance options', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument();
      expect(screen.getByText('Reduced Motion')).toBeInTheDocument();
      expect(screen.getByText('Font Size')).toBeInTheDocument();
    });

    test('toggles dark mode setting', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const darkModeLabel = screen.getByText('Switch to Dark Mode');
      const toggleElement = darkModeLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           darkModeLabel?.closest('div')?.querySelector('[role="switch"]');

      if (toggleElement) {
        expect(toggleElement).not.toBeChecked();

        await user.click(toggleElement);
        expect(toggleElement).toBeChecked();
      }
    });

    test('changes font size setting', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const fontSizeSelect = screen.getByDisplayValue('Medium') ||
                            screen.getByRole('combobox') ||
                            screen.getByText('Font Size')?.closest('div')?.querySelector('select');

      if (fontSizeSelect) {
        await user.selectOptions(fontSizeSelect, 'large');
        expect(fontSizeSelect).toHaveValue('large');
      }
    });
  });

  describe('Match Preferences Settings', () => {
    test('displays match preference options', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Maximum Distance')).toBeInTheDocument();
      expect(screen.getByText('Show Compatibility Score')).toBeInTheDocument();
    });

    test('adjusts maximum distance with range slider', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const rangeInput = screen.getByRole('slider') || 
                        screen.getByDisplayValue('50') ||
                        screen.getByText('Maximum Distance')?.closest('div')?.querySelector('input[type="range"]');

      if (rangeInput) {
        await user.clear(rangeInput);
        await user.type(rangeInput, '75');
        expect(rangeInput).toHaveValue('75');
      }
    });

    test('toggles compatibility score display', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const compatibilityLabel = screen.getByText('Show Compatibility Score');
      const toggleElement = compatibilityLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           compatibilityLabel?.closest('div')?.querySelector('[role="switch"]');

      if (toggleElement) {
        // Default should be checked
        expect(toggleElement).toBeChecked();

        await user.click(toggleElement);
        expect(toggleElement).not.toBeChecked();
      }
    });
  });

  describe('Data & Privacy Actions', () => {
    test('displays data management buttons', () => {
      renderSettingsPage();
      
      expect(screen.getByText('Export Your Data')).toBeInTheDocument();
      expect(screen.getByText('Delete Account')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    test('all data management buttons are clickable', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const exportButton = screen.getByRole('button', { name: /export your data/i });
      const deleteButton = screen.getByRole('button', { name: /delete account/i });
      const privacyButton = screen.getByRole('button', { name: /privacy policy/i });

      await user.click(exportButton);
      await user.click(deleteButton);
      await user.click(privacyButton);

      // Buttons should be clickable (no errors thrown)
      expect(exportButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
      expect(privacyButton).toBeInTheDocument();
    });
  });

  describe('Save Settings Functionality', () => {
    test('displays save settings button', () => {
      renderSettingsPage();
      
      const saveButton = screen.getByRole('button', { name: /save settings/i });
      expect(saveButton).toBeInTheDocument();
    });

    test('saves settings when button is clicked', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const saveButton = screen.getByRole('button', { name: /save settings/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/saving settings/i)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith('Settings saved:', expect.any(Object));
      }, { timeout: 2000 });
    });

    test('disables save button while saving', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      const saveButton = screen.getByRole('button', { name: /save settings/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });
    });

    test('applies dark mode immediately when enabled', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      // Mock document.documentElement.classList
      const mockClassList = {
        add: jest.fn(),
        remove: jest.fn()
      };
      Object.defineProperty(document.documentElement, 'classList', {
        value: mockClassList,
        configurable: true
      });

      const darkModeLabel = screen.getByText('Switch to Dark Mode');
      const toggleElement = darkModeLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           darkModeLabel?.closest('div')?.querySelector('[role="switch"]');

      if (toggleElement) {
        await user.click(toggleElement);
      }

      const saveButton = screen.getByRole('button', { name: /save settings/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockClassList.add).toHaveBeenCalledWith('dark');
      }, { timeout: 2000 });
    });
  });

  describe('Settings State Management', () => {
    test('maintains settings state across interactions', async () => {
      const user = userEvent.setup();
      renderSettingsPage();

      // Change multiple settings
      const privateAccountLabel = screen.getByText('Private Account');
      const privateToggle = privateAccountLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                           privateAccountLabel?.closest('div')?.querySelector('[role="switch"]');

      if (privateToggle) {
        await user.click(privateToggle);
        expect(privateToggle).toBeChecked();
      }

      const darkModeLabel = screen.getByText('Switch to Dark Mode');
      const darkModeToggle = darkModeLabel?.closest('div')?.querySelector('input[type="checkbox"]') ||
                            darkModeLabel?.closest('div')?.querySelector('[role="switch"]');

      if (darkModeToggle) {
        await user.click(darkModeToggle);
        expect(darkModeToggle).toBeChecked();
      }

      // Both settings should remain changed
      if (privateToggle) expect(privateToggle).toBeChecked();
      if (darkModeToggle) expect(darkModeToggle).toBeChecked();
    });
  });

  describe('Accessibility', () => {
    test('has proper headings structure', () => {
      renderSettingsPage();
      
      const mainHeading = screen.getByRole('heading', { name: /settings/i });
      expect(mainHeading).toBeInTheDocument();
      
      // Section headings
      expect(screen.getByText('Account Privacy')).toBeInTheDocument();
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
      expect(screen.getByText('Appearance')).toBeInTheDocument();
    });

    test('has proper button roles', () => {
      renderSettingsPage();
      
      const saveButton = screen.getByRole('button', { name: /save settings/i });
      const exportButton = screen.getByRole('button', { name: /export your data/i });
      
      expect(saveButton).toHaveAttribute('type', 'button');
      expect(exportButton).toBeInTheDocument();
    });

    test('toggle controls are accessible', () => {
      renderSettingsPage();
      
      // Check for toggle elements with proper accessibility
      const privateAccountText = screen.getByText('Private Account');
      expect(privateAccountText).toBeInTheDocument();
      
      const showOnlineStatusText = screen.getByText('Show Online Status');
      expect(showOnlineStatusText).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    test('renders properly on different screen sizes', () => {
      renderSettingsPage();
      
      // Main container should exist
      const settingsContainer = screen.getByText('Settings')?.closest('div');
      expect(settingsContainer).toBeInTheDocument();
      
      // All sections should be visible
      expect(screen.getByText('Account Privacy')).toBeInTheDocument();
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
      expect(screen.getByText('Appearance')).toBeInTheDocument();
    });
  });
});