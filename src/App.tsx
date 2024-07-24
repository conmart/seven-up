import React, { useState } from 'react';
import './App.css';

import GameGrid from './gameGrid';
import NextBall from './nextBall';

interface AppState {
  gameGrid: number[][];
  nextBallValue: number;
}

function App() {
  const [state] = useState<AppState>({
    gameGrid: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    nextBallValue: 5,
  });
  return (
    <div className="App">
      <header className="App-header">
        <GameGrid gameGrid={state.gameGrid} />
        <NextBall value={state.nextBallValue} />
      </header>
    </div>
  );
}

export default App;
