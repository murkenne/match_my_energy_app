import React from 'react';


const OverviewSection = ({ overview }) => {
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
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sun */}
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
          <div className="text-2xl text-orange-500">☉</div>
          <div>
            <p className="text-sm text-gray-600">Sun</p>
            <p className="font-semibold text-gray-800">
              {overview?.sun?.sign} {overview?.sun?.degree}
              <span className="ml-2 text-lg">{getZodiacSymbol(overview?.sun?.sign)}</span>
            </p>
          </div>
        </div>

        {/* Moon */}
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="text-2xl text-blue-500">☽</div>
          <div>
            <p className="text-sm text-gray-600">Moon</p>
            <p className="font-semibold text-gray-800">
              {overview?.moon?.sign} {overview?.moon?.degree}
              <span className="ml-2 text-lg">{getZodiacSymbol(overview?.moon?.sign)}</span>
            </p>
          </div>
        </div>

        {/* Rising */}
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="text-2xl text-purple-500">↗</div>
          <div>
            <p className="text-sm text-gray-600">Rising</p>
            <p className="font-semibold text-gray-800">
              {overview?.rising?.sign} {overview?.rising?.degree}
              <span className="ml-2 text-lg">{getZodiacSymbol(overview?.rising?.sign)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;