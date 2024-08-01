import React from 'react';

const EndGame: React.FC<{ newGame: () => any }> = ({ newGame }) => {
  return (
    <div className="endGame">
      Game Over
      <button className="newGame" onClick={newGame}>
        New Game
      </button>
    </div>
  );
};

export default EndGame;
