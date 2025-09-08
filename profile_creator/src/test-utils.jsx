import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Custom render function that includes common providers
const customRender = (ui, options = {}) => {
  const {
    initialEntries = ['/'],
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Test utilities
export const createMockFormData = (overrides = {}) => ({
  fullName: 'John Doe',
  email: 'john@example.com',
  dateOfBirth: '1990-01-01',
  bio: 'Test bio',
  interests: ['astronomy', 'meditation'],
  location: {
    city: 'New York',
    country: 'USA'
  },
  privacySettings: {
    profileVisible: true,
    showEmail: false
  },
  ...overrides
});

export const createMockUser = (overrides = {}) => ({
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  isLoggedIn: true,
  ...overrides
});

export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 100));
};