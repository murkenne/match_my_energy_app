import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: 'Profile', href: '/profile-creation-form', active: true },
    { label: 'Dashboard', href: '/dashboard', active: false },
    { label: 'Settings', href: '/settings', active: false },
    { label: 'Help', href: '/help', active: false }
  ];

  const moreMenuItems = [
    { label: 'Admin Panel', href: '/admin', icon: 'Shield' },
    { label: 'Documentation', href: '/docs', icon: 'BookOpen' },
    { label: 'Support', href: '/support', icon: 'MessageCircle' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">Profile Creator</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.label}
                href={item?.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  item?.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item?.label}
              </a>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconPosition="right"
                className="text-muted-foreground hover:text-foreground"
              >
                More
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-soft opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-50">
                <div className="py-1">
                  {moreMenuItems?.map((item) => (
                    <a
                      key={item?.label}
                      href={item?.href}
                      className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" iconName="Bell" />
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="var(--color-muted-foreground)" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <a
                  key={item?.label}
                  href={item?.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    item?.active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item?.label}
                </a>
              ))}
              
              {/* Mobile More Items */}
              <div className="border-t border-border pt-2 mt-2">
                {moreMenuItems?.map((item) => (
                  <a
                    key={item?.label}
                    href={item?.href}
                    className="flex items-center px-3 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={16} className="mr-3" />
                    {item?.label}
                  </a>
                ))}
              </div>
              
              {/* Mobile User Actions */}
              <div className="border-t border-border pt-2 mt-2 flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="var(--color-muted-foreground)" />
                  </div>
                  <span className="text-sm text-foreground">Profile</span>
                </div>
                <Button variant="ghost" size="sm" iconName="Bell" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;