import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../Routes';

// Add this block - Jest globals declaration
declare global {
  var jest: any;
  var describe: any;
  var test: any;
  var expect: any;
}

// Mock all page components
jest?.mock('../pages/Landing', () => {
  return function MockLanding() {
    return <div data-testid="landing-page">Landing Page</div>;
  };
});

jest?.mock('../pages/NotFound', () => {
  return function MockNotFound() {
    return <div data-testid="not-found-page">Not Found Page</div>;
  };
});

jest?.mock('../pages/match-my-energy-landing-page', () => {
  return function MockMatchMyEnergyLandingPage() {
    return <div data-testid="match-my-energy-page">Match My Energy Landing Page</div>;
  };
});

jest?.mock('../pages/age-verification-gate', () => {
  return function MockAgeVerificationGate() {
    return <div data-testid="age-verification-page">Age Verification Gate</div>;
  };
});

jest?.mock('../pages/profile-creation-form', () => {
  return function MockProfileCreationForm() {
    return <div data-testid="profile-creation-page">Profile Creation Form</div>;
  };
});

jest?.mock('../pages/login-page-for-existing-members', () => {
  return function MockLoginPage() {
    return <div data-testid="login-page">Login Page</div>;
  };
});

jest?.mock('../pages/settings-page', () => {
  return function MockSettingsPage() {
    return <div data-testid="settings-page">Settings Page</div>;
  };
});

jest?.mock('../pages/my-cosmic-profile', () => {
  return function MockMyCosmicProfile() {
    return <div data-testid="my-cosmic-profile-page">My Cosmic Profile</div>;
  };
});

jest?.mock('../pages/cosmic-alignments-educational-hub', () => {
  return function MockCosmicAlignmentsEducationalHub() {
    return <div data-testid="cosmic-alignments-page">Cosmic Alignments Educational Hub</div>;
  };
});

jest?.mock('../pages/dating-profile-card-viewer', () => {
  return function MockDatingProfileCardViewer() {
    return <div data-testid="dating-profile-viewer-page">Dating Profile Card Viewer</div>;
  };
});

jest?.mock('../pages/discover-page-for-finding-matches', () => {
  return function MockDiscoverPage() {
    return <div data-testid="discover-page">Discover Page</div>;
  };
});

jest?.mock('../pages/navigation-system-with-dropdown-menu', () => {
  return function MockNavigationSystem() {
    return <div data-testid="navigation-system-page">Navigation System</div>;
  };
});

jest?.mock('../components/ScrollToTop', () => {
  return function MockScrollToTop() {
    return <div data-testid="scroll-to-top">ScrollToTop Component</div>;
  };
});

