import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ZodiacWheel from '../../components/ZodiacWheel';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
// If your Checkbox is a default export, change to: import Checkbox from '../../components/ui/Checkbox';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';

const CreateProfileForm = () => {
    const navigate = useNavigate();

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

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors?.[field]) {
            const next = { ...errors };
            delete next[field];
            setErrors(next);
        }
    };

    const validateForm = () => {
        const e = {};
        if (!formData.firstName.trim()) e.firstName = 'First name is required';
        if (!formData.lastName.trim()) e.lastName = 'Last name is required';

        if (!formData.emailOrPhone.trim()) {
            e.emailOrPhone = 'Email or phone number is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone) &&
            !/^\+?[\d\s\-\(\)]+$/.test(formData.emailOrPhone)
        ) {
            e.emailOrPhone = 'Please enter a valid email or phone number';
        }

        if (!formData.dateOfBirth) e.dateOfBirth = 'Date of birth is required';

        if (!formData.password) e.password = 'Password is required';
        else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters';

        if (!formData.confirmPassword) e.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';

        if (!formData.agreeToTerms) e.agreeToTerms = 'You must agree to the terms and privacy policy';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(r => setTimeout(r, 1000));

            // Build a safe seed (no passwords)
            const seed = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailOrPhone: formData.emailOrPhone,
                dateOfBirth: formData.dateOfBirth,
            };

            // Persist for refresh-safety + pass via state
            localStorage.setItem('onboarding-seed', JSON.stringify(seed));
            navigate('/profile-creation-form', { state: { seed } });

        } catch {
            setErrors({ submit: 'Failed to create profile. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = () => {
        // Hook up your provider logic here
        console.log('Google Sign-in clicked');
    };

    return (
        <div className="min-h-screen cosmic-gradient flex">
            {/* Left Side - Zodiac Wheel */}
            <div className="hidden lg:flex lg:flex-1 items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-600/40 to-indigo-900/50" />
                <div className="absolute top-8 left-8 z-10">
                    <h1 className="text-4xl font-bold text-white tracking-wider">MME</h1>
                </div>

                <div className="relative z-10 text-center text-white">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">
                            Match Beyond the Surface - Powered by Energy
                        </h2>
                        <p className="text-lg text-white/90">
                            Discover connections written in the stars
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <ZodiacWheel size={450} className="star-twinkle" />
                    </div>
                </div>

                {/* Decorative stars */}
                <div className="absolute top-20 right-20 text-yellow-300 text-2xl star-twinkle">✨</div>
                <div className="absolute bottom-32 left-16 text-yellow-300 text-xl star-twinkle" style={{ animationDelay: '1s' }}>⭐</div>
                <div className="absolute top-1/3 right-32 text-yellow-300 text-lg star-twinkle" style={{ animationDelay: '2s' }}>✦</div>
                <div className="absolute bottom-20 right-40 text-yellow-300 text-xl star-twinkle" style={{ animationDelay: '0.5s' }}>✨</div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Branding */}
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-wider mb-2">MME</h1>
                        <p className="text-white/90">Match Beyond the Surface - Powered by Energy</p>
                        <p className="text-white/80 text-sm">Discover connections written in the stars</p>
                    </div>

                    <div className="cosmic-card rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Create Your Profile</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                                className="cosmic-input"
                                error={errors.firstName}
                            />

                            <Input
                                type="text"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                                className="cosmic-input"
                                error={errors.lastName}
                            />

                            <Input
                                type="text"
                                placeholder="Email or phone number"
                                value={formData.emailOrPhone}
                                onChange={(e) => handleInputChange('emailOrPhone', e?.target?.value)}
                                className="cosmic-input"
                                error={errors.emailOrPhone}
                            />

                            <Input
                                type="date"
                                placeholder="MM/DD/YY"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                                className="cosmic-input"
                                error={errors.dateOfBirth}
                            />

                            {/* Password */}
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={formData?.password}
                                    onChange={(e) => handleInputChange('password', e?.target?.value)}
                                    className="cosmic-input pr-12"
                                    error={errors?.password}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-3 my-auto h-8 px-2 rounded-md text-white/80 hover:text-white focus:outline-none"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    title={showPassword ? 'Hide password' : 'Show password'}
                                    onMouseDown={(e) => e.preventDefault()}  // keep input focused
                                >
                                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                                </button>
                            </div>
                            {/* Confirm Password */}
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm password"
                                    value={formData?.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                                    className="cosmic-input pr-12"
                                    error={errors?.confirmPassword}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute inset-y-0 right-3 my-auto h-8 px-2 rounded-md text-white/80 hover:text-white focus:outline-none"
                                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
                                </button>
                            </div>


                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={(checked) => handleInputChange('rememberMe', checked)}
                                />
                                <label htmlFor="rememberMe" className="text-sm text-white/90">Remember me</label>
                            </div>

                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={(checked) => handleInputChange('agreeToTerms', checked)}
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-white/90">
                                    I agree to all the{' '}
                                    <button type="button" className="text-blue-400 hover:text-blue-300 underline">terms</button>,{' '}
                                    <button type="button" className="text-blue-400 hover:text-blue-300 underline">privacy policy</button>
                                </label>
                            </div>
                            {errors.agreeToTerms && <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cosmic-button-primary text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-6"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Icon name="Loader2" size={16} className="animate-spin" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    'Create account'
                                )}
                            </Button>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-all duration-200 border border-gray-300"
                            >
                                <Icon name="Chrome" size={18} />
                                <span>Sign-in with google</span>
                            </button>

                            {errors.submit && (
                                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                                    <div className="flex items-center space-x-2 text-red-300">
                                        <Icon name="AlertCircle" size={16} />
                                        <span className="text-sm">{errors.submit}</span>
                                    </div>
                                </div>
                            )}

                            <div className="text-center space-y-2 mt-6">
                                <button type="button" className="text-blue-400 hover:text-blue-300 text-sm underline block mx-auto">
                                    Forgot password?
                                </button>
                                <p className="text-sm text-white/70">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login-page-for-existing-members')}
                                        className="text-blue-400 hover:text-blue-300 font-medium underline"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProfileForm;
