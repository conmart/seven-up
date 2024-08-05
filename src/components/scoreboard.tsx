import React from 'react';
import { numberWithCommas } from '../utils';

const ScoreBoard: React.FC<{
  score: number;
  level: number;
  turnsLeft: number;
}> = ({ score, level, turnsLeft }) => {
  let visualTurns = [];
  const tlClass = turnsLeft === 1 ? "turnsLeftIcon lastTurn" : "turnsLeftIcon"
  for (let i = 0; i < turnsLeft; i++) {
    visualTurns.push(<div className={tlClass} key={i}></div>);
  }
  return (
    <div className="scoreBoard">
      <div className="score">{numberWithCommas(score)}</div>
      <div className="levelContainer">
        <div className="level">Level: {level}</div>
        <div className="turnsLeft">{visualTurns}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
