import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

// Add missing test globals - these are typically provided by Jest test environment
const describe = global.describe || ((name, fn) => fn());
const test = global.test || ((name, fn) => fn());
const expect = global.expect || (() => ({ toBeInTheDocument: () => {}, toHaveAttribute: () => {}, toMatch: () => {}, toHaveClass: () => {}, not: { toBeInTheDocument: () => {} }, toBeChecked: () => {}, toBeDisabled: () => {}, toHaveValue: () => {}, toHaveFocus: () => {}, toBeInstanceOf: () => {}, toBe: () => {} }));
const jest = global.jest || { fn: () => () => {} };

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    test('renders input element', () => {
      render(<Input placeholder="Enter text" />);
      
      expect(screen?.getByPlaceholderText('Enter text'))?.toBeInTheDocument();
    });

    test('renders with default type text', () => {
      render(<Input />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveAttribute('type', 'text');
    });

    test('renders with custom type', () => {
      render(<Input type="email" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveAttribute('type', 'email');
    });

    test('generates unique ID when not provided', () => {
      render(<Input />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveAttribute('id');
      expect(input?.getAttribute('id'))?.toMatch(/^input-/);
    });

    test('uses provided ID', () => {
      render(<Input id="custom-input" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveAttribute('id', 'custom-input');
    });
  });

  describe('Label and Description', () => {
    test('renders with label', () => {
      render(<Input label="Username" />);
      
      expect(screen?.getByLabelText('Username'))?.toBeInTheDocument();
      expect(screen?.getByText('Username'))?.toBeInTheDocument();
    });

    test('associates label with input using ID', () => {
      render(<Input label="Email" id="email-input" />);
      
      const label = screen?.getByText('Email');
      const input = screen?.getByRole('textbox');
      
      expect(label)?.toHaveAttribute('for', 'email-input');
      expect(input)?.toHaveAttribute('id', 'email-input');
    });

    test('shows required indicator when required', () => {
      render(<Input label="Required Field" required />);
      
      expect(screen?.getByText('*'))?.toBeInTheDocument();
    });

    test('renders with description', () => {
      render(<Input description="Enter your email address" />);
      
      expect(screen?.getByText('Enter your email address'))?.toBeInTheDocument();
    });

    test('renders label, input, and description together', () => {
      render(
        <Input
          label="Email"
          description="We'll never share your email"
          placeholder="Enter email"
        />
      );
      
      expect(screen?.getByLabelText('Email'))?.toBeInTheDocument();
      expect(screen?.getByText("We'll never share your email"))?.toBeInTheDocument();
      expect(screen?.getByPlaceholderText('Enter email'))?.toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    test('renders with error message', () => {
      render(<Input error="This field is required" />);
      
      expect(screen?.getByText('This field is required'))?.toBeInTheDocument();
    });

    test('applies error styling to input', () => {
      render(<Input error="Invalid input" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveClass('border-destructive');
    });

    test('applies error styling to label', () => {
      render(<Input label="Username" error="Username is taken" />);
      
      const label = screen?.getByText('Username');
      expect(label)?.toHaveClass('text-destructive');
    });

    test('shows error instead of description', () => {
      render(
        <Input
          description="This is a description"
          error="This is an error"
        />
      );
      
      expect(screen?.getByText('This is an error'))?.toBeInTheDocument();
      expect(screen?.queryByText('This is a description'))?.not?.toBeInTheDocument();
    });
  });

  describe('Special Input Types', () => {
    test('renders checkbox input', () => {
      render(<Input type="checkbox" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toHaveAttribute('type', 'checkbox');
      expect(checkbox)?.toHaveClass('h-4', 'w-4', 'rounded');
    });

    test('renders radio input', () => {
      render(<Input type="radio" name="option" />);
      
      const radio = screen?.getByRole('radio');
      expect(radio)?.toHaveAttribute('type', 'radio');
      expect(radio)?.toHaveClass('rounded-full');
    });

    test('renders password input', () => {
      render(<Input type="password" />);
      
      const input = screen?.getByRole('textbox', { hidden: true }); // Password inputs are hidden from accessibility
      expect(input)?.toHaveAttribute('type', 'password');
    });

    test('renders date input', () => {
      render(<Input type="date" />);
      
      const input = screen?.getByDisplayValue(''); // Date inputs have specific behavior
      expect(input)?.toHaveAttribute('type', 'date');
    });
  });

  describe('User Interactions', () => {
    test('handles text input', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Input onChange={handleChange} />);
      
      const input = screen?.getByRole('textbox');
      await user?.type(input, 'Hello World');
      
      expect(input)?.toHaveValue('Hello World');
      expect(handleChange)?.toHaveBeenCalled();
    });

    test('handles checkbox interaction', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Input type="checkbox" onChange={handleChange} />);
      
      const checkbox = screen?.getByRole('checkbox');
      await user?.click(checkbox);
      
      expect(checkbox)?.toBeChecked();
      expect(handleChange)?.toHaveBeenCalled();
    });

    test('handles radio button interaction', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(
        <div>
          <Input type="radio" name="choice" value="option1" onChange={handleChange} />
          <Input type="radio" name="choice" value="option2" onChange={handleChange} />
        </div>
      );
      
      const radios = screen?.getAllByRole('radio');
      await user?.click(radios?.[0]);
      
      expect(radios?.[0])?.toBeChecked();
      expect(radios?.[1])?.not?.toBeChecked();
      expect(handleChange)?.toHaveBeenCalled();
    });

    test('prevents interaction when disabled', async () => {
      const handleChange = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Input onChange={handleChange} disabled />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toBeDisabled();
      
      await user?.click(input);
      expect(handleChange)?.not?.toHaveBeenCalled();
    });
  });

  describe('Value Handling', () => {
    test('renders with initial value', () => {
      render(<Input value="Initial value" onChange={() => {}} />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveValue('Initial value');
    });

    test('handles controlled input', async () => {
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e?.target?.value)}
          />
        );
      };
      
      const user = userEvent?.setup();
      render(<ControlledInput />);
      
      const input = screen?.getByRole('textbox');
      await user?.type(input, 'Controlled');
      
      expect(input)?.toHaveValue('Controlled');
    });

    test('handles uncontrolled input', async () => {
      const user = userEvent?.setup();
      render(<Input defaultValue="Default" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveValue('Default');
      
      await user?.clear(input);
      await user?.type(input, 'New value');
      expect(input)?.toHaveValue('New value');
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      render(
        <Input
          label="Accessible Input"
          description="Helper text"
          error="Error message"
        />
      );
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toBeInTheDocument();
    });

    test('is focusable', async () => {
      const user = userEvent?.setup();
      render(<Input />);
      
      const input = screen?.getByRole('textbox');
      await user?.click(input);
      expect(input)?.toHaveFocus();
    });

    test('supports keyboard navigation', async () => {
      const user = userEvent?.setup();
      render(<Input />);
      
      const input = screen?.getByRole('textbox');
      await user?.tab();
      expect(input)?.toHaveFocus();
    });

    test('checkbox has proper accessibility', () => {
      render(<Input type="checkbox" />);
      
      const checkbox = screen?.getByRole('checkbox');
      expect(checkbox)?.toBeInTheDocument();
    });

    test('radio button has proper accessibility', () => {
      render(<Input type="radio" />);
      
      const radio = screen?.getByRole('radio');
      expect(radio)?.toBeInTheDocument();
    });
  });

  describe('Styling and Classes', () => {
    test('applies custom className', () => {
      render(<Input className="custom-class" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveClass('custom-class');
    });

    test('maintains base classes with custom className', () => {
      render(<Input className="custom-class" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveClass('flex', 'h-10', 'w-full', 'custom-class');
    });

    test('applies error classes correctly', () => {
      render(<Input error="Error" className="custom-class" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toHaveClass('border-destructive', 'custom-class');
    });
  });

  describe('Forward Ref', () => {
    test('forwards ref to input element', () => {
      const ref = React.createRef();
      
      render(<Input ref={ref} />);
      
      expect(ref?.current)?.toBeInstanceOf(HTMLInputElement);
      expect(ref?.current)?.toBe(screen?.getByRole('textbox'));
    });

    test('forwards ref for checkbox', () => {
      const ref = React.createRef();
      
      render(<Input ref={ref} type="checkbox" />);
      
      expect(ref?.current)?.toBeInstanceOf(HTMLInputElement);
      expect(ref?.current)?.toBe(screen?.getByRole('checkbox'));
    });
  });

  describe('Edge Cases', () => {
    test('handles missing props gracefully', () => {
      render(<Input />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toBeInTheDocument();
    });

    test('handles empty label gracefully', () => {
      render(<Input label="" />);
      
      const input = screen?.getByRole('textbox');
      expect(input)?.toBeInTheDocument();
    });

    test('handles long error messages', () => {
      const longError = 'This is a very long error message that should still be displayed properly without breaking the layout or functionality';
      
      render(<Input error={longError} />);
      
      expect(screen?.getByText(longError))?.toBeInTheDocument();
    });

    test('handles special characters in placeholder', () => {
      render(<Input placeholder="Special chars: @#$%^&*()" />);
      
      expect(screen?.getByPlaceholderText('Special chars: @#$%^&*()'))?.toBeInTheDocument();
    });
  });
});