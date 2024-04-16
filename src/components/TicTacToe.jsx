import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMiniMax from "../hooks/useMiniMax";

function TicTacToe() {
  const [gameBoard, setGameBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const { reset, makeMove, endMessage } = useMiniMax(gameBoard, setGameBoard);

  const renderGameSquares = () =>
    gameBoard.map((square, idx) => (
      <div
        key={idx}
        className="game-square"
        style={endMessage ? { pointerEvents: "none" } : {}}
        onClick={() => makeMove(idx, "X")}
      >
        {square}
      </div>
    ));

  return (
    <div className="tic-tac-toe-container">
      <Link to="/">Main Menu</Link>
      <div className="tic-tac-toe-wrapper">
        {renderGameSquares()}
        <div>{endMessage}</div>
        {endMessage && <button onClick={reset}>Reset</button>}
      </div>
    </div>
  );
}

export default TicTacToe;
