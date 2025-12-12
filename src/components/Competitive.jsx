import { useState } from 'react';

export default function Competitive({ onBack, onStart }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(['', '']);

  const handleNumPlayersChange = (num) => {
    setNumPlayers(num);
    setPlayerNames(Array(num).fill('').map((_, i) => `Jugador ${i + 1}`));
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    onStart(playerNames.filter(name => name.trim() !== ''));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold text-purple-800 mb-8">Modo Competitivo</h2>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <label className="block text-lg font-semibold text-gray-700 mb-4">
          Número de jugadores:
        </label>
        <div className="flex gap-2 mb-6">
          {[2, 3, 4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => handleNumPlayersChange(num)}
              className={`px-4 py-2 rounded-lg ${numPlayers === num ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {playerNames.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Jugador ${index + 1}`}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl py-4 rounded-2xl shadow-lg transition"
        >
          Comenzar
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-xl"
      >
        Volver
      </button>
    </div>
  );
}
