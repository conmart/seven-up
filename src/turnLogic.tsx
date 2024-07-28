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

const checkExplosionsRow = (
  row: number[],
  columnStart: number,
  rowIndex: number
) => {
  if (row.length === 0) {
    return;
  }
  console.log(row, columnStart, rowIndex, 'exploderow');
  row.forEach((value, index) => {
    if (value === row.length) {
      explosionCoordinates.add([columnStart + index, rowIndex]);
    }
  });
  console.log(explosionCoordinates);
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
  gameGrid.forEach((column, index) => checkExplosionsColumn(column, index));
  let subRow: number[] = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (gameGrid[c][r] === 0) {
        checkExplosionsRow(subRow, c - subRow.length, r);
        subRow = [];
      } else {
        subRow.push(gameGrid[c][r]);
      }
    }
    checkExplosionsRow(subRow, 7 - subRow.length, r);
    subRow = []
  }
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
