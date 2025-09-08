import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Toggle from './Toggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Apply theme to document root
    if (!isDarkMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
    navigate('/login-page-for-existing-members');
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Profile', path: '/my-cosmic-profile', icon: 'User' },
    { name: 'Edit Cosmic Profile', path: '/profile-creation-form', icon: 'Edit', badge: 'Done' },
    { name: 'My Cosmic Chart', path: '/cosmic-alignments-educational-hub', icon: 'Star' },
    { name: 'Discover', path: '/discover-page-for-finding-matches', icon: 'Search' },
    { name: 'Settings', path: '/settings-page', icon: 'Settings' }
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-orange-600">Match My Energy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  isActiveRoute(item?.path)
                    ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item?.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <span className="text-sm font-medium text-gray-700">Menu</span>
              <Icon name={isMenuOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* Mobile Navigation Items */}
                <div className="md:hidden border-b border-gray-100 pb-2 mb-2">
                  {navItems?.map((item) => (
                    <Link
                      key={item?.name}
                      to={item?.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActiveRoute(item?.path)
                          ? 'bg-blue-50 text-blue-700' :'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                      {item?.badge && (
                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                          {item?.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Desktop Menu Options */}
                <div className="space-y-1">
                  <Link
                    to="/my-cosmic-profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </Link>
                  
                  <Link
                    to="/cosmic-alignments-educational-hub"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon name="Star" size={16} />
                    <span>My Cosmic Chart</span>
                  </Link>

                  <Link
                    to="/settings-page"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>

                  <Link
                    to="/profile-creation-form"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon name="Edit" size={16} />
                    <span>Edit Cosmic Profile</span>
                  </Link>

                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <Icon name="Moon" size={16} className="text-gray-700" />
                        <span className="text-sm text-gray-700">Toggle Theme</span>
                      </div>
                      <Toggle
                        checked={isDarkMode}
                        onCheckedChange={handleThemeToggle}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;