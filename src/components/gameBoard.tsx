import React, { useState, useEffect } from 'react';
import {
  calcMultiplier,
  addBlockRow,
  checkForFullGrid,
  newGameState,
  generateStartSeed,
  validShot,
} from '../turnLogicHelpers';

import { deepCopyGameGrid, randomBallValue } from '../utils';
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
  lastNumber: number;
  highestCombo: number;
}

const GameBoard = () => {
  const [state, setState] = useState<GameState>({ ...newGameState });

  useEffect(() => newGame(), []);

  useEffect(() => {
    if (state.checkForMoreExplosions) {
      setTimeout(() => {
        processTurn();
      }, 350);
    } else if (state.turnInProgress) {
      endTurn();
    }
  });

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
      lastNumber: newGameState['lastNumber'],
    }));
  };

  const endTurn = () => {
    if (state.turnsLeft < 1) {
      newLevel();
    } else {
      const gameOver = state.gameOver || checkForFullGrid(state.gameGrid);
      setState((prev) => ({
        ...prev,
        nextBallValue: gameOver ? 0 : randomBallValue(state.lastNumber),
        combo: newGameState['combo'],
        turnInProgress: false,
        gameOver,
        highestCombo: Math.max(prev.highestCombo, state.combo),
      }));
    }
  };

  const processTurn = () => {
    let [updatedGameGrid, explosionCount] = processExplosions(
      deepCopyGameGrid(state.gameGrid)
    );
    const moreExplosions = explosionCount > 0;
    setState((prev) => ({
      ...prev,
      gameGrid: updatedGameGrid,
      score: prev.score + explosionCount * calcMultiplier(state.combo),
      combo: moreExplosions ? prev.combo + 1 : prev.combo,
      checkForMoreExplosions: moreExplosions,
    }));
  };

  const shootBall = (column: number) => {
    const { gameGrid, nextBallValue, turnInProgress, gameOver } = state;
    const [updatedGameGrid, valid] = validShot(gameGrid, nextBallValue, column);
    if (valid && !turnInProgress && !gameOver) {
      setState((prev) => ({
        ...prev,
        gameGrid: updatedGameGrid,
        turnsLeft: prev.turnsLeft - 1,
        checkForMoreExplosions: true,
        turnInProgress: true,
        nextBallValue: 0,
        lastNumber: nextBallValue,
      }));
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
        combo={state.combo}
      />
      <GameGrid
        gameGrid={state.gameGrid}
        shootBall={shootBall}
        fullColumns={state.fullColumns}
      />
      <NextBall value={state.nextBallValue} />
      {state.gameOver && (
        <EndGame newGame={newGame} highestCombo={state.highestCombo} />
      )}
    </div>
  );
};

export default GameBoard;
