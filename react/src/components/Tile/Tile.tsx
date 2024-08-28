import { useAppContext } from "contexts/AppContext";
import {
  DRAW_STATE,
  O_WINS_STATE,
  PLAYER_O,
  PLAYER_X,
  PROGRESS_STATE,
  WIN_COMBOS,
  X_WINS_STATE,
} from "utils/constants";
import clickSoundFile from "sounds/mouse_click.mp3";

import "./style.css";

const clickSound = new Audio(clickSoundFile);
clickSound.volume = 0.4;

function Tile({ index }: { index: number }) {
  const {
    tiles,
    setTiles,
    playerTurn,
    setPlayerTurn,
    gameState,
    setGameState,
    setStrikeClass,
  } = useAppContext();

  const isDisabled = tiles[index] !== null || gameState !== PROGRESS_STATE;

  function onClick() {
    if (isDisabled) return;

    clickSound.play();

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    const player = playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X;
    setPlayerTurn(player);

    checkWinner(newTiles);
  }

  function checkWinner(tiles: (string | null)[]) {
    for (const { combo, strikeClass } of WIN_COMBOS) {
      const value1 = tiles[combo[0]];
      const value2 = tiles[combo[1]];
      const value3 = tiles[combo[2]];

      if (value1 && value1 === value2 && value1 === value3) {
        setStrikeClass(strikeClass);

        const win = value1 === PLAYER_X ? X_WINS_STATE : O_WINS_STATE;
        setGameState(win);
        return;
      }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile);
    if (areAllTilesFilledIn) {
      setGameState(DRAW_STATE);
    }
  }

  return (
    <button
      onClick={onClick}
      className="tile"
      data-player={playerTurn}
      disabled={isDisabled}
    >
      {tiles[index]}
    </button>
  );
}

export default Tile;
