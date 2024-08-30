import { useAppContext } from "contexts/AppContext";
import Reset from "components/Reset/Reset";
import { DRAW_STATE } from "utils/constants";

import "./style.css";

function EndGameModal() {
  const { winner, gameState } = useAppContext();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {gameState !== DRAW_STATE ? `Player ${winner} Wins!` : "It's a Draw!"}
        </h2>
        <Reset />
      </div>
    </div>
  );
}
export default EndGameModal;
