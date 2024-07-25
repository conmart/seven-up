import React, { useState } from 'react';
import './App.css';

import GameGrid from './gameGrid';
import NextBall from './nextBall';

interface AppState {
  gameGrid: number[][];
  nextBallValue: number;
}

function App() {
  const [state, setState] = useState<AppState>({
    gameGrid: [
      [1, 2, 3, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0],
    ],
    nextBallValue: 5,
  });

  const shootBall = (columnIndex: number) => {
    let updatedGameGrid = state.gameGrid
    const nextOpenSquare = updatedGameGrid[columnIndex].findIndex(
      (element) => element === 0
    );
    if (Number.isInteger(nextOpenSquare)) {
      updatedGameGrid[columnIndex][nextOpenSquare] = state.nextBallValue;
      const newBall = Math.floor(Math.random() * 7) + 1
      setState({ gameGrid: updatedGameGrid, nextBallValue: newBall })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <GameGrid gameGrid={state.gameGrid} shootBall={shootBall} />
        <NextBall value={state.nextBallValue} />
      </header>
    </div>
  );
}

export default App;
