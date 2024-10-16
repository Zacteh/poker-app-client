import React from 'react';
import PlayerHand from './PlayerHand';
import Controls from './Controls';

const PokerTable = ({ gameState, socketId, onPlayerAction }) => {
  const thisPlayerIndex = gameState.players.findIndex(
    (player) => player.id === socketId
  );

  const playersRotated = gameState.players
    .slice(thisPlayerIndex)
    .concat(gameState.players.slice(0, thisPlayerIndex));

  return (
    <div className='poker-table'>
      <div className='centerBoard'>
        <div className='pot'>
          Pot:{' '}
          {gameState.pot.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0)}
        </div>
        <div className='community-cards'>
          {gameState.communityCards.map((card, index) => (
            <div key={index} className='card'>
              <img
                src={`/assets/img/poker/${card._rank}${card._suit}.svg`}
                alt={card}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='players'>
        {playersRotated.map((player, index) => (
          <div key={index} className={`player-position-${index}`}>
            <PlayerHand gameState={gameState} player={player} />
          </div>
        ))}
      </div>
      <Controls
        gameState={gameState}
        player={gameState.players[thisPlayerIndex]}
        onPlayerAction={onPlayerAction}
      />
    </div>
  );
};

export default PokerTable;
