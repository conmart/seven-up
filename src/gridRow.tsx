import React from 'react';

import GridSquare from './gridSquare';

const GridRow: React.FC<{ rowState: number[] }> = ({ rowState }) => {
  return (
    <div className="gridRow">
      <GridSquare squareValue={rowState[0]} />
      <GridSquare squareValue={rowState[1]} />
      <GridSquare squareValue={rowState[2]} />
      <GridSquare squareValue={rowState[3]} />
      <GridSquare squareValue={rowState[4]} />
      <GridSquare squareValue={rowState[5]} />
      <GridSquare squareValue={rowState[6]} />
    </div>
  );
};

export default GridRow;
