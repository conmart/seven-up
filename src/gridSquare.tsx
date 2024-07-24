import React from 'react';

const GridSquare: React.FC<{ squareValue: number }> = ({ squareValue }) => {
  return <div className="gridSquare">{squareValue}</div>;
};

export default GridSquare;
