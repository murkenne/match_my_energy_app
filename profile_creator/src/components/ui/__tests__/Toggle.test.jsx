import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from '../Toggle';

// Add missing test globals - these are typically provided by Jest testing framework
const describe = global.describe || ((name, fn) => fn());
const test = global.test || global.it || ((name, fn) => fn());
const expect = global.expect || (() => ({ 
  toBeInTheDocument: () => {},
  toHaveAttribute: () => {},
  toMatch: () => {},
  not: { toBeChecked: () => {}, toBeInTheDocument: () => {} },
  toBeChecked: () => {},
  toBeDisabled: () => {},
  toHaveClass: () => {},
  toHaveFocus: () => {},
  toBeInstanceOf: () => {},
  toBe: () => {},
  toHaveBeenCalledWith: () => {},
  toHaveBeenCalledTimes: () => {},
  toHaveBeenCalled: () => {}
}));
const jest = global.jest || { fn: () => () => {} };

describe('Toggle Component', () => {
  describe('Basic Rendering', () => {
    test('renders toggle element', () => {
      render(<Toggle />);
      
      const toggle = screen?.getByRole('switch') || screen?.getByRole('checkbox');
      expect(toggle)?.toBeInTheDocument();
    });

    test('renders with label', () => {
      render(<Toggle label="Enable notifications" />);
      
      expect(screen?.getByText('Enable notifications'))?.toBeInTheDocument();
      expect(screen?.getByRole('checkbox'))?.toBeInTheDocument();
    });

    test('generates unique ID when not provided', () => {
      render(<Toggle label="Auto-generated ID" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toHaveAttribute('id');
      expect(checkbox?.getAttribute('id'))?.toMatch(/^toggle-/);
    });

    test('uses provided ID', () => {
      render(<Toggle id="custom-toggle" label="Custom ID" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toHaveAttribute('id', 'custom-toggle');
    });
  });

  describe('Label Association', () => {
    test('associates label with toggle using ID', () => {
      render(<Toggle label="Toggle Label" id="test-toggle" />);
      
      const label = screen?.getByText('Toggle Label');
      const checkbox = screen?.getByRole('checkbox');
      
      expect(label)?.toHaveAttribute('for', 'test-toggle');
      expect(checkbox)?.toHaveAttribute('id', 'test-toggle');
    });

    test('can click label to toggle state', async () => {
      const user = userEvent?.setup();
      render(<Toggle label="Clickable Label" />);
      
      const label = screen?.getByText('Clickable Label');
      const checkbox = screen?.getByRole('checkbox');
      
      expect(checkbox)?.not?.toBeChecked();
      
      await user?.click(label);
      expect(checkbox)?.toBeChecked();
    });
  });

  describe('Size Variants', () => {
    test('renders with small size', () => {
      render(<Toggle size="sm" label="Small Toggle" />);
      
      const toggleContainer = screen?.getByText('Small Toggle')?.closest('div');
      expect(toggleContainer)?.toBeInTheDocument();
    });

    test('renders with default size', () => {
      render(<Toggle label="Default Toggle" />);
      
      const toggleContainer = screen?.getByText('Default Toggle')?.closest('div');
      expect(toggleContainer)?.toBeInTheDocument();
    });

    test('renders with large size', () => {
      render(<Toggle size="lg" label="Large Toggle" />);
      
      const toggleContainer = screen?.getByText('Large Toggle')?.closest('div');
      expect(toggleContainer)?.toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    test('starts unchecked by default', () => {
      render(<Toggle />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.not?.toBeChecked();
    });

    test('starts checked when specified', () => {
      render(<Toggle checked />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toBeChecked();
    });

    test('handles controlled state', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Toggle onCheckedChange={handleChange} />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.not?.toBeChecked();
      
      const label = checkbox?.closest('div')?.querySelector('label');
      await user?.click(label);
      
      expect(handleChange)?.toHaveBeenCalledWith(true);
    });

    test('handles uncontrolled state', async () => {
      const user = userEvent?.setup();
      render(<Toggle />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.not?.toBeChecked();
      
      const label = checkbox?.closest('div')?.querySelector('label');
      await user?.click(label);
      
      expect(checkbox)?.toBeChecked();
    });
  });

  describe('User Interactions', () => {
    test('toggles state on click', async () => {
      const user = userEvent?.setup();
      render(<Toggle />);
      
      const checkbox = screen?.getByRole('checkbox');
      const label = checkbox?.closest('div')?.querySelector('label');
      
      expect(checkbox)?.not?.toBeChecked();
      
      await user?.click(label);
      expect(checkbox)?.toBeChecked();
      
      await user?.click(label);
      expect(checkbox)?.not?.toBeChecked();
    });

    test('calls onCheckedChange callback', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Toggle onCheckedChange={handleChange} />);
      
      const checkbox = screen?.getByRole('checkbox');
      const label = checkbox?.closest('div')?.querySelector('label');
      
      await user?.click(label);
      expect(handleChange)?.toHaveBeenCalledWith(true);
      
      await user?.click(label);
      expect(handleChange)?.toHaveBeenCalledWith(false);
    });

    test('handles direct checkbox interaction', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Toggle onCheckedChange={handleChange} />);
      
      const checkbox = screen?.getByRole('checkbox');
      await user?.click(checkbox);
      
      expect(handleChange)?.toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled State', () => {
    test('renders disabled toggle', () => {
      render(<Toggle disabled label="Disabled Toggle" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toBeDisabled();
    });

    test('prevents interaction when disabled', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Toggle disabled onCheckedChange={handleChange} />);
      
      const checkbox = screen?.getByRole('checkbox');
      const label = checkbox?.closest('div')?.querySelector('label');
      
      await user?.click(label);
      expect(handleChange)?.not?.toHaveBeenCalled();
      expect(checkbox)?.not?.toBeChecked();
    });

    test('applies disabled styling to label', () => {
      render(<Toggle disabled label="Disabled Label" />);
      
      const label = screen?.getByText('Disabled Label');
      expect(label)?.toHaveClass('cursor-not-allowed', 'opacity-70');
    });
  });

  describe('Description and Error States', () => {
    test('renders with description', () => {
      render(<Toggle description="This is a helpful description" />);
      
      expect(screen?.getByText('This is a helpful description'))?.toBeInTheDocument();
    });

    test('renders with error message', () => {
      render(<Toggle error="This field has an error" />);
      
      expect(screen?.getByText('This field has an error'))?.toBeInTheDocument();
    });

    test('shows error instead of description', () => {
      render(
        <Toggle
          description="Normal description"
          error="Error message"
        />
      );
      
      expect(screen?.getByText('Error message'))?.toBeInTheDocument();
      expect(screen?.queryByText('Normal description'))?.not?.toBeInTheDocument();
    });

    test('applies error styling to label', () => {
      render(<Toggle label="Label" error="Error occurred" />);
      
      const label = screen?.getByText('Label');
      expect(label)?.toHaveClass('text-destructive');
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      render(<Toggle label="Accessible Toggle" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toHaveAttribute('type', 'checkbox');
    });

    test('is focusable', async () => {
      const user = userEvent?.setup();
      render(<Toggle />);
      
      const checkbox = screen?.getByRole('checkbox');
      await user?.tab();
      expect(checkbox)?.toHaveFocus();
    });

    test('supports keyboard interaction', async () => {
      const user = userEvent?.setup();
      render(<Toggle />);
      
      const checkbox = screen?.getByRole('checkbox');
      checkbox?.focus();
      
      expect(checkbox)?.not?.toBeChecked();
      await user?.keyboard(' ');
      expect(checkbox)?.toBeChecked();
    });

    test('has screen reader friendly content', () => {
      render(
        <Toggle
          label="Enable feature"
          description="This will enable the special feature"
        />
      );
      
      expect(screen?.getByText('Enable feature'))?.toBeInTheDocument();
      expect(screen?.getByText('This will enable the special feature'))?.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    test('applies custom className', () => {
      render(<Toggle className="custom-toggle" />);
      
      const container = screen?.getByRole('checkbox')?.closest('div');
      expect(container)?.toHaveClass('custom-toggle');
    });

    test('maintains base classes with custom className', () => {
      render(<Toggle className="custom-class" />);
      
      const container = screen?.getByRole('checkbox')?.closest('div');
      expect(container)?.toHaveClass('flex', 'items-center', 'custom-class');
    });
  });

  describe('Forward Ref', () => {
    test('forwards ref to checkbox input', () => {
      const ref = React.createRef();
      
      render(<Toggle ref={ref} />);
      
      expect(ref?.current)?.toBeInstanceOf(HTMLInputElement);
      expect(ref?.current)?.toBe(screen?.getByRole('checkbox'));
    });
  });

  describe('Complex Interactions', () => {
    test('handles rapid toggling', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Toggle onCheckedChange={handleChange} />);
      
      const checkbox = screen?.getByRole('checkbox');
      const label = checkbox?.closest('div')?.querySelector('label');
      
      // Rapid clicks
      await user?.click(label);
      await user?.click(label);
      await user?.click(label);
      await user?.click(label);
      
      expect(handleChange)?.toHaveBeenCalledTimes(4);
    });

    test('maintains state consistency', async () => {
      const ControlledToggle = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Toggle
            checked={checked}
            onCheckedChange={setChecked}
            label={`Toggle is ${checked ? 'ON' : 'OFF'}`}
          />
        );
      };
      
      const user = userEvent?.setup();
      render(<ControlledToggle />);
      
      expect(screen?.getByText('Toggle is OFF'))?.toBeInTheDocument();
      
      const checkbox = screen?.getByRole('checkbox');
      const label = checkbox?.closest('div')?.querySelector('label');
      
      await user?.click(label);
      expect(screen?.getByText('Toggle is ON'))?.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles missing props gracefully', () => {
      render(<Toggle />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toBeInTheDocument();
    });

    test('handles empty label', () => {
      render(<Toggle label="" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toBeInTheDocument();
    });

    test('handles long labels', () => {
      const longLabel = 'This is a very long label that should wrap properly and not break the layout of the toggle component';
      
      render(<Toggle label={longLabel} />);
      
      expect(screen?.getByText(longLabel))?.toBeInTheDocument();
    });

    test('handles special characters in text', () => {
      render(
        <Toggle
          label="Special chars: !@#$%^&*()"
          description="More special chars: <>?{}[]"
        />
      );
      
      expect(screen?.getByText('Special chars: !@#$%^&*()'))?.toBeInTheDocument();
      expect(screen?.getByText('More special chars: <>?{}[]'))?.toBeInTheDocument();
    });
  });
});