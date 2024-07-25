import React from 'react';

const GridSquare: React.FC<{ squareValue: number }> = ({ squareValue }) => {
  const ballClass = `gameBall ball${squareValue}`;

  return (
    <div className="gridSquare">
      <div className={ballClass}>{squareValue}</div>
    </div>
  );
};

export default GridSquare;
