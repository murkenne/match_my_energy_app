import React from 'react';

const DegreesSection = () => {
  const degreeInfo = [
    {
      title: 'Critical Degrees',
      degrees: ['0°', '15°', '29°'],
      description: 'These degrees carry special significance and intensity in astrological interpretation.',
      details: [
        '0° (Beginning): Fresh starts, new initiatives, cardinal energy, pioneering spirit',
        '15° (Middle): Peak expression of the sign, full manifestation of sign qualities',
        '29° (Anaretic): Completion, urgency, mastery, crisis point requiring resolution'
      ]
    },
    {
      title: 'Decans Division',
      degrees: ['0°-9°', '10°-19°', '20°-29°'],
      description: 'Each zodiac sign is divided into three 10-degree sections called decans, each with its own flavor.',
      details: [
        'First Decan (0°-9°): Pure expression of the sign, ruled by the sign\'s traditional ruler',
        'Second Decan (10°-19°): Modified by the next sign of the same element',
        'Third Decan (20°-29°): Influenced by the third sign of the same element'
      ]
    }
  ];

  const specialDegrees = [
    {
      degree: '0°',
      name: 'Aries Point',
      significance: 'New beginnings, leadership, initiative, public attention',
      energy: 'Cardinal Fire'
    },
    {
      degree: '15°',
      name: 'Fixed Star Degrees',
      significance: 'Peak expression, mastery, full manifestation of sign qualities',
      energy: 'Maximum Power'
    },
    {
      degree: '29°',
      name: 'Anaretic Degree',
      significance: 'Completion, crisis, urgency, karmic lessons, mastery through challenge',
      energy: 'Intense Focus'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Degrees & Their Meanings
      </h2>
      <p className="text-white/80 text-center mb-8 max-w-3xl mx-auto">
        The 360° zodiac wheel is divided into 12 signs of 30° each. The specific degree of a planet reveals 
        the intensity and nature of its expression, with certain degrees carrying special significance.
      </p>

      {/* Basic Degree Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {degreeInfo?.map((info, index) => (
          <div
            key={index}
            className="cosmic-card rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">{info?.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {info?.degrees?.map((degree, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold"
                >
                  {degree}
                </span>
              ))}
            </div>
            <p className="text-white/80 text-sm mb-4">
              {info?.description}
            </p>
            <div className="space-y-2">
              {info?.details?.map((detail, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-white/70 text-xs leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Special Degrees */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Special Degrees in Astrology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialDegrees?.map((special, index) => (
            <div
              key={index}
              className="cosmic-card rounded-lg p-6 text-center hover:shadow-soft-hover transition-all duration-300"
            >
              <div className="text-4xl font-bold text-orange-400 mb-3">
                {special?.degree}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                {special?.name}
              </h4>
              <div className="mb-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">
                  {special?.energy}
                </span>
              </div>
              <p className="text-white/80 text-sm">
                {special?.significance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Degree Interpretation Guide */}
      <div className="cosmic-card rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          How to Interpret Degrees in Your Chart
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-orange-400 font-semibold mb-3">Early Degrees (0°-9°)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Pure, unrefined expression of the sign</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Learning phase, developing sign qualities</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Fresh energy, new approaches</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-orange-400 font-semibold mb-3">Middle Degrees (10°-19°)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Balanced expression of sign qualities</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Mature understanding and application</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Peak performance of sign characteristics</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-orange-400 font-semibold mb-3">Late Degrees (20°-29°)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Mastery of sign qualities, preparing for next sign</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Wisdom gained through experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span className="text-white/80 text-sm">Teaching and sharing knowledge of the sign</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DegreesSection;