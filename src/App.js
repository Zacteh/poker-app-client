import React, { useState, useEffect } from 'react';
import PokerTable from './components/PokerTable';
import io from 'socket.io-client';
import './App.css';

const socket = io('https://12345678912345.asia');

const App = () => {
  const [gameState, setGameState] = useState({
    players: [],
    communityCards: [],
    pot: [0],
  });

  useEffect(() => {
    socket.on('gameState', (gameState) => {
      setGameState(gameState);
    });

    return () => {
      socket.off('gameState');
    };
  }, []);

  const handlePlayerAction = (action) => {
    socket.emit('playerAction', action);
  };

  return (
    <div className='App'>
      <PokerTable
        gameState={gameState}
        socketId={socket.id}
        onPlayerAction={handlePlayerAction}
      />
    </div>
  );
};

export default App;
