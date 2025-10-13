import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';

const LoginPageForExistingMembers = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      console.log('Login successful:', formData);
      navigate('/my-cosmic-profile');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Navigate to forgot password page
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/AdobeStock_1195897766-1757118550958.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-lg shadow-lg">
                <Icon name="Zap" size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Match My Energy</h1>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg">Welcome Back</h2>
            <p className="text-white/90 drop-shadow">Sign in to your cosmic journey</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors?.general && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm">
                  {errors?.general}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2 drop-shadow">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  placeholder="Enter your email"
                  className={`w-full bg-white/25 backdrop-blur-sm border-white/40 text-white placeholder-white/70 focus:border-orange-400 focus:ring-orange-400 focus:bg-white/30 ${
                    errors?.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                {errors?.email && (
                  <p className="mt-1 text-sm text-red-300 drop-shadow">{errors?.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2 drop-shadow">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData?.password}
                    onChange={(e) => handleInputChange('password', e?.target?.value)}
                    placeholder="Enter your password"
                    className={`w-full bg-white/25 backdrop-blur-sm border-white/40 text-white placeholder-white/70 focus:border-orange-400 focus:ring-orange-400 focus:bg-white/30 pr-10 ${
                      errors?.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors"
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                  </button>
                </div>
                {errors?.password && (
                  <p className="mt-1 text-sm text-red-300 drop-shadow">{errors?.password}</p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData?.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                  />
                  <label htmlFor="rememberMe" className="text-sm text-white drop-shadow">
                    Remember Me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-orange-300 hover:text-orange-200 transition-colors duration-200 drop-shadow"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/40"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/80 drop-shadow">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-white/40 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
                >
                  <Icon name="Globe" size={20} className="mr-2" />
                  Google
                </button>
                <button
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-white/40 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
                >
                  <Icon name="Facebook" size={20} className="mr-2" />
                  Facebook
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-white/80 drop-shadow">
                New to Match My Energy?{' '}
                <Link
                  to="/create-profile"
                  className="text-orange-300 hover:text-orange-200 font-medium transition-colors duration-200 drop-shadow"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Floating Energy Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full opacity-80 animate-pulse shadow-lg"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full opacity-60 animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse shadow-lg" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 right-32 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-pulse shadow-lg" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-60 animate-pulse shadow-lg" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-50 animate-pulse shadow-lg" style={{animationDelay: '2.5s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageForExistingMembers;