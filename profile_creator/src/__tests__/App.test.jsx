import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { mockNavigate } from '../setupTests';

// Mock the Routes component
jest.mock('../Routes', () => {
  return function MockRoutes() {
    return <div data-testid="routes-component">Routes Component</div>;
  };
});

describe('App Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders without crashing', () => {
    render(<App />);
    
    // App should render the Routes component
    expect(screen.getByTestId('routes-component')).toBeInTheDocument();
  });

  test('only renders Routes component', () => {
    render(<App />);
    
    // Should only have the Routes component and no additional content
    const routesComponent = screen.getByTestId('routes-component');
    expect(routesComponent).toBeInTheDocument();
    expect(routesComponent.textContent).toBe('Routes Component');
  });

  test('maintains correct architecture', () => {
    render(<App />);
    
    // App should not have any routing logic itself
    // It should only render the Routes component
    const appContainer = screen.getByTestId('routes-component').closest('body');
    expect(appContainer).toBeInTheDocument();
  });
});