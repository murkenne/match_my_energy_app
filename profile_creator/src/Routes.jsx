import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Landing from './pages/Landing';
import MatchMyEnergyLandingPage from './pages/match-my-energy-landing-page';
import ProfileCreationForm from './pages/profile-creation-form';
import AgeVerificationGate from './pages/age-verification-gate';
import MyCosmicProfile from './pages/my-cosmic-profile';
import CosmicAlignmentsEducationalHub from './pages/cosmic-alignments-educational-hub';
import DatingProfileCardViewer from './pages/dating-profile-card-viewer';
import LoginPageForExistingMembers from './pages/login-page-for-existing-members';
import DiscoverPageForFindingMatches from './pages/discover-page-for-finding-matches';
import NavigationSystemWithDropdownMenu from './pages/navigation-system-with-dropdown-menu';
import SettingsPage from './pages/settings-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Landing />} />
        <Route path="/match-my-energy-landing-page" element={<MatchMyEnergyLandingPage />} />
        <Route path="/age-verification-gate" element={<AgeVerificationGate />} />
        <Route path="/profile-creation-form" element={<ProfileCreationForm />} />
        <Route path="/my-cosmic-profile" element={<MyCosmicProfile />} />
        <Route path="/cosmic-alignments-educational-hub" element={<CosmicAlignmentsEducationalHub />} />
        <Route path="/dating-profile-card-viewer" element={<DatingProfileCardViewer />} />
        <Route path="/login-page-for-existing-members" element={<LoginPageForExistingMembers />} />
        <Route path="/discover-page-for-finding-matches" element={<DiscoverPageForFindingMatches />} />
        <Route path="/navigation-system-with-dropdown-menu" element={<NavigationSystemWithDropdownMenu />} />
        <Route path="/settings-page" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;