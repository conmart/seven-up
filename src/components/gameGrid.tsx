import React from 'react';

import GridColumn from './gridColumn';

const GameGrid: React.FC<{
  gameGrid: number[][];
  shootBall: (column: number) => any;
}> = ({ gameGrid, shootBall }) => {
  return (
    <div className="gameGrid">
      {gameGrid.map((column, index) => (
        <GridColumn
          columnState={column}
          columnIndex={index}
          key={index}
          shootBall={shootBall}
        />
      ))}
    </div>
  );
};

export default GameGrid;
