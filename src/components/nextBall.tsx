import React from 'react';

const NextBall: React.FC<{ value: number }> = ({ value }) => {
  const ballClass = `gameBall ball${value}`;
  
  return (
    <div className="nextBallContainer">
      <div className={ballClass}>{value}</div>
    </div>
  );
};

export default NextBall;
