let explosionCoordinates = new Set<number[]>();
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
  console.log(column, row, 'yo');
  if (column > -1 && column < 7 && row > -1 && row < 7) {
    const currentValue = gameGrid[column][row];
    if (currentValue === 8) {
      gameGrid[column][row] = randomBallValue();
    } else if (currentValue===9) {
      gameGrid[column][row] = 8
    }
  }
};

const explodeSurroundingBlocks = () => {
  explosionCoordinates.forEach((coordinate) => {
    const column = coordinate[0];
    const row = coordinate[1];
    explodeBlock(column - 1, row);
    explodeBlock(column + 1, row);
    explodeBlock(column, row - 1);
    explodeBlock(column, row + 1);
  });
  explosionCoordinates.clear();
};

export const processExplosions = (gameGridFromState: number[][]) => {
  gameGrid = gameGridFromState;
  gameGridFromState.forEach((column, index) =>
    checkExplosionsColumn(column, index)
  );
  console.log(explosionCoordinates);
  console.log(gameGrid);
  explodeSurroundingBlocks();
  return gameGrid;
};

export const randomBallValue = () => {
  return Math.floor(Math.random() * 7) + 1;
};

export const nextZero = (gridColumn: number[]) => {
  return gridColumn.findIndex((element) => element === 0);
};
