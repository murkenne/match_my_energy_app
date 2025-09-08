import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import CosmicBackground from '../../components/CosmicBackground';

const NavigationSystemWithDropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation tabs configuration
  const navigationTabs = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Profile', path: '/my-cosmic-profile', icon: 'User' },
    { 
      name: 'Edit Cosmic Profile', 
      path: '/profile-creation-form', 
      icon: 'Edit',
      badge: 'Done',
      badgeColor: 'bg-green-500'
    },
    { name: 'My Cosmic Chart', path: '/cosmic-alignments-educational-hub', icon: 'Star' },
    { name: 'Discover', path: '/dating-profile-card-viewer', icon: 'Search' },
    { name: 'Settings', path: '/settings-page', icon: 'Settings' }
  ];

  // Menu dropdown items
  const menuItems = [
    { name: 'Profile', path: '/my-cosmic-profile', icon: 'User' },
    { name: 'My Cosmic Chart', path: '/cosmic-alignments-educational-hub', icon: 'Star' },
    { name: 'Settings', path: '/settings-page', icon: 'Settings' },
    { name: 'Edit Cosmic Profile', path: '/profile-creation-form', icon: 'Edit' },
    { 
      name: 'Toggle Theme', 
      icon: isDarkMode ? 'Sun' : 'Moon',
      action: () => setIsDarkMode(!isDarkMode)
    },
    { name: 'Logout', icon: 'LogOut', action: () => console.log('Logout clicked') }
  ];

  // Handle navigation
  const handleNavigation = (tab) => {
    setActiveTab(tab?.name);
    if (tab?.path) {
      navigate(tab?.path);
    }
    setIsMenuOpen(false);
  };

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    if (item?.action) {
      item?.action();
    } else if (item?.path) {
      navigate(item?.path);
      setActiveTab(item?.name);
    }
    setIsMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update active tab based on current location
  useEffect(() => {
    const currentTab = navigationTabs?.find(tab => tab?.path === location?.pathname);
    if (currentTab) {
      setActiveTab(currentTab?.name);
    }
  }, [location?.pathname]);

  return (
    <CosmicBackground>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Navigation Header */}
        <div className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={24} className="text-orange-500" />
                  <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Match My Energy
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation Tabs */}
              <div className="hidden md:flex items-center space-x-1">
                {navigationTabs?.map((tab) => (
                  <button
                    key={tab?.name}
                    onClick={() => handleNavigation(tab)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                      activeTab === tab?.name
                        ? `${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-600'} border-b-2 border-blue-500`
                        : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.name}</span>
                    {tab?.badge && (
                      <span className={`ml-1 px-2 py-0.5 text-xs text-white rounded-full ${tab?.badgeColor}`}>
                        {tab?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Menu Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name="Menu" size={16} />
                  <span>Menu</span>
                  <Icon 
                    name={isMenuOpen ? "ChevronUp" : "ChevronDown"} 
                    size={14} 
                    className="transition-transform duration-200"
                  />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  } ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out`}>
                    <div className="py-1">
                      {menuItems?.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleMenuItemClick(item)}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors duration-150 ${
                            isDarkMode 
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' :'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon name={item?.icon} size={16} />
                          <span>{item?.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-lg ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name="Menu" size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                <div className="py-2 space-y-1">
                  {navigationTabs?.map((tab) => (
                    <button
                      key={tab?.name}
                      onClick={() => handleNavigation(tab)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors duration-150 ${
                        activeTab === tab?.name
                          ? `${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-600'}`
                          : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.name}</span>
                      {tab?.badge && (
                        <span className={`ml-auto px-2 py-0.5 text-xs text-white rounded-full ${tab?.badgeColor}`}>
                          {tab?.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`rounded-lg shadow-sm p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center">
              <Icon name="Zap" size={64} className="text-orange-500 mx-auto mb-4" />
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Navigation System Demo
              </h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Enhanced navigation system with dropdown menu and theme toggle
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <Icon name="Navigation" size={32} className="text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Smart Navigation</h3>
                  <p className="text-sm">Responsive tab-based navigation with active state indicators</p>
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <Icon name="Menu" size={32} className="text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Dropdown Menu</h3>
                  <p className="text-sm">Comprehensive menu with user actions and quick access</p>
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={32} className="text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Theme Toggle</h3>
                  <p className="text-sm">Seamless light and dark mode switching</p>
                </div>
              </div>

              <div className="mt-8">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Current theme: <span className="font-semibold">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Active section: <span className="font-semibold text-blue-500">{activeTab}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default NavigationSystemWithDropdownMenu;