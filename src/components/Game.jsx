import { useState, useEffect } from 'react';
import { cardsData } from '../data/cardsNew.js';
import Timer from './Timer.jsx';

export default function Game({ category, onBack, mode = 'normal', players = [] }) {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSpecial, setShowSpecial] = useState(false);
  const [specialCard, setSpecialCard] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [playerScores, setPlayerScores] = useState(players.map(() => 0));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [roundAnswered, setRoundAnswered] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  
  const TIMER_DURATION = mode === 'solo' ? 45 : 30;

  console.log('showAnswer:', showAnswer);
  console.log('currentCard type:', typeof deck[currentIndex]);

  const categoryColors = {
    ciencia: 'bg-blue-500',
    filosofia: 'bg-purple-500',
    imaginacion: 'bg-green-500',
    aleatorio: 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500'
  };

  useEffect(() => {
    let cards = [];
    if (category === 'aleatorio') {
      cards = [...cardsData.ciencia, ...cardsData.filosofia, ...cardsData.imaginacion];
    } else {
      cards = [...cardsData[category]];
    }
    setDeck(cards.sort(() => Math.random() - 0.5));
    if (mode !== 'viaje') {
      setIsTimerRunning(true);
    }
  }, [category, mode]);

  const handleAnswer = (points) => {
    setScore(score + points);
    setAnswered(true);
    setShowAnswer(true);
  };

  const handleEvaluation = (points) => {
    if (mode === 'solo') {
      setScore(score + points);
      setShowAnswer(true);
      setShowEvaluation(false);
    } else if (mode === 'multi') {
      const newScores = [...playerScores];
      newScores[currentPlayer] += points;
      setPlayerScores(newScores);
      
      if (currentPlayer < players.length - 1) {
        setCurrentPlayer(currentPlayer + 1);
        setIsTimerRunning(true);
      } else {
        setRoundAnswered(true);
        setShowAnswer(true);
      }
    }
  };

  const handleTimeUp = () => {
    setIsTimerRunning(false);
    setShowEvaluation(true);
  };

  const handleTimerStop = () => {
    setIsTimerRunning(false);
    setShowEvaluation(true);
  };

  const nextCard = () => {
    if (mode === 'normal' && !answered && Math.random() < 0.18) {
      const special = cardsData.especiales[Math.floor(Math.random() * cardsData.especiales.length)];
      setSpecialCard(special);
      setShowSpecial(true);
    } else {
      setShowAnswer(false);
      setAnswered(false);
      setRoundAnswered(false);
      setShowEvaluation(false);
      setCurrentPlayer(0);
      setCurrentIndex((prev) => (prev + 1) % deck.length);
      if (mode !== 'viaje') {
        setIsTimerRunning(true);
      }
    }
  };

  const closeSpecial = () => {
    setShowSpecial(false);
    setShowAnswer(false);
    setAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  if (deck.length === 0) return null;

  const currentCard = deck[currentIndex];
  console.log('Current card:', currentCard);

  return (
    <div className={`min-h-screen ${mode === 'viaje' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-100 to-blue-100'} flex flex-col items-center justify-center p-6`}>
      {mode !== 'viaje' && (
        <div className="w-full max-w-2xl mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-purple-800 capitalize">{category}</h3>
            {mode === 'solo' && <p className="text-2xl font-bold text-purple-800">Puntos: {score}</p>}
          </div>
          <p className="text-lg text-purple-600 mt-2">
            Pregunta {currentIndex + 1} de {deck.length}
          </p>
          
          {mode !== 'viaje' && (
            <div className="flex justify-center mt-4">
              <Timer 
                duration={TIMER_DURATION}
                onTimeUp={handleTimeUp}
                onStop={handleTimerStop}
                isRunning={isTimerRunning}
              />
            </div>
          )}
          
          {mode === 'multi' && (
            <div className="mt-4 bg-white rounded-2xl p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-3">
                {players.map((player, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${idx === currentPlayer && !roundAnswered ? 'bg-purple-200 border-2 border-purple-600' : 'bg-gray-100'}`}>
                    <p className="font-semibold text-gray-800">{player}</p>
                    <p className="text-2xl font-bold text-purple-600">{playerScores[idx]} pts</p>
                  </div>
                ))}
              </div>
              {!roundAnswered && (
                <p className="text-center mt-3 text-lg font-semibold text-purple-700">
                  Turno de: {players[currentPlayer]}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className={`${categoryColors[category]} ${mode === 'viaje' ? 'w-full max-w-4xl h-96' : 'w-full max-w-2xl'} text-white rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center`}>
        {mode !== 'viaje' && (
          <span className="text-sm font-semibold bg-white bg-opacity-30 px-4 py-1 rounded-full mb-4">
            {category === 'ciencia' ? 'Ciencia' : category === 'filosofia' ? 'Filosofía' : category === 'imaginacion' ? 'Imaginación' : 'Aleatorio'}
          </span>
        )}
        <p className={`${mode === 'viaje' ? 'text-5xl' : 'text-3xl'} font-medium text-center mb-6`}>
          {typeof currentCard === 'string' ? currentCard : currentCard.pregunta}
        </p>
        {showAnswer && typeof currentCard === 'object' && (
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 mt-4">
            <h4 className="text-lg font-bold text-center mb-3">Respuesta guía:</h4>
            <p className="text-xl text-center">{currentCard.respuesta}</p>
          </div>
        )}
      </div>

      {showEvaluation && (mode === 'solo' || mode === 'multi') ? (
        <div className="flex gap-4 mt-8">
          <button onClick={() => handleEvaluation(10)} className="bg-green-600 hover:bg-green-700 text-white text-xl py-4 px-8 rounded-2xl shadow-lg transition">
            Excelente (+10)
          </button>
          <button onClick={() => handleEvaluation(7)} className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 px-8 rounded-2xl shadow-lg transition">
            Buena (+7)
          </button>
          <button onClick={() => handleEvaluation(5)} className="bg-yellow-600 hover:bg-yellow-700 text-white text-xl py-4 px-8 rounded-2xl shadow-lg transition">
            Regular (+5)
          </button>
          <button onClick={() => handleEvaluation(0)} className="bg-red-600 hover:bg-red-700 text-white text-xl py-4 px-8 rounded-2xl shadow-lg transition">
            Incorrecta (0)
          </button>
        </div>
      ) : (
        <button
          onClick={nextCard}
          className={`mt-8 bg-purple-600 hover:bg-purple-700 text-white ${mode === 'viaje' ? 'text-3xl py-8 px-16' : 'text-xl py-4 px-12'} rounded-2xl shadow-lg transition`}
        >
          Siguiente pregunta
        </button>
      )}

      {(mode === 'normal' || mode === 'viaje') && (
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-xl"
        >
          {showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta'}
        </button>
      )}

      <button
        onClick={onBack}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-xl"
      >
        {mode === 'viaje' ? 'Salir' : 'Volver'}
      </button>

      {showSpecial && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div className="bg-yellow-400 rounded-3xl shadow-2xl p-12 max-w-2xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">¡Carta Especial!</h3>
            <p className="text-2xl text-gray-800 text-center mb-8">{specialCard}</p>
            <button
              onClick={closeSpecial}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xl py-4 px-8 rounded-2xl"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
