import React from 'react';

import GridSquare from './gridSquare';

const GridColumn: React.FC<{ columnState: number[] }> = ({ columnState }) => {
  return (
    <div className="gridColumn">
      <GridSquare squareValue={columnState[0]} />
      <GridSquare squareValue={columnState[1]} />
      <GridSquare squareValue={columnState[2]} />
      <GridSquare squareValue={columnState[3]} />
      <GridSquare squareValue={columnState[4]} />
      <GridSquare squareValue={columnState[5]} />
      <GridSquare squareValue={columnState[6]} />
    </div>
  );
};

export default GridColumn;
