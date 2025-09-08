import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CosmicBackground from '../../components/CosmicBackground';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AgeVerificationGate = () => {
  const [showRestrictionMessage, setShowRestrictionMessage] = useState(false);
  const navigate = useNavigate();

  const handleVerifyAge = () => {
    // User confirms they are 18 or older - redirect to profile creation
    navigate('/profile-creation-form');
  };

  const handleUnderAge = () => {
    // Show age restriction message
    setShowRestrictionMessage(true);
  };

  const handleGoBack = () => {
    // Reset state and go back to landing
    setShowRestrictionMessage(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Cosmic gradient overlays with increased opacity for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-900/60 to-cyan-900/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/25 via-transparent to-cyan-500/25" />
      {/* Cosmic particle effects overlay with increased opacity */}
      <CosmicBackground className="absolute inset-0 opacity-80">
        <div className="min-h-screen flex items-center justify-center p-4">
          {!showRestrictionMessage ? (
            // Age Verification Card
            (<motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-md w-full rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden backdrop-blur-lg"
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Glassmorphic glow effect with increased opacity */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-cyan-500/40 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-white/25 rounded-2xl" />
              <div className="relative z-10">
                {/* Logo with cosmic glow */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500 p-3 shadow-2xl mb-4">
                    <Icon name="Star" size={28} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Match My Energy
                  </h1>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto rounded-full" />
                </motion.div>

                {/* Age Verification Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-bold text-white mb-2">
                    Age Verification Required
                  </h2>
                  <div className="w-8 h-0.5 bg-pink-500 mx-auto rounded-full mb-4" />
                </motion.div>

                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-white font-medium leading-relaxed">
                    To access our astrological dating platform and create your cosmic profile, 
                    you must be at least 18 years old.
                  </p>
                  <p className="text-white/95 text-sm mt-3 font-medium">
                    Please confirm your age to continue your journey among the stars.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={handleVerifyAge}
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold transition-all duration-200 hover:scale-105 shadow-2xl border border-white/50"
                    iconName="CheckCircle"
                    iconPosition="left"
                  >
                    I am 18 or older
                  </Button>
                  
                  <Button
                    onClick={handleUnderAge}
                    variant="outline"
                    size="lg"
                    className="w-full border-white/70 text-white font-semibold hover:bg-white/30 transition-all duration-200 backdrop-blur-sm shadow-xl"
                    iconName="XCircle"
                    iconPosition="left"
                  >
                    I am under 18
                  </Button>
                </motion.div>

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="text-xs text-white/95 mt-6 font-medium"
                >
                  By continuing, you confirm that you meet the age requirements.
                </motion.p>
              </div>
            </motion.div>)
          ) : (
            // Age Restriction Message
            (<motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden backdrop-blur-lg"
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(239, 68, 68, 0.4)'
              }}
            >
              {/* Warning glow effect with increased opacity */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/35 to-orange-500/35 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-white/25 rounded-2xl" />
              <div className="relative z-10">
                {/* Warning Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-3 shadow-2xl mb-6">
                  <Icon name="AlertTriangle" size={28} className="text-white" />
                </div>

                {/* Restriction Message */}
                <h2 className="text-xl font-bold text-white mb-4">
                  Access Restricted
                </h2>
                
                <p className="text-white font-medium leading-relaxed mb-6">
                  We're sorry, but you must be at least 18 years old to access this platform. 
                  Our service is designed for adults only.
                </p>

                <div 
                  className="rounded-lg p-4 mb-6 border border-white/35 backdrop-blur-sm"
                  style={{ background: 'rgba(15, 23, 42, 0.9)' }}
                >
                  <h3 className="text-sm font-bold text-pink-400 mb-2">
                    Alternative Resources
                  </h3>
                  <p className="text-xs text-white/95 font-medium">
                    Consider exploring age-appropriate social platforms and educational 
                    content about astronomy and astrology instead.
                  </p>
                </div>

                {/* Go Back Button */}
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  size="lg"
                  className="w-full border-white/70 text-white font-semibold hover:bg-white/30 transition-all duration-200 backdrop-blur-sm shadow-xl"
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Go Back
                </Button>

                <p className="text-xs text-white/95 mt-4 font-medium">
                  Thank you for your understanding.
                </p>
              </div>
            </motion.div>)
          )}
        </div>
      </CosmicBackground>
    </div>
  );
};

export default AgeVerificationGate;