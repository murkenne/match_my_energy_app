import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';
import ZodiacWheel from '../components/ZodiacWheel';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';

const Landing = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <CosmicBackground>
      <div className="min-h-screen flex">
        {/* Left Side - Branding and Zodiac Wheel */}
        <div className="flex-1 flex flex-col justify-center items-center p-12 relative">
          {/* MME Branding */}
          <div className="absolute top-8 right-8">
            <h1 className="text-4xl font-bold text-purple-300">MME</h1>
          </div>
          
          {/* Zodiac Wheel */}
          <div className="mb-8">
            <ZodiacWheel size={400} />
          </div>
          
          {/* Taglines */}
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4 text-shadow-sm">
              Match Beyond the Surface - Powered by Energy
            </h2>
            <p className="text-lg text-gray-200 opacity-90">
              Discover connections written in the stars
            </p>
          </div>
        </div>
        
        {/* Right Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <div className="cosmic-card rounded-xl p-8 shadow-soft">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#40E0D0' }}>
                Create Your Profile
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First name"
                    type="text"
                    placeholder="First name"
                    value={formData?.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                    className="cosmic-input"
                  />
                  <Input
                    label="Last name"
                    type="text"
                    placeholder="Last name"
                    value={formData?.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                    className="cosmic-input"
                  />
                </div>
                
                <Input
                  label="Email or phone number"
                  type="text"
                  placeholder="Email or phone number"
                  value={formData?.emailOrPhone || ''}
                  onChange={(e) => handleInputChange('emailOrPhone', e?.target?.value)}
                  className="cosmic-input"
                />
                
                <Input
                  label="Date of birth (MM/DD/YY)"
                  type="text"
                  placeholder="MM/DD/YY"
                  value={formData?.dateOfBirth || ''}
                  onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                  className="cosmic-input"
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value={formData?.password || ''}
                  onChange={(e) => handleInputChange('password', e?.target?.value)}
                  className="cosmic-input"
                />
                
                <Input
                  label="Confirm password"
                  type="password"
                  placeholder="Confirm password"
                  value={formData?.confirmPassword || ''}
                  onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                  className="cosmic-input"
                />
                
                <div className="space-y-3 mt-6">
                  <Checkbox
                    label="Remember me"
                    checked={formData?.rememberMe || false}
                    onChange={(checked) => handleInputChange('rememberMe', checked)}
                    className="text-white"
                  />
                  
                  <Checkbox
                    label={
                      <span className="text-white">
                        I agree to all the{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                          terms
                        </a>
                        ,{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                          privacy policy
                        </a>
                      </span>
                    }
                    checked={formData?.agreeToTerms || false}
                    onChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full mt-6 cosmic-button-primary text-white font-semibold py-3 rounded-lg transition-smooth"
                  disabled={!formData?.agreeToTerms}
                >
                  Create account
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 py-3 rounded-lg flex items-center justify-center transition-smooth"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign-in with google
                </Button>
                
                <div className="text-center mt-6">
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm underline">
                    Forgot password?
                  </a>
                </div>
                
                <div className="text-center mt-4 pt-4 border-t border-gray-600">
                  <span className="text-gray-300 text-sm">
                    Already have an account?{' '}
                    <Link to="/profile-creation-form" className="text-blue-400 hover:text-blue-300 underline">
                      Sign in
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default Landing;