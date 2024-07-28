import React, { useState } from 'react';
import { randomBallValue, processExplosions, nextZero } from './turnLogic';
import './App.css';

import GameGrid from './components/gameGrid';
import NextBall from './components/nextBall';
import ScoreBoard from './components/scoreboard';

interface GameState {
  gameGrid: number[][];
  nextBallValue: number;
  score: number;
  level: number;
  turnsLeft: number;
}

function App() {
  const [state, setState] = useState<GameState>({
    gameGrid: [
      [9, 0, 0, 0, 0, 0, 0],
      [9, 0, 0, 0, 0, 0, 0],
      [9, 0, 0, 0, 0, 0, 0],
      [9, 0, 0, 0, 0, 0, 0],
      [9, 0, 0, 0, 0, 0, 0],
      [9, 0, 0, 0, 0, 0, 0],
      [9, 0, 0, 0, 0, 0, 0],
    ],
    nextBallValue: randomBallValue(),
    score: 0,
    level: 1,
    turnsLeft: 5,
  });

  const shootBall = (columnIndex: number) => {
    let turnScore = 0;
    let updatedGameGrid = state.gameGrid;
    const nextOpenSquare = nextZero(updatedGameGrid[columnIndex]);
    if (nextOpenSquare >= 0 && nextOpenSquare < 8) {
      updatedGameGrid[columnIndex][nextOpenSquare] = state.nextBallValue;
      updatedGameGrid = processExplosions(updatedGameGrid);
      const newBall = randomBallValue();
      const newLevel = state.turnsLeft < 2;
      setState((prev) => ({
        gameGrid: updatedGameGrid,
        nextBallValue: newBall,
        score: prev.score + turnScore,
        level: newLevel ? prev.level + 1 : prev.level,
        turnsLeft: newLevel ? 5 : prev.turnsLeft - 1,
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <ScoreBoard
          score={state.score}
          level={state.level}
          turnsLeft={state.turnsLeft}
        />
        <GameGrid gameGrid={state.gameGrid} shootBall={shootBall} />
        <NextBall value={state.nextBallValue} />
      </header>
    </div>
  );
}

export default App;
