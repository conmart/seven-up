import React from 'react';
import './App.css';

import GameBoard from './components/gameBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameBoard />
      </header>
    </div>
  );
}

export default App;
