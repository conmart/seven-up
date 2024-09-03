export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const nextZero = (gridColumn: number[]) => {
  return gridColumn.findIndex((element) => element === 0);
};

export const randomBallValue = (prevValue: number = 0) => {
  let newValue = prevValue
  while (newValue === prevValue) {
    newValue = Math.floor(Math.random() * 7) + 1;
  }
  return newValue;
};

export const deepCopyGameGrid = (gameGrid: number[][]) => {
  let gameGridCopy: number[][] = [];
  gameGrid.forEach((column) => gameGridCopy.push([...column]));
  return gameGridCopy;
};
