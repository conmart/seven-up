import React, { useState, useEffect } from 'react';
import {
  calcMultiplier,
  addBlockRow,
  checkForFullGrid,
  newGameState,
  generateStartSeed,
} from '../turnLogicHelpers';

import { deepCopyGameGrid, nextZero, randomBallValue } from '../utils';
import { processExplosions } from '../explosionHelpers';

import GameGrid from './gameGrid';
import NextBall from './nextBall';
import ScoreBoard from './scoreboard';
import EndGame from './endGame';
import GameMenu from './gameMenu';

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
  fullColumns: number[];
}

const GameBoard = () => {
  const [state, setState] = useState<GameState>({ ...newGameState });

  useEffect(() => newGame(), []);

  useEffect(() => {
    if (state.checkForMoreExplosions) {
      setTimeout(() => {
        processTurn();
      }, 300);
    } else if (state.turnInProgress) {
      endTurn();
    }
  },);

  const newLevel = () => {
    const [updatedGameGrid, gameOver, fullColumns] = addBlockRow(
      deepCopyGameGrid(state.gameGrid)
    );
    setState((prev) => ({
      ...prev,
      gameGrid: gameOver ? prev.gameGrid : updatedGameGrid,
      score: prev.score + 10000,
      level: prev.level + 1,
      turnsLeft: newGameState['turnsLeft'],
      checkForMoreExplosions: true,
      gameOver,
      fullColumns,
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
        combo: newGameState['combo'],
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
    setState(() => ({
      ...newGameState,
      gameGrid: generateStartSeed(),
      nextBallValue: randomBallValue(),
    }));
  };

  return (
    <div className="gameBoard">
      <GameMenu newGame={newGame} />
      <ScoreBoard
        score={state.score}
        level={state.level}
        turnsLeft={state.turnsLeft}
      />
      <GameGrid
        gameGrid={state.gameGrid}
        shootBall={shootBall}
        fullColumns={state.fullColumns}
      />
      <NextBall value={state.nextBallValue} />
      {state.gameOver && <EndGame newGame={newGame} />}
    </div>
  );
};

export default GameBoard;
