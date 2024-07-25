import React from 'react';

import GridSquare from './gridSquare';

const GridColumn: React.FC<{
  columnState: number[];
  columnIndex: number;
  shootBall: (column: number) => any;
}> = ({ columnState, columnIndex, shootBall }) => {
  return (
    <div
      className="gridColumn"
      onClick={() => shootBall(columnIndex)}
    >
      {columnState.map((value, index) => (
        <GridSquare key={index} squareValue={value} />
      ))}
    </div>
  );
};

export default GridColumn;
