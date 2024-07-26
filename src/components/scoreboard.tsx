import React from 'react';

const ScoreBoard: React.FC<{
  score: number;
  level: number;
  turnsLeft: number;
}> = ({ score, level, turnsLeft }) => {
  return (
    <div className="scoreBoard">
      <div className="score">{score}</div>
      <div className="levelContainer">
        <div className="level">Level: {level}</div>
        {/* TODO: make turnsLeft it's own component */}
        <div className="turnsLeft">{turnsLeft}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
