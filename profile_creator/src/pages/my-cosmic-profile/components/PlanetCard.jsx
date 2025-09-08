import React from 'react';

const PlanetCard = ({ planet, onAddNote }) => {
  const getZodiacSymbol = (sign) => {
    const symbols = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };
    return symbols?.[sign] || '⭐';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{planet?.symbol}</span>
          <h3 className="font-semibold text-gray-800">{planet?.name}</h3>
        </div>
        <span className="text-lg">{getZodiacSymbol(planet?.sign)}</span>
      </div>
      
      <div className="space-y-2 mb-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{planet?.sign} {planet?.degree}</span>
        </p>
        <p className="text-sm text-gray-600">
          House {planet?.house}
        </p>
      </div>
      
      <div className="flex justify-start">
        <button
          onClick={onAddNote}
          className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
        >
          Add note
        </button>
      </div>
    </div>
  );
};

export default PlanetCard;