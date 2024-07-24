import React, { useState } from 'react';

import GridColumn from './gridColumn';

interface AppState {
  gameGrid: number[][];
}

const GameGrid = () => {
  const [state] = useState<AppState>({
    gameGrid: [
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
  });
  return (
    <div className="gameGrid">
      <GridColumn columnState={state.gameGrid[0]} />
      <GridColumn columnState={state.gameGrid[1]} />
      <GridColumn columnState={state.gameGrid[2]} />
      <GridColumn columnState={state.gameGrid[3]} />
      <GridColumn columnState={state.gameGrid[4]} />
      <GridColumn columnState={state.gameGrid[5]} />
      <GridColumn columnState={state.gameGrid[6]} />
    </div>
  );
};

export default GameGrid;
