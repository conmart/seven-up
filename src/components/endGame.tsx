import React from 'react';

const EndGame: React.FC<{ newGame: () => any; highestCombo: number }> = ({
  newGame,
  highestCombo,
}) => {
  return (
    <div className="endGame">
      Game Over
      <span className='highCombo'> Highest Combo: {highestCombo}</span>
      <button className="newGame" onClick={newGame}>
        New Game
      </button>
    </div>
  );
};

export default EndGame;
