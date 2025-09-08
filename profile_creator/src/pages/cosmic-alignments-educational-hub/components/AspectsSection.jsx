import React from 'react';

const AspectsSection = () => {
  const aspects = [
    {
      name: 'Conjunction',
      symbol: '☌',
      degree: '0°',
      orb: '0-6°',
      nature: 'Neutral/Amplifying',
      color: 'text-white',
      description: 'When planets are in the same sign or very close degrees. This creates a blending of energies, amplifying the combined planetary influences.',
      effect: 'Intensifies and merges planetary energies. Can be harmonious or challenging depending on the planets involved.',
      example: 'Sun ☌ Mercury: Strong communication skills, mind and identity work together'
    },
    {
      name: 'Sextile',
      symbol: '⚹',
      degree: '60°',
      orb: '3-6°',
      nature: 'Harmonious',
      color: 'text-green-400',
      description: 'A supportive aspect that creates opportunities and ease. Planets work together naturally with gentle encouragement.',
      effect: 'Creates opportunities, talents, and natural abilities. Requires some effort to activate but flows smoothly when engaged.',
      example: 'Venus ⚹ Mars: Natural charm and attraction, balanced masculine and feminine energies'
    },
    {
      name: 'Square',
      symbol: '□',
      degree: '90°',
      orb: '4-8°',
      nature: 'Challenging',
      color: 'text-red-400',
      description: 'A tense aspect that creates internal friction and external challenges. Pushes for growth through conflict and resolution.',
      effect: 'Creates tension, obstacles, and internal conflict. Motivates action and growth through overcoming challenges.',
      example: 'Moon □ Saturn: Emotional restrictions, need to balance feelings with responsibility'
    },
    {
      name: 'Trine',
      symbol: '△',
      degree: '120°',
      orb: '4-8°',
      nature: 'Very Harmonious',
      color: 'text-blue-400',
      description: 'The most harmonious aspect, creating natural flow and talents. Planets support each other effortlessly.',
      effect: 'Natural talents, easy flow of energy, areas of life that come naturally. Can indicate laziness if not consciously developed.',
      example: 'Jupiter △ Sun: Natural confidence, optimism, and leadership abilities'
    },
    {
      name: 'Opposition',
      symbol: '☍',
      degree: '180°',
      orb: '4-8°',
      nature: 'Polarizing',
      color: 'text-purple-400',
      description: 'Planets are directly across from each other, creating a see-saw effect. Requires balance and integration of opposite energies.',
      effect: 'Creates awareness through contrast, need for balance, and projection of qualities onto others. Seeks integration.',
      example: 'Mars ☍ Venus: Tension between independence and partnership needs'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Planetary Aspects
      </h2>
      <p className="text-white/80 text-center mb-8 max-w-3xl mx-auto">
        Aspects describe the angular relationships between planets in your birth chart. They reveal how different planetary 
        energies interact, creating harmony, tension, or opportunity in your life.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aspects?.map((aspect, index) => (
          <div
            key={index}
            className="cosmic-card rounded-lg p-6 hover:shadow-soft-hover transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className={`text-3xl mr-4 ${aspect?.color}`}>{aspect?.symbol}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{aspect?.name}</h3>
                <p className="text-sm text-orange-400">{aspect?.degree}</p>
                <p className="text-xs text-white/60">Orb: {aspect?.orb}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                aspect?.nature === 'Harmonious' ? 'bg-green-500/20 text-green-400' :
                aspect?.nature === 'Very Harmonious' ? 'bg-blue-500/20 text-blue-400' :
                aspect?.nature === 'Challenging' ? 'bg-red-500/20 text-red-400' :
                aspect?.nature === 'Polarizing'? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {aspect?.nature}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {aspect?.description}
                </p>
              </div>
              
              <div>
                <h5 className="text-xs font-semibold text-white/80 mb-1">Effect:</h5>
                <p className="text-white/70 text-xs">{aspect?.effect}</p>
              </div>
              
              <div>
                <h5 className="text-xs font-semibold text-white/80 mb-1">Example:</h5>
                <p className="text-white/70 text-xs italic">{aspect?.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Information */}
      <div className="mt-8 cosmic-card rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Understanding Orbs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-orange-400 font-semibold mb-2">Major Aspects (0-8° orb):</h4>
            <p className="text-white/80 text-sm">
              Conjunction, Opposition, Square, Trine, Sextile - These have the strongest influence on personality and life events.
            </p>
          </div>
          <div>
            <h4 className="text-orange-400 font-semibold mb-2">Minor Aspects (1-3° orb):</h4>
            <p className="text-white/80 text-sm">
              Quincunx, Semi-square, Sesquiquadrate - These provide subtle influences and fine-tuning to personality traits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectsSection;