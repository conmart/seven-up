import { deepCopyGameGrid, nextZero, randomBallValue } from './utils';
import { processExplosions } from './explosionHelpers';

const emptyGameGrid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export const newGameState = {
  gameGrid: emptyGameGrid,
  nextBallValue: 0,
  score: 0,
  level: 1,
  turnsLeft: 5,
  combo: 1,
  checkForMoreExplosions: false,
  gameOver: false,
  turnInProgress: false,
  fullColumns: [],
};

export const addBlockRow = (
  gameGrid: number[][]
): [number[][], boolean, number[]] => {
  let gameOver = false;
  let fullColumns: number[] = [];
  gameGrid.forEach((column, index) => {
    let columnFull = nextZero(column) === -1;
    if (columnFull) {
      gameOver = true;
      fullColumns.push(index);
    } else if (!gameOver) {
      column.unshift(9);
      column.pop();
    }
  });
  return [gameGrid, gameOver, fullColumns];
};

export const calcMultiplier = (combo: number): number => {
  let multiplier = 7;
  let start = 2;
  while (start <= combo) {
    multiplier = Math.round(multiplier * (4 - 0.1 * combo));
    start++;
  }
  return multiplier;
};

export const checkForFullGrid = (gameGrid: number[][]): boolean => {
  let gridFull = true;
  gameGrid.forEach((column) => {
    if (nextZero(column) !== -1) {
      gridFull = false;
    }
  });
  return gridFull;
};

export const generateStartSeed = () => {
  let newGameGrid = deepCopyGameGrid(emptyGameGrid);
  for (let i = 0; i < 15; i++) {
    const column = Math.floor(Math.random() * 7);
    let availableSlot = nextZero(newGameGrid[column]);
    newGameGrid[column][availableSlot] = randomBallValue();
  }
  let explosionCount = 1;
  while (explosionCount > 0) {
    [newGameGrid, explosionCount] = processExplosions(newGameGrid);
  }
  return newGameGrid;
};
