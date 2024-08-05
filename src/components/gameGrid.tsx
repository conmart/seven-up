import React from 'react';

import GridColumn from './gridColumn';

const GameGrid: React.FC<{
  gameGrid: number[][];
  shootBall: (column: number) => any;
  fullColumns: number[];
}> = ({ gameGrid, shootBall, fullColumns }) => {
  return (
    <div className="gameGrid">
      {gameGrid.map((column, index) => (
        <GridColumn
          columnState={column}
          columnIndex={index}
          key={index}
          shootBall={shootBall}
          columnFull={fullColumns.includes(index)}
        />
      ))}
    </div>
  );
};

export default GameGrid;
