let explosionCoordinates = new Set<number[]>();
let ballsToExplode: { [key: number]: number[] } = {};
let gameGrid: number[][] = [];

const checkExplosionsColumn = (column: number[], columnIndex: number) => {
  const columnHeight = nextZero(column) === -1 ? 7 : nextZero(column);
  if (columnHeight > 0) {
    column.forEach((value, index) => {
      if (value === columnHeight) {
        explosionCoordinates.add([columnIndex, index]);
      }
    });
  }
};

const explodeBlock = (column: number, row: number) => {
  if (column > -1 && column < 7 && row > -1 && row < 7) {
    const currentValue = gameGrid[column][row];
    if (currentValue === 8) {
      gameGrid[column][row] = randomBallValue();
    } else if (currentValue === 9) {
      gameGrid[column][row] = 8;
    }
  }
};

const removeFromColumn = (column: number, rows: number[]) => {
  const rowsToRemove = new Set<number>(rows);
  let newRow: number[] = [];
  gameGrid[column].forEach((row, index) => {
    if (!rowsToRemove.has(index)) {
      newRow.push(row);
    }
  });
  while (newRow.length < 7) {
    newRow.push(0);
  }
  gameGrid[column] = newRow;
};

const explodeBlocks = () => {
  explosionCoordinates.forEach((coordinate) => {
    const column = coordinate[0];
    const row = coordinate[1];
    explodeBlock(column - 1, row);
    explodeBlock(column + 1, row);
    explodeBlock(column, row - 1);
    explodeBlock(column, row + 1);
    if (!ballsToExplode[column]) {
      ballsToExplode[column] = [row];
    } else {
      ballsToExplode[column].push(row);
    }
  });
  Object.entries(ballsToExplode).forEach(([column, rows]) => {
    removeFromColumn(parseInt(column), rows);
  });
};

const cleanup = () => {
  const explosionsHappened = explosionCoordinates.size > 0;
  explosionCoordinates.clear();
  ballsToExplode = {};
  if (explosionsHappened) {
    processExplosions(gameGrid);
  }
};

export const processExplosions = (gameGridFromState: number[][]) => {
  gameGrid = gameGridFromState;
  gameGridFromState.forEach((column, index) =>
    checkExplosionsColumn(column, index)
  );
  explodeBlocks();
  cleanup();
  return gameGrid;
};

export const randomBallValue = () => {
  return Math.floor(Math.random() * 7) + 1;
};

export const nextZero = (gridColumn: number[]) => {
  return gridColumn.findIndex((element) => element === 0);
};
