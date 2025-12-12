import { useState } from 'react';
import Home from './components/Home';
import Categories from './components/Categories';
import Game from './components/Game';
import About from './components/About';
import Competitive from './components/Competitive';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [category, setCategory] = useState(null);
  const [mode, setMode] = useState('normal');
  const [players, setPlayers] = useState([]);

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setScreen('game');
  };

  const handleStartCompetitive = (playerList) => {
    setPlayers(playerList);
    setMode('multi');
    setScreen('categories');
  };

  const handleBack = () => {
    if (mode === 'multi') {
      setScreen('competitive');
    } else if (mode === 'solo') {
      setScreen('solo');
    } else if (mode === 'viaje') {
      setScreen('home');
    } else {
      setScreen('categories');
    }
    setMode('normal');
  };

  return (
    <>
      {screen === 'home' && <Home onNavigate={setScreen} />}
      {screen === 'categories' && (
        <Categories 
          onSelectCategory={handleSelectCategory} 
          onBack={() => setScreen('home')} 
        />
      )}
      {screen === 'solo' && (
        <Categories 
          onSelectCategory={(cat) => {
            setCategory(cat);
            setMode('solo');
            setScreen('game');
          }} 
          onBack={() => setScreen('home')} 
        />
      )}
      {screen === 'competitive' && (
        <Competitive 
          onBack={() => setScreen('home')}
          onStart={handleStartCompetitive}
        />
      )}
      {screen === 'game' && (
        <Game 
          category={category} 
          onBack={handleBack}
          mode={mode}
          players={players}
        />
      )}
      {screen === 'travel' && (
        <Categories 
          onSelectCategory={(cat) => {
            setCategory(cat);
            setMode('viaje');
            setScreen('game');
          }} 
          onBack={() => setScreen('home')} 
        />
      )}
      {screen === 'about' && <About onBack={() => setScreen('home')} />}
    </>
  );
}
