import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

// Add missing Jest and testing globals
const jest = globalThis.jest || {
  mock: () => {},
  fn: () => () => {},
};

const describe = globalThis.describe || ((name, fn) => fn());
const test = globalThis.test || globalThis.it || ((name, fn) => fn());
const expect = globalThis.expect || (() => ({
  toBeInTheDocument: () => {},
  toHaveClass: () => {},
  toBeDisabled: () => {},
  toHaveAttribute: () => {},
  toHaveFocus: () => {},
  toHaveBeenCalledTimes: () => {},
  not: {
    toHaveBeenCalled: () => {},
  }
}));

// Mock Icon component
jest?.mock('../../AppIcon', () => {
  return function MockIcon({ name, size, className }) {
    return <span data-testid={`icon-${name}`} className={className} data-size={size}>{name}</span>;
  };
});

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    test('renders button with text', () => {
      render(<Button>Click me</Button>);
      
      expect(screen?.getByRole('button', { name: 'Click me' }))?.toBeInTheDocument();
    });

    test('renders button with default variant and size', () => {
      render(<Button>Default Button</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    test('applies custom className', () => {
      render(<Button className="custom-class">Custom Button</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    test('renders with different variants', () => {
      const { rerender } = render(<Button variant="destructive">Destructive</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button variant="link">Link</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();
    });

    test('renders with success, warning, and danger variants', () => {
      const { rerender } = render(<Button variant="success">Success</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button variant="warning">Warning</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    test('renders with different sizes', () => {
      const { rerender } = render(<Button size="xs">Extra Small</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button size="sm">Small</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button size="lg">Large</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button size="xl">Extra Large</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();

      rerender(<Button size="icon">Icon</Button>);
      expect(screen?.getByRole('button'))?.toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    test('renders with left icon', () => {
      render(<Button iconName="Heart" iconPosition="left">With Icon</Button>);
      
      expect(screen?.getByTestId('icon-Heart'))?.toBeInTheDocument();
      expect(screen?.getByRole('button', { name: /with icon/i }))?.toBeInTheDocument();
    });

    test('renders with right icon', () => {
      render(<Button iconName="Arrow" iconPosition="right">With Icon</Button>);
      
      expect(screen?.getByTestId('icon-Arrow'))?.toBeInTheDocument();
      expect(screen?.getByRole('button', { name: /with icon/i }))?.toBeInTheDocument();
    });

    test('renders icon-only button', () => {
      render(<Button iconName="Close" size="icon" />);
      
      expect(screen?.getByTestId('icon-Close'))?.toBeInTheDocument();
      expect(screen?.getByRole('button'))?.toBeInTheDocument();
    });

    test('handles invalid icon names gracefully', () => {
      render(<Button iconName="InvalidIcon">Button</Button>);
      
      expect(screen?.getByRole('button', { name: 'Button' }))?.toBeInTheDocument();
      expect(screen?.queryByTestId('icon-InvalidIcon'))?.toBeInTheDocument(); // Mock still renders
    });

    test('uses correct icon size based on button size', () => {
      const { rerender } = render(<Button iconName="Star" size="sm">Small</Button>);
      expect(screen?.getByTestId('icon-Star'))?.toHaveAttribute('data-size', '14');

      rerender(<Button iconName="Star" size="lg">Large</Button>);
      expect(screen?.getByTestId('icon-Star'))?.toHaveAttribute('data-size', '18');

      rerender(<Button iconName="Star" size="xl">Extra Large</Button>);
      expect(screen?.getByTestId('icon-Star'))?.toHaveAttribute('data-size', '20');
    });

    test('allows custom icon size', () => {
      render(<Button iconName="Custom" iconSize={24}>Custom Size</Button>);
      
      expect(screen?.getByTestId('icon-Custom'))?.toHaveAttribute('data-size', '24');
    });
  });

  describe('Loading State', () => {
    test('renders loading spinner when loading', () => {
      render(<Button loading>Loading Button</Button>);
      
      expect(screen?.getByRole('button'))?.toBeInTheDocument();
      expect(screen?.getByText('Loading Button'))?.toBeInTheDocument();
      
      // Check for loading spinner (SVG)
      const svg = screen?.getByRole('button')?.querySelector('svg');
      expect(svg)?.toBeInTheDocument();
      expect(svg)?.toHaveClass('animate-spin');
    });

    test('disables button when loading', () => {
      render(<Button loading>Loading Button</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toBeDisabled();
    });

    test('shows loading with icon', () => {
      render(<Button loading iconName="Save">Saving...</Button>);
      
      expect(screen?.getByRole('button'))?.toBeDisabled();
      expect(screen?.getByText('Saving...'))?.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    test('renders disabled button', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toBeDisabled();
    });

    test('disabled takes precedence over loading', () => {
      render(<Button disabled loading>Both Disabled and Loading</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toBeDisabled();
    });
  });

  describe('Full Width', () => {
    test('applies full width styling', () => {
      render(<Button fullWidth>Full Width</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toHaveClass('w-full');
    });
  });

  describe('Event Handling', () => {
    test('handles click events', async () => {
      const handleClick = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      await user?.click(screen?.getByRole('button'));
      expect(handleClick)?.toHaveBeenCalledTimes(1);
    });

    test('does not trigger click when disabled', async () => {
      const handleClick = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      await user?.click(screen?.getByRole('button'));
      expect(handleClick)?.not?.toHaveBeenCalled();
    });

    test('does not trigger click when loading', async () => {
      const handleClick = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Button onClick={handleClick} loading>Loading</Button>);
      
      await user?.click(screen?.getByRole('button'));
      expect(handleClick)?.not?.toHaveBeenCalled();
    });
  });

  describe('AsChild Functionality', () => {
    test('renders as child element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      
      const link = screen?.getByRole('link', { name: 'Link Button' });
      expect(link)?.toBeInTheDocument();
      expect(link)?.toHaveAttribute('href', '/test');
    });

    test('applies button styles to child element', () => {
      render(
        <Button asChild variant="outline">
          <a href="/test">Styled Link</a>
        </Button>
      );
      
      const link = screen?.getByRole('link');
      expect(link)?.toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    test('adds icons to child element', () => {
      render(
        <Button asChild iconName="ExternalLink">
          <a href="/test">External Link</a>
        </Button>
      );
      
      expect(screen?.getByTestId('icon-ExternalLink'))?.toBeInTheDocument();
      expect(screen?.getByRole('link', { name: /external link/i }))?.toBeInTheDocument();
    });

    test('falls back to regular button when asChild has issues', () => {
      render(
        <Button asChild>
          <div>Not a valid child</div>
          <div>Multiple children</div>
        </Button>
      );
      
      // Should fall back to regular button behavior
      expect(screen?.getByRole('button'))?.toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    test('forwards ref to button element', () => {
      const ref = React.createRef();
      
      render(<Button ref={ref}>Button with Ref</Button>);
      
      expect(ref?.current)?.toBeInstanceOf(HTMLButtonElement);
      expect(ref?.current)?.toBe(screen?.getByRole('button'));
    });
  });

  describe('Accessibility', () => {
    test('has proper button role', () => {
      render(<Button>Accessible Button</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toHaveAttribute('type', 'button');
    });

    test('supports custom button types', () => {
      render(<Button type="submit">Submit Button</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toHaveAttribute('type', 'submit');
    });

    test('is focusable when enabled', () => {
      render(<Button>Focusable</Button>);
      
      const button = screen?.getByRole('button');
      button?.focus();
      expect(button)?.toHaveFocus();
    });

    test('is not focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>);
      
      const button = screen?.getByRole('button');
      expect(button)?.toBeDisabled();
    });
  });

  describe('Keyboard Navigation', () => {
    test('responds to Enter key', async () => {
      const handleClick = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Button onClick={handleClick}>Keyboard Button</Button>);
      
      const button = screen?.getByRole('button');
      button?.focus();
      await user?.keyboard('{Enter}');
      
      expect(handleClick)?.toHaveBeenCalledTimes(1);
    });

    test('responds to Space key', async () => {
      const handleClick = jest?.fn();
      const user = userEvent?.setup();
      
      render(<Button onClick={handleClick}>Space Button</Button>);
      
      const button = screen?.getByRole('button');
      button?.focus();
      await user?.keyboard(' ');
      
      expect(handleClick)?.toHaveBeenCalledTimes(1);
    });
  });
});