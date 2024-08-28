import { useState } from "react";

import TicTacToe from "components/TicTacToe";
import { AppContext, AppContextType } from "contexts/AppContext";
import { PLAYER_X, PROGRESS_STATE } from "utils/constants";
import { io } from 'socket.io-client';

import "styles/base.css";
import "./style.css";

function App() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(PROGRESS_STATE);
  
  const socket = io('http://localhost:3000'); 

socket.on('connect', () => {
  console.log('Connected to the server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

  const context: AppContextType = {
    tiles,
    setTiles,

    playerTurn,
    setPlayerTurn,

    strikeClass,
    setStrikeClass,

    gameState,
    setGameState,
  };

  return (
    <AppContext.Provider value={context}>
      <div className="app">
        <TicTacToe />
      </div>
    </AppContext.Provider>
  );
}

export default App;
