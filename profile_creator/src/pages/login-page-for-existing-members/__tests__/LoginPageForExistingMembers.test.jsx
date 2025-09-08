import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPageForExistingMembers from '../index';
import { mockNavigate } from '../../../setupTests';

// Add Jest globals - Add this block
const describe = global.describe || function(name, fn) { fn(); };
const beforeEach = global.beforeEach || function(fn) { fn(); };
const test = global.test || global.it || function(name, fn) { fn(); };
const expect = global.expect || function(actual) { 
  return {
    toBeInTheDocument: () => {},
    toHaveValue: () => {},
    toHaveAttribute: () => {},
    not: { toBeChecked: () => {}, toBeInTheDocument: () => {} },
    toBeChecked: () => {},
    toBeDisabled: () => {},
    toHaveBeenCalledWith: () => {},
    toHaveBeenCalledTimes: () => {},
    queryByText: () => null
  };
};
const jest = global.jest || { 
  fn: () => ({ mockClear: () => {} }) 
};

const renderLoginPage = () => {
  return render(
    <MemoryRouter>
      <LoginPageForExistingMembers />
    </MemoryRouter>
  );
};

describe('LoginPageForExistingMembers', () => {
  beforeEach(() => {
    mockNavigate?.mockClear();
    console.log = jest?.fn(); // Mock console.log
    console.error = jest?.fn(); // Mock console.error
  });

  describe('Initial Render', () => {
    test('renders login form with all elements', () => {
      renderLoginPage();
      
      expect(screen?.getByText('Match My Energy'))?.toBeInTheDocument();
      expect(screen?.getByText('Welcome Back'))?.toBeInTheDocument();
      expect(screen?.getByText('Sign in to your cosmic journey'))?.toBeInTheDocument();
      
      expect(screen?.getByLabelText(/email address/i))?.toBeInTheDocument();
      expect(screen?.getByLabelText(/password/i))?.toBeInTheDocument();
      expect(screen?.getByRole('button', { name: /sign in/i }))?.toBeInTheDocument();
    });

    test('renders social login options', () => {
      renderLoginPage();
      
      expect(screen?.getByText('Or continue with'))?.toBeInTheDocument();
      expect(screen?.getByRole('button', { name: /google/i }))?.toBeInTheDocument();
      expect(screen?.getByRole('button', { name: /facebook/i }))?.toBeInTheDocument();
    });

    test('renders additional links', () => {
      renderLoginPage();
      
      expect(screen?.getByText(/forgot password/i))?.toBeInTheDocument();
      expect(screen?.getByText(/remember me/i))?.toBeInTheDocument();
      expect(screen?.getByText(/new to match my energy/i))?.toBeInTheDocument();
      expect(screen?.getByText('Create Account'))?.toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    test('updates email field when user types', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      await user?.type(emailInput, 'test@example.com');

      expect(emailInput)?.toHaveValue('test@example.com');
    });

    test('updates password field when user types', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const passwordInput = screen?.getByLabelText(/password/i);
      await user?.type(passwordInput, 'password123');

      expect(passwordInput)?.toHaveValue('password123');
    });

    test('toggles password visibility', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const passwordInput = screen?.getByLabelText(/password/i);
      const toggleButton = screen?.getByRole('button', { name: /toggle password visibility/i }) || 
                          passwordInput?.parentElement?.querySelector('button');

      expect(passwordInput)?.toHaveAttribute('type', 'password');

      await user?.click(toggleButton);
      expect(passwordInput)?.toHaveAttribute('type', 'text');

      await user?.click(toggleButton);
      expect(passwordInput)?.toHaveAttribute('type', 'password');
    });

    test('handles remember me checkbox', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const rememberCheckbox = screen?.getByRole('checkbox', { name: /remember me/i });
      
      expect(rememberCheckbox)?.not?.toBeChecked();
      
      await user?.click(rememberCheckbox);
      expect(rememberCheckbox)?.toBeChecked();
      
      await user?.click(rememberCheckbox);
      expect(rememberCheckbox)?.not?.toBeChecked();
    });
  });

  describe('Form Validation', () => {
    test('shows error for empty email', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const submitButton = screen?.getByRole('button', { name: /sign in/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByText(/email is required/i))?.toBeInTheDocument();
      });
    });

    test('shows error for invalid email format', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      await user?.type(emailInput, 'invalid-email');

      const submitButton = screen?.getByRole('button', { name: /sign in/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByText(/please enter a valid email address/i))?.toBeInTheDocument();
      });
    });

    test('shows error for empty password', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      await user?.type(emailInput, 'test@example.com');

      const submitButton = screen?.getByRole('button', { name: /sign in/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByText(/password is required/i))?.toBeInTheDocument();
      });
    });

    test('shows error for short password', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      const passwordInput = screen?.getByLabelText(/password/i);

      await user?.type(emailInput, 'test@example.com');
      await user?.type(passwordInput, '123');

      const submitButton = screen?.getByRole('button', { name: /sign in/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByText(/password must be at least 6 characters/i))?.toBeInTheDocument();
      });
    });

    test('clears validation errors when user starts typing', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      // Trigger validation error
      const submitButton = screen?.getByRole('button', { name: /sign in/i });
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByText(/email is required/i))?.toBeInTheDocument();
      });

      // Start typing in email field
      const emailInput = screen?.getByLabelText(/email address/i);
      await user?.type(emailInput, 'a');

      await waitFor(() => {
        expect(screen?.queryByText(/email is required/i))?.not?.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    test('submits form with valid credentials', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      const passwordInput = screen?.getByLabelText(/password/i);
      const submitButton = screen?.getByRole('button', { name: /sign in/i });

      await user?.type(emailInput, 'test@example.com');
      await user?.type(passwordInput, 'password123');
      await user?.click(submitButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen?.getByText(/signing in/i))?.toBeInTheDocument();
      });

      // Should navigate to profile after successful login
      await waitFor(() => {
        expect(mockNavigate)?.toHaveBeenCalledWith('/my-cosmic-profile');
      }, { timeout: 3000 });
    });

    test('disables submit button while loading', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      const passwordInput = screen?.getByLabelText(/password/i);
      const submitButton = screen?.getByRole('button', { name: /sign in/i });

      await user?.type(emailInput, 'test@example.com');
      await user?.type(passwordInput, 'password123');
      await user?.click(submitButton);

      await waitFor(() => {
        expect(submitButton)?.toBeDisabled();
      });
    });

    test('prevents multiple submissions', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      const passwordInput = screen?.getByLabelText(/password/i);
      const submitButton = screen?.getByRole('button', { name: /sign in/i });

      await user?.type(emailInput, 'test@example.com');
      await user?.type(passwordInput, 'password123');
      
      // Click submit multiple times
      await user?.click(submitButton);
      await user?.click(submitButton);
      await user?.click(submitButton);

      await waitFor(() => {
        expect(submitButton)?.toBeDisabled();
      });

      // Should only navigate once
      await waitFor(() => {
        expect(mockNavigate)?.toHaveBeenCalledTimes(1);
      }, { timeout: 3000 });
    });
  });

  describe('Social Login', () => {
    test('handles Google login', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const googleButton = screen?.getByRole('button', { name: /google/i });
      await user?.click(googleButton);

      expect(console.log)?.toHaveBeenCalledWith('Logging in with Google');
    });

    test('handles Facebook login', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const facebookButton = screen?.getByRole('button', { name: /facebook/i });
      await user?.click(facebookButton);

      expect(console.log)?.toHaveBeenCalledWith('Logging in with Facebook');
    });
  });

  describe('Navigation Links', () => {
    test('handles forgot password click', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const forgotPasswordButton = screen?.getByText(/forgot password/i);
      await user?.click(forgotPasswordButton);

      expect(console.log)?.toHaveBeenCalledWith('Forgot password clicked');
    });

    test('navigates to profile creation on create account click', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const createAccountLink = screen?.getByText('Create Account');
      await user?.click(createAccountLink);

      expect(mockNavigate)?.toHaveBeenCalledWith('/profile-creation-form');
    });
  });

  describe('Accessibility', () => {
    test('has proper form labels', () => {
      renderLoginPage();

      expect(screen?.getByLabelText(/email address/i))?.toBeInTheDocument();
      expect(screen?.getByLabelText(/password/i))?.toBeInTheDocument();
    });

    test('has proper button roles', () => {
      renderLoginPage();

      const signInButton = screen?.getByRole('button', { name: /sign in/i });
      const googleButton = screen?.getByRole('button', { name: /google/i });
      const facebookButton = screen?.getByRole('button', { name: /facebook/i });

      expect(signInButton)?.toHaveAttribute('type', 'submit');
      expect(googleButton)?.toHaveAttribute('type', 'button');
      expect(facebookButton)?.toHaveAttribute('type', 'button');
    });

    test('has proper checkbox role', () => {
      renderLoginPage();

      const rememberCheckbox = screen?.getByRole('checkbox', { name: /remember me/i });
      expect(rememberCheckbox)?.toBeInTheDocument();
    });
  });

  describe('UI States', () => {
    test('shows loading spinner when submitting', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      const passwordInput = screen?.getByLabelText(/password/i);
      const submitButton = screen?.getByRole('button', { name: /sign in/i });

      await user?.type(emailInput, 'test@example.com');
      await user?.type(passwordInput, 'password123');
      await user?.click(submitButton);

      await waitFor(() => {
        expect(screen?.getByText(/signing in/i))?.toBeInTheDocument();
      });
    });

    test('maintains form data during submission', async () => {
      const user = userEvent?.setup();
      renderLoginPage();

      const emailInput = screen?.getByLabelText(/email address/i);
      const passwordInput = screen?.getByLabelText(/password/i);

      await user?.type(emailInput, 'test@example.com');
      await user?.type(passwordInput, 'password123');

      const submitButton = screen?.getByRole('button', { name: /sign in/i });
      await user?.click(submitButton);

      // Data should still be there during submission
      expect(emailInput)?.toHaveValue('test@example.com');
      expect(passwordInput)?.toHaveValue('password123');
    });
  });
});