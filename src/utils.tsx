export const nextZero = (gridColumn: number[]) => {
  return gridColumn.findIndex((element) => element === 0);
};

export const randomBallValue = () => {
  return Math.floor(Math.random() * 7) + 1;
};

const emptyGameGrid = [
  [9, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0],
];

// const generateStartSeed = () => {
//   let newGameGrid = [...emptyGameGrid];
//   for (let i = 0; i < 10; i++) {
//     const column = Math.floor(Math.random() * 7);
//     let availableSlot = nextZero(newGameGrid[column]);
//     newGameGrid[column][availableSlot] = randomBallValue();
//   }
//   console.log(newGameGrid)
//   debugger;
//   return newGameGrid
// };

export const deepCopyGameGrid = (gameGrid: number[][]) => {
  let gameGridCopy: number[][] = [];
  gameGrid.forEach((column) => gameGridCopy.push([...column]));
  return gameGridCopy;
};

export const newGameState = {
  gameGrid: deepCopyGameGrid(emptyGameGrid),
  nextBallValue: randomBallValue(),
  score: 0,
  level: 1,
  turnsLeft: 5,
  combo: 1,
  checkForMoreExplosions: false,
  gameOver: false,
  turnInProgress: false,
};

export const numberWithCommas = (num:number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
