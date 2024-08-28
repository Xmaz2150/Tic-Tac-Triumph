import { useAppContext } from "contexts/AppContext";
import { PLAYER_O, PLAYER_X, PROGRESS_STATE } from "utils/constants";

import "./style.css";

function Tile({ index }: { index: number }) {
  const { tiles, setTiles, playerTurn, setPlayerTurn, gameState } =
    useAppContext();

  const isDisabled = tiles[index] !== null;

  function onClick() {
    if (isDisabled) return;
    if (gameState !== PROGRESS_STATE) return;

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
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
