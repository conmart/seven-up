export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const nextZero = (gridColumn: number[]) => {
  return gridColumn.findIndex((element) => element === 0);
};

export const randomBallValue = () => {
  return Math.floor(Math.random() * 7) + 1;
};

export const deepCopyGameGrid = (gameGrid: number[][]) => {
  let gameGridCopy: number[][] = [];
  gameGrid.forEach((column) => gameGridCopy.push([...column]));
  return gameGridCopy;
};
