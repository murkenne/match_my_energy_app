import React from 'react';
import Icon from '../../../components/AppIcon';

const AspectsHousesSection = ({ aspects, houses }) => {
  const getAspectColor = (aspect) => {
    if (aspect?.includes('♃') || aspect?.includes('conjunction')) return 'from-emerald-600 to-green-700';
    if (aspect?.includes('□') || aspect?.includes('square')) return 'from-red-600 to-red-700';
    if (aspect?.includes('△') || aspect?.includes('trine')) return 'from-blue-600 to-indigo-700';
    if (aspect?.includes('♀') || aspect?.includes('sextile')) return 'from-purple-600 to-violet-700';
    return 'from-slate-600 to-gray-700';
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
          <Icon name="Compass" size={16} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          Cosmic Connections
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Aspects */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Planetary Aspects</h3>
          </div>
          <div className="space-y-3">
            {aspects?.map((aspect, index) => (
              <div
                key={index}
                className="group flex items-center space-x-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50/80 transition-all duration-200"
              >
                <div className={`w-3 h-3 bg-gradient-to-r ${getAspectColor(aspect)} rounded-full`}></div>
                <span className="text-sm font-mono font-medium text-slate-700 group-hover:text-slate-900">
                  {aspect}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Houses */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
              <Icon name="Home" size={12} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">House Positions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {houses?.map((house, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50/80 rounded-lg transition-all duration-200 hover:scale-105 group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-mono text-slate-700 group-hover:text-slate-900">
                    {house}
                  </span>
                </div>
              </div>
            ))}
            {/* Additional houses */}
            {[
              'Leo 25°', 'Virgo 08°', 'Libra 22°', 'Scorpio 14°',
              'Sagittarius 07°', 'Capricorn 29°', 'Aquarius 16°', 'Pisces 31°'
            ]?.map((house, index) => (
              <div
                key={index + 4}
                className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50/80 rounded-lg transition-all duration-200 hover:scale-105 group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 5}
                  </div>
                  <span className="text-sm font-mono text-slate-700 group-hover:text-slate-900">
                    {house}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectsHousesSection;