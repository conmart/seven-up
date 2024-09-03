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
  lastNumber: 0,
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
    multiplier = Math.round(multiplier * Math.max(3.5 - 0.2 * combo, 1.5));
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

export const generateStartSeed = (): number[][] => {
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

export const validShot = (
  gameGrid: number[][],
  nextBall: number,
  column: number
): [number[][], boolean] => {
  let updatedGameGrid = deepCopyGameGrid(gameGrid);
  let valid = false;
  const nextOpenSquare = nextZero(gameGrid[column]);
  if (nextOpenSquare >= 0 && nextOpenSquare < 8) {
    updatedGameGrid[column][nextOpenSquare] = nextBall;
    valid = true;
  }
  return [updatedGameGrid, valid];
};
