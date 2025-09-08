import React from 'react';

const ZodiacSignsSection = () => {
  const zodiacSigns = [
    {
      sign: 'Aries',
      symbol: '♈',
      element: 'Fire',
      dates: 'Mar 21 - Apr 19',
      keywords: ['Leadership', 'Initiative', 'Courage'],
      description: 'The pioneer of the zodiac, Aries brings raw energy and determination. This cardinal fire sign represents new beginnings, leadership qualities, and the courage to forge ahead. Aries energy is about taking action, being first, and blazing new trails.',
      strengths: 'Bold, confident, natural leaders, enthusiastic',
      challenges: 'Impatient, impulsive, can be aggressive, struggles with follow-through'
    },
    {
      sign: 'Taurus',
      symbol: '♉',
      element: 'Earth',
      dates: 'Apr 20 - May 20',
      keywords: ['Stability', 'Sensuality', 'Persistence'],
      description: 'The builder of the zodiac, Taurus provides stability and grounding energy. This fixed earth sign represents material security, sensual pleasures, and unwavering determination. Taurus energy is about creating lasting value and enjoying life\'s comforts.',
      strengths: 'Reliable, patient, practical, appreciates beauty',
      challenges: 'Stubborn, possessive, resistant to change, can be materialistic'
    },
    {
      sign: 'Gemini',
      symbol: '♊',
      element: 'Air',
      dates: 'May 21 - Jun 20',
      keywords: ['Communication', 'Adaptability', 'Curiosity'],
      description: 'The messenger of the zodiac, Gemini brings intellectual energy and versatility. This mutable air sign represents communication, learning, and mental agility. Gemini energy is about connecting ideas, sharing information, and exploring multiple perspectives.',
      strengths: 'Quick-thinking, adaptable, excellent communicators, curious',
      challenges: 'Inconsistent, superficial, indecisive, can be scattered'
    },
    {
      sign: 'Cancer',
      symbol: '♋',
      element: 'Water',
      dates: 'Jun 21 - Jul 22',
      keywords: ['Nurturing', 'Intuition', 'Protection'],
      description: 'The nurturer of the zodiac, Cancer brings emotional depth and caring energy. This cardinal water sign represents home, family, and emotional security. Cancer energy is about creating safe spaces, nurturing others, and following intuitive wisdom.',
      strengths: 'Nurturing, intuitive, protective, emotionally intelligent',
      challenges: 'Moody, overprotective, clingy, can be passive-aggressive'
    },
    {
      sign: 'Leo',
      symbol: '♌',
      element: 'Fire',
      dates: 'Jul 23 - Aug 22',
      keywords: ['Creativity', 'Leadership', 'Self-Expression'],
      description: 'The performer of the zodiac, Leo brings creative energy and natural charisma. This fixed fire sign represents self-expression, creativity, and leadership through inspiration. Leo energy is about shining brightly, entertaining others, and leading with heart.',
      strengths: 'Confident, generous, creative, natural entertainers',
      challenges: 'Egotistical, dramatic, attention-seeking, can be domineering'
    },
    {
      sign: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      dates: 'Aug 23 - Sep 22',
      keywords: ['Service', 'Analysis', 'Perfection'],
      description: 'The healer of the zodiac, Virgo brings analytical energy and desire for improvement. This mutable earth sign represents service, health, and attention to detail. Virgo energy is about refining, organizing, and helping others reach their potential.',
      strengths: 'Analytical, helpful, organized, health-conscious',
      challenges: 'Critical, perfectionist, worrying, can be nitpicky'
    },
    {
      sign: 'Libra',
      symbol: '♎',
      element: 'Air',
      dates: 'Sep 23 - Oct 22',
      keywords: ['Balance', 'Harmony', 'Relationships'],
      description: 'The diplomat of the zodiac, Libra brings harmonizing energy and aesthetic appreciation. This cardinal air sign represents balance, relationships, and justice. Libra energy is about creating harmony, fostering cooperation, and appreciating beauty.',
      strengths: 'Diplomatic, fair-minded, social, appreciates beauty',
      challenges: 'Indecisive, people-pleasing, avoids conflict, can be superficial'
    },
    {
      sign: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      dates: 'Oct 23 - Nov 21',
      keywords: ['Transformation', 'Intensity', 'Mystery'],
      description: 'The transformer of the zodiac, Scorpio brings intense energy and deep psychological insight. This fixed water sign represents transformation, power, and hidden truths. Scorpio energy is about diving deep, uncovering secrets, and facilitating profound change.',
      strengths: 'Intense, passionate, perceptive, transformative',
      challenges: 'Jealous, secretive, vindictive, can be manipulative'
    },
    {
      sign: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      dates: 'Nov 22 - Dec 21',
      keywords: ['Adventure', 'Philosophy', 'Freedom'],
      description: 'The philosopher of the zodiac, Sagittarius brings expansive energy and love of knowledge. This mutable fire sign represents higher learning, travel, and spiritual seeking. Sagittarius energy is about exploring horizons, seeking truth, and sharing wisdom.',
      strengths: 'Adventurous, optimistic, philosophical, freedom-loving',
      challenges: 'Restless, tactless, overconfident, commitment-phobic'
    },
    {
      sign: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      dates: 'Dec 22 - Jan 19',
      keywords: ['Achievement', 'Discipline', 'Structure'],
      description: 'The achiever of the zodiac, Capricorn brings disciplined energy and long-term vision. This cardinal earth sign represents ambition, responsibility, and mastery. Capricorn energy is about building lasting structures, achieving goals, and accepting responsibility.',
      strengths: 'Ambitious, disciplined, practical, responsible',
      challenges: 'Pessimistic, rigid, cold, workaholic tendencies'
    },
    {
      sign: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      dates: 'Jan 20 - Feb 18',
      keywords: ['Innovation', 'Humanitarian', 'Independence'],
      description: 'The innovator of the zodiac, Aquarius brings revolutionary energy and humanitarian vision. This fixed air sign represents progress, technology, and collective consciousness. Aquarius energy is about breaking conventions, serving humanity, and envisioning the future.',
      strengths: 'Independent, innovative, humanitarian, forward-thinking',
      challenges: 'Detached, rebellious, unpredictable, can be aloof'
    },
    {
      sign: 'Pisces',
      symbol: '♓',
      element: 'Water',
      dates: 'Feb 19 - Mar 20',
      keywords: ['Intuition', 'Compassion', 'Spirituality'],
      description: 'The mystic of the zodiac, Pisces brings compassionate energy and spiritual insight. This mutable water sign represents dreams, intuition, and universal love. Pisces energy is about connecting to the divine, showing compassion, and transcending boundaries.',
      strengths: 'Compassionate, intuitive, artistic, spiritually aware',
      challenges: 'Escapist, overly sensitive, impractical, can be victim-prone'
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Understanding Your Zodiac Sign
      </h2>
      <p className="text-white/80 text-center mb-8 max-w-3xl mx-auto">
        Each zodiac sign carries unique energies and characteristics that influence personality, behavior, and life approach. 
        Understanding your sign helps you harness its strengths and navigate its challenges.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zodiacSigns?.map((sign, index) => (
          <div 
            key={index}
            id={sign?.sign?.toLowerCase()}
            className="cosmic-card p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{sign?.symbol}</div>
              <h3 className="text-xl font-semibold text-white">{sign?.sign}</h3>
              <p className="text-sm text-white/70">{sign?.dates}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-orange-300">Element:</span>
                <span className="text-sm text-white ml-2">{sign?.element}</span>
              </div>
              
              <div>
                <span className="text-sm font-medium text-orange-300">Keywords:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {sign?.keywords?.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-white/80 mt-3 leading-relaxed">
                {sign?.description}
              </p>

              <div className="mt-4">
                <div className="mb-2">
                  <span className="text-xs font-medium text-green-400">Strengths:</span>
                  <p className="text-xs text-white/70 mt-1">{sign?.strengths}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-yellow-400">Challenges:</span>
                  <p className="text-xs text-white/70 mt-1">{sign?.challenges}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZodiacSignsSection;