import React from 'react';

const PlanetaryCards = () => {
  const planets = [
    {
      name: 'Sun',
      symbol: '☉',
      color: 'from-orange-500 to-red-500',
      imageStyle: 'bg-gradient-to-br from-orange-400 to-red-600',
      keywords: ['Self', 'Ego', 'Vitality'],
      role: 'Core Identity & Life Purpose',
      strongVibes: 'Confident, charismatic, natural leader, creative self-expression',
      weakVibes: 'Arrogant, attention-seeking, inflated ego, domineering',
      description: 'The Sun represents your core identity, ego, and life force. It shows how you shine, your fundamental nature, and your conscious will. This is your essential self - the "you" that you\'re meant to become.'
    },
    {
      name: 'Moon',
      symbol: '☽',
      color: 'from-gray-300 to-blue-200',
      imageStyle: 'bg-gradient-to-br from-gray-300 to-blue-300',
      keywords: ['Emotions', 'Intuition', 'Subconscious'],
      role: 'Emotional Nature & Inner World',
      strongVibes: 'Emotionally intelligent, intuitive, nurturing, responsive to needs',
      weakVibes: 'Moody, overly sensitive, clingy, emotionally reactive',
      description: 'The Moon governs your emotional responses, instincts, and subconscious patterns. It reveals your inner world, how you process feelings, and what makes you feel secure and nurtured.'
    },
    {
      name: 'Mercury',
      symbol: '☿',
      color: 'from-yellow-400 to-orange-400',
      imageStyle: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      keywords: ['Communication', 'Learning', 'Mental Process'],
      role: 'Mind & Communication Style',
      strongVibes: 'Quick-thinking, articulate, adaptable, excellent communicator',
      weakVibes: 'Scattered thoughts, gossipy, nervous, information overload',
      description: 'Mercury rules communication, thinking, and information processing. It shows how you learn, speak, write, and connect with others mentally. This planet governs your intellectual approach to life.'
    },
    {
      name: 'Venus',
      symbol: '♀',
      color: 'from-pink-400 to-rose-500',
      imageStyle: 'bg-gradient-to-br from-pink-400 to-rose-600',
      keywords: ['Love', 'Beauty', 'Values'],
      role: 'Love Style & Aesthetic Sense',
      strongVibes: 'Charming, artistic, diplomatic, attracts love and abundance',
      weakVibes: 'Vain, superficial, lazy, overindulgent in pleasures',
      description: 'Venus governs love, relationships, beauty, and values. It shows how you give and receive love, what you find beautiful, and how you create harmony in relationships and environments.'
    },
    {
      name: 'Mars',
      symbol: '♂',
      color: 'from-red-500 to-red-700',
      imageStyle: 'bg-gradient-to-br from-red-500 to-red-800',
      keywords: ['Action', 'Desire', 'Drive'],
      role: 'Motivation & Drive',
      strongVibes: 'Energetic, courageous, goal-oriented, passionate pursuer',
      weakVibes: 'Aggressive, impatient, angry, destructively competitive',
      description: 'Mars represents your drive, ambition, and how you pursue goals. It governs physical energy, sexual desire, and your fighting spirit. This planet shows how you take action and assert yourself.'
    },
    {
      name: 'Jupiter',
      symbol: '♃',
      color: 'from-yellow-600 to-orange-600',
      imageStyle: 'bg-gradient-to-br from-yellow-600 to-orange-700',
      keywords: ['Expansion', 'Wisdom', 'Growth'],
      role: 'Growth & Opportunities',
      strongVibes: 'Optimistic, generous, wise teacher, attracts good fortune',
      weakVibes: 'Overconfident, excessive, judgmental, prone to overindulgence',
      description: 'Jupiter is the great expander, governing growth, wisdom, and opportunities. It shows where you\'re likely to find luck, how you seek meaning, and your capacity for generosity and higher learning.'
    },
    {
      name: 'Saturn',
      symbol: '♄',
      color: 'from-gray-600 to-gray-800',
      imageStyle: 'bg-gradient-to-br from-gray-600 to-gray-900',
      keywords: ['Discipline', 'Structure', 'Lessons'],
      role: 'Discipline & Life Lessons',
      strongVibes: 'Disciplined, responsible, master of craft, builds lasting foundations',
      weakVibes: 'Restrictive, pessimistic, rigid, fear-based limitations',
      description: 'Saturn represents discipline, responsibility, and life lessons. It shows where you need to work harder, develop patience, and build lasting structures. This planet teaches through challenges and rewards effort.'
    },
    {
      name: 'Uranus',
      symbol: '♅',
      color: 'from-blue-400 to-cyan-500',
      imageStyle: 'bg-gradient-to-br from-blue-400 to-cyan-600',
      keywords: ['Innovation', 'Independence', 'Revolution'],
      role: 'Change & Innovation',
      strongVibes: 'Innovative, independent, progressive, breakthrough thinking',
      weakVibes: 'Rebellious, unpredictable, detached, chaotically disruptive',
      description: 'Uranus governs innovation, rebellion, and sudden changes. It represents your need for freedom, unique qualities, and how you contribute to progress and humanitarian causes.'
    },
    {
      name: 'Neptune',
      symbol: '♆',
      color: 'from-blue-500 to-purple-500',
      imageStyle: 'bg-gradient-to-br from-blue-500 to-purple-600',
      keywords: ['Spirituality', 'Dreams', 'Intuition'],
      role: 'Spirituality & Dreams',
      strongVibes: 'Spiritual, compassionate, artistic, deeply intuitive',
      weakVibes: 'Delusional, escapist, addictive tendencies, boundary issues',
      description: 'Neptune represents spirituality, dreams, and illusions. It governs imagination, compassion, and connection to the divine, but also confusion, deception, and the need for boundaries.'
    },
    {
      name: 'Pluto',
      symbol: '♇',
      color: 'from-purple-800 to-black',
      imageStyle: 'bg-gradient-to-br from-purple-800 to-gray-900',
      keywords: ['Transformation', 'Power', 'Regeneration'],
      role: 'Deep Transformation',
      strongVibes: 'Transformative, powerful, regenerative, deep psychological insight',
      weakVibes: 'Obsessive, controlling, destructive, power-hungry',
      description: 'Pluto governs transformation, power, and regeneration. It represents deep psychological processes, how you handle power, and areas of life where you experience profound change and rebirth.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {planets?.map((planet, index) => (
        <div
          key={index}
          className="cosmic-card rounded-lg p-6 hover:shadow-soft-hover transition-all duration-300 transform hover:scale-105"
        >
          {/* Planet Header */}
          <div className="flex items-center mb-4">
            <div
              className={`w-12 h-12 rounded-full ${planet?.imageStyle} flex items-center justify-center mr-4 shadow-lg`}
            >
              <span className="text-white text-xl font-bold">{planet?.symbol}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{planet?.name}</h3>
              <p className="text-sm text-orange-400">{planet?.role}</p>
            </div>
          </div>

          {/* Keywords */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-white/80 mb-2">Keywords:</h4>
            <div className="flex flex-wrap gap-1">
              {planet?.keywords?.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-white/80 text-sm leading-relaxed">
              {planet?.description}
            </p>
          </div>

          {/* Vibes */}
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-semibold text-green-400 mb-1">When Strong:</h5>
              <p className="text-white/70 text-xs">{planet?.strongVibes}</p>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-yellow-400 mb-1">When Weak:</h5>
              <p className="text-white/70 text-xs">{planet?.weakVibes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanetaryCards;