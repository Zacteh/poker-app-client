import React from 'react';

const PlayerHand = ({ gameState, player }) => {
  const divStyle =
    player.cards.length === 0
      ? { backgroundColor: 'grey' }
      : gameState.winners.length &&
        gameState.winners[0].some((winner) => winner.id === player.id)
      ? { backgroundColor: 'orange' }
      : player.onTurn
      ? { backgroundColor: 'green' }
      : {};

  // card highlight
  const cardStyle = { border: '5px solid orange' };
  return (
    <div className='player-hand' style={divStyle}>
      <div>
        <div className='player-name'>{player.name}</div>
        {!gameState.started && (
          <div className='player-ready'>{'ready ' + String(player.ready)}</div>
        )}
        {gameState.started && (
          <div>
            <div className='player-cardRank'>
              {'card rank: ' + player.cardRank}
            </div>
            <div className='player-actionThisTurn'>
              {'action this turn: ' + player.actionThisTurn}
            </div>
          </div>
        )}
        <div className='player-position'>{player.position}</div>
        <div className='player-chips'>{player.chips}</div>
        <div className='player-chipsOnTable'>{player.chipsOnTable}</div>
      </div>
      <div className='cards'>
        {player.cards.map((card, index) => (
          <div key={index} className='card'>
            <img
              src={`/assets/img/poker/${card._rank}${card._suit}.svg`}
              alt={card}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
