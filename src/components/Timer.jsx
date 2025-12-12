import { useState, useEffect } from 'react';

export default function Timer({ duration = 30, onTimeUp, isRunning, onStop }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-4">
      <div className={`text-3xl font-bold px-6 py-3 rounded-2xl ${timeLeft <= 10 ? 'bg-red-500 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      {isRunning && (
        <button
          onClick={onStop}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
        >
          Listo
        </button>
      )}
    </div>
  );
}