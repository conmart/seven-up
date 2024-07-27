let explosionCoordinates:number[][] = [];

const checkExplosionsColumn = (column: number[], columnIndex: number) => {
  const columnHeight = nextZero(column) === -1 ? 7 : nextZero(column);
  if (columnHeight > 0) {
    column.forEach((value, index) => {
      if (value === columnHeight) {
        explosionCoordinates.push([columnIndex, index]);
      }
    });
  }
};

export const processExplosions = (gameGrid: number[][]) => {
  gameGrid.forEach((column, index) => checkExplosionsColumn(column, index));
  console.log(explosionCoordinates)
  return gameGrid;
};

export const randomBallValue = () => {
  return Math.floor(Math.random() * 7) + 1;
};

export const nextZero = (gridColumn: number[]) => {
  return gridColumn.findIndex((element) => element === 0);
};
