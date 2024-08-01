import React, { useState, useEffect } from 'react';
import {
  calcMultiplier,
  processExplosions,
  addBlockRow,
  checkForFullGrid,
} from '../turnLogicHelpers';
import {
  nextZero,
  randomBallValue,
  newGameState,
  deepCopyGameGrid,
} from '../utils';

import GameGrid from './gameGrid';
import NextBall from './nextBall';
import ScoreBoard from './scoreboard';
import EndGame from './endGame';

interface GameState {
  gameGrid: number[][];
  nextBallValue: number;
  score: number;
  level: number;
  turnsLeft: number;
  combo: number;
  checkForMoreExplosions: boolean;
  gameOver: boolean;
  turnInProgress: boolean;
}

const GameBoard = () => {
  const [state, setState] = useState<GameState>({ ...newGameState });

  useEffect(() => {
    if (state.gameOver) {
    } else if (state.checkForMoreExplosions) {
      setTimeout(() => {
        processTurn();
      }, 300);
    } else if (state.turnInProgress) {
      endTurn();
    }
  });

  const newLevel = () => {
    const [updatedGameGrid, gameOver] = addBlockRow(
      deepCopyGameGrid(state.gameGrid)
    );
    setState((prev) => ({
      ...prev,
      gameGrid: updatedGameGrid,
      score: prev.score + 10000,
      level: prev.level + 1,
      turnsLeft: 5,
      checkForMoreExplosions: true,
      gameOver,
    }));
  };

  const endTurn = () => {
    if (state.turnsLeft < 1) {
      newLevel();
    } else {
      const gameOver = checkForFullGrid(state.gameGrid);
      setState((prev) => ({
        ...prev,
        nextBallValue: gameOver ? 0 : randomBallValue(),
        combo: 1,
        turnInProgress: false,
        gameOver,
      }));
    }
  };

  const processTurn = () => {
    let [updatedGameGrid, explosionCount] = processExplosions(
      deepCopyGameGrid(state.gameGrid)
    );
    setState((prev) => ({
      ...prev,
      gameGrid: updatedGameGrid,
      score: prev.score + explosionCount * calcMultiplier(state.combo),
      combo: prev.combo + 1,
      checkForMoreExplosions: explosionCount > 0,
    }));
  };

  const shootBall = (columnIndex: number) => {
    if (!state.turnInProgress) {
      let updatedGameGrid = deepCopyGameGrid(state.gameGrid);
      const nextOpenSquare = nextZero(updatedGameGrid[columnIndex]);
      if (nextOpenSquare >= 0 && nextOpenSquare < 8) {
        updatedGameGrid[columnIndex][nextOpenSquare] = state.nextBallValue;
        setState((prev) => ({
          ...prev,
          gameGrid: updatedGameGrid,
          turnsLeft: prev.turnsLeft - 1,
          checkForMoreExplosions: true,
          turnInProgress: true,
          nextBallValue: 0,
        }));
      }
    }
  };

  const newGame = () => {
    setState(() => newGameState);
  };

  return (
    <div className="gameBoard">
      <ScoreBoard
        score={state.score}
        level={state.level}
        turnsLeft={state.turnsLeft}
      />
      <GameGrid gameGrid={state.gameGrid} shootBall={shootBall} />
      <NextBall value={state.nextBallValue} />
      {state.gameOver && <EndGame newGame={newGame} />}
    </div>
  );
};

export default GameBoard;
