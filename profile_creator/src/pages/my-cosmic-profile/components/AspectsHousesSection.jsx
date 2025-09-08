import React from 'react';

const AspectsHousesSection = ({ aspects, houses }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Aspects & Houses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aspects */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Aspects</h3>
          <div className="space-y-2">
            {aspects?.map((aspect, index) => (
              <div key={index} className="text-sm text-gray-600 font-mono">
                {aspect}
              </div>
            ))}
          </div>
        </div>

        {/* Houses */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Houses</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {houses?.map((house, index) => (
              <div key={index} className="font-mono">
                {index + 1} {house}
              </div>
            ))}
            <div className="font-mono">5 Leo 25°</div>
            <div className="font-mono">6 Virgo 08°</div>
            <div className="font-mono">7 Libra 22°</div>
            <div className="font-mono">8 Scorpio 14°</div>
            <div className="font-mono">9 Sagittarius 07°</div>
            <div className="font-mono">10 Capricorn 29°</div>
            <div className="font-mono">11 Aquarius 16°</div>
            <div className="font-mono">12 Pisces 31°</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectsHousesSection;