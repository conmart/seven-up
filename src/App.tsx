import React, { useState } from 'react';
import {
  randomBallValue,
  processExplosions,
  newLevel,
  nextZero,
} from './turnLogic';
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
  combo: number;
  processingTurn: boolean;
  gameOver: boolean;
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
    combo: 1,
    processingTurn: false,
    gameOver: false,
  });

  const newTurn = (gameGrid: number[][]) => {
    let updatedGameGrid = gameGrid;
    let gameOver = state.gameOver;
    const levelChange = state.turnsLeft < 2;
    if (levelChange) {
      [updatedGameGrid, gameOver] = newLevel(gameGrid);
    }
    setState((prev) => ({
      gameGrid: updatedGameGrid,
      nextBallValue: gameOver ? 0 : randomBallValue(),
      score: prev.score,
      level: levelChange ? prev.level + 1 : prev.level,
      turnsLeft: levelChange ? 5 : prev.turnsLeft - 1,
      combo: prev.combo,
      processingTurn: levelChange,
      gameOver,
    }));
    // if (levelChange) {
    //   console.log('level changed')
    //   // processTurn(updatedGameGrid);
    // }
  };

  const processTurn = (gameGrid: number[][]) => {
    let [updatedGameGrid, explosionCount] = processExplosions(gameGrid);
    const sameTurn = explosionCount > 0;
    if (sameTurn) {
      setState((prev) => ({
        gameGrid: updatedGameGrid,
        nextBallValue: 0,
        score: prev.score + state.combo * 7 * explosionCount,
        level: prev.level,
        turnsLeft: prev.turnsLeft,
        combo: prev.combo + 1,
        processingTurn: true,
        gameOver: false,
      }));
      setTimeout(() => {
        console.log('delay');
        processTurn(gameGrid);
      }, 1000);
    } else {
      newTurn(gameGrid);
    }
  };

  const shootBall = (columnIndex: number) => {
    if (!state.processingTurn) {
      let updatedGameGrid = state.gameGrid;
      const nextOpenSquare = nextZero(updatedGameGrid[columnIndex]);
      if (nextOpenSquare >= 0 && nextOpenSquare < 8) {
        updatedGameGrid[columnIndex][nextOpenSquare] = state.nextBallValue;
        processTurn(updatedGameGrid);
      }
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
