import React from 'react';

const ZodiacWheel = ({ size = 400, className = "" }) => {
  const zodiacSigns = [
    { symbol: '♈', name: 'Aries', angle: 0 },
    { symbol: '♉', name: 'Taurus', angle: 30 },
    { symbol: '♊', name: 'Gemini', angle: 60 },
    { symbol: '♋', name: 'Cancer', angle: 90 },
    { symbol: '♌', name: 'Leo', angle: 120 },
    { symbol: '♍', name: 'Virgo', angle: 150 },
    { symbol: '♎', name: 'Libra', angle: 180 },
    { symbol: '♏', name: 'Scorpio', angle: 210 },
    { symbol: '♐', name: 'Sagittarius', angle: 240 },
    { symbol: '♑', name: 'Capricorn', angle: 270 },
    { symbol: '♒', name: 'Aquarius', angle: 300 },
    { symbol: '♓', name: 'Pisces', angle: 330 }
  ];

  const radius = size / 2 - 40;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer circle */}
      <div 
        className="absolute border-2 border-yellow-400 rounded-full opacity-80"
        style={{
          width: size - 20,
          height: size - 20,
          left: 10,
          top: 10,
          background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)'
        }}
      />
      
      {/* Inner circle */}
      <div 
        className="absolute border border-yellow-400 rounded-full opacity-60"
        style={{
          width: size - 80,
          height: size - 80,
          left: 40,
          top: 40
        }}
      />
      
      {/* Central sun/moon design */}
      <div 
        className="absolute flex items-center justify-center rounded-full border-2 border-yellow-400 zodiac-gold"
        style={{
          width: 80,
          height: 80,
          left: centerX - 40,
          top: centerY - 40,
          background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 100%)'
        }}
      >
        <div className="text-3xl">☉</div>
      </div>
      
      {/* Zodiac symbols */}
      {zodiacSigns?.map((sign, index) => {
        const angleRad = (sign?.angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(angleRad) - 15;
        const y = centerY + radius * Math.sin(angleRad) - 15;
        
        return (
          <div
            key={index}
            className="absolute flex items-center justify-center w-8 h-8 rounded-full zodiac-gold text-xl font-bold transition-all duration-300 hover:scale-125 hover:text-yellow-300"
            style={{
              left: x,
              top: y,
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
            }}
            title={sign?.name}
          >
            {sign?.symbol}
          </div>
        );
      })}
      
      {/* Radiating rays */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const startX = centerX + 45 * Math.cos(angle);
        const startY = centerY + 45 * Math.sin(angle);
        const endX = centerX + (radius - 10) * Math.cos(angle);
        const endY = centerY + (radius - 10) * Math.sin(angle);
        
        return (
          <div
            key={`ray-${i}`}
            className="absolute bg-gradient-to-r from-yellow-400 to-transparent opacity-30"
            style={{
              left: startX,
              top: startY,
              width: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2),
              height: 1,
              transformOrigin: '0 0',
              transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`
            }}
          />
        );
      })}
    </div>
  );
};

export default ZodiacWheel;