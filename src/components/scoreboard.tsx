import React from 'react';
import { numberWithCommas } from '../utils';

const ScoreBoard: React.FC<{
  score: number;
  level: number;
  turnsLeft: number;
  combo: number;
}> = ({ score, level, turnsLeft, combo }) => {
  let visualTurns = [];
  const turnsLeftClass =
    turnsLeft === 1 ? 'turnsLeftIcon lastTurn' : 'turnsLeftIcon';
  for (let i = 0; i < turnsLeft; i++) {
    visualTurns.push(<div className={turnsLeftClass} key={i}></div>);
  }

  let visualCombo = 'Combo!';
  for (let i = 3; i < combo; i++) {
    visualCombo = 'C-' + visualCombo;
  }

  return (
    <div className="scoreBoard">
      <div className="score">{numberWithCommas(score)}</div>
      <div className="levelContainer">
        <div className="level">Level: {level}</div>
        {combo > 2 && <div className="combo">{visualCombo}</div>}
        <div className="turnsLeft">{visualTurns}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
