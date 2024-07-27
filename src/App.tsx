import React, { useState } from 'react';
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
    nextBallValue: 5,
    score: 0,
    level: 1,
    turnsLeft: 5,
  });

  const shootBall = (columnIndex: number) => {
    let updatedGameGrid = state.gameGrid;
    const nextOpenSquare = updatedGameGrid[columnIndex].findIndex(
      (element) => element === 0
    );
    if (nextOpenSquare >= 0 && nextOpenSquare < 8) {
      updatedGameGrid[columnIndex][nextOpenSquare] = state.nextBallValue;
      const newBall = Math.floor(Math.random() * 7) + 1;
      // TODO: Fix
      const turnScore = 7;
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
