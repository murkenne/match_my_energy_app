import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PlanetCard = ({ planet, onAddNote }) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');

  const getPlanetColor = (planetName) => {
    const colors = {
      'Mercury': 'from-amber-600 to-yellow-700',
      'Venus': 'from-rose-600 to-pink-700', 
      'Mars': 'from-red-700 to-red-800',
      'Jupiter': 'from-indigo-600 to-blue-700',
      'Saturn': 'from-gray-600 to-slate-700',
      'Uranus': 'from-teal-600 to-cyan-700',
      'Neptune': 'from-blue-700 to-indigo-800',
      'Pluto': 'from-slate-700 to-gray-800'
    };
    return colors?.[planetName] || 'from-gray-600 to-slate-700';
  };

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

  const handleAddNote = () => {
    if (showNoteInput && note?.trim()) {
      onAddNote?.(planet?.name, note);
      setNote('');
      setShowNoteInput(false);
    } else {
      setShowNoteInput(true);
    }
  };

  return (
    <div className="group relative overflow-hidden">
      <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${getPlanetColor(planet?.name)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}>
              {planet?.symbol}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{planet?.name}</h3>
          </div>
          <div className="text-2xl text-slate-600">
            {getZodiacSymbol(planet?.sign)}
          </div>
        </div>
        
        {/* Planet Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Position</span>
            <div className="text-right">
              <p className="font-bold text-slate-800">{planet?.sign}</p>
              <p className="text-sm text-slate-600">{planet?.degree}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">House</span>
            <div className={`w-8 h-8 bg-gradient-to-r ${getPlanetColor(planet?.name)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
              {planet?.house}
            </div>
          </div>
        </div>

        {/* Note Input */}
        {showNoteInput && (
          <div className="mb-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e?.target?.value)}
              placeholder={`Add insights about ${planet?.name} in ${planet?.sign}...`}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
            />
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleAddNote}
          variant="outline"
          size="sm"
          className={`w-full font-semibold transition-all duration-300 border-2 ${
            showNoteInput 
              ? 'bg-slate-600 hover:bg-slate-700 text-white border-slate-600' 
              : `bg-gradient-to-r ${getPlanetColor(planet?.name)} text-white border-transparent hover:scale-105 shadow-lg`
          }`}
        >
          <Icon name={showNoteInput ? "Check" : "Plus"} size={16} className="mr-2" />
          {showNoteInput ? 'Save Insight' : 'Add Personal Note'}
        </Button>
      </div>
    </div>
  );
};

export default PlanetCard;