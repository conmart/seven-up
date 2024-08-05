import React from 'react';

import GridSquare from './gridSquare';

const GridColumn: React.FC<{
  columnState: number[];
  columnIndex: number;
  shootBall: (column: number) => any;
  columnFull: boolean;
}> = ({ columnState, columnIndex, shootBall, columnFull }) => {
  const columnClass = columnFull ? 'gridColumn columnFull' : 'gridColumn';
  return (
    <div className={columnClass} onClick={() => shootBall(columnIndex)}>
      {columnState.map((value, index) => (
        <GridSquare key={index} squareValue={value} />
      ))}
    </div>
  );
};

export default GridColumn;