jest?.mock('../components/ErrorBoundary', () => {
  return function MockErrorBoundary({ children }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes />
    </MemoryRouter>
  );
};

describe('Routes Component', () => {
  describe('Route Rendering', () => {
    test('renders landing page for root path', () => {
      renderWithRouter(['/']);
      
      expect(screen?.getByTestId('landing-page'))?.toBeInTheDocument();
      expect(screen?.getByTestId('error-boundary'))?.toBeInTheDocument();
      expect(screen?.getByTestId('scroll-to-top'))?.toBeInTheDocument();
    });

    test('renders match my energy landing page', () => {
      renderWithRouter(['/match-my-energy-landing-page']);
      
      expect(screen?.getByTestId('match-my-energy-page'))?.toBeInTheDocument();
    });

    test('renders age verification gate', () => {
      renderWithRouter(['/age-verification-gate']);
      
      expect(screen?.getByTestId('age-verification-page'))?.toBeInTheDocument();
    });

    test('renders profile creation form', () => {
      renderWithRouter(['/profile-creation-form']);
      
      expect(screen?.getByTestId('profile-creation-page'))?.toBeInTheDocument();
    });

    test('renders login page', () => {
      renderWithRouter(['/login-page-for-existing-members']);
      
      expect(screen?.getByTestId('login-page'))?.toBeInTheDocument();
    });

    test('renders settings page', () => {
      renderWithRouter(['/settings-page']);
      
      expect(screen?.getByTestId('settings-page'))?.toBeInTheDocument();
    });

    test('renders my cosmic profile page', () => {
      renderWithRouter(['/my-cosmic-profile']);
      
      expect(screen?.getByTestId('my-cosmic-profile-page'))?.toBeInTheDocument();
    });

    test('renders cosmic alignments educational hub', () => {
      renderWithRouter(['/cosmic-alignments-educational-hub']);
      
      expect(screen?.getByTestId('cosmic-alignments-page'))?.toBeInTheDocument();
    });

    test('renders dating profile card viewer', () => {
      renderWithRouter(['/dating-profile-card-viewer']);
      
      expect(screen?.getByTestId('dating-profile-viewer-page'))?.toBeInTheDocument();
    });

    test('renders discover page', () => {
      renderWithRouter(['/discover-page-for-finding-matches']);
      
      expect(screen?.getByTestId('discover-page'))?.toBeInTheDocument();
    });

    test('renders navigation system page', () => {
      renderWithRouter(['/navigation-system-with-dropdown-menu']);
      
      expect(screen?.getByTestId('navigation-system-page'))?.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('renders not found page for invalid routes', () => {
      renderWithRouter(['/invalid-route']);
      
      expect(screen?.getByTestId('not-found-page'))?.toBeInTheDocument();
    });

    test('renders not found page for deeply nested invalid routes', () => {
      renderWithRouter(['/some/deep/invalid/route']);
      
      expect(screen?.getByTestId('not-found-page'))?.toBeInTheDocument();
    });
  });

  describe('Architecture Components', () => {
    test('always renders BrowserRouter wrapper', () => {
      renderWithRouter();
      
      // BrowserRouter is mocked to show as browser-router
      expect(screen?.getByTestId('memory-router'))?.toBeInTheDocument();
    });

    test('always renders ErrorBoundary', () => {
      renderWithRouter();
      
      expect(screen?.getByTestId('error-boundary'))?.toBeInTheDocument();
    });

    test('always renders ScrollToTop component', () => {
      renderWithRouter();
      
      expect(screen?.getByTestId('scroll-to-top'))?.toBeInTheDocument();
    });
  });

  describe('Route Configuration', () => {
    test('has correct component hierarchy', () => {
      renderWithRouter(['/']);
      
      // Check that ErrorBoundary wraps everything
      const errorBoundary = screen?.getByTestId('error-boundary');
      expect(errorBoundary)?.toBeInTheDocument();
      
      // Check that ScrollToTop is inside ErrorBoundary
      const scrollToTop = screen?.getByTestId('scroll-to-top');
      expect(errorBoundary)?.toContainElement(scrollToTop);
      
      // Check that the page content is rendered
      expect(screen?.getByTestId('landing-page'))?.toBeInTheDocument();
    });

    test('renders only one page at a time', () => {
      renderWithRouter(['/age-verification-gate']);
      
      expect(screen?.getByTestId('age-verification-page'))?.toBeInTheDocument();
      expect(screen?.queryByTestId('landing-page'))?.not?.toBeInTheDocument();
      expect(screen?.queryByTestId('profile-creation-page'))?.not?.toBeInTheDocument();
      expect(screen?.queryByTestId('login-page'))?.not?.toBeInTheDocument();
    });
  });

  describe('Route Transitions', () => {
    test('switches between routes correctly', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Routes />
        </MemoryRouter>
      );
      
      expect(screen?.getByTestId('landing-page'))?.toBeInTheDocument();
      
      // Change route
      rerender(
        <MemoryRouter initialEntries={['/profile-creation-form']}>
          <Routes />
        </MemoryRouter>
      );
      
      expect(screen?.getByTestId('profile-creation-page'))?.toBeInTheDocument();
      expect(screen?.queryByTestId('landing-page'))?.not?.toBeInTheDocument();
    });

    test('maintains error boundary and scroll to top across route changes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Routes />
        </MemoryRouter>
      );
      
      expect(screen?.getByTestId('error-boundary'))?.toBeInTheDocument();
      expect(screen?.getByTestId('scroll-to-top'))?.toBeInTheDocument();
      
      // Change route
      rerender(
        <MemoryRouter initialEntries={['/settings-page']}>
          <Routes />
        </MemoryRouter>
      );
      
      expect(screen?.getByTestId('error-boundary'))?.toBeInTheDocument();
      expect(screen?.getByTestId('scroll-to-top'))?.toBeInTheDocument();
      expect(screen?.getByTestId('settings-page'))?.toBeInTheDocument();
    });
  });

  describe('URL Path Accuracy', () => {
    const routeTests = [
      { path: '/match-my-energy-landing-page', testId: 'match-my-energy-page' },
      { path: '/age-verification-gate', testId: 'age-verification-page' },
      { path: '/profile-creation-form', testId: 'profile-creation-page' },
      { path: '/my-cosmic-profile', testId: 'my-cosmic-profile-page' },
      { path: '/cosmic-alignments-educational-hub', testId: 'cosmic-alignments-page' },
      { path: '/dating-profile-card-viewer', testId: 'dating-profile-viewer-page' },
      { path: '/login-page-for-existing-members', testId: 'login-page' },
      { path: '/discover-page-for-finding-matches', testId: 'discover-page' },
      { path: '/navigation-system-with-dropdown-menu', testId: 'navigation-system-page' },
      { path: '/settings-page', testId: 'settings-page' }
    ];

    routeTests?.forEach(({ path, testId }) => {
      test(`correctly maps ${path} to appropriate component`, () => {
        renderWithRouter([path]);
        
        expect(screen?.getByTestId(testId))?.toBeInTheDocument();
      });
    });
  });
});