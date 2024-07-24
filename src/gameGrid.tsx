import React from 'react';

import GridRow from './gridRow';

const GameGrid: React.FC<{ gameGrid: number[][] }> = ({ gameGrid }) => {
  return (
    <div className="gameGrid">
      <GridRow rowState={gameGrid[0]} />
      <GridRow rowState={gameGrid[1]} />
      <GridRow rowState={gameGrid[2]} />
      <GridRow rowState={gameGrid[3]} />
      <GridRow rowState={gameGrid[4]} />
      <GridRow rowState={gameGrid[5]} />
      <GridRow rowState={gameGrid[6]} />
    </div>
  );
};

export default GameGrid;
