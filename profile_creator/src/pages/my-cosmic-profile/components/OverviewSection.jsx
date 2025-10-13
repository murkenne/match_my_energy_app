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

  const getSignColor = (celestial) => {
    const colors = {
      'sun': 'from-amber-600 to-orange-600',
      'moon': 'from-slate-600 to-slate-700',
      'rising': 'from-indigo-600 to-indigo-700'
    };
    return colors?.[celestial] || 'from-gray-600 to-gray-700';
  };

  const getCelestialIcon = (celestial) => {
    const icons = {
      'sun': '☉',
      'moon': '☽',
      'rising': '↗'
    };
    return icons?.[celestial] || '⭐';
  };

  const getCelestialAccent = (celestial) => {
    const accents = {
      'sun': 'text-amber-600 border-amber-200/50',
      'moon': 'text-slate-600 border-slate-200/50',
      'rising': 'text-indigo-600 border-indigo-200/50'
    };
    return accents?.[celestial] || 'text-gray-600 border-gray-200/50';
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">⭐</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          Cosmic Overview
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sun */}
        <div className="group relative overflow-hidden">
          <div className="relative bg-white/80 backdrop-blur-sm border border-amber-200/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${getSignColor('sun')} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                {getCelestialIcon('sun')}
              </div>
              <div className="text-3xl text-slate-600">
                {getZodiacSymbol(overview?.sun?.sign)}
              </div>
            </div>
            <div className="space-y-2">
              <p className={`text-sm font-medium uppercase tracking-wider ${getCelestialAccent('sun')?.split(' ')?.[0]}`}>Sun Sign</p>
              <p className="text-xl font-bold text-slate-800">
                {overview?.sun?.sign}
              </p>
              <p className="text-lg text-slate-600 font-semibold">
                {overview?.sun?.degree}
              </p>
            </div>
          </div>
        </div>

        {/* Moon */}
        <div className="group relative overflow-hidden">
          <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${getSignColor('moon')} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                {getCelestialIcon('moon')}
              </div>
              <div className="text-3xl text-slate-600">
                {getZodiacSymbol(overview?.moon?.sign)}
              </div>
            </div>
            <div className="space-y-2">
              <p className={`text-sm font-medium uppercase tracking-wider ${getCelestialAccent('moon')?.split(' ')?.[0]}`}>Moon Sign</p>
              <p className="text-xl font-bold text-slate-800">
                {overview?.moon?.sign}
              </p>
              <p className="text-lg text-slate-600 font-semibold">
                {overview?.moon?.degree}
              </p>
            </div>
          </div>
        </div>

        {/* Rising */}
        <div className="group relative overflow-hidden">
          <div className="relative bg-white/80 backdrop-blur-sm border border-indigo-200/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${getSignColor('rising')} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                {getCelestialIcon('rising')}
              </div>
              <div className="text-3xl text-slate-600">
                {getZodiacSymbol(overview?.rising?.sign)}
              </div>
            </div>
            <div className="space-y-2">
              <p className={`text-sm font-medium uppercase tracking-wider ${getCelestialAccent('rising')?.split(' ')?.[0]}`}>Rising Sign</p>
              <p className="text-xl font-bold text-slate-800">
                {overview?.rising?.sign}
              </p>
              <p className="text-lg text-slate-600 font-semibold">
                {overview?.rising?.degree}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;